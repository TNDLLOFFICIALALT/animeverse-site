// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, get, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// ------------------- Firebase Config -------------------
const firebaseConfig = {
  apiKey: "AIzaSyANg1kj2sP6Y3C47FIxTWT8ByRKJTCW1mE",
  authDomain: "animeverse-47c13.firebaseapp.com",
  databaseURL: "https://animeverse-47c13-default-rtdb.firebaseio.com",
  projectId: "animeverse-47c13",
  storageBucket: "animeverse-47c13.firebasestorage.app",
  messagingSenderId: "41062663219",
  appId: "1:41062663219:web:d07f582d85542254e48f46"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
const OWNER_EMAIL = "anasbuyian@gmail.com";

// ------------------- DOM Elements -------------------
const animeList = document.getElementById("animeList");
const animeDetail = document.getElementById("animeDetail");
const searchInput = document.getElementById("search");
const adminTab = document.getElementById("adminTab");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ------------------- Load Anime Cards -------------------
async function loadAnime(limit=100) {
  const res = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${limit}`);
  const data = await res.json();
  animeList.innerHTML = "";
  data.data.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
    `;
    card.onclick = () => showAnime(anime.mal_id);
    animeList.appendChild(card);
  });
}

// ------------------- Show Anime Details -------------------
async function showAnime(id) {
  animeList.classList.add("hidden");
  animeDetail.classList.remove("hidden");
  animeDetail.innerHTML = "Loading...";

  const metaRef = ref(db, `meta/anime/${id}`);
  const snap = await get(metaRef);
  let animeData;

  if (snap.exists()) {
    animeData = snap.val();
  } else {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const data = await res.json();
    animeData = data.data;
  }

  animeDetail.innerHTML = `
    <button onclick="backHome()">⬅ Back</button>
    <h2>${animeData.title}</h2>
    <img src="${animeData.images.jpg.image_url}" alt="${animeData.title}">
    <p>${animeData.synopsis || "No synopsis available."}</p>
    <div id="trailers">
      ${(animeData.trailer?.url ? `<iframe class="trailer" width="560" height="315" src="${animeData.trailer.embed_url}" frameborder="0" allowfullscreen></iframe>` : "")}
    </div>
  `;
}

// ------------------- Back Button -------------------
function backHome() {
  animeDetail.classList.add("hidden");
  animeList.classList.remove("hidden");
}

// ------------------- Search -------------------
searchInput.addEventListener("input", async () => {
  const term = searchInput.value.toLowerCase();
  if (term.length < 3) return loadAnime();
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${term}&limit=50`);
  const data = await res.json();
  animeList.innerHTML = "";
  data.data.forEach(anime => {
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
    `;
    card.onclick = () => showAnime(anime.mal_id);
    animeList.appendChild(card);
  });
});

// ------------------- Auth -------------------
loginBtn.onclick = () => signInWithPopup(auth, provider);
logoutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    if (user.email === OWNER_EMAIL) adminTab.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    adminTab.style.display = "none";
  }
});

// ------------------- Admin Seed Function -------------------
async function seedAnimeData() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=100");
  const data = await res.json();

  for (const anime of data.data) {
    await set(ref(db, "meta/anime/" + anime.mal_id), {
      title: anime.title,
      image: anime.images.jpg.image_url,
      synopsis: anime.synopsis,
      trailer: anime.trailer?.url || null
    });
  }

  alert("Seeded 100 top anime successfully!");
}

adminTab.onclick = () => seedAnimeData();

// ------------------- Initialize -------------------
loadAnime();

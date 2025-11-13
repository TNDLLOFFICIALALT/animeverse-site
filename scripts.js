// ---------------- Firebase Setup ----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, push, onValue, get, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase config
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

// ---------------- DOM Elements ----------------
const animeList = document.getElementById("animeList");
const animeDetail = document.getElementById("animeDetail");
const searchInput = document.getElementById("search");
const adminTab = document.getElementById("adminTab");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

const messagesDiv = document.getElementById("messages");
const messageForm = document.getElementById("messageForm");

const fanArtTab = document.getElementById("fanArtTab");
const fanArtSection = document.getElementById("fanArtSection");
const fanArtForm = document.getElementById("fanArtForm");
const fanArtGallery = document.getElementById("fanArtGallery");

// ---------------- Load Top Anime ----------------
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

// ---------------- Show Anime Details ----------------
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
    await set(ref(db, `meta/anime/${id}`), animeData);
  }

  animeDetail.innerHTML = `
    <button onclick="backHome()">⬅ Back</button>
    <h2>${animeData.title}</h2>
    <img src="${animeData.images.jpg.image_url}" alt="${animeData.title}">
    <p>${animeData.synopsis || "No synopsis available."}</p>
    <h3>Trailers</h3>
    <div id="trailers">
      ${(animeData.trailer?.url ? `<iframe class="trailer" width="560" height="315" src="${animeData.trailer.embed_url}" frameborder="0" allowfullscreen></iframe>` : "No trailers available")}
    </div>
    <h3>Seasons & Episodes</h3>
    <div id="seasons">${animeData.season ? `<p>Season: ${animeData.season}</p>` : "Season info not available"}</div>
    <h3>Movies</h3>
    <div id="movies">${animeData.related?.Adaptation || "No movie info"}</div>
    <p>Watch full episodes at <a href="https://aniwatchtv.to/" target="_blank">AniWatch</a></p>
  `;
}

function backHome() {
  animeDetail.classList.add("hidden");
  animeList.classList.remove("hidden");
  fanArtSection.classList.add("hidden");
}

// ---------------- Search ----------------
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

// ---------------- Auth ----------------
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

// ---------------- Chat ----------------
messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const msg = document.getElementById("message").value;
  push(ref(db, "messages"), {
    user: auth.currentUser.email,
    text: msg,
    time: new Date().toLocaleTimeString()
  });
  messageForm.reset();
});

onValue(ref(db, "messages"), snapshot => {
  messagesDiv.innerHTML = "";
  snapshot.forEach(child => {
    const msg = child.val();
    const p = document.createElement("p");
    p.textContent = `${msg.user}: ${msg.text} (${msg.time})`;
    messagesDiv.appendChild(p);
  });
});

// ---------------- Admin Seed Function ----------------
async function seedAnimeData() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=100");
  const data = await res.json();
  for (const anime of data.data) {
    await set(ref(db, "meta/anime/" + anime.mal_id), {
      title: anime.title,
      image: anime.images.jpg.image_url,
      synopsis: anime.synopsis,
      trailer: anime.trailer?.url || null,
      season: anime.season || "Unknown",
      episodes: anime.episodes || "Unknown",
      movies: anime.related?.Adaptation || "None"
    });
  }
  alert("Seeded 100+ anime with seasons, episodes, and movies!");
}

adminTab.onclick = () => seedAnimeData();

// ---------------- Fan Art ----------------
fanArtForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return alert("You must be logged in to submit fan art!");

  const title = document.getElementById("fanArtTitle").value;
  const url = document.getElementById("fanArtUrl").value;

  await push(ref(db, "fanArtPending"), {
    user: user.email,
    title,
    url,
    approved: false,
    timestamp: Date.now()
  });

  fanArtForm.reset();
  alert("Fan art submitted! Admin must approve before it appears.");
});

// ---------------- Load Fan Art ----------------
async function loadFanArt() {
  fanArtGallery.innerHTML = "";
  const snap = await get(ref(db, "fanArt"));
  if (!snap.exists()) return;
  const data = snap.val();
  Object.values(data).forEach(fa => {
    const img = document.createElement("img");
    img.src = fa.url;
    img.alt = fa.title;
    fanArtGallery.appendChild(img);
  });
}

// ---------------- Admin Approve Fan Art ----------------
async function approveFanArt() {
  const snap = await get(ref(db, "fanArtPending"));
  if (!snap.exists()) return;
  const data = snap.val();
  Object.entries(data).forEach(([key, fa]) => {
    const approveBtn = document.createElement("button");
    approveBtn.textContent = `Approve: ${fa.title} (${fa.user})`;
    approveBtn.onclick = async () => {
      await set(ref(db, `fanArt/${key}`), fa);
      await set(ref(db, `fanArtPending/${key}`), null);
      approveBtn.remove();
      loadFanArt();
    };
    fanArtGallery.appendChild(approveBtn);
  });
}

// Show Fan Art Section
fanArtTab.onclick = () => {
  animeList.classList.add("hidden");
  animeDetail.classList.add("hidden");
  fanArtSection.classList.remove("hidden");
  loadFanArt();
  if (auth.currentUser?.email === OWNER_EMAIL) approveFanArt();
};

// ---------------- Init ----------------
loadAnime();

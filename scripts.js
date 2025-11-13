// ---------------------- Firebase Setup ----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
  getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { 
  getDatabase, ref, push, onValue 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase config (replace with your keys)
const firebaseConfig = {
  apiKey: "AIzaSyANg1kj2sP6Y3C47FIxTWT8ByRKJTCW1mE",
  authDomain: "animeverse-47c13.firebaseapp.com",
  databaseURL: "https://animeverse-47c13-default-rtdb.firebaseio.com",
  projectId: "animeverse-47c13",
  storageBucket: "animeverse-47c13.appspot.com",
  messagingSenderId: "41062663219",
  appId: "1:41062663219:web:d07f582d85542254e48f46"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();
const OWNER_EMAIL = "anasbuyian@gmail.com";

// ---------------------- DOM ----------------------
const animeList = document.getElementById("animeList");
const animeDetail = document.getElementById("animeDetail");
const searchInput = document.getElementById("search");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const adminTab = document.getElementById("adminTab");
const fanArtFile = document.getElementById("fanArtFile");
const uploadFanArtBtn = document.getElementById("uploadFanArtBtn");
const fanArtGallery = document.getElementById("fanArtGallery");
const chatForm = document.getElementById("messageForm");
const messagesDiv = document.getElementById("messages");

// ---------------------- Auth ----------------------
loginBtn.onclick = () => signInWithPopup(auth, provider);
logoutBtn.onclick = () => signOut(auth);

onAuthStateChanged(auth, (user) => {
  if(user){
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    if(user.email === OWNER_EMAIL) adminTab.style.display = "inline-block";
  } else {
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    adminTab.style.display = "none";
  }
});

// ---------------------- Fetch Anime ----------------------
async function fetchTopAnime(limit=100){
  const res = await fetch(`https://api.jikan.moe/v4/top/anime?limit=${limit}`);
  const data = await res.json();
  return data.data;
}

async function fetchAnimeDetails(id){
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
  const data = await res.json();
  return data.data;
}

// ---------------------- Render ----------------------
async function loadAnimeList(limit=100){
  const topAnime = await fetchTopAnime(limit);
  animeList.innerHTML = "";
  topAnime.forEach(anime => {
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

async function showAnime(id){
  animeList.classList.add("hidden");
  animeDetail.classList.remove("hidden");
  animeDetail.innerHTML = "Loading anime...";

  const animeData = await fetchAnimeDetails(id);

  animeDetail.innerHTML = `
    <button onclick="backHome()">⬅ Back</button>
    <h2>${animeData.title}</h2>
    <img src="${animeData.images.jpg.image_url}" alt="${animeData.title}">
    <p>${animeData.synopsis || "No synopsis available."}</p>
    <h3>Episodes & Seasons</h3>
    <div id="episodes">
      ${animeData.episodes ? `<p>Total Episodes: ${animeData.episodes}</p>` : ""}
      ${animeData.season ? `<p>Season: ${animeData.season}</p>` : ""}
    </div>
    ${animeData.trailer?.url ? `<iframe class="trailer" width="560" height="315" src="${animeData.trailer.embed_url}" frameborder="0" allowfullscreen></iframe>` : ""}
    ${animeData.related?.Adaptation ? `<h3>Related: ${animeData.related.Adaptation.map(a => a.name).join(", ")}</h3>` : ""}
  `;
}

function backHome(){
  animeDetail.classList.add("hidden");
  animeList.classList.remove("hidden");
}

// ---------------------- Search ----------------------
searchInput.addEventListener("input", async () => {
  const term = searchInput.value.trim();
  if(term.length < 2) return loadAnimeList();
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(term)}&limit=50`);
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

// ---------------------- Chat ----------------------
chatForm?.addEventListener("submit", e => {
  e.preventDefault();
  const messageInput = document.getElementById("message");
  const messageText = messageInput.value.trim();
  if(!auth.currentUser || !messageText) return;
  push(ref(db, "messages"), {
    user: auth.currentUser.email,
    text: messageText,
    time: new Date().toLocaleTimeString()
  });
  messageInput.value = "";
});

onValue(ref(db, "messages"), snapshot => {
  if(!messagesDiv) return;
  messagesDiv.innerHTML = "";
  snapshot.forEach(child => {
    const msg = child.val();
    const p = document.createElement("p");
    p.textContent = `${msg.user}: ${msg.text} (${msg.time})`;
    messagesDiv.appendChild(p);
  });
});

// ---------------------- Fan Art ----------------------
uploadFanArtBtn.onclick = async () => {
  if(!auth.currentUser) return alert("Login to upload fan art!");
  const file = fanArtFile.files[0];
  if(!file) return alert("Select a file first!");
  const storageRef = ref(db, "fanArts/pending");
  push(storageRef, {
    user: auth.currentUser.email,
    fileName: file.name,
    approved: false,
    time: new Date().toISOString()
  });
  alert("Fan art submitted for review!");
};

// ---------------------- Init ----------------------
loadAnimeList();

// script.js - FIXED VERSION
import { animeDatabase, getAllAnimes, searchAnimes } from './animeDatabase.js';

// Global state
let currentUser = null;
let allAnimes = [];

// DOM Elements
const elements = {
    // Modals
    authModal: document.getElementById('authModal'),
    usernameModal: document.getElementById('usernameModal'),
    
    // Navigation
    homePage: document.getElementById('homePage'),
    animeDetailPage: document.getElementById('animeDetailPage'),
    chatPage: document.getElementById('chatPage'),
    moviesPage: document.getElementById('moviesPage'),
    rulesPage: document.getElementById('rulesPage'),
    
    // Content
    animeList: document.getElementById('animeList'),
    animeDetail: document.getElementById('animeDetail'),
    moviesList: document.getElementById('moviesList'),
    
    // Search
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    
    // Auth
    googleLoginBtn: document.getElementById('googleLoginBtn'),
    setUsernameBtn: document.getElementById('setUsernameBtn'),
    usernameInput: document.getElementById('usernameInput'),
    logoutBtn: document.getElementById('logoutBtn'),
    userSection: document.getElementById('userSection'),
    userWelcome: document.getElementById('userWelcome'),
    
    // Chat
    messageForm: document.getElementById('messageForm'),
    messageInput: document.getElementById('messageInput'),
    messages: document.getElementById('messages')
};

// Initialize the application
function init() {
    console.log('Initializing AnimeVerse...');
    
    // Load anime data
    allAnimes = getAllAnimes();
    console.log(`Loaded ${allAnimes.length} animes`);
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial content
    loadAnimeList();
    
    // Show auth modal (temporary - remove when Firebase is set up)
    showAuthModal();
}

// Set up all event listeners
function setupEventListeners() {
    // Navigation
    elements.searchBtn?.addEventListener('click', handleSearch);
    elements.searchInput?.addEventListener('input', handleSearch);
    
    // Auth (simplified for now)
    elements.googleLoginBtn?.addEventListener('click', handleGoogleLogin);
    elements.setUsernameBtn?.addEventListener('click', handleSetUsername);
    elements.logoutBtn?.addEventListener('click', handleLogout);
    
    // Chat
    elements.messageForm?.addEventListener('submit', handleChatSubmit);
    
    // Make functions globally available
    window.showPage = showPage;
    window.showAnimeDetail = showAnimeDetail;
    window.backToHome = backToHome;
}

// Page Navigation
function showPage(pageName) {
    console.log('Showing page:', pageName);
    
    // Hide all pages
    const pages = ['homePage', 'animeDetailPage', 'chatPage', 'moviesPage', 'rulesPage'];
    pages.forEach(page => {
        const element = document.getElementById(page);
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName + 'Page');
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Load page-specific content
    switch(pageName) {
        case 'home':
            loadAnimeList();
            break;
        case 'movies':
            loadMoviesList();
            break;
        case 'chat':
            loadChat();
            break;
    }
}

// Load anime list
function loadAnimeList() {
    if (!elements.animeList) return;
    
    console.log('Loading anime list...');
    elements.animeList.innerHTML = '';
    
    allAnimes.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}" 
                 onerror="this.src='https://via.placeholder.com/200x280/333/fff?text=Anime+Image'">
            <h3>${anime.title}</h3>
            <p class="anime-year">${anime.year} • ${anime.episodes} eps</p>
        `;
        card.addEventListener('click', () => showAnimeDetail(anime.id));
        elements.animeList.appendChild(card);
    });
}

// Show anime details
function showAnimeDetail(animeId) {
    const anime = animeDatabase[animeId];
    if (!anime || !elements.animeDetail) return;
    
    console.log('Showing anime:', anime.title);
    
    let seasonsHTML = '';
    if (anime.seasons && anime.seasons.length > 0) {
        seasonsHTML = `
            <div class="seasons-section">
                <h3>Seasons & Episodes</h3>
                ${anime.seasons.map(season => `
                    <div class="season-card">
                        <h4>${season.title} (${season.episodes} Episodes)</h4>
                        <p>${season.description}</p>
                        ${season.episodesList && season.episodesList.length > 0 ? `
                            <div class="episodes-grid">
                                ${season.episodesList.slice(0, 5).map(ep => `
                                    <div class="episode-card">
                                        <h5>Episode ${ep.episode}: ${ep.title}</h5>
                                        <p>${ep.summary}</p>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    let moviesHTML = '';
    if (anime.movies && anime.movies.length > 0) {
        moviesHTML = `
            <div class="movies-section">
                <h3>Movies</h3>
                ${anime.movies.map(movie => `
                    <div class="movie-card">
                        <h4>${movie.title}</h4>
                        <p><strong>Description:</strong> ${movie.description}</p>
                        <p><strong>Summary:</strong> ${movie.summary}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    elements.animeDetail.innerHTML = `
        <button class="back-btn" onclick="backToHome()">← Back to Home</button>
        
        <div class="anime-header">
            <div class="anime-poster">
                <img src="${anime.image}" alt="${anime.title}" 
                     onerror="this.src='https://via.placeholder.com/300x420/333/fff?text=Anime+Poster'">
            </div>
            <div class="anime-info">
                <h2>${anime.title}</h2>
                <div class="anime-meta">
                    <span class="meta-tag">${anime.type}</span>
                    <span class="meta-tag">${anime.episodes} Episodes</span>
                    <span class="meta-tag">${anime.status}</span>
                    <span class="meta-tag">${anime.year}</span>
                </div>
                <div class="anime-genres">
                    ${anime.genres.map(genre => `<span class="meta-tag">${genre}</span>`).join('')}
                </div>
                <p class="anime-description">${anime.description}</p>
                
                ${anime.trailer ? `
                    <div class="trailer-section">
                        <h3>Trailer</h3>
                        <iframe width="100%" height="315" src="${anime.trailer}" 
                                frameborder="0" allowfullscreen></iframe>
                    </div>
                ` : ''}
            </div>
        </div>
        
        ${seasonsHTML}
        ${moviesHTML}
    `;
    
    showPage('animeDetail');
}

// Back to home function
function backToHome() {
    showPage('home');
}

// Search functionality
function handleSearch() {
    const query = elements.searchInput.value.trim();
    
    if (query.length === 0) {
        loadAnimeList();
        return;
    }
    
    console.log('Searching for:', query);
    const results = searchAnimes(query);
    
    if (!elements.animeList) return;
    elements.animeList.innerHTML = '';
    
    if (results.length === 0) {
        elements.animeList.innerHTML = '<p class="no-results">No animes found. Try a different search.</p>';
        return;
    }
    
    results.forEach(anime => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        card.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}" 
                 onerror="this.src='https://via.placeholder.com/200x280/333/fff?text=Anime+Image'">
            <h3>${anime.title}</h3>
            <p class="anime-year">${anime.year} • ${anime.episodes} eps</p>
        `;
        card.addEventListener('click', () => showAnimeDetail(anime.id));
        elements.animeList.appendChild(card);
    });
}

// Load movies list
function loadMoviesList() {
    if (!elements.moviesList) return;
    
    console.log('Loading movies list...');
    elements.moviesList.innerHTML = '';
    
    // Collect all movies from all animes
    const allMovies = [];
    allAnimes.forEach(anime => {
        if (anime.movies && anime.movies.length > 0) {
            anime.movies.forEach(movie => {
                allMovies.push({
                    ...movie,
                    animeTitle: anime.title
                });
            });
        }
    });
    
    if (allMovies.length === 0) {
        elements.moviesList.innerHTML = '<p class="no-results">No movies found.</p>';
        return;
    }
    
    allMovies.slice(0, 50).forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card-grid';
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" 
                 onerror="this.src='https://via.placeholder.com/250x320/333/fff?text=Movie+Poster'">
            <h4>${movie.title}</h4>
            <p><strong>From:</strong> ${movie.animeTitle}</p>
            <p>${movie.description}</p>
        `;
        elements.moviesList.appendChild(card);
    });
}

// Chat functionality
function loadChat() {
    if (!elements.messages) return;
    elements.messages.innerHTML = '<p class="no-messages">Chat feature coming soon!</p>';
}

function handleChatSubmit(e) {
    e.preventDefault();
    if (!elements.messageInput) return;
    
    const message = elements.messageInput.value.trim();
    if (message) {
        alert('Chat feature coming soon! For now, focus on exploring 1000+ animes!');
        elements.messageInput.value = '';
    }
}

// Auth functionality (simplified)
function showAuthModal() {
    if (elements.authModal) {
        elements.authModal.classList.remove('hidden');
    }
}

function hideAuthModal() {
    if (elements.authModal) {
        elements.authModal.classList.add('hidden');
    }
}

function handleGoogleLogin() {
    alert('Google login would go here! For now, click Continue to explore.');
    hideAuthModal();
    elements.userSection?.classList.remove('hidden');
    elements.userWelcome.textContent = 'Welcome, Anime Fan!';
    showPage('home');
}

function handleSetUsername() {
    const username = elements.usernameInput.value.trim();
    if (username.length >= 3) {
        elements.userSection?.classList.remove('hidden');
        elements.userWelcome.textContent = `Welcome, ${username}!`;
        elements.usernameModal.classList.add('hidden');
        showPage('home');
    } else {
        alert('Username must be at least 3 characters long');
    }
}

function handleLogout() {
    elements.userSection?.classList.add('hidden');
    showAuthModal();
    showPage('home');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
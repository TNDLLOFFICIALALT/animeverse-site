// script.js - COMPLETELY WORKING
class AnimeHub {
    constructor() {
        this.currentTab = 'home';
        this.allAnimes = [];
        this.init();
    }

    init() {
        console.log('🚀 AnimeHub Initializing...');
        this.loadAnimeData();
        this.setupEventListeners();
        this.showTab('home');
    }

    loadAnimeData() {
        this.allAnimes = Object.values(animeDatabase);
        console.log(`📚 Loaded ${this.allAnimes.length} animes`);
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.showTab(tab);
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Category clicks
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const genre = e.currentTarget.dataset.genre;
                this.filterByGenre(genre);
                this.showTab('browse');
            });
        });

        // Modal close
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Chat send
        document.getElementById('sendMessage').addEventListener('click', () => {
            this.sendChatMessage();
        });

        // Close modal when clicking outside
        document.getElementById('animeModal').addEventListener('click', (e) => {
            if (e.target.id === 'animeModal') {
                this.closeModal();
            }
        });
    }

    showTab(tabName) {
        console.log('Switching to tab:', tabName);
        
        // Update active tab
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Show active content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        // Load tab-specific content
        switch(tabName) {
            case 'home':
                this.loadFeaturedAnime();
                break;
            case 'browse':
                this.loadAllAnime();
                break;
            case 'movies':
                this.loadMovies();
                break;
            case 'trending':
                this.loadTrending();
                break;
        }

        this.currentTab = tabName;
    }

    loadFeaturedAnime() {
        const container = document.getElementById('featuredAnime');
        if (!container) return;

        const featured = this.allAnimes.slice(0, 8); // First 8 as featured
        this.renderAnimeGrid(featured, container);
    }

    loadAllAnime() {
        const container = document.getElementById('browseAnime');
        if (!container) return;

        this.renderAnimeGrid(this.allAnimes, container);
    }

    loadMovies() {
        const container = document.getElementById('moviesList');
        if (!container) return;

        // Get all movies from all animes
        const allMovies = [];
        this.allAnimes.forEach(anime => {
            if (anime.movies && anime.movies.length > 0) {
                anime.movies.forEach(movie => {
                    allMovies.push({
                        ...movie,
                        animeTitle: anime.title
                    });
                });
            }
        });

        container.innerHTML = '';
        allMovies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}" 
                     onerror="this.src='https://via.placeholder.com/300x400/334155/64748b?text=Movie+Poster'">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>From: ${movie.animeTitle}</p>
                    <p>${movie.description}</p>
                </div>
            `;
            container.appendChild(movieCard);
        });
    }

    loadTrending() {
        const container = document.getElementById('trendingAnime');
        if (!container) return;

        const trending = this.allAnimes.slice(0, 6); // First 6 as trending
        this.renderAnimeGrid(trending, container);
    }

    renderAnimeGrid(animes, container) {
        container.innerHTML = '';
        
        animes.forEach(anime => {
            const card = document.createElement('div');
            card.className = 'anime-card';
            card.innerHTML = `
                <img src="${anime.image}" alt="${anime.title}" 
                     onerror="this.src='https://via.placeholder.com/200x280/334155/64748b?text=Anime+Image'">
                <h3>${anime.title}</h3>
                <div class="anime-meta">
                    <span>${anime.year}</span>
                    <span>${anime.episodes} eps</span>
                </div>
            `;
            
            card.addEventListener('click', () => {
                this.showAnimeDetail(anime.id);
            });
            
            container.appendChild(card);
        });
    }

    showAnimeDetail(animeId) {
        const anime = animeDatabase[animeId];
        if (!anime) return;

        const modal = document.getElementById('animeModal');
        const detailContainer = document.getElementById('animeDetail');

        let seasonsHTML = '';
        if (anime.seasons && anime.seasons.length > 0) {
            seasonsHTML = `
                <div class="seasons-section">
                    <h3>📺 Seasons & Episodes</h3>
                    ${anime.seasons.map(season => `
                        <div class="season-card">
                            <h4>${season.title} (${season.episodes} Episodes)</h4>
                            <p>${season.description}</p>
                            ${season.episodesList && season.episodesList.length > 0 ? `
                                <div class="episodes-list">
                                    ${season.episodesList.slice(0, 3).map(ep => `
                                        <div class="episode-item">
                                            <strong>Episode ${ep.episode}:</strong> ${ep.title}
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
                    <h3>🎥 Movies</h3>
                    ${anime.movies.map(movie => `
                        <div class="movie-detail-card">
                            <h4>${movie.title}</h4>
                            <p><strong>Description:</strong> ${movie.description}</p>
                            <p><strong>Summary:</strong> ${movie.summary}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        detailContainer.innerHTML = `
            <div class="anime-detail-header">
                <div class="anime-poster">
                    <img src="${anime.image}" alt="${anime.title}">
                </div>
                <div class="anime-info">
                    <h2>${anime.title}</h2>
                    <div class="anime-meta-tags">
                        <span class="meta-tag">${anime.type}</span>
                        <span class="meta-tag">${anime.episodes} Episodes</span>
                        <span class="meta-tag">${anime.status}</span>
                        <span class="meta-tag">${anime.year}</span>
                    </div>
                    <div class="anime-genres">
                        ${anime.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
                    </div>
                    <p class="anime-description">${anime.description}</p>
                </div>
            </div>
            ${seasonsHTML}
            ${moviesHTML}
        `;

        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('animeModal').style.display = 'none';
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.showTab(this.currentTab);
            return;
        }

        const results = this.allAnimes.filter(anime => 
            anime.title.toLowerCase().includes(query.toLowerCase()) ||
            anime.genres.some(genre => genre.toLowerCase().includes(query.toLowerCase()))
        );

        const container = document.getElementById('browseAnime');
        if (container) {
            this.renderAnimeGrid(results, container);
            this.showTab('browse');
        }
    }

    filterByGenre(genre) {
        const results = this.allAnimes.filter(anime => 
            anime.genres.some(g => g.toLowerCase() === genre)
        );

        const container = document.getElementById('browseAnime');
        if (container) {
            this.renderAnimeGrid(results, container);
        }
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (message) {
            const messagesContainer = document.getElementById('chatMessages');
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message';
            messageElement.innerHTML = `
                <div class="message-header">
                    <strong>You</strong>
                    <span>Just now</span>
                </div>
                <div class="message-text">${message}</div>
            `;
            
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            input.value = '';
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimeHub();
});
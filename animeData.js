// animeData.js - WORKING ANIME DATABASE
const animeDatabase = {
    "demon-slayer": {
        id: "demon-slayer",
        title: "Demon Slayer: Kimetsu no Yaiba",
        image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        description: "After his family is brutally murdered and his sister Nezuko turned into a demon, Tanjiro Kamado becomes a demon slayer to avenge his family and find a cure for his sister.",
        type: "TV",
        episodes: 26,
        status: "Finished Airing",
        year: 2019,
        genres: ["Action", "Fantasy", "Supernatural"],
        seasons: [
            {
                seasonNumber: 1,
                title: "Demon Slayer: Kimetsu no Yaiba",
                episodes: 26,
                description: "Tanjiro Kamado's journey begins as he joins the Demon Slayer Corps.",
                episodesList: [
                    { episode: 1, title: "Cruelty", summary: "Tanjiro finds his family slaughtered and sister turned into a demon." },
                    { episode: 2, title: "Trainer Sakonji Urokodaki", summary: "Tanjiro begins training to become a demon slayer." }
                ]
            }
        ],
        movies: [
            {
                title: "Demon Slayer: Mugen Train",
                image: "https://cdn.myanimelist.net/images/anime/1704/106947.jpg",
                description: "Tanjiro and his comrades investigate mysterious disappearances aboard the Mugen Train.",
                summary: "The Flame Hashira Kyojuro Rengoku takes on a mission aboard the Mugen Train."
            }
        ]
    },

    "attack-on-titan": {
        id: "attack-on-titan",
        title: "Attack on Titan",
        image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
        description: "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans.",
        type: "TV",
        episodes: 75,
        status: "Finished Airing",
        year: 2013,
        genres: ["Action", "Drama", "Fantasy"],
        seasons: [
            {
                seasonNumber: 1,
                title: "Attack on Titan",
                episodes: 25,
                description: "Eren Yeager vows to exterminate the Titans after they destroy his hometown.",
                episodesList: [
                    { episode: 1, title: "To You, 2,000 Years From Now", summary: "The Colossal Titan breaches the outer wall." },
                    { episode: 2, title: "That Day", summary: "Eren witnesses his mother being eaten by a Titan." }
                ]
            }
        ]
    },

    "jujutsu-kaisen": {
        id: "jujutsu-kaisen",
        title: "Jujutsu Kaisen",
        image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
        description: "A student becomes a Jujutsu sorcerer to fight Curses after eating a powerful cursed object.",
        type: "TV",
        episodes: 24,
        status: "Finished Airing",
        year: 2020,
        genres: ["Action", "Fantasy", "Supernatural"]
    },

    "chainsaw-man": {
        id: "chainsaw-man",
        title: "Chainsaw Man",
        image: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
        description: "A young man gains the ability to transform parts of his body into chainsaws.",
        type: "TV",
        episodes: 12,
        status: "Finished Airing",
        year: 2022,
        genres: ["Action", "Fantasy", "Horror"]
    },

    "spy-x-family": {
        id: "spy-x-family",
        title: "Spy x Family",
        image: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
        description: "A spy builds a fake family for a mission, not knowing his daughter is a telepath and wife an assassin.",
        type: "TV",
        episodes: 25,
        status: "Currently Airing",
        year: 2022,
        genres: ["Action", "Comedy", "Slice of Life"]
    },

    "one-piece": {
        id: "one-piece",
        title: "One Piece",
        image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
        description: "Monkey D. Luffy searches for the One Piece to become the next Pirate King.",
        type: "TV",
        episodes: 1100,
        status: "Currently Airing",
        year: 1999,
        genres: ["Action", "Adventure", "Comedy"]
    },

    "my-hero-academia": {
        id: "my-hero-academia",
        title: "My Hero Academia",
        image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
        description: "Izuku Midoriya dreams of becoming a hero despite being born without a Quirk.",
        type: "TV",
        episodes: 113,
        status: "Currently Airing",
        year: 2016,
        genres: ["Action", "Comedy", "Superhero"]
    },

    "naruto": {
        id: "naruto",
        title: "Naruto",
        image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
        description: "Naruto Uzumaki dreams of becoming the Hokage, the village's leader and strongest ninja.",
        type: "TV",
        episodes: 220,
        status: "Finished Airing",
        year: 2002,
        genres: ["Action", "Adventure", "Comedy"]
    }
};

// Add more CSS for modal content
const additionalCSS = `
.anime-detail-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
}

.anime-poster {
    flex: 0 0 300px;
}

.anime-poster img {
    width: 100%;
    border-radius: 12px;
}

.anime-meta-tags {
    display: flex;
    gap: 0.5rem;
    margin: 1rem 0;
    flex-wrap: wrap;
}

.meta-tag {
    background: var(--primary);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
}

.genre-tag {
    background: var(--secondary);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    margin: 0.25rem;
}

.season-card, .movie-detail-card {
    background: rgba(255, 255, 255, 0.05);
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1rem 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.episode-item {
    background: rgba(255, 255, 255, 0.03);
    padding: 1rem;
    border-radius: 8px;
    margin: 0.5rem 0;
}

.chat-message {
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 12px;
    margin: 0.5rem 0;
    border-left: 4px solid var(--primary);
}

.message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { animeDatabase };
}
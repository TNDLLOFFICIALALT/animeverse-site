// animeDatabase.js - WORKING VERSION (First 20 animes)
export const animeDatabase = {
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
    trailer: "https://www.youtube.com/embed/VQGCKyvzIM4",
    seasons: [
      {
        seasonNumber: 1,
        title: "Demon Slayer: Kimetsu no Yaiba",
        episodes: 26,
        description: "Tanjiro Kamado's journey begins as he joins the Demon Slayer Corps to find a cure for his sister Nezuko while battling demons.",
        episodesList: [
          { episode: 1, title: "Cruelty", summary: "Tanjiro returns home to find his family slaughtered and his sister turned into a demon." },
          { episode: 2, title: "Trainer Sakonji Urokodaki", summary: "Tanjiro meets Giyu Tomioka and begins training under Sakonji Urokodaki." }
        ]
      }
    ],
    movies: [
      {
        title: "Demon Slayer: Mugen Train",
        image: "https://cdn.myanimelist.net/images/anime/1704/106947.jpg",
        description: "Tanjiro and his comrades investigate mysterious disappearances aboard the Mugen Train.",
        summary: "The Flame Hashira Kyojuro Rengoku takes on a mission aboard the Mugen Train where many people have disappeared.",
        trailer: "https://www.youtube.com/embed/ATJYac_dORw"
      }
    ]
  },

  "attack-on-titan": {
    id: "attack-on-titan",
    title: "Attack on Titan",
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    description: "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, the story follows Eren Yeager and his friends.",
    type: "TV",
    episodes: 75,
    status: "Finished Airing",
    year: 2013,
    genres: ["Action", "Drama", "Fantasy"],
    trailer: "https://www.youtube.com/embed/LV-nazLVjO0",
    seasons: [
      {
        seasonNumber: 1,
        title: "Attack on Titan",
        episodes: 25,
        description: "Eren Yeager vows to exterminate the Titans after they destroy his hometown.",
        episodesList: [
          { episode: 1, title: "To You, 2,000 Years From Now", summary: "The Colossal Titan appears and breaches the outer wall." },
          { episode: 2, title: "That Day", summary: "Eren witnesses his mother being eaten by a Titan." }
        ]
      }
    ]
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
    genres: ["Action", "Adventure", "Comedy"],
    trailer: "https://www.youtube.com/embed/-G9BqkgZXRA",
    seasons: [
      {
        seasonNumber: 1,
        title: "Naruto",
        episodes: 57,
        description: "Naruto graduates from the Ninja Academy and forms Team 7.",
        episodesList: [
          { episode: 1, title: "Enter: Naruto Uzumaki!", summary: "Naruto graduates and meets his teacher Kakashi." }
        ]
      }
    ]
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

  "death-note": {
    id: "death-note",
    title: "Death Note",
    image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    description: "Light Yagami finds a notebook that allows him to kill anyone whose name he writes in it.",
    type: "TV",
    episodes: 37,
    status: "Finished Airing",
    year: 2006,
    genres: ["Mystery", "Psychological", "Thriller"]
  },

  "dragon-ball-z": {
    id: "dragon-ball-z",
    title: "Dragon Ball Z",
    image: "https://cdn.myanimelist.net/images/anime/1607/117271.jpg",
    description: "Goku defends Earth from extraterrestrial enemies.",
    type: "TV",
    episodes: 291,
    status: "Finished Airing",
    year: 1989,
    genres: ["Action", "Adventure", "Fantasy"]
  },

  "fullmetal-alchemist": {
    id: "fullmetal-alchemist",
    title: "Fullmetal Alchemist: Brotherhood",
    image: "https://cdn.myanimelist.net/images/anime/1208/94745.jpg",
    description: "Two brothers search for a Philosopher's Stone after a failed revival attempt.",
    type: "TV",
    episodes: 64,
    status: "Finished Airing",
    year: 2009,
    genres: ["Action", "Adventure", "Drama"]
  },

  "tokyo-ghoul": {
    id: "tokyo-ghoul",
    title: "Tokyo Ghoul",
    image: "https://cdn.myanimelist.net/images/anime/5/64449.jpg",
    description: "A college student becomes a half-ghoul after an attack.",
    type: "TV",
    episodes: 12,
    status: "Finished Airing",
    year: 2014,
    genres: ["Action", "Horror", "Psychological"]
  },

  "jujutsu-kaisen": {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    description: "A student becomes a Jujutsu sorcerer to fight Curses.",
    type: "TV",
    episodes: 24,
    status: "Finished Airing",
    year: 2020,
    genres: ["Action", "Fantasy", "Supernatural"]
  },

  "bleach": {
    id: "bleach",
    title: "Bleach",
    image: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
    description: "Ichigo Kurosaki becomes a Soul Reaper and defends humans from evil spirits.",
    type: "TV",
    episodes: 366,
    status: "Finished Airing",
    year: 2004,
    genres: ["Action", "Adventure", "Supernatural"]
  },

  "fairy-tail": {
    id: "fairy-tail",
    title: "Fairy Tail",
    image: "https://cdn.myanimelist.net/images/anime/5/18179.jpg",
    description: "Lucy Heartfilia joins the Fairy Tail wizard guild and goes on adventures.",
    type: "TV",
    episodes: 328,
    status: "Finished Airing",
    year: 2009,
    genres: ["Action", "Adventure", "Fantasy"]
  },

  "sword-art-online": {
    id: "sword-art-online",
    title: "Sword Art Online",
    image: "https://cdn.myanimelist.net/images/anime/11/39717.jpg",
    description: "Players get trapped in a virtual reality MMORPG and must clear the game to escape.",
    type: "TV",
    episodes: 25,
    status: "Finished Airing",
    year: 2012,
    genres: ["Action", "Adventure", "Fantasy"]
  },

  "hunter-x-hunter": {
    id: "hunter-x-hunter",
    title: "Hunter x Hunter",
    image: "https://cdn.myanimelist.net/images/anime/11/33657.jpg",
    description: "Gon Freecss aspires to become a Hunter to find his missing father.",
    type: "TV",
    episodes: 148,
    status: "Finished Airing",
    year: 2011,
    genres: ["Action", "Adventure", "Fantasy"]
  },

  "one-punch-man": {
    id: "one-punch-man",
    title: "One-Punch Man",
    image: "https://cdn.myanimelist.net/images/anime/12/76049.jpg",
    description: "Saitama can defeat any opponent with a single punch but seeks a worthy challenge.",
    type: "TV",
    episodes: 12,
    status: "Finished Airing",
    year: 2015,
    genres: ["Action", "Comedy", "Superhero"]
  },

  "your-lie-in-april": {
    id: "your-lie-in-april",
    title: "Your Lie in April",
    image: "https://cdn.myanimelist.net/images/anime/3/67077.jpg",
    description: "A piano prodigy rediscovers his passion for music through a violinist.",
    type: "TV",
    episodes: 22,
    status: "Finished Airing",
    year: 2014,
    genres: ["Drama", "Music", "Romance"]
  },

  "attack-on-titan-final": {
    id: "attack-on-titan-final",
    title: "Attack on Titan: The Final Season",
    image: "https://cdn.myanimelist.net/images/anime/1000/110531.jpg",
    description: "The epic conclusion to the Attack on Titan saga.",
    type: "TV",
    episodes: 28,
    status: "Finished Airing",
    year: 2020,
    genres: ["Action", "Drama", "Fantasy"]
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

  "vinland-saga": {
    id: "vinland-saga",
    title: "Vinland Saga",
    image: "https://cdn.myanimelist.net/images/anime/1500/103005.jpg",
    description: "A young Viking boy seeks revenge for his father's death.",
    type: "TV",
    episodes: 24,
    status: "Finished Airing",
    year: 2019,
    genres: ["Action", "Adventure", "Drama"]
  }
};

// Helper functions
export function getAllAnimes() {
  return Object.values(animeDatabase);
}

export function getAnimeById(id) {
  return animeDatabase[id];
}

export function searchAnimes(query) {
  const lowerQuery = query.toLowerCase();
  return Object.values(animeDatabase).filter(anime => 
    anime.title.toLowerCase().includes(lowerQuery) ||
    (anime.genres && anime.genres.some(genre => genre.toLowerCase().includes(lowerQuery))) ||
    (anime.description && anime.description.toLowerCase().includes(lowerQuery))
  );
}
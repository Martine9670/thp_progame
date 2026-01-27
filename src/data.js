// ========================
// Sample games data
// ========================

// This is just example data to test the app without calling the API.
// Each object represents one game.
export const games = [
  {
    id: 1, // unique identifier for the game
    slug: "the-witcher-3", // used in URLs for routing
    name: "The Witcher 3", // game title
    released: "2015-05-19", // release date
    description: "An open-world RPG with Geralt of Rivia.", // short description
    rating: 4.8, // game rating (out of 5)
  },
  {
    id: 2,
    slug: "cyberpunk-2077",
    name: "Cyberpunk 2077",
    released: "2020-12-10",
    description: "A futuristic RPG in Night City.",
    rating: 3.9,
  },
  {
    id: 3,
    slug: "elden-ring",
    name: "Elden Ring",
    released: "2022-02-25",
    description: "A challenging action-RPG in a dark world.",
    rating: 4.9,
  },
];

// ========================
// API Configuration
// ========================
const API_KEY = process.env.RAWG_API_KEY; // Get your RAWG API key from .env file
const BASE_URL = "https://api.rawg.io/api"; // Base URL for RAWG API

// Check if API key exists
if (!API_KEY) {
  console.warn("⚠️ The RAWG_API_KEY is not defined in your .env file");
}

// ========================
// Fetch a list of games
// ========================
/**
 * Get games from RAWG API
 * @param {string} search - optional search term
 * @param {number} pageSize - number of games to fetch
 * @returns {Array} - list of games
 */
export async function fetchGames(search = "", pageSize = 9) {
  try {
    // Build query string if search term exists
    const query = search ? `&search=${encodeURIComponent(search)}` : "";

    // Fetch data from API
    const res = await fetch(`${BASE_URL}/games?key=${API_KEY}&page_size=${pageSize}${query}`);
    const data = await res.json(); // convert response to JSON

    // Return the games array, or empty array if none
    return data.results || [];
  } catch (error) {
    console.error("Error fetching games:", error);
    return []; // return empty array on error
  }
}

// ========================
// Fetch details of a single game
// ========================
/**
 * Get one game by slug or ID
 * @param {string|number} slug - game identifier
 * @returns {Object|null} - game details or null if not found
 */
export async function fetchGame(slug) {
  if (!slug) return null; // no slug provided

  try {
    const res = await fetch(`${BASE_URL}/games/${slug}?key=${API_KEY}`);
    const data = await res.json();
    return data || null; // return game object or null
  } catch (error) {
    console.error("Error fetching game:", error);
    return null; // return null on error
  }
}

// ========================
// Fetch screenshots of a single game
// ========================
/**
 * Get screenshots for a game by slug
 * @param {string} slug - game identifier
 * @returns {Array} - list of screenshots or empty array
 */
export async function fetchScreenshots(slug) {
  if (!slug) return []; // no slug provided

  try {
    const res = await fetch(`${BASE_URL}/games/${slug}/screenshots?key=${API_KEY}`);
    const data = await res.json();
    return data.results || []; // return array of screenshots
  } catch (error) {
    console.error("Error fetching screenshots:", error);
    return []; // return empty array on error
  }
}

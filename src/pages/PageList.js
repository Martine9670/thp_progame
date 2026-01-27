// Import the function to fetch a list of games from the API
import { fetchGames } from "../api";

// PageList is an async function that shows a list of games
// searchTerm = the keyword used to filter games
const PageList = async (searchTerm = '', sortBy = "name") => {
  // Get the main container where content will be displayed
  const app = document.getElementById("app");

  // ========================
  // Debounce function
  // ========================
  // Prevents sending too many API requests while typing
  const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

// ========================
// Function to create HTML for a game card
// ========================
const createCard = (game) => {
  const videoUrl = game.clip?.clip; // RAWG API may return a video clip

  // Return a string of HTML for the card
  return `
    <div class="cardGame">
      <img src="${game.background_image || ''}" alt="${game.name}" />
      <h2>${game.name}</h2>
      <p>Released: ${game.released || game.released_at || "N/A"}</p>
      <p>Genre: ${game.genres?.map(g => g.name).join(", ") || "N/A"}</p>
      <p>Rating: ${game.rating || "N/A"}</p>

      <!-- Buttons directly on the card -->
      <div class="card-buttons">
        <a href="#screenshots/${game.slug}" class="btn-screenshots">View Screenshots</a>
        <a href="#pagedetail/${game.id}" class="btn-details">Read More</a>
      </div>

      ${videoUrl ? `<video class="game-video" src="${videoUrl}" muted loop></video>` : ''}
    </div>
  `;
};

  // ========================
  // Function to sort games
  // ========================
  const sortGames = (games, criteria) => {
    return [...games].sort((a, b) => {
      switch(criteria) {
        case "name": return a.name.localeCompare(b.name);
        case "released": return new Date(b.released) - new Date(a.released);
        case "rating": return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });
  };

  // ========================
  // Function to fetch games and update the UI
  // ========================
  const updateGames = async (term, criteria = "name") => {
    const articles = document.querySelector(".articles");
    articles.innerHTML = "<p>Loading...</p>"; // show a loading message

    let games = [];
    try {
      // Fetch games from the API using the search term
      games = await fetchGames(term, 30);
      games = sortGames(games, criteria);
    } catch (error) {
      console.error("Error fetching games:", error);
      articles.innerHTML = "<p>Unable to load games.</p>";
      return;
    }

    // Display cards or message
    articles.innerHTML = games.length
      ? games.map(game => createCard(game)).join('')
      : "<p>No games found.</p>";

    // ========================
    // Replace Masonry manual with CSS grid
    // ========================
    articles.style.position = "static"; // reset any previous absolute positions
  };

  // ========================
  // Initialize the container, search input, and sort select
  // ========================
  if (!app.innerHTML.includes('class="articles"')) {
    app.innerHTML = `
      <section class="page-list">
        <input id="searchInput" type="text" placeholder="Search for a game..." value="${searchTerm}" />
        <select id="sortSelect">
          <option value="name">Name</option>
          <option value="released">Release Date</option>
          <option value="rating">Rating</option>
        </select>
        <div class="articles">Loading...</div>
      </section>
    `;

    const input = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");

    const debouncedUpdate = debounce((value) => updateGames(value, sortSelect.value), 300);
    input.addEventListener("input", (e) => debouncedUpdate(e.target.value));

    sortSelect.addEventListener("change", () => updateGames(input.value, sortSelect.value));
  }

  // Initial fetch and display of games
  updateGames(searchTerm, sortBy);
};

// Export the PageList function to be used by the router
export default PageList;

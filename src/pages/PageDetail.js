// Import the function to fetch a single game from the API
import { fetchGame } from "../api";

// PageDetail is an async function that shows the details of one game
// slug = the unique identifier of the game we want to fetch
const PageDetail = async (slug) => {
  // Get the main container where content is injected
  const app = document.getElementById("app");

  // Show a loading message while waiting for the API response
  app.innerHTML = `
    <section class="page-detail">
      <div class="cardGame">
        <p>Loading game details...</p>
      </div>
    </section>
  `;

  try {
    // Call the API to fetch the game details
    const game = await fetchGame(slug);

    // If no game is found, show a message
    if (!game) {
      app.innerHTML = `<p>Game not found</p>`;
      return;
    }

    // Display the game details inside the app container
    // We show name, release date, platforms, genres, description, and navigation links
    app.innerHTML = `
      <section class="page-detail">
        <div class="cardGame">
          <h1>${game.name}</h1>
          <p><strong>Released:</strong> ${game.released}</p>
          <p><strong>Platform:</strong> ${game.platforms.map(p => p.platform.name).join(", ")}</p>
          <p><strong>Genre:</strong> ${game.genres.map(g => g.name).join(", ")}</p>
          <p>${game.description_raw || "No description available"}</p>
          
          <!-- Buttons on the card itself -->
          <div class="card-buttons">
            <a href="#screenshots/${game.slug}" class="btn-screenshots">View Screenshots</a>
            <a href="#pagelist" class="btn-back">Back to list</a>
          </div>
        </div>
      </section>
    `;
  } catch (error) {
    // If there is an error fetching the game, show a message in the UI
    app.innerHTML = `<p>Error loading game details</p>`;
    console.error(error); // Also log the error in the console
  }
};

// Export the PageDetail function so it can be used in the router
export default PageDetail;

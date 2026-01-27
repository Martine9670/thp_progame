// src/pages/PageScreenshots.js
import { fetchGame, fetchScreenshots } from "../api";

// PageScreenshots displays all screenshots of a game
// slug = unique identifier (slug) of the game
const PageScreenshots = async (slug) => {
  const app = document.getElementById("app");

  // ========================
  // Show a loader while fetching data and always show Back button
  // ========================
  app.innerHTML = `
    <section class="page-screenshots">
      <!-- Back button at the top -->
      <div class="back-container">
        <button id="backButton" class="btn-back">← Back</button>
      </div>
      <div class="screenshots-content">
        <p>Loading screenshots...</p>
      </div>
    </section>
  `;

  // ========================
  // Back button functionality
  // ========================
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", () => {
    window.history.back(); // go back to the previous page
  });

  try {
    // ========================
    // Fetch game data from API
    // ========================
    const game = await fetchGame(slug);

    // ========================
    // Fetch screenshots separately from RAWG API
    // ========================
    const screenshots = await fetchScreenshots(slug);

    if (!game || !screenshots.length) {
      document.querySelector(".screenshots-content").innerHTML = `<p>No screenshots available.</p>`;
      return;
    }

    // ========================
    // Build HTML for all screenshots
    // ========================
    const screenshotsHTML = screenshots.map((shot, index) => `
      <img src="${shot.image}" alt="Screenshot ${index + 1}" class="screenshot" data-index="${index}" />
    `).join("");

    // ========================
    // Render screenshots into content div
    // ========================
    document.querySelector(".screenshots-content").innerHTML = `
      <h1>${game.name} - Screenshots</h1>
      <div class="screenshots-grid">
        ${screenshotsHTML}
      </div>

      <!-- Lightbox / slider -->
      <div id="lightbox" class="lightbox hidden">
        <span id="closeLightbox">&times;</span>
        <img id="lightboxImg" src="" alt="Screenshot" />
      </div>
    `;

    // ========================
    // Lightbox functionality
    // ========================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeLightbox");

    document.querySelectorAll(".screenshot").forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove("hidden");
      });
    });

    closeBtn.addEventListener("click", () => {
      lightbox.classList.add("hidden");
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.classList.add("hidden");
    });

  } catch (error) {
    // ========================
    // Handle errors fetching data
    // ========================
    console.error("Error fetching screenshots:", error);
    document.querySelector(".screenshots-content").innerHTML = `<p>Unable to load screenshots.</p>`;
  }
};

// Export the PageScreenshots function so it can be used by the router
export default PageScreenshots;

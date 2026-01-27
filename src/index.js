// ========================
// IMPORTS
// ========================
import "./styles/main.scss"; // Import the main SCSS file (styles)
import router from "./router"; // Import the router to manage page navigation

// ========================
// INITIAL ROUTE ON PAGE LOAD
// ========================
// When the HTML content is loaded, call the router to show the right page
window.addEventListener("DOMContentLoaded", () => {
  router();
});

// ========================
// ROUTE ON HASH CHANGE
// ========================
// Whenever the URL hash changes (#/pagelist, #/pagedetail/1, etc.),
// the router will show the corresponding page
window.addEventListener("hashchange", () => {
  router();
});

// ========================
// SEARCH INPUT HANDLING
// ========================
// Get the search input field
const searchInput = document.getElementById("searchInput");

// Listen for user typing in the search field
searchInput.addEventListener("input", (e) => {
  const value = e.target.value; // get the current input value

  // Change the URL hash to trigger the router with the search term
  if (window.location.hash.startsWith("#/")) {
    window.location.hash = `#/search/${value}`;
  } else {
    window.location.hash = `#/search/${value}`;
  }
});

// ========================
// ENSURE ROUTER ALWAYS WORKS
// ========================
// These events make sure the router runs whenever the page is loaded or the hash changes
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

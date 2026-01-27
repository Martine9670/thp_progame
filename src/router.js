// ========================
// IMPORT PAGE FUNCTIONS
// ========================
import PageList from "./pages/PageList";            // Page showing list of games
import PageDetail from "./pages/PageDetail";        // Page showing details of one game
import PageScreenshots from "./pages/PageScreenshots"; // Page showing screenshots

// ========================
// ROUTES DEFINITION
// ========================
// Map each hash to a function that renders the page
const routes = {
  pagelist: PageList,        // #/pagelist → show the list of games
  pagedetail: PageDetail,    // #/pagedetail/:id → show details of a game
  screenshots: PageScreenshots, // #/screenshots/:slug → show screenshots of a game
  "": PageList,              // Default page (home) if no hash
};

// ========================
// ROUTER FUNCTION
// ========================
// This function decides which page to show based on URL hash
const router = () => {
  const hash = window.location.hash.slice(1);    // remove '#' from URL
  const [pageName, pageArg] = hash.split("/");   // split hash into page and argument
                                                 // e.g. "#/pagedetail/2" → ["pagedetail", "2"]

  const pageFunction = routes[pageName] || routes[""]; // use default if page unknown

  pageFunction(pageArg); // call the page function and pass the argument (like game ID or slug)
};

// ========================
// ROUTER EVENTS
// ========================
// When hash changes or page loads, call the router to update the page
window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);

// ========================
// EXPORT
// ========================
export default router;

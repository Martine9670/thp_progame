This is an exercise for **The Hacking Project**

# Très Hypée Progame - RAWG SPA

A single-page application (SPA) that displays video games using the [RAWG API](https://rawg.io/apidocs).  
Built with **JavaScript**, **SCSS**, and **Webpack**.

---

## 🎯 Features

- Browse a list of video games in a responsive grid.
- Search games by name in real-time.
- View detailed information for each game:
  - Name, release date, platforms, genres, description.
- Fully responsive design for desktop, tablet, and mobile.
- Smooth hover effects on cards.
- SPA routing with URL hash-based navigation.

---

## 🛠️ Tech Stack

- **JavaScript (ES6 modules)**
- **SCSS** for styling
- **Webpack** for bundling
- **RAWG API** for game data
- Optional local data fallback (`src/data.js`)

---

## ⚡ Project Structure

rawg-spa/
├── package.json
├── webpack.config.js
├── src/
│ ├── index.html
│ ├── index.js # Entry point
│ ├── router.js # SPA router
│ ├── api.js # Fetches data from RAWG
│ ├── pages/
│ │ ├── PageList.js
│ │ └── PageDetail.js
│ ├── styles/
│ │ ├── main.scss
│ │ ├── _variables.scss
│ │ └── _mixins.scss
│ └── components/
│ └── GameCard.js
└── dist/ # Bundled output


---

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd rawg-spa

    Install dependencies:

    npm install

    Add your RAWG API key:

        Create a .env file in the root:

        RAWG_API_KEY=your_api_key_here

    Start the development server:

    npm run start

    Open the browser:

        The app should open automatically at http://localhost:8080

    Build for production:

    npm run build

---

** Author : ** Martine PINNA
** Github : ** Martine9670
** Discord : ** Martine PINNA
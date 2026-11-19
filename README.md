# Chalkboard Games

![React](https://img.shields.io/badge/React-19-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![daisyUI](https://img.shields.io/badge/daisyUI-5-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-121013?style=for-the-badge&logo=github&logoColor=white)

Classic games on a digital chalkboard, built by David Aydin.

Live site: https://daydin14.github.io/chalkboard-games/

## Games

- Rock Paper Scissors
- Tic Tac Toe, with move rewind
- Hangman
- Connect 4
- Memory
- Minesweeper
- Snake
- Simon Says
- Dots & Boxes
- Battleship

## Screenshots

### Desktop

<img src="./Assets/screenshots/Web/home-web.png" alt="Home page on a desktop browser" width="720"/>

<img src="./Assets/screenshots/Web/connect4-web.png" alt="Connect 4 on a desktop browser" width="720"/>

### Mobile

<img src="./Assets/screenshots/Mobile/home-mobile.png" alt="Home page on a phone" width="280"/>
<img src="./Assets/screenshots/Mobile/home-nav-mobile.png" alt="Game menu on a phone" width="280"/>
<img src="./Assets/screenshots/Mobile/hangman-mobile.png" alt="Hangman on a phone" width="280"/>
<img src="./Assets/screenshots/Mobile/snake-mobile.png" alt="Snake on a phone" width="280"/>

## Getting started

The app lives in `app`. Node 20 or newer is required.

```bash
cd app
npm install
npm run dev
```

Vite serves the app at `http://localhost:5173/chalkboard-games/`. The `/chalkboard-games/` base path matches the GitHub Pages project site.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run lint` | ESLint |
| `npm test` | Game-rule tests |
| `npm run build` | Production build in `dist/` |
| `npm run preview` | Serve the production build |

## Stack

- React 19 and React Router
- Vite 7
- Tailwind CSS 4 and daisyUI 5, with a custom chalkboard theme
- Vitest for the game rules

## Deployment

Pushes to `master` run `.github/workflows/ci.yml`. The workflow lints, tests, and builds `app`, copies `index.html` to `404.html` so client-side routes survive a refresh, and deploys the `dist` folder to GitHub Pages.

The production base path is `/chalkboard-games/`.

**Pages source:** this repository currently publishes from the legacy `gh-pages` branch. The new workflow deploys only after the source is switched:

1. Open **Settings → Pages → Build and deployment**.
2. Set **Source** to **GitHub Actions**.

Until that setting changes, the Actions deploy job cannot update https://daydin14.github.io/chalkboard-games/. The old `gh-pages` branch is no longer the build output.

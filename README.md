# Pokédex

A full-featured Pokédex web app styled as a retro handheld device, built with React and live data from [PokéAPI](https://pokeapi.co). No backend, no API key, no database — just a static frontend that fetches everything it needs at runtime.

![Tech](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Tech](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Data](https://img.shields.io/badge/Data-Pok%C3%A9API-red)

---

## Features

- **Full National Pokédex** — all 1,025 Pokémon across Generations I–IX
- **Search** by name, live as you type
- **Type filtering** — tap any of the 18 type chips to narrow the grid
- **Favorites** — star any Pokémon; toggle a Favorites-only view
- **Detail screen** for each Pokémon, including:
  - Official artwork, height, weight, base experience
  - Base stats as segmented LCD-style bars
  - **Type matchups** — weaknesses, resistances, and immunities, computed from combined type damage relations
  - **Evolution chain** — clickable stages (including branching evolutions like Eevee), each showing what triggers the evolution (level, item, trade, etc.)
  - **Level-up moves list**, sorted by the level learned
  - **Shiny sprite toggle** and a **cry sound** button
- Retro device UI: red handheld shell, LCD screen with scanline texture, pixel + monospace typography, segmented stat meters

---

## Tech stack

| Piece | What it's for |
|---|---|
| [React 18](https://react.dev) | UI, via function components + hooks |
| [Vite](https://vitejs.dev) | Dev server + production bundler |
| [lucide-react](https://lucide.dev) | Icons (search, star, arrows, volume, etc.) |
| [PokéAPI](https://pokeapi.co) | All Pokémon data — species, types, stats, evolution chains, moves, cries |
| Plain CSS | One stylesheet (`pokedex.css`), no CSS framework |

No state management library, no router, no backend — everything lives in React state and is fetched directly from PokéAPI's public REST endpoints.

---

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org) 18 or later (includes npm)

### Install & run

```bash
npm install
npm run dev
```

Vite will print a local URL — usually **http://localhost:5173**. Open it in your browser.

### Build for production

```bash
npm run build
```

Outputs a static `dist/` folder you can host anywhere (Netlify, Vercel, GitHub Pages, etc.), since the whole app is client-side.

```bash
npm run preview
```

Serves the built `dist/` folder locally, to sanity-check the production build before deploying.

---

## Project structure

```
pokedex-project/
├── index.html                    Vite entry HTML, mounts #root
├── package.json                  Dependencies + npm scripts
├── vite.config.js                Vite + React plugin config
└── src/
    ├── main.jsx                   Bootstraps React into the DOM
    ├── App.jsx                    Page wrapper that centers the Pokédex
    ├── App.css                    Page background styling
    ├── Pokedex.jsx                Top-level component: wires hooks into UI
    ├── constants.js                Type colors, stat labels, sprite URLs, dex limit
    ├── utils.js                    Small helpers (id parsing, dex-number formatting)
    ├── pokedex.css                 All device/screen styling
    │
    ├── hooks/                      One hook per data concern
    │   ├── usePokemonList.js        Fetches the base Pokémon list
    │   ├── useTypeFilter.js          Manages + fetches the active type filter
    │   ├── useFavorites.js           Favorites Set + toggle
    │   ├── usePokemonDetail.js       Fetches one Pokémon's full detail
    │   ├── useFilteredPokemon.js     Derives the visible grid (search + type + favorites)
    │   ├── useTypeEffectiveness.js   Computes weaknesses/resistances/immunities
    │   ├── useEvolutionChain.js      Fetches + flattens a species' evolution chain
    │   └── useBoot.js                Small screen fade-in timing
    │
    └── components/                 One component per UI piece
        ├── DeviceShell.jsx           Outer red casing, lights, D-pad
        ├── SearchBar.jsx
        ├── TypeFilterRow.jsx
        ├── TypeChip.jsx
        ├── ViewToggle.jsx             All / Favorites switch
        ├── PokemonGrid.jsx            Loading / error / empty states + card grid
        ├── PokemonCard.jsx
        ├── StatBar.jsx
        ├── DetailScreen.jsx           Composes all detail sub-sections
        ├── DetailHero.jsx             Artwork, name, types, shiny toggle, cry button
        ├── DetailMeta.jsx             Height / weight / base XP
        ├── DetailStats.jsx            Base stats section
        ├── TypeEffectiveness.jsx      Type matchup chips
        ├── EvolutionChain.jsx         Evolution stages, clickable
        └── MovesList.jsx              Level-up moves list
```

---

## Data source

Everything comes from [PokéAPI](https://pokeapi.co/docs/v2), a free, no-auth-required REST API:

| Endpoint | Used for |
|---|---|
| `GET /pokemon?limit=1025` | Base list (id + name) for the grid |
| `GET /pokemon/{id}` | Full detail: stats, types, abilities, moves, sprites, cries |
| `GET /type/{type}` | Type filtering + damage relations for weaknesses/resistances |
| `GET /pokemon-species/{id}` → `evolution_chain.url` | Evolution chain data |

Sprites are served from PokéAPI's [sprites CDN](https://github.com/PokeAPI/sprites) on raw.githubusercontent.com.

---

## Notes & limitations

- **Favorites, search, and filters are session-only** — nothing is saved to disk or browser storage, so they reset on refresh. Add `localStorage` persistence yourself if you want it to stick around (see `useFavorites.js`).
- **Type filtering is single-select** — selecting a second type replaces the first rather than combining them.
- **No flavor text or held items** — left out to keep the detail view focused on structured stat/battle data.
- Fetching detail for very high dex numbers works the same as low ones — there's no pagination on the grid itself, just client-side filtering over the full list.

---

## Customizing

- **Colors / theme** — all device colors are CSS custom properties at the top of `pokedex.css` (`--shell-red`, `--screen-bg`, `--screen-ink`, etc.). Change those and the whole UI re-themes.
- **Fewer/more Pokémon** — change `POKEMON_LIMIT` in `constants.js`.
- **Add a new detail section** — create a component in `components/`, then import and render it inside `DetailScreen.jsx`.

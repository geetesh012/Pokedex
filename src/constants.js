export const TYPE_COLORS = {
  normal: "#A8A878", fire: "#F08030", water: "#6890F0", electric: "#f2ff35",
  grass: "#78C850", ice: "#98D8D8", fighting: "#C03028", poison: "#A040A0",
  ground: "#d5a727", flying: "#A890F0", psychic: "#F85888", bug: "#A8B820",
  rock: "#B8A038", ghost: "#705898", dragon: "#7038F8", dark: "#705848",
  steel: "#B8B8D0", fairy: "#f57d97",
};

export const STAT_LABELS = {
  hp: "HP", attack: "ATK", defense: "DEF",
  "special-attack": "SP.A", "special-defense": "SP.D", speed: "SPD",
};

export const SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export const ALL_TYPES = Object.keys(TYPE_COLORS);

export const POKEMON_LIMIT = 1025;

export const TEAM_SLOTS = 6;
export const COMPARE_MAX = 3;

/** Extracts the numeric id from a PokeAPI resource URL, e.g. ".../pokemon/25/" -> 25 */
export function idFromUrl(url) {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

/** Formats an id as a 3-digit dex number, e.g. 25 -> "#025" */
export function pad(id) {
  return "#" + String(id).padStart(3, "0");
}

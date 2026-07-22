const cache = new Map();
const inflight = new Map();

/**
 * Fetches (and caches) the damage_relations for one type.
 * Shared across the whole app so type-effectiveness and team-coverage
 * features never fetch the same type twice in a session.
 */
export function getTypeDamageRelations(typeName) {
  if (cache.has(typeName)) return Promise.resolve(cache.get(typeName));
  if (inflight.has(typeName)) return inflight.get(typeName);

  const promise = fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
    .then((r) => r.json())
    .then((d) => {
      cache.set(typeName, d.damage_relations);
      inflight.delete(typeName);
      return d.damage_relations;
    });

  inflight.set(typeName, promise);
  return promise;
}

/** Computes a defending Pokémon's (or team member's) multiplier for every attacking type. */
export async function computeMultipliers(defendingTypeNames, allTypes) {
  const multiplier = {};
  allTypes.forEach((t) => { multiplier[t] = 1; });

  const relations = await Promise.all(defendingTypeNames.map(getTypeDamageRelations));
  relations.forEach((rel) => {
    rel.double_damage_from.forEach((t) => { multiplier[t.name] *= 2; });
    rel.half_damage_from.forEach((t) => { multiplier[t.name] *= 0.5; });
    rel.no_damage_from.forEach((t) => { multiplier[t.name] *= 0; });
  });

  return multiplier;
}

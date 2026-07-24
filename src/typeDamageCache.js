const EMPTY_RELATIONS = { double_damage_from: [], half_damage_from: [], no_damage_from: [] };

const cache = new Map();
const inflight = new Map();

/**
 * Fetches (and caches) the damage_relations for one type.
 * Shared across the whole app so type-effectiveness and team-coverage
 * features never fetch the same type twice in a session.
 * Falls back to neutral (empty) relations if the response is malformed,
 * rather than letting a bad/flaky API response crash the caller.
 */
export function getTypeDamageRelations(typeName) {
  if (cache.has(typeName)) return Promise.resolve(cache.get(typeName));
  if (inflight.has(typeName)) return inflight.get(typeName);

  const promise = fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
    .then((r) => r.json())
    .then((d) => {
      const relations = d?.damage_relations ?? EMPTY_RELATIONS;
      cache.set(typeName, relations);
      inflight.delete(typeName);
      return relations;
    })
    .catch(() => {
      inflight.delete(typeName);
      return EMPTY_RELATIONS;
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
    (rel?.double_damage_from ?? []).forEach((t) => { multiplier[t.name] *= 2; });
    (rel?.half_damage_from ?? []).forEach((t) => { multiplier[t.name] *= 0.5; });
    (rel?.no_damage_from ?? []).forEach((t) => { multiplier[t.name] *= 0; });
  });

  return multiplier;
}

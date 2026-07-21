import React from "react";

/** Reduces the raw `moves` array down to level-up moves, one entry per move at its earliest level. */
function extractLevelUpMoves(moves) {
  const levelByMove = {};

  moves.forEach((m) => {
    m.version_group_details.forEach((vgd) => {
      if (vgd.move_learn_method.name !== "level-up") return;
      const lvl = vgd.level_learned_at;
      const current = levelByMove[m.move.name];
      if (current === undefined || lvl < current) levelByMove[m.move.name] = lvl;
    });
  });

  return Object.entries(levelByMove)
    .map(([name, level]) => ({ name, level }))
    .sort((a, b) => a.level - b.level);
}

/** "MOVES (LEVEL-UP)" section: a scrollable list of level + move name. */
export function MovesList({ moves }) {
  const levelUpMoves = extractLevelUpMoves(moves);

  if (!levelUpMoves.length) return null;

  return (
    <div className="detail-section">
      <div className="detail-section-title">MOVES (LEVEL-UP)</div>
      <div className="moves-list">
        {levelUpMoves.map((m) => (
          <div key={m.name} className="moves-row">
            <span className="moves-level">{m.level === 0 ? "—" : `Lv.${m.level}`}</span>
            <span className="moves-name">{m.name.replace(/-/g, " ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

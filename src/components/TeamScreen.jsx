import React from "react";
import { X, Loader2 } from "lucide-react";
import { useBulkPokemonDetail } from "../hooks/useBulkPokemonDetail.js";
import { useTeamCoverage } from "../hooks/useTeamCoverage.js";
import { TypeChip } from "./TypeChip.jsx";
import { SPRITE_BASE, TEAM_SLOTS } from "../constants.js";
import { pad } from "../utils.js";

/** 6-slot team builder: filled slots, empty-slot hints, and a coverage-gap summary. */
export function TeamScreen({ team, onRemove, onOpen }) {
  const { detailsById, loading } = useBulkPokemonDetail(team);
  const memberTypeLists = team
    .map((id) => detailsById[id])
    .filter(Boolean)
    .map((m) => m.types.map((t) => t.type.name));
  const { coverage, loading: coverageLoading } = useTeamCoverage(memberTypeLists);

  const slots = Array.from({ length: TEAM_SLOTS }, (_, i) => team[i] ?? null);

  return (
    <div className="team-screen">
      <div className="team-grid">
        {slots.map((id, i) =>
          id ? (
            <div key={id} className="team-slot filled">
              <button className="icon-btn team-remove" onClick={() => onRemove(id)}>
                <X size={12} />
              </button>
              <button className="team-slot-btn" onClick={() => onOpen(id)}>
                <img src={`${SPRITE_BASE}/${id}.png`} alt={`team member ${id}`} className="team-slot-img" />
                <span className="team-slot-name">{detailsById[id]?.name ?? pad(id)}</span>
              </button>
            </div>
          ) : (
            <div key={`empty-${i}`} className="team-slot empty">
              <span>Empty</span>
            </div>
          )
        )}
      </div>

      {team.length === 0 && (
        <div className="empty-state">
          Open a Pokémon's detail screen and tap "Add to Team" to fill your 6 slots.
        </div>
      )}

      {team.length > 0 && (loading || coverageLoading) && (
        <div className="load-state">
          <Loader2 className="spin" size={20} style={{ margin: "0 auto 6px" }} />
          <div>ANALYZING TEAM...</div>
        </div>
      )}

      {team.length > 0 && coverage && !loading && !coverageLoading && (
        <div className="detail-section">
          <div className="detail-section-title">TEAM TYPE COVERAGE</div>
          <div className="effectiveness-chips" style={{ marginBottom: 10 }}>
            {coverage.allTypes.map((t) => (
              <TypeChip key={t} type={t} active onClick={() => {}} small />
            ))}
          </div>

          <div className="detail-section-title">COVERAGE GAPS</div>
          {coverage.gaps.length === 0 ? (
            <div className="evo-loading">No major gaps — your team resists or splits every type well.</div>
          ) : (
            <>
              <div className="evo-loading" style={{ marginBottom: 6 }}>
                Half or more of your team is weak to these, with no one to resist them:
              </div>
              <div className="effectiveness-chips">
                {coverage.gaps.map((t) => (
                  <TypeChip key={t} type={t} active onClick={() => {}} small />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

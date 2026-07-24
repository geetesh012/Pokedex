import React, { useEffect } from "react";
import { ArrowLeft, Star, Loader2, Users, BarChart2 } from "lucide-react";
import { usePokemonDetail } from "../hooks/usePokemonDetail.js";
import { DetailHero } from "./DetailHero.jsx";
import { DetailMeta } from "./DetailMeta.jsx";
import { DetailStats } from "./DetailStats.jsx";
import { DetailAbilities } from "./DetailAbilities.jsx";
import { TypeEffectiveness } from "./TypeEffectiveness.jsx";
import { EvolutionChain } from "./EvolutionChain.jsx";
import { MovesList } from "./MovesList.jsx";

/** Full detail screen for one Pokémon: fetches its own data via a hook. */
export function DetailScreen({
  id,
  onBack,
  isFav,
  onToggleFav,
  onSelectPokemon,
  isInTeam,
  onToggleTeam,
  isInCompare,
  onToggleCompare,
  onEscape,
}) {
  const { data, loading, error } = usePokemonDetail(id);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") (onEscape || onBack)?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onEscape, onBack]);

  return (
    <div className="detail-screen">
      <div className="detail-topbar">
        <button className="icon-btn" onClick={onBack} aria-label="Back to list">
          <ArrowLeft size={18} />
        </button>
        <span className="detail-topbar-title">DEX ENTRY</span>
        <div className="detail-topbar-actions">
          <button className="icon-btn" onClick={() => onToggleTeam(id)} title="Add to Team" aria-label={isInTeam ? "Remove from team" : "Add to team"}>
            <Users size={17} fill={isInTeam ? "#F5B942" : "none"} color={isInTeam ? "#F5B942" : "#24321F"} />
          </button>
          <button className="icon-btn" onClick={() => onToggleCompare(id)} title="Add to Compare" aria-label={isInCompare ? "Remove from compare" : "Add to compare"}>
            <BarChart2 size={17} color={isInCompare ? "#F5B942" : "#24321F"} strokeWidth={isInCompare ? 3 : 2} />
          </button>
          <button className="icon-btn" onClick={() => onToggleFav(id)} title="Favorite" aria-label={isFav ? "Remove favorite" : "Add favorite"}>
            <Star size={17} fill={isFav ? "#F5B942" : "none"} color={isFav ? "#F5B942" : "#24321F"} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="detail-loading">
          <Loader2 className="spin" size={28} />
          <span>LOADING DATA...</span>
        </div>
      )}

      {error && <div className="detail-loading">CONNECTION LOST. TRY AGAIN.</div>}

      {data && !loading && (
        <div className="detail-body">
          <DetailHero data={data} />
          <DetailMeta data={data} />
          <DetailStats stats={data.stats} />
          <TypeEffectiveness typeNames={data.types.map((t) => t.type.name)} />
          <EvolutionChain speciesId={data.id} currentId={id} onSelect={onSelectPokemon} />
          <DetailAbilities abilities={data.abilities} />
          <MovesList moves={data.moves} />
        </div>
      )}
    </div>
  );
}

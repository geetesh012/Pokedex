import React from "react";
import { ArrowLeft, Star, Loader2 } from "lucide-react";
import { usePokemonDetail } from "../hooks/usePokemonDetail.js";
import { DetailHero } from "./DetailHero.jsx";
import { DetailMeta } from "./DetailMeta.jsx";
import { DetailStats } from "./DetailStats.jsx";
import { DetailAbilities } from "./DetailAbilities.jsx";
import { TypeEffectiveness } from "./TypeEffectiveness.jsx";
import { EvolutionChain } from "./EvolutionChain.jsx";
import { MovesList } from "./MovesList.jsx";

/** Full detail screen for one Pokémon: fetches its own data via a hook. */
export function DetailScreen({ id, onBack, isFav, onToggleFav, onSelectPokemon }) {
  const { data, loading, error } = usePokemonDetail(id);

  return (
    <div className="detail-screen">
      <div className="detail-topbar">
        <button className="icon-btn" onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <span className="detail-topbar-title">DEX ENTRY</span>
        <button className="icon-btn" onClick={() => onToggleFav(id)}>
          <Star size={18} fill={isFav ? "#F5B942" : "none"} color={isFav ? "#F5B942" : "#24321F"} />
        </button>
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

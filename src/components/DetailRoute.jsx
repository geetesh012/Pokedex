import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DetailScreen } from "./DetailScreen.jsx";

/** Reads :id from the route and renders DetailScreen, with proper back-navigation. */
export function DetailRoute({
  isFavorite,
  onToggleFav,
  isInTeam,
  onToggleTeam,
  isInCompare,
  onToggleCompare,
  onEscape,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const numericId = Number(id);

  const goBack = () => {
    if (location.key !== "default") navigate(-1);
    else navigate("/");
  };

  return (
    <DetailScreen
      key={numericId}
      id={numericId}
      onBack={goBack}
      isFav={isFavorite(numericId)}
      onToggleFav={onToggleFav}
      onSelectPokemon={(newId) => navigate(`/pokemon/${newId}`)}
      isInTeam={isInTeam(numericId)}
      onToggleTeam={onToggleTeam}
      isInCompare={isInCompare(numericId)}
      onToggleCompare={onToggleCompare}
      onEscape={goBack}
    />
  );
}

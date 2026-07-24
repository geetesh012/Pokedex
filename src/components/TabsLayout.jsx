import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TabBar } from "./TabBar.jsx";

/** Shared layout for the Dex/Team/Compare routes: tab bar on top, routed content below. */
export function TabsLayout({ teamCount, compareCount, onTabChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = location.pathname.startsWith("/team")
    ? "team"
    : location.pathname.startsWith("/compare")
    ? "compare"
    : "dex";

  const handleChange = (tab) => {
    onTabChange?.(tab);
    navigate(tab === "dex" ? "/" : `/${tab}`);
  };

  return (
    <>
      <TabBar activeTab={activeTab} onChange={handleChange} teamCount={teamCount} compareCount={compareCount} />
      <div className="tab-content" key={activeTab}>
        <Outlet />
      </div>
    </>
  );
}

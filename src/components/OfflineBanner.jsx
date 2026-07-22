import React from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus.js";

/** Small banner shown when the browser goes offline. */
export function OfflineBanner() {
  const online = useOnlineStatus();
  if (online) return null;

  return <div className="offline-banner">OFFLINE — showing cached data where available</div>;
}

import React, { useRef } from "react";
import { Download, Upload } from "lucide-react";

/** Export/import favorites + team as a single JSON file, for backup or sharing. */
export function DataBackup({ favorites, team, onImport }) {
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      favorites: [...favorites],
      team,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pokedex-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        onImport({
          favorites: Array.isArray(data.favorites) ? data.favorites : [],
          team: Array.isArray(data.team) ? data.team : [],
        });
      } catch {
        // ignore malformed files silently — no destructive effect either way
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // allow re-selecting the same file later
  };

  return (
    <div className="backup-row">
      <button className="backup-btn" onClick={handleExport}>
        <Download size={12} /> Export
      </button>
      <button className="backup-btn" onClick={handleImportClick}>
        <Upload size={12} /> Import
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

// import React from "react";
// import { GENERATIONS } from "../constants.js";

// /** Single-select row of generation chips ("Gen 1"..."Gen 9"), plus an "All" option. */
// export function GenerationFilter({ selectedGen, onChange }) {
//   return (
//     <div className="gen-row">
//       <button className={`gen-chip ${!selectedGen ? "active" : ""}`} onClick={() => onChange(null)}>
//         All Gens
//       </button>
//       {GENERATIONS.map((gen) => (
//         <button
//           key={gen.label}
//           className={`gen-chip ${selectedGen === gen ? "active" : ""}`}
//           onClick={() => onChange(gen)}
//         >
//           {gen.label}
//         </button>
//       ))}
//     </div>
//   );
// }

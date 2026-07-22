// import React from "react";
// import { GENERATIONS } from "../constants.js";

// export function GenerationFilter({ selectedGen, onChange }) {
//   return (
//     <div className="gen-row">
//       <button
//         className={`gen-chip ${!selectedGen ? "active" : ""}`}
//         onClick={() => onChange(null)}
//       >
//         All Gens
//       </button>

//       {GENERATIONS.map((gen) => (
//         <button
//           key={gen.label}
//           className={`gen-chip ${
//             selectedGen?.label === gen.label ? "active" : ""
//           }`}
//           onClick={() => onChange(gen)}
//         >
//           {gen.label}
//         </button>
//       ))}
//     </div>
//   );
// }

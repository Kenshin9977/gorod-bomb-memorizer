import { useState } from "react";
import mapImg from "./assets/gk-bomb-zones_map.png";
import zonesData from "./assets/zones.json";

type Zone = {
  id: number;
  label: string;
  png: string;
  svgPaths: string[];
};

export default function App() {
  const [selected, setSelected] = useState<number[]>([]);
  const zones: Zone[] = zonesData;

  const toggleZone = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(z => z !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative flex flex-col items-center bg-gray-900 min-h-screen p-4 text-white">
      <div className="relative w-[500px] h-[250px]">
        <img src={mapImg} alt="Map" className="w-full h-full object-contain" />

        {/* PNG sélectionnés */}
        {selected.map(id => {
          const zone = zones.find(z => z.id === id);
          return (
            <img
              key={id}
              src={zone?.png}
              alt={zone?.label}
              className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
            />
          );
        })}

        {/* SVG pour clic/hover */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 2048 1024">
          {zones.map(zone => (
            <g key={zone.id} onClick={() => toggleZone(zone.id)}>
              {zone.svgPaths.map((d: string, i: number) => (
                <path
                  key={`${zone.id}-${i}`}
                  d={d}
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth={2}
                  className="cursor-pointer transition"
                  onMouseEnter={e => e.currentTarget.setAttribute("stroke", "#4ade80")}
                  onMouseLeave={e => e.currentTarget.setAttribute("stroke", "transparent")}
                />
              ))}
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 w-[300px]">
        <ul className="space-y-1">
          {[0,1,2,3,4,5].map(i => {
            const zone = selected[i] ? zones.find(z => z.id === selected[i]) : null;
            return (
              <li key={i} className="flex items-center gap-2">
                <span className="w-6 text-gray-500">{i + 1}.</span>
                <span
                  className="flex-1 text-green-400"
                  style={{ fontFamily: '"OCR A BT", monospace' }}
                >
                  {zone ? zone.label : "-"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        onClick={() => setSelected([])}
        className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-700 transition"
      >
        Reset
      </button>
    </div>
  );
}
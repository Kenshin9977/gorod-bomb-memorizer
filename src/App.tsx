import { useState } from "react";
import mapImage from "./assets/Gorod_map_dragon_command.jpg";
import zonesData from "./zones.json";

type Zone = {
  id: number;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

function App() {
  const [sequence, setSequence] = useState<Zone[]>([]);
  const zones: Zone[] = zonesData;

  const toggleZone = (zone: Zone) => {
    setSequence((prev) =>
      prev.find((z) => z.id === zone.id)
        ? prev.filter((z) => z.id !== zone.id)
        : [...prev, zone]
    );
  };

  const reset = () => setSequence([]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black">
      {/* Image de fond */}
      <div className="relative w-[500px] h-[300px]">
        <img
          src={mapImage}
          alt="Gorod Map"
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Zones cliquables */}
        {zones.map((zone) => {
          const isSelected = sequence.find((z) => z.id === zone.id);
          return (
            <button
              key={zone.id}
              onClick={() => toggleZone(zone)}
              title={zone.label}
              className={`absolute rounded transition 
                ${isSelected ? "border-green-500 bg-green-500/30" : "border-red-500 bg-transparent"}
              hover:bg-blue-500/30 hover:border-blue-500`}
              style={{
                left: zone.x,
                top: zone.y,
                width: zone.width,
                height: zone.height
              }}
            />
          );
        })}
      </div>

      {/* Séquence affichée */}
      <div className="mt-6 text-lg flex flex-col items-center">
        <div className="font-semibold">Sequence :</div>
        {sequence.length > 0 ? (
          <ul className="mt-2 space-y-1 text-white">
            {sequence.map((z, i) => (
              <li key={z.id} className="flex items-center gap-2">
                <span className="text-gray-500">{i + 1}.</span>
                <span>{z.label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500"></div>
        )}
      </div>

      {/* Bouton reset */}
      <button
        onClick={reset}
        className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-xl shadow hover:bg-gray-700 transition"
      >
        Reset
      </button>
    </div>
  );
}

export default App;
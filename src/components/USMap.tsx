import { useMemo, useState, useCallback, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// FIPS code to state abbreviation mapping
const FIPS_TO_STATE: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY",
};

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "D.C.", FL: "Florida",
  GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana",
  IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine",
  MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
  MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
  NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
  NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma",
  OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

interface USMapProps {
  stateCounts: Record<string, number>;
  selectedState: string;
  onStateSelect: (state: string) => void;
}

const USMapInner = ({ stateCounts, selectedState, onStateSelect }: USMapProps) => {
  const [tooltipContent, setTooltipContent] = useState<{
    name: string;
    abbr: string;
    count: number;
  } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const maxCount = useMemo(
    () => Math.max(...Object.values(stateCounts), 1),
    [stateCounts]
  );

  const getColor = useCallback(
    (stateAbbr: string) => {
      const count = stateCounts[stateAbbr] || 0;
      if (stateAbbr === selectedState) return "#C6A35C"; // gold
      if (count === 0) return "#E8E4DC"; // muted
      // Navy gradient
      const intensity = Math.pow(count / maxCount, 0.5); // sqrt for better spread
      const r = Math.round(210 - (210 - 27) * intensity);
      const g = Math.round(218 - (218 - 43) * intensity);
      const b = Math.round(230 - (230 - 75) * intensity);
      return `rgb(${r},${g},${b})`;
    },
    [stateCounts, selectedState, maxCount]
  );

  const handleMouseEnter = useCallback(
    (geo: { id: string; properties?: { name?: string } }, evt: React.MouseEvent) => {
      const fips = geo.id;
      const abbr = FIPS_TO_STATE[fips] || "";
      const name = STATE_NAMES[abbr] || geo.properties?.name || "";
      const count = stateCounts[abbr] || 0;
      setTooltipContent({ name, abbr, count });
      setTooltipPos({ x: evt.clientX, y: evt.clientY });
    },
    [stateCounts]
  );

  const handleMouseMove = useCallback((evt: React.MouseEvent) => {
    setTooltipPos({ x: evt.clientX, y: evt.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltipContent(null);
  }, []);

  const handleClick = useCallback(
    (geo: { id: string }) => {
      const fips = geo.id;
      const abbr = FIPS_TO_STATE[fips] || "";
      const count = stateCounts[abbr] || 0;
      if (count > 0) {
        onStateSelect(selectedState === abbr ? "" : abbr);
      }
    },
    [stateCounts, selectedState, onStateSelect]
  );

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        width={800}
        height={500}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const fips = geo.id;
              const abbr = FIPS_TO_STATE[fips] || "";
              const count = stateCounts[abbr] || 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getColor(abbr)}
                  stroke="#FFFFFF"
                  strokeWidth={abbr === selectedState ? 2 : 0.75}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: count > 0
                        ? abbr === selectedState
                          ? "#D4B572"
                          : "#A8B8D0"
                        : "#E8E4DC",
                      outline: "none",
                      cursor: count > 0 ? "pointer" : "default",
                      strokeWidth: count > 0 ? 1.5 : 0.75,
                    },
                    pressed: { outline: "none" },
                  }}
                  onMouseEnter={(evt) => handleMouseEnter(geo, evt)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(geo)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 rounded-lg shadow-lg"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y - 50,
            background: "#1B2B4B",
          }}
        >
          <div className="text-sm font-bold" style={{ color: "#C6A35C" }}>
            {tooltipContent.name}
          </div>
          <div className="text-xs text-white">
            {tooltipContent.count === 0
              ? "No providers"
              : `${tooltipContent.count} provider${tooltipContent.count !== 1 ? "s" : ""}`}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-1 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded-sm" style={{ background: "#C8D2E3" }} />
          <span>Fewer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded-sm" style={{ background: "#1B2B4B" }} />
          <span>More providers</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 rounded-sm" style={{ background: "#C6A35C" }} />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export const USMap = memo(USMapInner);

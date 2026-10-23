/* Géométrie axonométrique calculée par scripts/gen-house.py (coordonnées reportées ici). */
import { cn } from "@/lib/utils";

const VB = { x: -20, y: 0, w: 700, h: 560 };

export const houseCallouts = [
  { n: "01", label: "Modules photovoltaïques", x: 505, y: 58 },
  { n: "02", label: "Batterie de stockage", x: 560, y: 236 },
  { n: "03", label: "Onduleur", x: 470, y: 528 },
  { n: "04", label: "Compteur · réseau", x: 6, y: 452 },
];

export function HouseIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="-20 0 700 560"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Illustration d'une maison contemporaine équipée de panneaux solaires sur sa toiture, d'un onduleur et d'une batterie de stockage"
      >
        <defs>
          <linearGradient id="pv" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22385a" />
            <stop offset="0.55" stopColor="#14233a" />
            <stop offset="1" stopColor="#0d1a2c" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dfe7f0" />
            <stop offset="1" stopColor="#b9c7d6" />
          </linearGradient>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <path d="M0 0 V6" stroke="#cdd2d8" strokeWidth="0.6" />
          </pattern>
        </defs>

        {/* Course du soleil */}
        <path d="M-10 250 Q 130 -30 470 6" fill="none" stroke="#cdd2d8" strokeWidth="1" strokeDasharray="1 5" strokeLinecap="round" />
        <circle cx="96" cy="74" r="20" fill="#f2c14e" opacity="0.9" />
        <circle cx="96" cy="74" r="30" fill="none" stroke="#f2c14e" strokeOpacity="0.45" />

        {/* Sol */}
        <polygon points="228.3,155.0 661.4,405.0 416.7,546.2 -16.3,296.2" fill="#f3f4f5" />
        <polygon points="228.3,155.0 661.4,405.0 416.7,546.2 -16.3,296.2" fill="url(#hatch)" opacity="0.5" />

        {/* Arbre */}
        <path d="M29.2 302.5 V244.5" stroke="#0c1726" strokeWidth="1.2" />
        <circle cx="29.2" cy="224.5" r="30" fill="#e3f0e6" stroke="#2f8f4e" strokeWidth="1" />
        <circle cx="43.2" cy="240.5" r="18" fill="#f1f7f2" stroke="#2f8f4e" strokeWidth="1" />

        {/* Volume principal */}
        <polygon points="466.5,330.0 315.0,417.5 315.0,292.5 466.5,155.0" fill="#e9ecef" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="440.5,250.0 392.9,277.5 392.9,237.5 440.5,210.0" fill="url(#glass)" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="98.4,292.5 315.0,417.5 315.0,292.5 98.4,167.5" fill="#ffffff" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="117.9,303.8 193.7,347.5 193.7,242.5 117.9,198.8" fill="url(#glass)" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M143.3 318.4L143.3 213.4 M168.4 332.9L168.4 227.9 M117.9 246.2L193.7 290.0" stroke="#0c1726" strokeWidth="1" />
        <polygon points="215.4,287.5 299.8,336.2 299.8,303.8 215.4,255.0" fill="url(#glass)" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="215.4,360.0 241.3,375.0 241.3,317.5 215.4,302.5" fill="#22344f" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="247.8,353.8 260.8,361.2 260.8,341.2 247.8,333.8" fill="#f4f5f6" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="250.0,20.4 479.5,152.9 315.0,302.1 85.5,169.6" fill="#dfe3e8" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />

        {/* Champ photovoltaïque */}
        <polygon points="250.0,49.5 284.8,69.6 226.1,122.8 191.3,102.7" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <polygon points="287.8,71.3 322.7,91.5 264.0,144.7 229.2,124.6" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <polygon points="325.7,93.2 360.5,113.3 301.8,166.5 267.0,146.4" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <polygon points="363.5,115.0 398.4,135.1 339.7,188.4 304.9,168.3" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <polygon points="401.4,136.9 436.2,157.0 377.5,210.2 342.7,190.1" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <polygon points="187.4,106.3 222.2,126.4 163.6,179.6 128.8,159.5" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <polygon points="225.3,128.1 260.1,148.2 201.4,201.4 166.6,181.3" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <polygon points="263.1,150.0 297.9,170.1 239.3,223.3 204.4,203.2" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <polygon points="301.0,171.8 335.8,191.9 277.1,245.1 242.3,225.0" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <polygon points="338.8,193.7 373.6,213.8 315.0,267.0 280.1,246.9" fill="url(#pv)" stroke="#0a1422" strokeWidth="0.8" />
        <path d="M258.7 54.5L200.0 107.8 M267.4 59.5L208.7 112.8 M276.1 64.6L217.4 117.8 M230.4 67.2L265.3 87.3 M210.9 85.0L245.7 105.1 M296.5 76.4L237.9 129.6 M305.3 81.4L246.6 134.6 M314.0 86.4L255.3 139.7 M268.3 89.1L303.1 109.2 M248.7 106.8L283.5 126.9 M334.4 98.2L275.7 151.5 M343.1 103.2L284.4 156.5 M351.8 108.3L293.1 161.5 M306.1 110.9L340.9 131.0 M286.6 128.7L321.4 148.8 M372.2 120.1L313.6 173.3 M380.9 125.1L322.3 178.3 M389.6 130.1L331.0 183.4 M344.0 132.8L378.8 152.9 M324.4 150.5L359.2 170.6 M410.1 141.9L351.4 195.2 M418.8 146.9L360.1 200.2 M427.5 152.0L368.8 205.2 M381.8 154.6L416.6 174.7 M362.3 172.4L397.1 192.5 M196.1 111.3L137.5 164.5 M204.8 116.3L146.2 169.6 M213.5 121.3L154.9 174.6 M167.9 124.0L202.7 144.1 M148.3 141.8L183.1 161.9 M234.0 133.1L175.3 186.4 M242.7 138.2L184.0 191.4 M251.4 143.2L192.7 196.4 M205.7 145.9L240.5 166.0 M186.2 163.6L221.0 183.7 M271.8 155.0L213.2 208.2 M280.5 160.0L221.9 213.2 M289.2 165.0L230.6 218.3 M243.6 167.7L278.4 187.8 M224.0 185.5L258.8 205.6 M309.7 176.8L251.0 230.1 M318.4 181.9L259.7 235.1 M327.1 186.9L268.4 240.1 M281.4 189.6L316.2 209.7 M261.9 207.3L296.7 227.4 M347.5 198.7L288.8 251.9 M356.2 203.7L297.5 256.9 M364.9 208.7L306.2 262.0 M319.3 211.4L354.1 231.5 M299.7 229.2L334.5 249.3" stroke="#3b5478" strokeWidth="0.5" opacity="0.75" />
        <polygon points="85.5,169.6 315.0,302.1 315.0,310.9 85.5,178.4" fill="#0c1726" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="479.5,152.9 315.0,302.1 315.0,310.9 479.5,161.6" fill="#22344f" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />

        {/* Annexe */}
        <polygon points="434.0,268.8 542.3,331.2 423.2,400.0 315.0,337.5" fill="#e2e6ea" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="542.3,411.2 423.2,480.0 423.2,400.0 542.3,331.2" fill="#eceff1" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="315.0,417.5 423.2,480.0 423.2,400.0 315.0,337.5" fill="#f8f9fa" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="332.3,427.5 405.9,470.0 405.9,407.5 332.3,365.0" fill="#e6e9ec" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M332.3 415.0L405.9 457.5 M332.3 402.5L405.9 445.0 M332.3 390.0L405.9 432.5 M332.3 377.5L405.9 420.0" stroke="#9aa5b1" strokeWidth="0.8" />
        <polygon points="315.0,337.5 423.2,400.0 423.2,393.7 315.0,331.2" fill="#0c1726" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="542.3,331.2 423.2,400.0 423.2,393.7 542.3,325.0" fill="#22344f" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />

        {/* Équipements */}
        <polygon points="475.2,390.0 451.4,403.7 456.1,406.5 479.9,392.8" fill="#f1f3f4" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="451.4,428.7 456.1,431.5 456.1,406.5 451.4,403.7" fill="#d5dae0" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="479.9,417.8 456.1,431.5 456.1,406.5 479.9,392.8" fill="#ffffff" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="522.8,362.5 488.2,382.5 495.7,386.9 530.4,366.9" fill="#f1f3f4" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="488.2,435.0 495.7,439.4 495.7,386.9 488.2,382.5" fill="#cfd5dc" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="530.4,419.4 495.7,439.4 495.7,386.9 530.4,366.9" fill="#ffffff" stroke="#0c1726" strokeWidth="1.1" strokeLinejoin="round" />
        <polygon points="517.6,384.5 508.9,389.5 508.9,387.0 517.6,382.0" fill="#2f8f4e" />

        {/* Flux d'énergie */}
        <path d="M315.0 267.0 L315.0 310.9 L315.0 338.8 L423.2 393.7 L456.1 419.0 L495.7 399.4" fill="none" stroke="#2f8f4e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 7" className="energy-flow" />

        {/* Repères */}
        <g><circle cx="319.3" cy="124.9" r="3.2" fill="#fff" stroke="#0c1726" strokeWidth="1.2" /><path d="M319.3 124.9 L505.0 58.0" stroke="#0c1726" strokeWidth="0.8" strokeDasharray="2 3" /></g>
        <g><circle cx="513.1" cy="404.4" r="3.2" fill="#fff" stroke="#0c1726" strokeWidth="1.2" /><path d="M513.1 404.4 L560.0 236.0" stroke="#0c1726" strokeWidth="0.8" strokeDasharray="2 3" /></g>
        <g><circle cx="468.0" cy="412.1" r="3.2" fill="#fff" stroke="#0c1726" strokeWidth="1.2" /><path d="M468.0 412.1 L470.0 528.0" stroke="#0c1726" strokeWidth="0.8" strokeDasharray="2 3" /></g>
        <g><circle cx="254.3" cy="347.5" r="3.2" fill="#fff" stroke="#0c1726" strokeWidth="1.2" /><path d="M254.3 347.5 L6.0 452.0" stroke="#0c1726" strokeWidth="0.8" strokeDasharray="2 3" /></g>
      </svg>

      {/* Légendes (HTML pour rester lisibles à toutes les tailles) */}
      <ol className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {houseCallouts.map((c) => (
          <li
            key={c.n}
            className="absolute -translate-y-1/2 whitespace-nowrap font-mono text-[0.68rem] tracking-[0.06em] text-ink uppercase"
            style={{ left: `${((c.x - VB.x) / VB.w) * 100}%`, top: `${((c.y - VB.y) / VB.h) * 100}%` }}
          >
            <span className="mr-2 inline-flex rounded-full bg-ink px-1.5 py-0.5 text-[0.62rem] text-white">{c.n}</span>
            <span className="rounded bg-white/85 px-1 py-0.5">{c.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

import { useState, useId } from "react";

/**
 * LiquidGlassButton
 *
 * Reusable pill button matching the reference design:
 * - Default state: glassy/transparent pill with a thin colored border
 * - Hover state: liquid rises from the bottom with an irregular, wavy
 *   top surface (not a flat line) — like real liquid sloshing inside
 *   the pill — and the wave gently animates while hovered.
 * - Icon, text, border, and the liquid fill all derive from a single
 *   `color` prop, so dropping the same component in with a different
 *   color gives a fully themed button without touching any CSS.
 *
 * Usage:
 *   <LiquidGlassButton color="#ff7a30" icon={<BoltIcon />} label="Lounge" badge={1} />
 *   <LiquidGlassButton color="#22d3ee" icon={<FileIcon />} label="Resume & CV" />
 *   <LiquidGlassButton color="#34d399" icon={<DownloadIcon />} label="Get Source" />
 */
export default function LiquidGlassButton({
  color = "#22d3ee",
  icon,
  label,
  badge,
  onClick,
  className = "",
  style = {},
}) {
  const [isHovered, setIsHovered] = useState(false);
  const reactId = useId();
  const gradientId = `lq-grad-${reactId}`;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 22px",
        borderRadius: "999px",
        border: `1.5px solid ${withAlpha(color, isHovered ? 0.9 : 0.35)}`,
        background: "rgba(255, 255, 255, 0.02)",
        cursor: "pointer",
        overflow: "hidden",
        isolation: "isolate",
        boxShadow: isHovered
          ? `0 0 22px ${withAlpha(color, 0.35)}, inset 0 0 18px ${withAlpha(color, 0.12)}`
          : `0 0 0 rgba(0,0,0,0)`,
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
        ...style,
      }}
    >
      {/* LIQUID WAVE LAYER — SVG with an animated, irregular top edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={withAlpha(color, 0.95)} />
            <stop offset="100%" stopColor={withAlpha(color, 0.75)} />
          </linearGradient>
        </defs>

        <g
          style={{
            transform: isHovered ? "translateY(-8%)" : "translateY(105%)",
            transition: "transform 0.55s cubic-bezier(0.22, 0.9, 0.32, 1)",
          }}
        >
          {/* One wave "tile" is 200 units wide. We draw it 3 times back
              to back (at x=-200, x=0, x=200) so the strip spans -200..400.
              The whole strip only ever needs to shift by one tile width
              (200) to loop seamlessly — oscillating within that range
              never exposes a gap on either side, unlike a single tile
              translating in isolation. The crest dips to y=-6 (above the
              viewBox top) so the fill reaches the very top of the pill
              instead of leaving a sliver of empty space. */}
          <path
            d="M-200,16 C-180,-6 -165,26 -145,12 C-125,-6 -110,24 -90,10
               C-70,-6 -55,26 -35,12 C-15,-6 0,24 20,12
               C40,-6 55,26 75,12 C95,-6 110,24 130,10
               C150,-6 165,26 185,12 C205,-6 220,24 240,12
               C260,-6 275,26 295,12 C315,-6 330,24 350,10
               C370,-6 385,26 405,12 C425,-6 440,24 460,12
               C480,-6 495,26 515,12 C535,-6 550,24 570,10
               C590,-6 600,12 600,12
               L600,80 L-200,80 Z"
            fill={`url(#${gradientId})`}
          >
            {isHovered && (
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0,0; -200,0; 0,0"
                dur="6s"
                repeatCount="indefinite"
              />
            )}
          </path>
        </g>
      </svg>

      {/* SURFACE SHEEN — soft highlight that tracks just above the wave crest */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: isHovered ? "62%" : "-10%",
          height: "14px",
          background: `radial-gradient(ellipse at center, ${withAlpha(
            "#ffffff",
            isHovered ? 0.3 : 0
          )} 0%, transparent 70%)`,
          transition: "bottom 0.55s cubic-bezier(0.22, 0.9, 0.32, 1), background 0.45s ease",
          zIndex: 1,
          filter: "blur(2px)",
        }}
      />

      {/* CONTENT — icon, label, badge sit above the liquid layer */}
      <span
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: color,
          fontSize: "18px",
          lineHeight: 0,
          transition: "color 0.3s ease",
        }}
      >
        {icon}
      </span>

      <span
        style={{
          position: "relative",
          zIndex: 2,
          color: isHovered ? "#0a0a0a" : color,
          fontWeight: 600,
          fontSize: "15px",
          whiteSpace: "nowrap",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </span>

      {badge !== undefined && badge !== null && (
        <span
          style={{
            position: "relative",
            zIndex: 2,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "20px",
            height: "20px",
            padding: "0 6px",
            borderRadius: "999px",
            background: isHovered ? "#0a0a0a" : color,
            color: isHovered ? color : "#0a0a0a",
            fontSize: "11px",
            fontWeight: 700,
            transition: "background 0.3s ease, color 0.3s ease",
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// Converts a hex color into an rgba() string at the given alpha (0-1)
function withAlpha(hex, alpha) {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
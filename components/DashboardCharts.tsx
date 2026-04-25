"use client";

export function GaugeChart({ value, max, label, colour, size = 160 }: { value: number; max: number; label: string; colour: string; size?: number }) {
  const pct = max > 0 ? Math.min(value / max, 1) : 0;
  const angle = pct * 180;
  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const startX = cx - r;
  const endAngle = Math.PI - (angle * Math.PI / 180);
  const endX = cx + r * Math.cos(endAngle);
  const endY = cy - r * Math.sin(endAngle);
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="rgba(100,90,70,0.12)" strokeWidth="10" strokeLinecap="round" />
        {pct > 0 && <path d={`M ${startX} ${cy} A ${r} ${r} 0 0 1 ${endX} ${endY}`} fill="none" stroke={colour} strokeWidth="10" strokeLinecap="round" />}
        <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="var(--serif)" fontSize="28" fontWeight="600" fill="var(--navy)">{value > 0 ? value.toFixed(1) : "\u2014"}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="var(--ui)" fontSize="10" fill="#9A9080" letterSpacing="0.06em">out of {max}</text>
      </svg>
      <p style={{ fontFamily: "var(--ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--navy)", marginTop: -4 }}>{label}</p>
    </div>
  );
}

export function DonutChart({ segments, size = 140, label }: { segments: { value: number; colour: string; label: string }[]; size?: number; label: string }) {
  const total = segments.reduce((a, s) => a + s.value, 0);
  const r = size / 2 - 16;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(100,90,70,0.08)" strokeWidth="14" />
        {total > 0 && segments.map((seg, i) => {
          const pct = seg.value / total;
          const dash = pct * circumference;
          const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.colour} strokeWidth="14" strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset} transform={`rotate(-90 ${cx} ${cy})`} />;
          offset += dash;
          return el;
        })}
        <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="var(--serif)" fontSize="24" fontWeight="600" fill="var(--navy)">{total}</text>
      </svg>
      <p style={{ fontFamily: "var(--ui)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--navy)", marginTop: 4 }}>{label}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8, flexWrap: "wrap" }}>
        {segments.filter(s => s.value > 0).map((seg, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: seg.colour, display: "inline-block" }}></span>
            <span style={{ fontFamily: "var(--ui)", fontSize: 10, color: "var(--text-mid)" }}>{seg.label} ({seg.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BarMeter({ value, max, label, colour }: { value: number; max: number; label: string; colour: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "var(--ui)", fontSize: 12, color: "var(--text-dark)" }}>{label}</span>
        <span style={{ fontFamily: "var(--ui)", fontSize: 12, fontWeight: 500, color: colour }}>{value > 0 ? value.toFixed(1) : "\u2014"}/{max}</span>
      </div>
      <div style={{ height: 6, background: "rgba(100,90,70,0.1)", borderRadius: 3 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: colour, borderRadius: 3, transition: "width 0.4s" }}></div>
      </div>
    </div>
  );
}

export function getColour(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.8) return "#27AE60";
  if (pct >= 0.5) return "#D4A017";
  if (pct > 0) return "#C0392B";
  return "#9E9E9E";
}

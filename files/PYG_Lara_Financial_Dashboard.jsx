import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from "recharts";

const NAVY = "#0D2137";
const BLUE = "#1B4F72";
const MED = "#2E86C1";
const GOLD = "#D4A017";
const GREEN = "#27AE60";
const RED = "#E74C3C";
const LIGHT = "#D6EAF8";
const ORANGE = "#E67E22";

const VARIABLE_COST_PER_TON = 345;
const FIXED_ANNUAL = 67200;
const MAX_CAPACITY = 4800;

function calcScenario(utilPct, marginPct) {
  const tons = MAX_CAPACITY * (utilPct / 100);
  const variableCost = tons * VARIABLE_COST_PER_TON;
  const totalCost = variableCost + FIXED_ANNUAL;
  const costPerTon = totalCost / tons;
  const pricePerTon = costPerTon * (1 + marginPct / 100);
  const revenue = tons * pricePerTon;
  const profit = revenue - totalCost;
  const marginPctActual = revenue > 0 ? (profit / revenue * 100) : 0;
  return { tons, variableCost, totalCost, costPerTon: Math.round(costPerTon), pricePerTon: Math.round(pricePerTon), revenue: Math.round(revenue), profit: Math.round(profit), marginPctActual: marginPctActual.toFixed(1) };
}

const margins = [30, 35, 50];
const utils = [25, 50, 75, 100];

const maintenanceItems = [
  { item: "Puentes Grúa — Mantenimiento Preventivo", desc: "Verificación soportes de carga, frenos, lubricación", low: 5000, high: 10000 },
  { item: "Caldero 7m — Reemplazo de Quemadores", desc: "4x quemadores Hauck RSV120 completos", low: 15000, high: 25000 },
  { item: "Planta Cobre — Renovación Rectificadores", desc: "Unidades de protección catódica", low: 10000, high: 20000 },
  { item: "Planta Cobre — Recubrimiento Tanques", desc: "Fibra de vidrio para integridad estructural", low: 5000, high: 10000 },
];

const copperData = [
  { scenario: "25% Cap.", rods: 234, revLow: 56160, revHigh: 105300 },
  { scenario: "50% Cap.", rods: 468, revLow: 112320, revHigh: 210600 },
  { scenario: "75% Cap.", rods: 702, revLow: 168480, revHigh: 315900 },
  { scenario: "100% Cap.", rods: 936, revLow: 224640, revHigh: 421200 },
];

function fmt(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M";
  if (n >= 1000) return "$" + (n / 1000).toFixed(0) + "K";
  return "$" + n;
}

function fmtFull(n) {
  return "$" + n.toLocaleString("en-US");
}

export default function App() {
  const [activeMargin, setActiveMargin] = useState(30);
  const [activeUtil, setActiveUtil] = useState(100);

  const barData = utils.map(u => {
    const s30 = calcScenario(u, 30);
    const s35 = calcScenario(u, 35);
    const s50 = calcScenario(u, 50);
    return {
      name: `${u}%`,
      tons: s30.tons,
      "Utilidad 30%": s30.profit,
      "Utilidad 35%": s35.profit,
      "Utilidad 50%": s50.profit,
      "Ingreso 30%": s30.revenue,
      "Ingreso 35%": s35.revenue,
      "Ingreso 50%": s50.revenue,
    };
  });

  const current = calcScenario(activeUtil, activeMargin);
  const pieData = [
    { name: "Zinc (Variable)", value: current.tons * 306 },
    { name: "Químicos", value: current.tons * 24 },
    { name: "Gas (Variable)", value: current.tons * 15 },
    { name: "Costos Fijos", value: FIXED_ANNUAL },
    { name: "Utilidad Neta", value: current.profit },
  ];
  const PIE_COLORS = [MED, BLUE, ORANGE, RED, GREEN];

  const marginChartData = utils.map(u => ({
    name: `${u}%`,
    "Margen 30%": parseFloat(calcScenario(u, 30).marginPctActual),
    "Margen 35%": parseFloat(calcScenario(u, 35).marginPctActual),
    "Margen 50%": parseFloat(calcScenario(u, 50).marginPctActual),
  }));

  const totalMainLow = maintenanceItems.reduce((a, b) => a + b.low, 0);
  const totalMainHigh = maintenanceItems.reduce((a, b) => a + b.high, 0);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#F8FAFC", minHeight: "100vh", padding: 24 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ background: NAVY, borderRadius: 12, padding: "32px 40px", marginBottom: 24, color: "white" }}>
          <div style={{ fontSize: 14, color: GOLD, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>ANÁLISIS FINANCIERO</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>Prensados y Galvanizados de Lara, S.A.</div>
          <div style={{ fontSize: 15, color: "#94A3B8" }}>Proyecciones de Ingresos por Escenario de Margen y Utilización | Capacidad: 4.800 ton/año (400 ton/mes)</div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div style={{ background: "white", borderRadius: 10, padding: 16, flex: 1, minWidth: 200, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, marginBottom: 8 }}>MARGEN DE UTILIDAD</div>
            <div style={{ display: "flex", gap: 8 }}>
              {margins.map(m => (
                <button key={m} onClick={() => setActiveMargin(m)}
                  style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
                    background: activeMargin === m ? NAVY : "#E2E8F0", color: activeMargin === m ? "white" : "#475569" }}>
                  {m}%
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: "white", borderRadius: 10, padding: 16, flex: 1, minWidth: 200, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, marginBottom: 8 }}>UTILIZACIÓN DE PLANTA</div>
            <div style={{ display: "flex", gap: 8 }}>
              {utils.map(u => (
                <button key={u} onClick={() => setActiveUtil(u)}
                  style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
                    background: activeUtil === u ? MED : "#E2E8F0", color: activeUtil === u ? "white" : "#475569" }}>
                  {u}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Ingresos Anuales", value: fmtFull(current.revenue), color: MED },
            { label: "Costos Totales", value: fmtFull(current.totalCost), color: RED },
            { label: "Utilidad Neta", value: fmtFull(current.profit), color: GREEN },
            { label: "Margen Real", value: `${current.marginPctActual}%`, color: GOLD },
          ].map((kpi, i) => (
            <div key={i} style={{ background: "white", borderRadius: 10, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderTop: `4px solid ${kpi.color}` }}>
              <div style={{ fontSize: 12, color: "#64748B", fontWeight: 600, marginBottom: 4 }}>{kpi.label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: NAVY }}>{kpi.value}</div>
              <div style={{ fontSize: 11, color: "#94A3B8" }}>@ {activeUtil}% cap. | {activeMargin}% margen</div>
            </div>
          ))}
        </div>

        {/* Profit by Scenario Bar Chart */}
        <div style={{ background: "white", borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Utilidad Neta por Escenario</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>Comparación de utilidad neta anual bajo los tres escenarios de margen, por nivel de utilización de planta</div>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={barData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" label={{ value: "Utilización de Planta", position: "insideBottom", offset: -2, style: { fontSize: 12 } }} />
              <YAxis tickFormatter={v => fmt(v)} />
              <Tooltip formatter={(v) => fmtFull(v)} />
              <Legend />
              <Bar dataKey="Utilidad 30%" fill={MED} radius={[4,4,0,0]} />
              <Bar dataKey="Utilidad 35%" fill={GOLD} radius={[4,4,0,0]} />
              <Bar dataKey="Utilidad 50%" fill={GREEN} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Bar Chart */}
        <div style={{ background: "white", borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Ingresos Totales por Escenario</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>Ingresos anuales brutos bajo cada combinación de margen y utilización</div>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={barData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" label={{ value: "Utilización de Planta", position: "insideBottom", offset: -2, style: { fontSize: 12 } }} />
              <YAxis tickFormatter={v => fmt(v)} />
              <Tooltip formatter={(v) => fmtFull(v)} />
              <Legend />
              <Bar dataKey="Ingreso 30%" fill={MED} radius={[4,4,0,0]} />
              <Bar dataKey="Ingreso 35%" fill={GOLD} radius={[4,4,0,0]} />
              <Bar dataKey="Ingreso 50%" fill={GREEN} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart + ROI side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <div style={{ background: "white", borderRadius: 10, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Distribución de Ingresos</div>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>@ {activeUtil}% capacidad | {activeMargin}% margen</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={110} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={true} style={{ fontSize: 11 }}>
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={v => fmtFull(Math.round(v))} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: "white", borderRadius: 10, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Margen de Utilidad Real</div>
            <div style={{ fontSize: 13, color: "#64748B", marginBottom: 12 }}>% de utilidad neta sobre ingresos</div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marginChartData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" label={{ value: "Utilización", position: "insideBottom", offset: -2, style: { fontSize: 12 } }} />
                <YAxis label={{ value: "%", angle: -90, position: "insideLeft", style: { fontSize: 12 } }} domain={[0, 40]} />
                <Tooltip formatter={v => `${v}%`} />
                <Legend />
                <Line type="monotone" dataKey="Margen 30%" stroke={MED} strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Margen 35%" stroke={GOLD} strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Margen 50%" stroke={GREEN} strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Full Data Table */}
        <div style={{ background: "white", borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflowX: "auto" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Tabla Completa de Proyecciones — Solo Galvanizado</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>Todos los escenarios combinados (no incluye ingresos de planta de cobre)</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: NAVY, color: "white" }}>
                {["Margen", "Utiliz.", "Ton/Año", "Precio/Ton", "Ingreso", "Costo Total", "Utilidad Neta", "Margen %"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {margins.flatMap((m, mi) =>
                utils.map((u, ui) => {
                  const s = calcScenario(u, m);
                  const bg = mi % 2 === 0 ? (ui % 2 === 0 ? "white" : "#F8FAFC") : (ui % 2 === 0 ? "#FFF8E1" : "#FFFDE7");
                  return (
                    <tr key={`${m}-${u}`} style={{ background: bg, borderBottom: ui === 3 ? `3px solid ${NAVY}` : "1px solid #E2E8F0" }}>
                      {ui === 0 ? <td rowSpan={4} style={{ padding: "10px 12px", fontWeight: 800, textAlign: "center", background: mi === 0 ? LIGHT : mi === 1 ? "#FFF8E1" : "#E8F5E9", fontSize: 16, color: NAVY }}>{m}%</td> : null}
                      <td style={{ padding: "8px 12px", textAlign: "center", fontWeight: 600 }}>{u}%</td>
                      <td style={{ padding: "8px 12px", textAlign: "center" }}>{s.tons.toLocaleString()}</td>
                      <td style={{ padding: "8px 12px", textAlign: "center" }}>${s.pricePerTon}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 600, color: MED }}>{fmtFull(s.revenue)}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", color: RED }}>{fmtFull(s.totalCost)}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", fontWeight: 700, color: GREEN }}>{fmtFull(s.profit)}</td>
                      <td style={{ padding: "8px 12px", textAlign: "center", fontWeight: 600 }}>{s.marginPctActual}%</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Copper Plant Revenue */}
        <div style={{ background: "white", borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Ingresos Adicionales — Planta de Cobreado Electrolítico</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>Capacidad: 936 varillas/día | Precio estimado: $8-$15 USD/varilla | Ingreso adicional al galvanizado</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: NAVY, color: "white" }}>
                {["Utilización", "Varillas/Día", "Ingreso Anual (Bajo)", "Ingreso Anual (Alto)", "Ingreso Mensual Promedio"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "center", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {copperData.map((c, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "white" : "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
                  <td style={{ padding: "8px 12px", textAlign: "center", fontWeight: 600 }}>{c.scenario}</td>
                  <td style={{ padding: "8px 12px", textAlign: "center" }}>{c.rods}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", color: MED }}>{fmtFull(c.revLow * 30)}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right", color: GREEN, fontWeight: 600 }}>{fmtFull(c.revHigh * 30)}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}>{fmtFull(Math.round((c.revLow * 30 + c.revHigh * 30) / 2 / 12))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Maintenance Investment */}
        <div style={{ background: "white", borderRadius: 10, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.1)", borderLeft: `4px solid ${ORANGE}` }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Inversión Adicional: Mantenimiento Pre-Arranque</div>
          <div style={{ fontSize: 13, color: "#64748B", marginBottom: 16 }}>Elementos identificados para llevar ambas líneas a operación óptima</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: ORANGE, color: "white" }}>
                {["Elemento", "Descripción", "Estimado Bajo", "Estimado Alto"].map(h => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: h.includes("Estimado") ? "right" : "left", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {maintenanceItems.map((item, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "white" : "#FFF8E1", borderBottom: "1px solid #E2E8F0" }}>
                  <td style={{ padding: "8px 12px", fontWeight: 600 }}>{item.item}</td>
                  <td style={{ padding: "8px 12px", color: "#64748B" }}>{item.desc}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}>{fmtFull(item.low)}</td>
                  <td style={{ padding: "8px 12px", textAlign: "right" }}>{fmtFull(item.high)}</td>
                </tr>
              ))}
              <tr style={{ background: NAVY, color: "white", fontWeight: 700 }}>
                <td colSpan={2} style={{ padding: "10px 12px" }}>TOTAL INVERSIÓN MANTENIMIENTO</td>
                <td style={{ padding: "10px 12px", textAlign: "right" }}>{fmtFull(totalMainLow)}</td>
                <td style={{ padding: "10px 12px", textAlign: "right" }}>{fmtFull(totalMainHigh)}</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: 16, padding: 16, background: "#E8F5E9", borderRadius: 8 }}>
            <div style={{ fontWeight: 700, color: "#1B5E20", marginBottom: 4 }}>Inversión Operativa (sin incluir precio de adquisición)</div>
            <div style={{ fontSize: 14, color: "#2E7D32" }}>
              Mantenimiento (${totalMainLow.toLocaleString()} - ${totalMainHigh.toLocaleString()}) + Capital de trabajo primer año (~$500.000 zinc + químicos) = <strong style={{ fontSize: 16 }}>${(totalMainLow + 500000).toLocaleString()} - ${(totalMainHigh + 500000).toLocaleString()} USD despliegue operativo</strong>
            </div>
          </div>
        </div>

        {/* Combined Revenue Potential */}
        <div style={{ background: NAVY, borderRadius: 10, padding: 24, marginBottom: 24, color: "white" }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: GOLD }}>POTENCIAL COMBINADO A PLENA CAPACIDAD</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {margins.map(m => {
              const galv = calcScenario(100, m);
              const copperMid = Math.round((224640 * 30 + 421200 * 30) / 2);
              const combined = galv.revenue + copperMid;
              const combinedProfit = galv.profit + Math.round(copperMid * 0.35);
              return (
                <div key={m} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 20, border: `1px solid rgba(255,255,255,0.15)` }}>
                  <div style={{ fontSize: 14, color: GOLD, fontWeight: 700, marginBottom: 8 }}>MARGEN {m}%</div>
                  <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 4 }}>Galvanizado</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{fmt(galv.revenue)}</div>
                  <div style={{ fontSize: 13, color: "#94A3B8", marginBottom: 4 }}>+ Cobre (estimado)</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{fmt(copperMid)}</div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 8, marginTop: 8 }}>
                    <div style={{ fontSize: 13, color: GOLD, marginBottom: 4 }}>INGRESO COMBINADO</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: GREEN }}>{fmt(combined)}</div>
                    <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 8 }}>Utilidad estimada combinada: <span style={{ color: GREEN, fontWeight: 700 }}>{fmt(combinedProfit)}</span></div>
                    <div style={{ fontSize: 12, color: "#94A3B8" }}>Margen combinado: <span style={{ color: GOLD, fontWeight: 700 }}>{(combinedProfit / combined * 100).toFixed(1)}%</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sources */}
        <div style={{ background: "white", borderRadius: 10, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Fuentes y Supuestos</div>
          <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.8 }}>
            <div>• Costo de zinc: ~$3.930/ton LME (SHG 99,9%) — London Metal Exchange referencia</div>
            <div>• Absorción de zinc: 10% confirmado — Ing. Miriam (controles QC PYGLARA)</div>
            <div>• Precio del servicio por tonelada: calculado como costo + margen regulado — P&L de PYG Lara</div>
            <div>• Costos fijos mensuales: $5.600 — Documentación operativa PYG Lara</div>
            <div>• Químicos: HCl $1.174/ton, NH4Cl $2.300/ton — Documentación PYG Lara</div>
            <div>• Margen regulado actual: 30% sobre costo de producción — Ley de Precios Justos / SUNDDE Venezuela</div>
            <div>• Margen interno reportado: ~50% — P&L PYG Lara</div>
            <div>• Reducción de regalías petroleras: 30% → 15% — Al Jazeera, 23 enero 2026</div>
            <div>• Precio servicio galvanizado LatAm: $0,50 USD/kg ($500/ton) — QuimiNet, Ecuador</div>
            <div>• Precio servicio galvanizado EEUU: $0,44-$1,10/lb ($440-$1.100/ton) — American Galvanizers Association</div>
            <div>• Plantas comparables México: 600-6.000 ton/mes — Dirind.com directorio industrial</div>
            <div>• Costo construcción nueva planta: $190.000-$220.000/pie lineal de caldero — John Malone, finishing.com (50 años experiencia)</div>
            <div>• Mercado global galvanizado: $105,59B (2025) → $166,66B (2034), CAGR 5,2% — Market Research Future</div>
          </div>
        </div>
      </div>
    </div>
  );
}

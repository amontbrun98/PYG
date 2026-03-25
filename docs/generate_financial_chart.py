"""
PYGLARA — Financial History: USD Equivalent Chart (3 Best Years)
Source: Ing. Miriam formulario (2026-03-24)

Exchange rate methodology:
- 2005-2006: Old Bolivares at CADIVI rate 2,150 Bs/USD (= 2.15 Bs.F/USD)
- 2007-2009: Bolivar Fuerte at 2.15 Bs.F/USD (official CADIVI)
- 2010-2012: Bolivar Fuerte at 4.30 Bs.F/USD (post-devaluation Jan 2010)
- 2013: Bolivar Fuerte at 6.30 Bs.F/USD (CENCOEX, Feb 2013 devaluation)
- 2014: Bolivar Fuerte at 50 Bs.F/USD (SICAD II market rate)
- 2015: Bolivar Fuerte at 200 Bs.F/USD (SIMADI average)

Note: 2014-2015 official rate (6.30) was not market-reflective.
Using market-adjacent rates (SICAD II / SIMADI) for those years.
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import numpy as np

# -- Raw data from Ing. Miriam (Bolivares) ----------------------------
# VT = Ventas Totales, GO = Gastos Operativos, UE = Utilidad Neta
data_raw = {
    # year: (VT, GO, UE, currency_type)
    # currency_type: 'old_bs' = pre-2008 Bolivares, 'bsf' = Bolivar Fuerte
    2005: (1_599_457_521.54, 398_179_622.17, 179_954_733.49, 'old_bs'),
    2006: (3_681_798_284.14, 786_872_489.01, 618_282_941.49, 'old_bs'),
    2007: (3_459_902.12, 999_740.72, 589_262.72, 'bsf'),
    2008: (3_597_502.06, 1_224_104.75, 655_278.75, 'bsf'),
    2009: (3_739_046.25, 1_359_356.20, 678_436.62, 'bsf'),
    2010: (3_752_890.24, 2_245_538.26, 711_947.35, 'bsf'),
    2011: (4_981_490.08, 2_831_954.86, 933_908.90, 'bsf'),
    2012: (7_422_523.62, 2_560_033.59, 874_332.50, 'bsf'),
    2013: (7_177_299.23, 3_927_335.79, 606_178.68, 'bsf'),
    2014: (22_945_610.97, 8_506_066.82, 4_248_324.78, 'bsf'),
    2015: (92_545_421.09, 19_307_419.86, 19_676_988.59, 'bsf'),
}

# -- Exchange rates (Bs.F / USD) --------------------------------------
# For old_bs: divide by 1000 first to get Bs.F, then apply Bs.F rate
fx_rates_bsf = {
    2005: 2.15,    # CADIVI (old Bs 2,150 / 1000)
    2006: 2.15,
    2007: 2.15,    # CADIVI
    2008: 2.15,
    2009: 2.15,
    2010: 4.30,    # Post-devaluation
    2011: 4.30,
    2012: 4.30,
    2013: 6.30,    # CENCOEX
    2014: 50.0,    # SICAD II (market-adjacent)
    2015: 200.0,   # SIMADI average (market-adjacent)
}

rate_labels = {
    2005: 'CADIVI', 2006: 'CADIVI', 2007: 'CADIVI', 2008: 'CADIVI',
    2009: 'CADIVI', 2010: 'Post-deval', 2011: 'Post-deval',
    2012: 'Post-deval', 2013: 'CENCOEX', 2014: 'SICAD II',
    2015: 'SIMADI',
}

# -- Convert to USD ---------------------------------------------------
usd_data = {}
for year, (vt, go, ue, ctype) in data_raw.items():
    rate = fx_rates_bsf[year]
    if ctype == 'old_bs':
        # Convert old Bs to Bs.F first (divide by 1000)
        vt_bsf = vt / 1000
        go_bsf = go / 1000
        ue_bsf = ue / 1000
    else:
        vt_bsf = vt
        go_bsf = go
        ue_bsf = ue
    usd_data[year] = {
        'sales': vt_bsf / rate,
        'expenses': go_bsf / rate,
        'profit': ue_bsf / rate,
        'rate': rate,
        'rate_label': rate_labels[year],
    }

# -- Identify 3 best years by USD sales ------------------------------
sorted_years = sorted(usd_data.keys(), key=lambda y: usd_data[y]['sales'], reverse=True)
top3 = sorted_years[:3]
print("Top 3 years by USD-equivalent sales:")
for y in top3:
    d = usd_data[y]
    print(f"  {y}: Sales ${d['sales']:,.0f}  |  Expenses ${d['expenses']:,.0f}  |  Profit ${d['profit']:,.0f}  |  Rate: {d['rate']} Bs.F/USD ({d['rate_label']})")

# -- Chart: 3 Best Years ---------------------------------------------
fig, axes = plt.subplots(1, 2, figsize=(16, 7), gridspec_kw={'width_ratios': [2, 1.2]})
fig.patch.set_facecolor('#FAFAFA')

# Colors
COLOR_SALES = '#6001D2'
COLOR_EXPENSES = '#E8E0F5'
COLOR_PROFIT = '#00AB44'
COLOR_HIGHLIGHT = '#FF6B00'

# -- Left panel: Grouped bar chart for top 3 -------------------------
ax1 = axes[0]
ax1.set_facecolor('#FAFAFA')

years_top3 = sorted(top3)
x = np.arange(len(years_top3))
width = 0.25

sales_vals = [usd_data[y]['sales'] for y in years_top3]
expense_vals = [usd_data[y]['expenses'] for y in years_top3]
profit_vals = [usd_data[y]['profit'] for y in years_top3]

bars_s = ax1.bar(x - width, sales_vals, width, label='Ventas / Sales',
                 color=COLOR_SALES, edgecolor='white', linewidth=0.5, zorder=3)
bars_e = ax1.bar(x, expense_vals, width, label='Gastos Op. / Expenses',
                 color=COLOR_EXPENSES, edgecolor='#CCC', linewidth=0.5, zorder=3)
bars_p = ax1.bar(x + width, profit_vals, width, label='Utilidad / Net Profit',
                 color=COLOR_PROFIT, edgecolor='white', linewidth=0.5, zorder=3)

# Value labels on bars
for bars in [bars_s, bars_e, bars_p]:
    for bar in bars:
        height = bar.get_height()
        ax1.text(bar.get_x() + bar.get_width()/2., height + 15000,
                 f'${height/1000:,.0f}K',
                 ha='center', va='bottom', fontsize=9, fontweight='bold',
                 color='#333')

# Rate labels below year
rate_info = [f'{usd_data[y]["rate"]} Bs.F/USD\n({usd_data[y]["rate_label"]})' for y in years_top3]
ax1.set_xticks(x)
ax1.set_xticklabels([f'{y}\n{rate_info[i]}' for i, y in enumerate(years_top3)],
                     fontsize=10, fontweight='bold')
ax1.set_ylabel('USD Equivalent', fontsize=12, fontweight='bold')
ax1.set_title('PYGLARA — 3 Mejores Anos en Dolares\n3 Best Years in USD Equivalent',
              fontsize=14, fontweight='bold', pad=15, color='#1A1A1A')
ax1.legend(loc='upper left', framealpha=0.9, fontsize=9)
ax1.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, p: f'${x/1_000_000:.1f}M' if x >= 1_000_000 else f'${x/1000:.0f}K'))
ax1.grid(axis='y', alpha=0.3, zorder=0)
ax1.set_axisbelow(True)
ax1.spines['top'].set_visible(False)
ax1.spines['right'].set_visible(False)

# -- Right panel: Profit margins --------------------------------------
ax2 = axes[1]
ax2.set_facecolor('#FAFAFA')

margins = [(usd_data[y]['profit'] / usd_data[y]['sales']) * 100 for y in years_top3]
bar_colors = [COLOR_PROFIT if m > 15 else COLOR_HIGHLIGHT for m in margins]
bars_m = ax2.barh(range(len(years_top3)), margins, color=bar_colors,
                  edgecolor='white', linewidth=0.5, height=0.5, zorder=3)

for i, (bar, margin) in enumerate(zip(bars_m, margins)):
    ax2.text(bar.get_width() + 0.5, bar.get_y() + bar.get_height()/2,
             f'{margin:.1f}%', va='center', fontsize=11, fontweight='bold', color='#333')

ax2.set_yticks(range(len(years_top3)))
ax2.set_yticklabels([str(y) for y in years_top3], fontsize=12, fontweight='bold')
ax2.set_xlabel('Margen de Utilidad / Profit Margin (%)', fontsize=10, fontweight='bold')
ax2.set_title('Margen Neto\nNet Margin', fontsize=13, fontweight='bold', pad=15, color='#1A1A1A')
ax2.set_xlim(0, max(margins) * 1.3)
ax2.grid(axis='x', alpha=0.3, zorder=0)
ax2.set_axisbelow(True)
ax2.spines['top'].set_visible(False)
ax2.spines['right'].set_visible(False)

# -- Footer -----------------------------------------------------------
fig.text(0.5, -0.02,
         'Fuente: Registros contables parciales, Ing. Miriam (2026-03-24). '
         'Tasas de cambio: CADIVI (2005-09), post-devaluacion (2010-12), CENCOEX/SICAD/SIMADI (2013-15).\n'
         '2015 fue el mejor ano de produccion (675 TM pletinas), pero la tasa SIMADI de 200 Bs.F/USD subestima el valor real.\n'
         'PYGLARA — Prensados y Galvanizados de Lara, S.A.',
         ha='center', fontsize=8, color='#888', style='italic')

plt.tight_layout()
plt.savefig('docs/PYGLARA-Financial-Top3-Years-USD.png', dpi=200, bbox_inches='tight',
            facecolor='#FAFAFA', pad_inches=0.3)
print(f"\nChart saved to docs/PYGLARA-Financial-Top3-Years-USD.png")

# -- Also print full table for reference ------------------------------
print("\n--- Full USD Conversion Table ---")
print(f"{'Year':<6} {'Sales USD':>14} {'Expenses USD':>14} {'Profit USD':>14} {'Margin':>8} {'Rate':>10} {'Regime':<12}")
print("-" * 85)
for year in sorted(usd_data.keys()):
    d = usd_data[year]
    margin = (d['profit'] / d['sales']) * 100 if d['sales'] > 0 else 0
    marker = " <<<" if year in top3 else ""
    print(f"{year:<6} ${d['sales']:>12,.0f} ${d['expenses']:>12,.0f} ${d['profit']:>12,.0f} {margin:>7.1f}% {d['rate']:>9.2f} {d['rate_label']:<12}{marker}")

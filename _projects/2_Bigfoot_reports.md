---
name: "Bigfoot reports: place and season"
title: "Bigfoot reports: place and season"
permalink: /projects/bigfoot-reports/
tools: [Python, Altair, Vega-Lite, Pandas]
image: assets/pngs/bfro-state-rankings.png
description: "Explore where and when BFRO reports were recorded, using a year slider and state selector."
custom_js:
  - bfro-runtime/bfro-vega.min
  - bfro-runtime/bfro-vega-lite.min
  - bfro-runtime/bfro-vega-embed.min
  - bfro-charts
---

<link rel="stylesheet" href="{{ '/assets/css/bfro-report.css' | relative_url }}">
<div class="bfro-report" markdown="1">

<div class="bfro-hero" markdown="1">

# Bigfoot Reports

Two views of 3,663 BFRO reports from 1970–2018. These are report counts, not confirmed sightings or population-adjusted rates.

<div class="bfro-links">
<a class="bfro-button" href="https://github.com/UIUC-iSchool-DataViz/is445_data/blob/main/bfro_reports_fall2022.csv">The Data ↗</a>
<a class="bfro-button bfro-button-secondary" href="https://github.com/justin1540/justin1540.github.io/blob/main/python_notebooks/bfro_reports.ipynb">The Analysis ↗</a>
</div>
</div>

## Plot 1: Reports by State

<div class="bfro-chart-shell">
<div id="bfro-rankings" class="bfro-chart" data-bfro-spec="{{ '/assets/json/bfro-state-rankings.json' | relative_url }}" role="group" aria-label="Interactive bar chart of the top 15 states by report count"></div>
<p class="bfro-chart-status" data-bfro-status="bfro-rankings" role="status">Loading state rankings…</p>
<noscript>Enable JavaScript to view this interactive chart.</noscript>
</div>

The bars rank the 15 states with the most reports in the selected period. State is **nominal (N)** on the y-axis; report count is **quantitative (Q)** on a zero-based x-axis. Uniform teal needs no colormap because bar length already represents count. In Python, I parse dates, remove unusable dates or states, keep 1970–2018, verify unique report IDs, derive year, aggregate state/year counts, and fill missing combinations with zero. Vega-Lite filters years, sums counts, and recalculates the ranking.

## Plot 2: Monthly Patterns

<div class="bfro-chart-shell">
<div id="bfro-monthly" class="bfro-chart" data-bfro-spec="{{ '/assets/json/bfro-monthly-patterns.json' | relative_url }}" role="group" aria-label="Interactive heatmap of monthly report shares by decade and state"></div>
<p class="bfro-chart-status" data-bfro-status="bfro-monthly" role="status">Loading monthly patterns…</p>
<noscript>Enable JavaScript to view this interactive chart.</noscript>
</div>

The heatmap shows each month's share of a decade's reports. Month and decade are **ordinal (O)**; color encodes **quantitative (Q)** share. Sequential **Viridis** uses increasing lightness for higher shares. In Python, I group the same cleaned data by state, decade, and month, add an all-states aggregate, fill missing months with zero, and divide monthly counts by state/decade totals. This normalization highlights seasonality despite different reporting volumes. Gray means no reports in that decade; the color legend rescales by state. The 2010s end in 2018.

### Interactivity

The **year slider** updates counts and rankings, revealing whether patterns persist in recent years. The **state dropdown** isolates seasonal patterns that national totals may hide. Both filter data beyond pan/zoom; hover tooltips provide exact counts and shares.

</div>

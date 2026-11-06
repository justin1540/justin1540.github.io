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
<span class="bfro-eyebrow">IS445 · Python + Altair + Vega-Lite</span>

# Reports from the woods

Where and when were Bigfoot observations **reported**? Two interactive views of the BFRO dataset explore geography and seasonality, using the same dated records from 1970–2018.

<div class="bfro-links">
<a class="bfro-button" href="https://github.com/UIUC-iSchool-DataViz/is445_data/blob/main/bfro_reports_fall2022.csv">The Data <span aria-hidden="true">↗</span></a>
<a class="bfro-button bfro-button-secondary" href="https://github.com/justin1540/justin1540.github.io/blob/main/python_notebooks/bfro_reports.ipynb">The Analysis <span aria-hidden="true">↗</span></a>
</div>
</div>

<p class="bfro-caveat"><strong>Read these as reports, not confirmed sightings.</strong> Totals can reflect population, reporting habits, and collection effort. This analysis does not estimate Bigfoot presence or sightings per person. Recorded dates may be approximate; the 2010s end in 2018.</p>

## 01 / Where reports cluster

Move the year slider to see which states have the most reports from that year through 2018. Hover over a bar for the exact count.

<div class="bfro-chart-shell">
<div id="bfro-rankings" class="bfro-chart" data-bfro-spec="{{ '/assets/json/bfro-state-rankings.json' | relative_url }}" role="group" aria-label="Interactive bar chart of the top 15 states by report count"></div>
<p class="bfro-chart-status" data-bfro-status="bfro-rankings" role="status">Loading state rankings…</p>
<noscript>Enable JavaScript to view this interactive chart.</noscript>
</div>

**Plot 1 — description, design, and transformations.** The horizontal bars show the 15 states with the most BFRO reports in the chosen period. State on the vertical axis is **nominal (N)**; report count on the horizontal axis is **quantitative (Q)** and starts at zero so bar lengths compare fairly. Every bar is the same teal: color has no variable mapping or colormap because length and position already communicate the ranking. In Python, I parse the source dates with `pd.to_datetime(errors="coerce")`, trim state names, remove records without usable dates or states, keep 1970–2018, check report IDs for duplicates, and derive observation year. I group the cleaned rows into state/year counts and fill missing combinations with zero. In the browser, Vega-Lite filters years using the slider, sums reports by state, and recalculates the top 15, breaking count ties alphabetically. These are report totals, not population-adjusted rates.

## 02 / A seasonal signature

Choose a state to explore which months account for a larger share of each decade's reports. Hover over a tile for its count, decade total, and percentage. The two plots use independent controls.

<div class="bfro-chart-shell">
<div id="bfro-monthly" class="bfro-chart" data-bfro-spec="{{ '/assets/json/bfro-monthly-patterns.json' | relative_url }}" role="group" aria-label="Interactive heatmap of monthly report shares by decade and state"></div>
<p class="bfro-chart-status" data-bfro-status="bfro-monthly" role="status">Loading monthly patterns…</p>
<noscript>Enable JavaScript to view this interactive chart.</noscript>
</div>
<p class="bfro-chart-note">Color legend rescales for the selected state. Gray indicates a decade with no dated reports. Use tooltip percentages when comparing states.</p>

**Plot 2 — description, design, and transformations.** The heatmap shows the seasonal distribution of the same cleaned reports, with month and decade as **ordinal (O)** axes in chronological order. Color represents the **quantitative (Q)** share of a decade's reports recorded in each month. I chose sequential **Viridis**, whose ordered lightness progression makes increasing shares readable without implying separate categories. Its legend adjusts to the selected state's shares; gray is reserved for a decade with no reports. In Python, I group records by state, decade, and month, create an all-states aggregate, and reindex all state/decade combinations to all 12 months with zero counts for absent months. Each monthly count is divided by its state/decade total, allowing seasonal patterns to be compared despite different reporting volumes. Tooltips retain both raw counts and percentages, and explicitly identify decades with no reports. This normalization does not adjust for population or reporting effort, and the 2010s contain 2010–2018 only.

### What the interactions add

The **starting-year slider** changes both the counts and the ordering of the state ranking, making it possible to check whether a high all-period total also holds in recent years. The **state dropdown** filters the heatmap so an individual state's seasonal pattern can be inspected without being overwhelmed by the national total. Tooltips reveal exact counts and shares behind the visual encodings. These are data filtering and ranking interactions, beyond built-in pan and zoom; no notebook server is needed to use them.

### Data and reproducibility

The source contains **4,747 reports**. I exclude **950** rows with missing or unparseable dates and **134** dated rows outside 1970–2018; no valid-date rows have missing states. Both plots therefore use the same **3,663 reports across 49 states**. Report IDs are unique in this subset. The notebook includes reconciliation checks for row counts and monthly shares.

The [Python notebook on GitHub](https://github.com/justin1540/justin1540.github.io/blob/main/python_notebooks/bfro_reports.ipynb) reads the original CSV **from its public URL**, documents the transformations, executes both Altair charts, and exports the exact Vega-Lite specifications embedded above. It also records the source file's SHA-256 hash. Install the [notebook requirements](https://github.com/justin1540/justin1540.github.io/blob/main/python_notebooks/requirements-bfro.txt) to rerun it. No witness narratives or exact coordinates are included in the exported chart data.

</div>

/* Uses the specifications exported by python_notebooks/bfro_reports.ipynb. */
(function () {
  async function renderCharts() {
    for (const element of document.querySelectorAll('[data-bfro-spec]')) {
      const status = document.querySelector('[data-bfro-status="' + element.id + '"]');
      try {
        const response = await fetch(element.dataset.bfroSpec);
        if (!response.ok) throw new Error('Chart file returned HTTP ' + response.status);
        const specification = await response.json();
        await vegaEmbed(element, specification, { actions: false, renderer: 'svg' });
        element.dataset.chartReady = 'true';
        if (status) status.hidden = true;
      } catch (error) {
        if (status) {
          status.textContent = 'This chart could not load. Please refresh or open The Analysis for the notebook.';
          status.dataset.error = 'true';
        }
        console.error('BFRO chart failed:', element.id, error);
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderCharts);
  else renderCharts();
}());

(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const progress = document.querySelector('.reading-progress span');

  const updateGiscusTheme = (theme) => {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe || !iframe.contentWindow) return;
    const giscusTheme = theme === 'light' ? 'light' : 'dark_dimmed';
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: giscusTheme } } },
      'https://giscus.app'
    );
  };

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      localStorage.setItem('zaki-theme', next);
      updateGiscusTheme(next);
    });
  }

  const updateProgress = () => {
    if (!progress || !document.querySelector('.prose')) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const value = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    progress.style.transform = `scaleX(${value})`;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
})();


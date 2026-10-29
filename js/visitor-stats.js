(() => {
  const stats = document.querySelector('[data-visitor-stats]');
  if (!stats) return;

  const status = stats.querySelector('[data-stats-status]');
  // 本地预览不计入生产站点，所有页面共用同一站点标识。
  if (location.hostname !== stats.dataset.hostname) {
    status.textContent = ' · 本地预览不计数';
    return;
  }

  const online = stats.querySelector('[data-online-widget]');
  const onlinePlaceholder = online.querySelector('[data-stats-placeholder]');
  const uv = stats.querySelector('#vercount_value_site_uv');
  const pv = stats.querySelector('#vercount_value_site_pv');
  let timedOut = false;
  const onlineLoaded = () => Boolean(online.querySelector('div, img, iframe, a'));
  const totalsLoaded = () => /^\d[\d,]*$/.test(uv.textContent.trim()) && /^\d[\d,]*$/.test(pv.textContent.trim());
  const update = () => {
    const hasOnline = onlineLoaded();
    onlinePlaceholder.hidden = hasOnline;
    if (hasOnline && totalsLoaded()) {
      status.textContent = '';
    } else if (timedOut) {
      status.textContent = ' · 部分统计暂不可用';
    }
  };
  new MutationObserver(update).observe(stats.querySelector('dl'), { childList: true, subtree: true, characterData: true });

  const load = (src) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onerror = () => { timedOut = true; update(); };
    document.body.appendChild(script);
  };

  window._wau = window._wau || [];
  window._wau.push(['small', stats.dataset.onlineKey, 'zaki']);
  load('https://waust.at/s.js');
  load('https://events.vercount.one/js');
  setTimeout(() => { timedOut = true; update(); }, 12000);
})();

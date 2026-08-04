const copy = document.documentElement.lang === 'zh-CN'
  ? { document: '图文文档已保存到本地', video: '视频章节与口播已就绪' }
  : { document: 'Document saved locally', video: 'Video chapters and narration ready' };

document.querySelectorAll('.mode-switch').forEach((group) => {
  const buttons = group.querySelectorAll('button[data-mode]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.toggle('active', item === button));
      const state = group.closest('.scene-panel')?.querySelector('[data-video-state]');
      if (state) state.textContent = copy[button.dataset.mode];
    });
  });
});

const openLinkedDisclosure = () => {
  if (!location.hash) return;
  const target = document.querySelector(location.hash);
  if (target instanceof HTMLDetailsElement) target.open = true;
};

window.addEventListener('hashchange', openLinkedDisclosure);
openLinkedDisclosure();

document.querySelectorAll('[data-analytics-event]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof window.gtag !== 'function') return;

    const eventParameters = {
      link_url: link.href,
      link_text: link.textContent.trim(),
      link_location: link.dataset.analyticsLocation
    };

    if (link.dataset.analyticsEvent === 'stepmark_zip_download') {
      const fileName = new URL(link.href).pathname.split('/').pop() || '';
      Object.assign(eventParameters, {
        download_version: link.dataset.analyticsVersion,
        file_name: decodeURIComponent(fileName),
        file_extension: 'zip',
        site_language: document.documentElement.lang || 'en',
        transport_type: 'beacon'
      });
    }

    window.gtag('event', link.dataset.analyticsEvent, eventParameters);
  });
});

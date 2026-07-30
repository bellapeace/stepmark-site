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

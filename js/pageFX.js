// @ts-nocheck
const LERP_EASE = 0.05;
const PARALLAX_INTENSITY = 0.15;

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function setupLerpScroll({
  wrapperSelector = '#lerp-wrapper',
  ease = LERP_EASE,
  parallaxAttr = 'parallax',
  parallaxIntensity = PARALLAX_INTENSITY
} = {}) {
  const wrapper = document.querySelector(wrapperSelector);

  if (!wrapper) {
    console.warn(`setupLerpScroll: elemento "${wrapperSelector}" não encontrado.`);
    return;
  }

  let current = window.scrollY;
  let target = window.scrollY;

  const parallaxEls = Array.from(document.querySelectorAll(`[${parallaxAttr}]`)).map((el) => ({
    el,
    factor: parseFloat(el.getAttribute(parallaxAttr)) || 1
  }));

  function syncBodyHeight() {
    document.body.style.height = `${wrapper.offsetHeight}px`;
  }

  function updateParallax() {
    const viewportCenter = window.innerHeight / 2;

    parallaxEls.forEach(({ el, factor }) => {
      // Lê em tempo real para não quebrar com carregamento tardio de imagens
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const offsetFromCenter = elementCenter - viewportCenter;

      const translateY = -offsetFromCenter * (factor - 1) * parallaxIntensity;

      // Mantém as variáveis CSS para não conflitar com o script do mouse
      el.style.setProperty('--scroll-y', `${translateY}px`);
      el.style.transform = 'translate3d(var(--mouse-x, 0px), calc(var(--mouse-y, 0px) + var(--scroll-y, 0px)), 0px)';
    });
  }

  function raf() {
    target = window.scrollY;
    current = lerp(current, target, ease);

    const rounded = Math.round(current * 100) / 100;
    wrapper.style.transform = `translate3d(0, ${-rounded}px, 0)`;

    updateParallax();

    const bgEls = document.querySelectorAll('.bg-fixed');
    bgEls.forEach(el => {
      el.style.transform = `translate3d(0, ${rounded * 0.3}px, 0)`;
    });

    requestAnimationFrame(raf);
  }

  window.addEventListener('load', syncBodyHeight);
  window.addEventListener('resize', syncBodyHeight);

  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(syncBodyHeight);
    resizeObserver.observe(wrapper);
  }

  syncBodyHeight();
  raf();
}

document.addEventListener('DOMContentLoaded', () => {
  setupLerpScroll();
});
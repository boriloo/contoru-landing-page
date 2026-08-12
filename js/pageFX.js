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

  let isFxEnabled = true;

  const fxToggleBtn = document.querySelector('.fx-toggle');
  let isMobile = window.innerWidth <= 768;

  if (fxToggleBtn) {
    fxToggleBtn.addEventListener('click', () => {
      isFxEnabled = !isFxEnabled;
      updateState();
    });
  }

  if (window.innerWidth <= 1366) {
    isFxEnabled = false;
    fxToggleBtn.textContent = 'EFEITOS: OFF'
  }

  let currentEase = (isMobile || !isFxEnabled) ? 1 : ease;
  let current = window.scrollY;
  let target = window.scrollY;

  const parallaxEls = Array.from(document.querySelectorAll(`[${parallaxAttr}]`)).map((el) => ({
    el,
    factor: parseFloat(el.getAttribute(parallaxAttr)) || 1
  }));

  function updateState() {
    isMobile = window.innerWidth <= 768;
    currentEase = (isMobile || !isFxEnabled) ? 1 : ease;
  }

  function syncBodyHeight() {
    document.body.style.height = `${wrapper.offsetHeight}px`;
    updateState();
  }

  function updateParallax() {
    const viewportCenter = window.innerHeight / 2;
    const disableFx = isMobile || !isFxEnabled;

    parallaxEls.forEach(({ el, factor }) => {
      if (disableFx) {
        el.style.setProperty('--scroll-y', `0px`);
        el.style.transform = 'translate3d(var(--mouse-x, 0px), var(--mouse-y, 0px), 0px)';
        return;
      }

      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const offsetFromCenter = elementCenter - viewportCenter;

      const translateY = -offsetFromCenter * (factor - 1) * parallaxIntensity;

      el.style.setProperty('--scroll-y', `${translateY}px`);
      el.style.transform = 'translate3d(var(--mouse-x, 0px), calc(var(--mouse-y, 0px) + var(--scroll-y, 0px)), 0px)';
    });
  }

  function raf() {
    target = window.scrollY;
    current = lerp(current, target, currentEase);
    const disableFx = isMobile || !isFxEnabled;

    const rounded = Math.round(current * 100) / 100;
    wrapper.style.transform = `translate3d(0, ${-rounded}px, 0)`;

    updateParallax();

    const bgEls = document.querySelectorAll('.bg-fixed');
    bgEls.forEach(el => {
      el.style.transform = disableFx ? 'translate3d(0, 0px, 0)' : `translate3d(0, ${rounded * 0.3}px, 0)`;
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
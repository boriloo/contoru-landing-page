// @ts-nocheck
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;

    const container = document.querySelector('.flex.flex-col.w-full.max-w-\\[500px\\]');
    const cards = container ? container.querySelectorAll('.parallax') : [];

    let isContainerVisible = true;
    if (container) {
        const observer = new IntersectionObserver((entries) => {
            isContainerVisible = entries[0].isIntersecting;
        }, { threshold: 0 });
        observer.observe(container);
    }

    const bgPanels = document.querySelectorAll('.max-w-\\[1300px\\] div[style*="italy.jpg"]');
    const initialBgPositions = Array.from(bgPanels).map(panel => panel.style.backgroundPosition);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    // Controle do Switch de Efeitos
    let isFxEnabled = true;

    const fxToggleBtn = document.querySelector('.fx-toggle');

    if (fxToggleBtn && !isMobile) {
        fxToggleBtn.addEventListener('click', () => {
            isFxEnabled = !isFxEnabled;
            fxToggleBtn.textContent = isFxEnabled ? 'EFEITOS: ON' : 'EFEITOS: OFF';

            // Reseta os estilos inline quando desativado
            if (!isFxEnabled) {
                cards.forEach((card) => {
                    card.style.removeProperty('--mouse-x');
                    card.style.removeProperty('--mouse-y');
                    card.style.transform = 'translate3d(0px, var(--scroll-y, 0px), 0px)';
                    card.style.backgroundPosition = '50% 50%';
                });

                bgPanels.forEach((panel, index) => {
                    if (initialBgPositions[index]) {
                        const [initX, initY] = initialBgPositions[index].split(' ');
                        panel.style.backgroundPosition = `calc(${initX}) calc(${initY})`;
                    }
                });
            }
        });
    }

    if (window.innerWidth <= 1366) {
        isFxEnabled = false;
        fxToggleBtn.textContent = 'EFEITOS: OFF'
    }

    // Se for mobile, para a execução do script aqui.
    if (isMobile) return;

    window.addEventListener('mousemove', (e) => {
        if (!isFxEnabled) return;
        targetX = e.clientX;
        targetY = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        if (!isFxEnabled) return;
        targetX = window.innerWidth / 2;
        targetY = window.innerHeight / 2;
    });

    function animate() {
        if (isFxEnabled) {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const normalX = (currentX - centerX) / centerX;
            const normalY = (currentY - centerY) / centerY;

            if (isContainerVisible) {
                cards.forEach((card) => {
                    const factor = parseFloat(card.getAttribute('parallax')) || 1;
                    const moveMultiplier = card.classList.contains('faster-card') ? 25 : 10;

                    const moveX = normalX * factor * moveMultiplier;
                    const moveY = normalY * factor * moveMultiplier;
                    const bgX = -(normalX * factor * 15);
                    const bgY = -(normalY * factor * 15);

                    card.style.setProperty('--mouse-x', `${moveX}px`);
                    card.style.setProperty('--mouse-y', `${moveY}px`);
                    card.style.transform = 'translate3d(var(--mouse-x, 0px), calc(var(--mouse-y, 0px) + var(--scroll-y, 0px)), 0px)';
                    card.style.backgroundPosition = `calc(50% + ${bgX}px) calc(50% + ${bgY}px)`;
                });
            }

            bgPanels.forEach((panel, index) => {
                const factor = 1.2;
                const bgX = -(normalX * factor * 15);
                const bgY = -(normalY * factor * 15);

                if (initialBgPositions[index]) {
                    const parts = initialBgPositions[index].split(' ');
                    const initX = parts[0] || '50%';
                    const initY = parts[1] || '50%';
                    panel.style.backgroundPosition = `calc(${initX} + ${bgX}px) calc(${initY} + ${bgY}px)`;
                }
            });
        }

        requestAnimationFrame(animate);
    }

    animate();
});
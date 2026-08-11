document.addEventListener('DOMContentLoaded', () => {
    const triggerSection = document.querySelector('.trigger-section');

    if (triggerSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio >= 0.3) {
                // Ativa a animação quando 30% estiver visível
                triggerSection.classList.add('in-view');
            } else if (entries[0].intersectionRatio === 0) {
                // Remove (reseta) APENAS quando sair 100% da tela
                triggerSection.classList.remove('in-view');
            }
        }, { threshold: [0, 0.3] });

        observer.observe(triggerSection);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.animated-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view'); // Remove se quiser que repita
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
});
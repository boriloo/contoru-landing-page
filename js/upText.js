// @ts-nocheck

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


document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('scale-card');

    // Configura as margens (ignora os primeiros e últimos 30% da tela)
    const options = {
        rootMargin: '-20% 0px -20% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Entrou no meio da tela
            card.classList.remove('scale-10');
            card.classList.add('scale-100');
        } else {
            // Saiu do meio da tela
            card.classList.remove('scale-100');
            card.classList.add('scale-10');
        }
    }, options); // <- options passado aqui

    observer.observe(card);
});
// Reveal each service card as it enters the viewport.
const serviceCards = document.querySelectorAll('.service-card');

const revealCard = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
    });
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(revealCard, { threshold: 0.12 });
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 90}ms`;
        observer.observe(card);
    });
} else {
    serviceCards.forEach((card) => card.classList.add('is-visible'));
}

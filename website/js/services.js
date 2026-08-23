const filterButtons = document.querySelectorAll('.filter-button');
const serviceCards = document.querySelectorAll('.service-card');

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        serviceCards.forEach((card) => {
            card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
        });
    });
});

const revealElements = document.querySelectorAll('.service-card, .process-item, .services-intro-content');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                activeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => {
        element.classList.add('reveal');
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => element.classList.add('revealed'));
}

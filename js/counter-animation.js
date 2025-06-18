// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster
    
    // Check if counters are in view
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const startCounting = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounting(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    startCounting(counter);
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize counter animation
    if (document.querySelector('.counter')) {
        animateCounters();
    }
});

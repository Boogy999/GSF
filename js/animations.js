// Custom Animation Effects

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Text Split Animation
function initTextSplit() {
    const textElements = document.querySelectorAll('.split-text');
    
    textElements.forEach(element => {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span class="word">${word}</span>`
        ).join(' ');
        
        const wordElements = element.querySelectorAll('.word');
        wordElements.forEach((word, index) => {
            word.style.animationDelay = `${index * 0.1}s`;
        });
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Hover Card Effect
function initHoverCards() {
    const cards = document.querySelectorAll('.hover-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Typing Effect
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Staggered Animation
function initStaggeredAnimation() {
    const staggeredElements = document.querySelectorAll('.stagger-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(staggeredElements).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    });
    
    staggeredElements.forEach(element => observer.observe(element));
}

// Floating Animation
function initFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach(element => {
        const duration = element.dataset.duration || 3;
        const delay = element.dataset.delay || 0;
        
        element.style.animation = `floating ${duration}s ease-in-out ${delay}s infinite`;
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initTextSplit();
    initScrollProgress();
    initHoverCards();
    initTypingEffect();
    initStaggeredAnimation();
    initFloatingAnimation();
});

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes floating {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-20px);
        }
        100% {
            transform: translateY(0px);
        }
    }
    
    .word {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.5s ease forwards;
    }
    
    .stagger-item {
        opacity: 0;
        transform: translateY(20px);
    }
    
    .animate-fadeInUp {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// News Card Animations
document.addEventListener('DOMContentLoaded', function() {
    const newsCards = document.querySelectorAll('.news-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    newsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Smooth Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.news-filter');
    const newsGrid = document.getElementById('news-grid');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.filter;
            const cards = newsGrid.querySelectorAll('.news-card');
            
            // Add fade-out effect
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
            });
            
            // Wait for fade-out, then filter and fade-in
            setTimeout(() => {
                cards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            }, 300);
        });
    });
});

// Enhanced Carousel Controls
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('updates-slider');
    const prevButton = document.getElementById('prev-update');
    const nextButton = document.getElementById('next-update');
    let isAnimating = false;
    
    function slide(direction) {
        if (isAnimating) return;
        isAnimating = true;
        
        const currentTransform = new WebKitCSSMatrix(window.getComputedStyle(slider).transform);
        const currentX = currentTransform.m41;
        const slideWidth = slider.offsetWidth;
        const targetX = direction === 'next' ? currentX - slideWidth : currentX + slideWidth;
        
        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(${targetX}px)`;
        
        setTimeout(() => {
            isAnimating = false;
            // Reset position if needed
            if (Math.abs(targetX) >= slideWidth * 3) {
                slider.style.transition = 'none';
                slider.style.transform = 'translateX(0)';
            }
        }, 500);
    }
    
    prevButton.addEventListener('click', () => slide('prev'));
    nextButton.addEventListener('click', () => slide('next'));
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            slide('next');
        } else if (touchEndX > touchStartX + swipeThreshold) {
            slide('prev');
        }
    }
});

// Newsletter Form Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const input = newsletterForm.querySelector('.newsletter-input');
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        
        input.addEventListener('focus', () => {
            newsletterForm.style.transform = 'scale(1.02)';
            newsletterForm.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', () => {
            newsletterForm.style.transform = 'scale(1)';
        });
        
        submitButton.addEventListener('mouseover', () => {
            submitButton.style.transform = 'translateY(-2px)';
            submitButton.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
        
        submitButton.addEventListener('mouseout', () => {
            submitButton.style.transform = 'translateY(0)';
            submitButton.style.boxShadow = 'none';
        });
    }
});

// Enhanced Animations and Transitions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Smooth scroll with enhanced easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });

    // Enhanced hero section animation
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-content', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: "power4.out"
        })
        .from('.hero-image', {
            duration: 1.2,
            scale: 0.8,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=0.8")
        .from('.hero-stats', {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.4");

    // Enhanced scroll animations
    const scrollAnimations = {
        fadeUp: (element) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        },
        fadeIn: (element) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        },
        scaleIn: (element) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            });
        },
        slideIn: (element, direction = 'left') => {
            const x = direction === 'left' ? -100 : 100;
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                x: x,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });
        }
    };

    // Apply scroll animations to elements
    document.querySelectorAll('.animate-fade-up').forEach(element => {
        scrollAnimations.fadeUp(element);
    });

    document.querySelectorAll('.animate-fade-in').forEach(element => {
        scrollAnimations.fadeIn(element);
    });

    document.querySelectorAll('.animate-scale-in').forEach(element => {
        scrollAnimations.scaleIn(element);
    });

    document.querySelectorAll('.animate-slide-left').forEach(element => {
        scrollAnimations.slideIn(element, 'left');
    });

    document.querySelectorAll('.animate-slide-right').forEach(element => {
        scrollAnimations.slideIn(element, 'right');
    });

    // Enhanced parallax effect
    gsap.utils.toArray('.parallax').forEach(section => {
        gsap.to(section, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Enhanced hover animations
    const hoverElements = document.querySelectorAll('.hover-effect');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Enhanced news card animations
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        // Hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Scroll animation
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Enhanced carousel animations
    const carousel = document.querySelector('.updates-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentSlide = 0;

        const updateCarousel = () => {
            gsap.to(slides, {
                x: `-${currentSlide * 100}%`,
                duration: 0.5,
                ease: "power2.inOut"
            });
        };

        // Auto-advance with smooth transition
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }, 5000);

        // Touch support with momentum
        let startX, moveX;
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX;
            const diff = moveX - startX;
            gsap.to(slides, {
                x: `-${currentSlide * 100}% + ${diff}px`,
                duration: 0.1
            });
        });

        carousel.addEventListener('touchend', () => {
            const diff = moveX - startX;
            if (Math.abs(diff) > 50) {
                currentSlide = diff > 0 ? 
                    Math.max(0, currentSlide - 1) : 
                    Math.min(slides.length - 1, currentSlide + 1);
            }
            updateCarousel();
        });
    }

    // Enhanced form animations
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        // Focus effect
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Label animation
        const label = input.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
            input.addEventListener('focus', () => {
                gsap.to(label, {
                    y: -20,
                    scale: 0.8,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    gsap.to(label, {
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        }
    });

    // Enhanced button animations
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        button.addEventListener('mousedown', () => {
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.in"
            });
        });

        button.addEventListener('mouseup', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.1,
                ease: "power2.out"
            });
        });
    });

    // Enhanced loading animations
    window.addEventListener('load', () => {
        gsap.to('.loading-overlay', {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                document.querySelector('.loading-overlay').style.display = 'none';
            }
        });
    });
});

// Animated Counter for Impact Numbers
function animateCountUp(element, endValue, duration = 1500) {
    let start = 0;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (endValue - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = endValue.toLocaleString();
        }
    };
    window.requestAnimationFrame(step);
}

function initImpactCounters() {
    const counters = document.querySelectorAll('.impact-value');
    if (!('IntersectionObserver' in window)) {
        // Fallback: animate all immediately
        counters.forEach(counter => {
            const endValue = parseInt(counter.getAttribute('data-count') || counter.textContent.replace(/\D/g, ''));
            animateCountUp(counter, endValue);
        });
        return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const endValue = parseInt(counter.getAttribute('data-count') || counter.textContent.replace(/\D/g, ''));
                animateCountUp(counter, endValue);
                obs.unobserve(counter);
            }
        });
    }, { threshold: 0.6 });
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', initImpactCounters);

// --- Animated SVG Network for Hero Section ---
(function() {
  const svg = document.querySelector('.hero-network');
  if (!svg) return;

  // Node definitions: [id, baseX, baseY, amplitudeX, amplitudeY, speed, phase]
  const nodes = [
    { id: 'node1', baseX: 100,  baseY: 80,   ax: 10, ay: 8,  speed: 1.1, phase: 0 },
    { id: 'node2', baseX: 250,  baseY: 200,  ax: 12, ay: 10, speed: 0.9, phase: 0.5 },
    { id: 'node3', baseX: 600,  baseY: 80,   ax: 14, ay: 7,  speed: 1.3, phase: 1.2 },
    { id: 'node4', baseX: 600,  baseY: 200,  ax: 10, ay: 12, speed: 1.0, phase: 2.1 },
    { id: 'node5', baseX: 600,  baseY: 320,  ax: 8,  ay: 10, speed: 1.2, phase: 1.7 },
    { id: 'node6', baseX: 950,  baseY: 320,  ax: 10, ay: 8,  speed: 1.1, phase: 2.7 },
    { id: 'node7', baseX: 1100, baseY: 80,   ax: 9,  ay: 7,  speed: 1.4, phase: 0.9 },
    { id: 'node8', baseX: 950,  baseY: 80,   ax: 11, ay: 6,  speed: 1.3, phase: 1.5 },
    { id: 'node9', baseX: 250,  baseY: 320,  ax: 7,  ay: 8,  speed: 1.2, phase: 2.3 },
    { id: 'node10',baseX: 1100, baseY: 320,  ax: 8,  ay: 7,  speed: 1.1, phase: 0.3 }
  ];

  // Line definitions: [id, fromNodeIndex, toNodeIndex]
  const lines = [
    { id: 'line1', from: 0, to: 6 },   // node1 to node7
    { id: 'line2', from: 1, to: 4 },   // node2 to node5
    { id: 'line3', from: 8, to: 9 },   // node9 to node10
    { id: 'line4', from: 1, to: 8 },   // node2 to node9
    { id: 'line5', from: 2, to: 4 },   // node3 to node5
    { id: 'line6', from: 3, to: 4 },   // node4 to node5
    { id: 'line7', from: 0, to: 4 },   // node1 to node5
    { id: 'line8', from: 2, to: 6 },   // node3 to node7
    { id: 'line9', from: 5, to: 9 },   // node6 to node10
  ];

  // Store references to SVG elements
  const nodeEls = nodes.map(n => svg.getElementById(n.id));
  const lineEls = lines.map(l => svg.getElementById(l.id));

  function animateNetwork(time) {
    // Animate nodes
    const positions = nodes.map((n, i) => {
      const t = (time / 1000) * n.speed + n.phase;
      const x = n.baseX + Math.sin(t) * n.ax;
      const y = n.baseY + Math.cos(t) * n.ay;
      if (nodeEls[i]) {
        nodeEls[i].setAttribute('cx', x);
        nodeEls[i].setAttribute('cy', y);
      }
      return { x, y };
    });
    // Animate lines
    lines.forEach((l, i) => {
      const from = positions[l.from];
      const to = positions[l.to];
      if (lineEls[i]) {
        lineEls[i].setAttribute('x1', from.x);
        lineEls[i].setAttribute('y1', from.y);
        lineEls[i].setAttribute('x2', to.x);
        lineEls[i].setAttribute('y2', to.y);
      }
    });
    requestAnimationFrame(animateNetwork);
  }
  requestAnimationFrame(animateNetwork);
})(); 
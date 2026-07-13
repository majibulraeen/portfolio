// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

// Back to top button click
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Initialize counters when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.stats-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        animateCounter(counter, target);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
}

// Premium Multi-phrase Typewriter effect
const typewriterElement = document.querySelector('.hero-subtitle');
if (typewriterElement) {
    const phrases = [
        "IT Support Specialist",
        "Web Developer & PHP Programmer",
        "IT Infrastructure Engineer",
        "Systems Administrator"
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeTick() {
        const currentPhrase = phrases[phraseIdx];
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed /= 2; // speed up deleting
        }

        if (!isDeleting && charIdx === currentPhrase.length) {
            typeSpeed = 1500; // pause at peak phrase
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 300; // brief pause before starting next word
        }

        setTimeout(typeTick, typeSpeed);
    }

    // Start typewriter loop
    setTimeout(typeTick, 500);
}

// Animate skill bars on scroll
const skillSection = document.querySelector('#skills-section');
if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = document.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    const finalWidth = bar.style.width || bar.getAttribute('style').match(/width:\s*(\d+)/)[1] + '%';
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = finalWidth;
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillObserver.observe(skillSection);
}

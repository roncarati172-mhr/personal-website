// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Navigation toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Hero animations
const heroTimeline = gsap.timeline();

heroTimeline
    .to('.name-line', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    })
    .to('.hero-tagline', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5')
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5')
    .to('.hero-bg', {
        opacity: 1,
        duration: 2,
        ease: 'power1.out'
    }, '-=1.5');

// Parallax effect for hero background
gsap.to('.hero-bg', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    scale: 1.2,
    opacity: 0
});

// Section header animation
gsap.to('.section-header', {
    scrollTrigger: {
        trigger: '.section-header',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
});

// Gallery items animation
gsap.utils.toArray('.gallery-item').forEach((item, index) => {
    gsap.to(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// About section animation
gsap.to('.about-container', {
    scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
});

// Contact section animation
gsap.to('.contact-container', {
    scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 80;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
    }
    
    lastScroll = currentScroll;
});

// Hover effect for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to(this.querySelector('.artwork-image'), {
            scale: 1.02,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    item.addEventListener('mouseleave', function() {
        gsap.to(this.querySelector('.artwork-image'), {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Cursor effect (optional enhancement)
let cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// Add cursor styles dynamically
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 1px solid var(--accent);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body:hover .custom-cursor {
        opacity: 0.5;
    }
    
    .gallery-item:hover ~ .custom-cursor,
    .gallery-item:hover + * .custom-cursor {
        opacity: 1;
        transform: scale(1.5);
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


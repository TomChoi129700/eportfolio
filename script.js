// ============================================
// Navigation
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Typing Effect
// ============================================
const typingElement = document.getElementById('typing');
const phrases = [
    'Cloud Computing Student',
    'AWS Certified Architect',
    'AI Enthusiast',
    'Mental Health Chatbot Developer'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before new phrase
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// ============================================
// Particle Background
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random color - soft pastel palette
        const colors = ['#9fb4c7', '#c8b8a8', '#d4a89a', '#e4d5c9'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============================================
// Project Gallery
// ============================================
function changeImage(thumb) {
    const mainImage = document.getElementById('main-image');
    const thumbs = document.querySelectorAll('.thumb');
    
    // Update main image with fade effect
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = thumb.src;
        mainImage.style.opacity = '1';
    }, 300);
    
    // Update active state
    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

// Auto-rotate gallery images
let currentImageIndex = 0;
const thumbs = document.querySelectorAll('.thumb');

function autoRotateGallery() {
    currentImageIndex = (currentImageIndex + 1) % thumbs.length;
    changeImage(thumbs[currentImageIndex]);
}

// Auto rotate every 5 seconds
setInterval(autoRotateGallery, 5000);

// ============================================
// Skills Animation
// ============================================
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Intersection Observer for skill animation
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// ============================================
// Scroll Animations
// ============================================
const fadeElements = document.querySelectorAll('.cert-card, .about-content, .project-featured, .contact-content');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.classList.add('fade-in');
    fadeObserver.observe(element);
});

// ============================================
// Collapsible Cards Toggle
// ============================================
function toggleCard(header) {
    const content = header.nextElementSibling;
    const isCurrentlyCollapsed = content.classList.contains('collapsed');
    
    // Toggle classes
    header.classList.toggle('expanded');
    content.classList.toggle('collapsed');
    
    // Add smooth scroll if card is being expanded and not fully in viewport
    if (isCurrentlyCollapsed) {
        setTimeout(() => {
            const rect = header.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // If header is too close to top, scroll it into better view
            if (rect.top < 100) {
                header.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
        }, 100);
    }
}

// ============================================
// Contact Form
// ============================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const mailtoLink = `mailto:tomchoi129700@gmail.com?subject=Portfolio Message from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${name}%0AEmail: ${email}`;
    
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Opening your email client now.');
    
    // Reset form
    contactForm.reset();
});

// ============================================
// Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Mouse Trail Effect
// ============================================
let mouseTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    mouseTrail.push(trail);
    
    if (mouseTrail.length > maxTrailLength) {
        const oldTrail = mouseTrail.shift();
        oldTrail.remove();
    }
    
    setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => trail.remove(), 500);
    }, 100);
});

// ============================================
// Certificate Card Interactive Tilt
// ============================================
const certCards = document.querySelectorAll('.cert-card');

certCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// Project Gallery Zoom Effect
// ============================================
const mainImage = document.getElementById('main-image');

mainImage.addEventListener('click', () => {
    mainImage.classList.toggle('zoomed');
});

// ============================================
// Enhanced Parallax Scrolling Effect
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero parallax with multiple layers
    const heroContent = document.querySelector('.hero-content');
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }
    
    if (heroParticles) {
        heroParticles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Section parallax effects
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const scrollPercentage = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollPercentage > 0 && scrollPercentage < 1) {
            const cards = section.querySelectorAll('.cert-card, .project-featured, .skill-category');
            cards.forEach((card, cardIndex) => {
                const delay = cardIndex * 0.1;
                const offset = Math.max(0, scrollPercentage - delay) * 50;
                card.style.transform = `translateY(${Math.max(0, 30 - offset)}px)`;
                card.style.opacity = Math.min(1, scrollPercentage + 0.3);
            });
        }
    });
});

// ============================================
// Smooth Reveal on Scroll with Stagger
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Stagger children animation
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('revealed');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Apply to all sections and cards
document.querySelectorAll('.section, .cert-card, .project-featured, .about-text').forEach(el => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
});

// ============================================
// Magnetic Button Effect
// ============================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ============================================
// Cursor Follow Effect for Large Screens
// ============================================
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dotX = e.clientX;
        dotY = e.clientY;
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .thumb, .cert-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

// ============================================
// Smooth Number Counter with Intersection Observer
// ============================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        element.textContent = Math.floor(easeOutQuart * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ============================================
// Floating Elements Animation
// ============================================
const floatingElements = document.querySelectorAll('.cert-icon, .contact-icon');
floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.2}s`;
    el.style.animationDuration = `${3 + (index % 3)}s`;
});

// ============================================
// Scroll Progress Indicator
// ============================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ============================================
// Section Background Color Transition
// ============================================
const colorSections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
    colorSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            section.style.transform = 'scale(1)';
            section.style.opacity = '1';
        }
    });
});

// ============================================
// Parallax Scrolling Effect
// ============================================

// ============================================
// Text Reveal Animation
// ============================================
function revealText() {
    const textElements = document.querySelectorAll('.about-text p, .project-info p');
    
    textElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

const aboutSection = document.getElementById('about');
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            revealText();
            textRevealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (aboutSection) {
    textRevealObserver.observe(aboutSection);
}

// ============================================
// Counter Animation for Stats
// ============================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ============================================
// Skill Bars with Percentage Display
// ============================================
function animateSkillsWithPercentage() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const skillName = bar.parentElement.parentElement.querySelector('.skill-name');
        
        // Add percentage to skill name
        const originalText = skillName.textContent;
        
        let currentProgress = 0;
        const updateProgress = () => {
            if (currentProgress <= progress) {
                bar.style.width = currentProgress + '%';
                skillName.textContent = `${originalText} - ${currentProgress}%`;
                currentProgress++;
                setTimeout(updateProgress, 20);
            }
        };
        
        updateProgress();
    });
}

// Update skills observer to use new function
const skillsSectionUpdated = document.getElementById('skills');
const skillsObserverUpdated = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillsWithPercentage();
            skillsObserverUpdated.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (skillsSectionUpdated) {
    skillsObserverUpdated.observe(skillsSectionUpdated);
}

// ============================================
// Button Ripple Effect
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// Console Easter Egg
// ============================================
console.log(`
%c👋 Hi there! Welcome to Choi Ka Ching's Portfolio!
%c🚀 Interested in working together?
%c📧 Contact me at: tomchoi129700@gmail.com
`, 
'color: #9fb4c7; font-size: 16px; font-weight: bold;',
'color: #c8b8a8; font-size: 14px;',
'color: #d4a89a; font-size: 14px;'
);

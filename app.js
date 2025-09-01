// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typedText = document.getElementById('typed-text');
const navbar = document.getElementById('navbar');
const tiltCards = document.querySelectorAll('.tilt-card');
const codeParticles = document.getElementById('code-particles');
const binaryStreams = document.getElementById('binary-streams');
const floatingTech = document.getElementById('floating-tech');

// Typing Animation for Hero Section
const phrases = [
    'Computer Science Undergraduate',
    'Systems Performance Engineer',
    'Graphics Programming Enthusiast',  
    'Performance Optimization Researcher',
    'Hardware-Software Interface Designer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 75 : 120;
    setTimeout(typeText, typingSpeed);
}

// Dynamic Background Animations
function createCodeParticles() {
    const codeSnippets = [
        'int main()', 'void* malloc()', 'glDrawElements()', 'vec3 position',
        '#include <stdio.h>', 'class Renderer', 'template<typename T>',
        'std::vector<float>', 'glm::mat4 mvp', 'extern "C"',
        'namespace Engine', 'virtual ~Destructor()', 'const auto&',
        'alignas(16)', 'constexpr', 'noexcept', 'override'
    ];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        particle.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        codeParticles.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (codeParticles.contains(particle)) {
                codeParticles.removeChild(particle);
            }
        }, 25000);
    }
    
    // Create initial particles
    for (let i = 0; i < 12; i++) {
        setTimeout(() => createParticle(), i * 2000);
    }
    
    // Continue creating particles
    setInterval(createParticle, 3000);
}

function createBinaryStreams() {
    function createStream() {
        const stream = document.createElement('div');
        stream.className = 'binary-stream';
        
        // Generate binary string
        let binaryText = '';
        for (let i = 0; i < 50; i++) {
            binaryText += Math.floor(Math.random() * 2);
            if (i % 8 === 7 && i < 49) binaryText += ' ';
        }
        stream.textContent = binaryText;
        
        // Random horizontal position
        stream.style.left = Math.random() * 95 + '%';
        stream.style.animationDelay = Math.random() * 20 + 's';
        stream.style.animationDuration = (20 + Math.random() * 10) + 's';
        
        binaryStreams.appendChild(stream);
        
        // Remove stream after animation
        setTimeout(() => {
            if (binaryStreams.contains(stream)) {
                binaryStreams.removeChild(stream);
            }
        }, 35000);
    }
    
    // Create initial streams
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createStream(), i * 3000);
    }
    
    // Continue creating streams
    setInterval(createStream, 4000);
}

function createFloatingTech() {
    const techSymbols = ['{ }', '< />', '[ ]', '( )', ':::', '&&', '||', '!=', '==', '++'];
    
    function createTechElement() {
        const element = document.createElement('div');
        element.className = 'tech-element';
        element.textContent = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        
        // Random position
        element.style.left = Math.random() * 80 + 10 + '%';
        element.style.top = Math.random() * 80 + 10 + '%';
        element.style.animationDelay = Math.random() * 12 + 's';
        element.style.animationDuration = (12 + Math.random() * 6) + 's';
        
        floatingTech.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
            if (floatingTech.contains(element)) {
                floatingTech.removeChild(element);
            }
        }, 20000);
    }
    
    // Create initial elements
    for (let i = 0; i < 6; i++) {
        setTimeout(() => createTechElement(), i * 2000);
    }
    
    // Continue creating elements
    setInterval(createTechElement, 5000);
}

// Steam-style 3D Tilt Effect
function initTiltEffect() {
    tiltCards.forEach(card => {
        let isHovering = false;
        let bounds = null;
        
        function updateBounds() {
            bounds = card.getBoundingClientRect();
        }
        
        card.addEventListener('mouseenter', (e) => {
            isHovering = true;
            updateBounds();
            card.style.transition = 'none';
        });

        card.addEventListener('mousemove', (e) => {
            if (!isHovering || !bounds) return;
            
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            // Enhanced tilt calculations
            const rotateX = (y - centerY) / 6;
            const rotateY = (centerX - x) / 6;
            const translateZ = 15;
            const scale = 1.03;
            
            // Apply transform
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(${translateZ}px) 
                scale(${scale})
            `;
            
            // Enhanced shadow effect
            const shadowOffsetX = (x - centerX) / 4;
            const shadowOffsetY = (y - centerY) / 4;
            card.style.boxShadow = `
                ${shadowOffsetX}px ${shadowOffsetY}px 40px rgba(0, 0, 0, 0.25),
                0 0 60px rgba(0, 102, 204, 0.15)
            `;
            
            // Subtle brightness effect
            card.style.filter = 'brightness(1.05)';
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
            card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            card.style.filter = 'brightness(1)';
        });
        
        // Update bounds on window resize
        window.addEventListener('resize', updateBounds);
    });
}

// Smooth scroll function
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Mobile Navigation Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Navigation link functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        // Close mobile menu
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Smooth scroll to target
        smoothScrollTo(targetId);
    });
});

// Hero section buttons functionality
function initHeroButtons() {
    const viewWorkBtn = document.querySelector('.btn--primary[href="#projects"]');
    const getInTouchBtn = document.querySelector('.btn--secondary[href="#contact"]');
    
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo('#projects');
        });
    }
    
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo('#contact');
        });
    }
}

// Navbar scroll effect
function handleNavbarScroll() {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Research items hover fix (prevent white bug)
function initResearchItemsHover() {
    const researchItems = document.querySelectorAll('.research-item');
    
    researchItems.forEach(item => {
        const originalBackground = getComputedStyle(item).backgroundColor;
        
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            // Keep original background color
            item.style.backgroundColor = '#ffffff';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            // Return to original background
            item.style.backgroundColor = '#ffffff';
        });
    });
}

// Contact section social links white hover effect
function initContactSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        const originalColor = getComputedStyle(link).color;
        const span = link.querySelector('span');
        
        link.addEventListener('mouseenter', () => {
            link.style.background = 'var(--color-text-primary)';
            link.style.color = '#ffffff';
            link.style.borderColor = 'var(--color-text-primary)';
            if (span) {
                span.style.color = '#ffffff';
            }
        });

        link.addEventListener('mouseleave', () => {
            link.style.background = '#ffffff';
            link.style.color = 'var(--color-text-primary)';
            link.style.borderColor = 'var(--color-border-light)';
            if (span) {
                span.style.color = 'var(--color-text-primary)';
            }
        });
    });
}

// Enhanced skill tags animation
function initSkillTagAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.background = 'var(--color-primary)';
            tag.style.color = '#ffffff';
            tag.style.transform = 'translateY(-2px)';
            tag.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.background = 'var(--color-light-gray)';
            tag.style.color = 'var(--color-text-primary)';
            tag.style.transform = 'translateY(0)';
            tag.style.boxShadow = 'none';
        });
    });
}

// Scroll animation observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(`
        .skill-category,
        .project-card,
        .research-item,
        .about-card,
        .contact-content > *
    `);

    // Set initial styles and observe elements
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Parallax effect for hero background elements
function initParallaxEffect() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled <= window.innerHeight) {
            const particles = document.querySelectorAll('.code-particle, .binary-stream, .tech-element');
            particles.forEach((particle, index) => {
                const speed = 0.2 + (index % 3) * 0.1;
                particle.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Email copy functionality
function initEmailCopyFeature() {
    const emailLink = document.querySelector('a[href="mailto:myemail@protonmail.com"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText('myemail@protonmail.com').then(() => {
                    showNotification('Email address copied to clipboard!');
                    
                    // Still open email client
                    setTimeout(() => {
                        window.location.href = 'mailto:myemail@protonmail.com';
                    }, 1000);
                }).catch(() => {
                    // Fallback to opening email client
                    window.location.href = 'mailto:myemail@protonmail.com';
                });
            } else {
                // Fallback to opening email client
                window.location.href = 'mailto:myemail@protonmail.com';
            }
        });
    }
}

// Notification system
function showNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Profile placeholder interaction
function initProfileInteraction() {
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    if (profilePlaceholder) {
        let rotationAmount = 0;
        
        profilePlaceholder.addEventListener('mouseenter', () => {
            rotationAmount += 15;
            profilePlaceholder.style.transform = `scale(1.05) rotate(${rotationAmount}deg)`;
        });

        profilePlaceholder.addEventListener('mouseleave', () => {
            profilePlaceholder.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Preload critical images
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1551808525-051d2b2f9af0?w=400&h=250&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1555949963-ff9fe472c2b2?w=400&h=250&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1551808525-063452df8fdf?w=400&h=250&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=250&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop&auto=format'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio loading...');
    
    // Start typing animation
    if (typedText) {
        setTimeout(typeText, 1000);
    }
    
    // Initialize background animations
    createCodeParticles();
    createBinaryStreams();
    createFloatingTech();
    
    // Initialize all interactive features
    initHeroButtons();
    initTiltEffect();
    initResearchItemsHover();
    initContactSocialLinks();
    initSkillTagAnimations();
    initScrollAnimations();
    initEmailCopyFeature();
    initProfileInteraction();
    
    // Set initial active nav link
    updateActiveNavLink();
    
    // Preload images
    preloadImages();
    
    console.log('✨ Portfolio ready!');
});

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleNavbarScroll, 16)); // ~60fps
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reinitialize tilt effect after resize
        initTiltEffect();
    }, 250);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Page visibility API for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Resume animations when page becomes visible
        console.log('🔄 Resuming animations');
    } else {
        // Pause heavy animations when page is hidden
        console.log('⏸️ Pausing animations');
    }
});

// Add loading complete class for CSS animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('🎉 All resources loaded!');
});
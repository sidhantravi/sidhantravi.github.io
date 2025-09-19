// Sidhant Ravi Portfolio JavaScript - Ultimate Enhanced Version with Auto-Detection & Pointer Glow

class PortfolioApp {
    constructor() {
        this.roles = [
            "Computer Science Undergraduate",
            "System Performance Engineer", 
            "Graphics Programming Enthusiast",
            "Performance Optimization Researcher"
        ];
        
        this.currentRoleIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.pauseTime = 2000;
        
        // Animation frame references
        this.animationFrame = null;
        this.lastScrollY = 0;
        
        // Keyboard shortcut indicator
        this.keyboardIndicator = null;
        this.indicatorTimeout = null;
        
        // System theme detection
        this.systemThemeQuery = null;
        this.isManualThemeSet = false;
        
        this.init();
    }
    
    init() {
        this.setupSystemThemeDetection();
        this.setupThemeToggle();
        this.setupKeyboardShortcuts();
        this.createFloatingBubbles();
        this.startTypingAnimation();
        this.setupButtonHandlers();
        this.setupViewMyWorkHoverEffect(); // Apply specific hover effect FIRST
        this.setupEnhancedButtonInteractions();
        this.setupPointerGlowEffect();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupIconAnimations();
        this.setupAccessibility();
        this.optimizePerformance();
        this.initializeKeyboardIndicator();
    }
    
    // Setup specific hover effect for "View My Work" button only
    setupViewMyWorkHoverEffect() {
        const primaryButton = document.querySelector('.btn--primary');
        
        if (primaryButton) {
            // Set consistent transition for smooth animation
            primaryButton.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Mouse enter - apply the exact specified hover effect
            primaryButton.addEventListener('mouseenter', () => {
                primaryButton.style.transform = 'scale(1.03) translateY(-4px)';
                primaryButton.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
            
            // Mouse leave - return to normal state
            primaryButton.addEventListener('mouseleave', () => {
                primaryButton.style.transform = 'scale(1) translateY(0)';
                primaryButton.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        }
    }
    
    // System Theme Auto-Detection
    setupSystemThemeDetection() {
        this.systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Set initial theme based on system preference
        if (!this.isManualThemeSet) {
            const prefersDark = this.systemThemeQuery.matches;
            document.body.setAttribute('data-color-scheme', prefersDark ? 'dark' : 'light');
        }
        
        // Listen for system theme changes
        const handleSystemThemeChange = (e) => {
            if (!this.isManualThemeSet) {
                document.body.setAttribute('data-color-scheme', e.matches ? 'dark' : 'light');
                // Re-create bubbles with new theme colors
                setTimeout(() => {
                    this.createFloatingBubbles();
                }, 100);
            }
        };
        
        // Modern browsers
        if (this.systemThemeQuery.addEventListener) {
            this.systemThemeQuery.addEventListener('change', handleSystemThemeChange);
        } else {
            // Fallback for older browsers
            this.systemThemeQuery.addListener(handleSystemThemeChange);
        }
    }
    
    // Initialize keyboard shortcut indicator
    initializeKeyboardIndicator() {
        this.keyboardIndicator = document.getElementById('keyboardIndicator');
    }
    
    // Show keyboard shortcut indicator
    showKeyboardIndicator(message) {
        if (!this.keyboardIndicator) return;
        
        const textElement = this.keyboardIndicator.querySelector('.keyboard-indicator__text');
        if (textElement) {
            textElement.textContent = message;
        }
        
        this.keyboardIndicator.classList.add('show');
        
        // Clear existing timeout
        if (this.indicatorTimeout) {
            clearTimeout(this.indicatorTimeout);
        }
        
        // Hide after 2 seconds
        this.indicatorTimeout = setTimeout(() => {
            this.keyboardIndicator.classList.remove('show');
        }, 2000);
    }
    
    // Keyboard shortcuts setup
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Theme toggle with 'T' key
            if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                // Don't trigger if user is typing in an input field
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.contentEditable === 'true') {
                    return;
                }
                e.preventDefault();
                this.toggleTheme();
                this.showKeyboardIndicator('Theme toggled with T key');
                return;
            }
            
            // Theme toggle with Ctrl/Cmd + D
            if (e.key.toLowerCase() === 'd' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.toggleTheme();
                this.showKeyboardIndicator('Theme toggled with ' + (e.metaKey ? 'Cmd' : 'Ctrl') + '+D');
                return;
            }
        });
    }
    
    // Centralized theme toggle function
    toggleTheme() {
        const body = document.body;
        
        // Mark as manually set
        this.isManualThemeSet = true;
        
        const currentTheme = body.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-color-scheme', newTheme);
        
        // Add theme transition effect
        body.style.transition = 'all 0.5s ease';
        
        // Force re-render of bubbles with new theme colors
        setTimeout(() => {
            this.createFloatingBubbles();
        }, 100);
        
        // Reset transition after change
        setTimeout(() => {
            body.style.transition = '';
        }, 500);
        
        // Add visual feedback to theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.transform = 'scale(1.1)';
            themeToggle.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 200);
        }
    }
    
    // Enhanced Icon Animations Setup - Updated for removed icons
    setupIconAnimations() {
        // Only education icon remains - enhanced interaction
        const educationSection = document.querySelector('#education');
        const educationIcon = document.querySelector('.education-icon');
        
        if (educationSection && educationIcon) {
            educationSection.addEventListener('mouseenter', () => {
                educationIcon.style.animation = 'bookOpen 0.6s ease-out';
            });
            
            educationSection.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    educationIcon.style.animation = '';
                }, 600);
            });
        }
    }
    
    // Pointer Glow Effect Setup - Enhanced visibility
    setupPointerGlowEffect() {
        const glowButtons = document.querySelectorAll('.pointer-glow-btn');
        
        glowButtons.forEach(button => {
            let isHovering = false;
            
            // Mouse enter - start tracking
            button.addEventListener('mouseenter', () => {
                isHovering = true;
                button.style.setProperty('--glow-opacity', '0.4');
            });
            
            // Mouse leave - stop tracking
            button.addEventListener('mouseleave', () => {
                isHovering = false;
                button.style.setProperty('--glow-opacity', '0');
                // Reset to center when leaving
                button.style.setProperty('--glow-x', '50%');
                button.style.setProperty('--glow-y', '50%');
            });
            
            // Mouse move - update glow position with enhanced tracking
            button.addEventListener('mousemove', (e) => {
                if (!isHovering) return;
                
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Convert to percentage for CSS with bounds checking
                const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));
                
                // Use requestAnimationFrame for smooth updates
                requestAnimationFrame(() => {
                    button.style.setProperty('--glow-x', `${xPercent}%`);
                    button.style.setProperty('--glow-y', `${yPercent}%`);
                    button.style.setProperty('--glow-opacity', '0.5');
                });
            });
            
            // Touch support for mobile with enhanced feedback
            button.addEventListener('touchstart', (e) => {
                if (e.touches.length > 0) {
                    const rect = button.getBoundingClientRect();
                    const touch = e.touches[0];
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;
                    
                    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
                    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));
                    
                    button.style.setProperty('--glow-x', `${xPercent}%`);
                    button.style.setProperty('--glow-y', `${yPercent}%`);
                    button.style.setProperty('--glow-opacity', '0.4');
                }
            }, { passive: true });
            
            button.addEventListener('touchend', () => {
                button.style.setProperty('--glow-opacity', '0');
            }, { passive: true });
        });
    }
    
    // Enhanced button interactions - EXCLUDING primary button from general hover handling
    setupEnhancedButtonInteractions() {
        const buttons = document.querySelectorAll('.btn:not(.btn--primary)'); // Exclude primary button
        
        buttons.forEach(button => {
            // General button interactions for secondary button only
            const handlePointerDown = (e) => {
                button.style.transform = 'scale(0.95)';
                button.style.transition = 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                
                // Add ripple effect
                this.createRippleEffect(button, e);
                
                // Add shadow pulse
                this.addShadowPulse(button);
            };
            
            const handlePointerUp = () => {
                button.style.transform = '';
                button.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            };
            
            const handleMouseEnter = () => {
                button.style.transform = 'translateY(-3px) scale(1.02)';
                button.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            };
            
            const handleMouseLeave = () => {
                button.style.transform = '';
                button.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            };
            
            // Add event listeners
            button.addEventListener('mousedown', handlePointerDown);
            button.addEventListener('touchstart', handlePointerDown, { passive: true });
            button.addEventListener('mouseup', handlePointerUp);
            button.addEventListener('touchend', handlePointerUp, { passive: true });
            button.addEventListener('mouseenter', handleMouseEnter);
            button.addEventListener('mouseleave', handleMouseLeave);
            
            // Keyboard interaction
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handlePointerDown(e);
                }
            });
            
            button.addEventListener('keyup', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handlePointerUp();
                }
            });
        });
        
        // Handle primary button click interactions only (not hover)
        const primaryButton = document.querySelector('.btn--primary');
        if (primaryButton) {
            const handlePointerDown = (e) => {
                // Don't interfere with the hover effect, just handle click
                this.createRippleEffect(primaryButton, e);
                this.addShadowPulse(primaryButton);
            };
            
            primaryButton.addEventListener('mousedown', handlePointerDown);
            primaryButton.addEventListener('touchstart', handlePointerDown, { passive: true });
            
            // Keyboard interaction
            primaryButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handlePointerDown(e);
                }
            });
        }
    }
    
    // Create ripple effect on button click
    createRippleEffect(button, e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (e.clientX || e.touches?.[0]?.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
        const y = (e.clientY || e.touches?.[0]?.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
            z-index: 3;
        `;
        
        // Add ripple keyframes if not already added
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add shadow pulse effect
    addShadowPulse(button) {
        const originalBoxShadow = window.getComputedStyle(button).boxShadow;
        button.style.boxShadow = '0 0 30px rgba(50, 184, 198, 0.6), ' + originalBoxShadow;
        
        setTimeout(() => {
            button.style.boxShadow = '';
        }, 300);
    }
    
    // Theme Toggle Functionality - Enhanced with proper click handling
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (themeToggle) {
            // Click event handler
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
            
            // Keyboard support
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }
    
    // Enhanced Floating Bubbles with Dynamic Colors
    createFloatingBubbles() {
        const layer1 = document.getElementById('bubblesLayer1');
        const layer2 = document.getElementById('bubblesLayer2');
        
        if (!layer1 || !layer2) return;
        
        layer1.innerHTML = '';
        layer2.innerHTML = '';
        
        // Layer 1 - Primary bubbles (closer, more visible)
        this.createBubbleLayer(layer1, 8, 'bubble', 1);
        
        // Layer 2 - Secondary bubbles (further, more subtle)
        this.createBubbleLayer(layer2, 6, 'bubble bubble-secondary', 0.7);
    }
    
    createBubbleLayer(container, count, className, opacityMultiplier) {
        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.className = className;
            
            // Random size between 15px and 90px
            const size = Math.random() * 75 + 15;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Random horizontal position
            bubble.style.left = `${Math.random() * 100}%`;
            
            // Random animation delay
            bubble.style.animationDelay = `${Math.random() * 20}s`;
            
            // Random animation duration
            const duration = Math.random() * 15 + 15;
            bubble.style.animationDuration = `${duration}s`;
            
            // Adjust opacity
            bubble.style.opacity = Math.random() * 0.3 * opacityMultiplier;
            
            container.appendChild(bubble);
        }
    }
    
    // Enhanced Typing Animation
    startTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        if (!typingElement) return;
        
        const typeText = () => {
            const currentRole = this.roles[this.currentRoleIndex];
            
            if (this.isDeleting) {
                // Deleting text
                typingElement.textContent = currentRole.substring(0, this.currentCharIndex - 1);
                this.currentCharIndex--;
                
                if (this.currentCharIndex === 0) {
                    this.isDeleting = false;
                    this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
                    setTimeout(typeText, this.typingSpeed);
                } else {
                    setTimeout(typeText, this.deletingSpeed);
                }
            } else {
                // Typing text
                typingElement.textContent = currentRole.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;
                
                if (this.currentCharIndex === currentRole.length) {
                    this.isDeleting = true;
                    setTimeout(typeText, this.pauseTime);
                } else {
                    setTimeout(typeText, this.typingSpeed);
                }
            }
        };
        
        // Start typing animation
        setTimeout(typeText, 1000);
    }
    
    // Button click handlers
    setupButtonHandlers() {
        const primaryBtn = document.querySelector('.btn--primary');
        const secondaryBtn = document.querySelector('.btn--secondary');
        
        if (primaryBtn) {
            primaryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo('#projects');
            });
        }
        
        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo('#contact');
            });
        }
    }
    
    // Enhanced smooth scrolling with easing
    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.abs(distance) > 1000 ? 1200 : 800;
        let start = null;
        
        const easeInOutQuart = (t) => {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
        };
        
        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuart(progress);
            
            window.scrollTo(0, startPosition + (distance * ease));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                
                if (targetId === '#home') {
                    this.smoothScrollTo('body');
                } else {
                    this.smoothScrollTo(targetId);
                }
            });
        });
    }
    
    // Enhanced Scroll-based Section Animations with Different Effects
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Different animation delays based on class
                    let delay = 0;
                    if (element.classList.contains('animate-slide-up')) {
                        delay = 200;
                    } else if (element.classList.contains('animate-zoom-in')) {
                        delay = 400;
                    } else if (element.classList.contains('animate-fade-up')) {
                        delay = 600;
                    } else if (element.classList.contains('animate-stagger-up')) {
                        // Staggered animation for buttons
                        const children = element.children;
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, index * 150);
                        });
                        delay = 800;
                    }
                    
                    setTimeout(() => {
                        element.classList.add('animate-in');
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        const animateElements = document.querySelectorAll(
            '.animate-slide-up, .animate-fade-up, .animate-zoom-in, .animate-stagger-up'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
        
        // Also observe sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const animatedContent = section.querySelectorAll('.animate-slide-up, .animate-fade-up');
            animatedContent.forEach(el => {
                observer.observe(el);
            });
        });
    }
    
    // Enhanced parallax effects for background layers
    setupParallaxEffects() {
        const layer1 = document.getElementById('bubblesLayer1');
        const layer2 = document.getElementById('bubblesLayer2');
        
        if (!layer1 || !layer2) return;
        
        const parallaxScroll = () => {
            const scrolled = window.pageYOffset;
            const rate1 = scrolled * -0.3; // Slower parallax for layer 1
            const rate2 = scrolled * -0.1; // Even slower for layer 2
            
            layer1.style.transform = `translate3d(0, ${rate1}px, 0)`;
            layer2.style.transform = `translate3d(0, ${rate2}px, 0)`;
        };
        
        // Use requestAnimationFrame for smooth performance
        const onScroll = () => {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            
            this.animationFrame = requestAnimationFrame(parallaxScroll);
        };
        
        window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    // Enhanced scroll effects
    setupScrollEffects() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let ticking = false;
        
        const updateHeader = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Enhanced header shadow and backdrop blur
            if (scrollTop > 10) {
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.boxShadow = 'none';
                header.style.backdropFilter = 'blur(10px)';
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // Enhanced accessibility
    setupAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Enhanced keyboard navigation
        this.setupKeyboardNavigation();
        
        // ARIA live region for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
        
        // Announce section changes
        this.setupSectionAnnouncements();
    }
    
    setupKeyboardNavigation() {
        // Tab trap for theme toggle
        const themeToggle = document.getElementById('themeToggle');
        const navLinks = document.querySelectorAll('.nav__link');
        const buttons = document.querySelectorAll('.btn');
        
        const focusableElements = [...navLinks, themeToggle, ...buttons];
        
        // Add tabindex to ensure proper tab order
        focusableElements.forEach((el, index) => {
            el.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });
        
        // Arrow key navigation for nav menu
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                let targetIndex;
                
                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        targetIndex = (index + 1) % navLinks.length;
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        targetIndex = (index - 1 + navLinks.length) % navLinks.length;
                        break;
                    case 'Home':
                        e.preventDefault();
                        targetIndex = 0;
                        break;
                    case 'End':
                        e.preventDefault();
                        targetIndex = navLinks.length - 1;
                        break;
                    default:
                        return;
                }
                
                navLinks[targetIndex].focus();
            });
        });
    }
    
    setupSectionAnnouncements() {
        const sections = document.querySelectorAll('.section');
        const liveRegion = document.getElementById('live-region');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const sectionTitle = entry.target.querySelector('.section__title');
                    if (sectionTitle && liveRegion) {
                        liveRegion.textContent = `Entered ${sectionTitle.textContent} section`;
                    }
                }
            });
        }, { threshold: 0.5 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Performance optimizations
    optimizePerformance() {
        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.createFloatingBubbles();
            }, 250);
        });
        
        // Passive event listeners where possible
        document.addEventListener('wheel', () => {}, { passive: true });
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });
        
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.documentElement.style.setProperty('--duration-normal', '150ms');
            document.documentElement.style.setProperty('--duration-fast', '100ms');
        }
        
        // Battery-aware animations
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2) {
                    document.documentElement.classList.add('low-battery');
                }
            });
        }
        
        // Add performance optimization for animations
        this.optimizeAnimationPerformance();
    }
    
    // Optimize animation performance
    optimizeAnimationPerformance() {
        // Use will-change property for animated elements
        const animatedElements = document.querySelectorAll('.btn, .bubble, .typing-text, .section-icon');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
        
        // Use transform3d to trigger hardware acceleration
        const transforms = document.querySelectorAll('.btn, .section-icon');
        transforms.forEach(el => {
            const originalTransform = el.style.transform || '';
            if (!originalTransform.includes('translate3d')) {
                el.style.transform = `translate3d(0, 0, 0) ${originalTransform}`;
            }
        });
    }
}

// Enhanced logo interactions
function setupLogoEnhancements() {
    const logo = document.querySelector('.logo-text');
    if (!logo) return;
    
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.1) rotate(10deg)';
        logo.style.textShadow = '0 0 20px rgba(50, 184, 198, 0.5)';
        logo.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1) rotate(0deg)';
        logo.style.textShadow = 'none';
    });
    
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        // Add click animation
        logo.style.transform = 'scale(0.95) rotate(0deg)';
        setTimeout(() => {
            logo.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Global app instance
let portfolioApp;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    portfolioApp = new PortfolioApp();
    setupLogoEnhancements();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Preload critical resources
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
    
    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

// Enhanced mobile interaction handling
let lastTapTime = 0;
document.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    
    if (tapLength < 500 && tapLength > 0) {
        e.preventDefault();
        e.target.blur(); // Remove focus to prevent outline
    }
    
    lastTapTime = currentTime;
}, { passive: false });

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.warn('Portfolio error:', e.error);
    // Graceful degradation - ensure basic functionality works
    if (e.error.message.includes('animation')) {
        document.documentElement.style.setProperty('--duration-normal', '0ms');
        document.documentElement.style.setProperty('--duration-fast', '0ms');
    }
});

// Page visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.documentElement.classList.add('paused');
    } else {
        // Resume animations
        document.documentElement.classList.remove('paused');
        if (portfolioApp) {
            portfolioApp.createFloatingBubbles();
        }
    }
});

// Intersection Observer polyfill fallback
if (!window.IntersectionObserver) {
    // Fallback for older browsers
    window.addEventListener('scroll', () => {
        const animateElements = document.querySelectorAll('.animate-slide-up:not(.animate-in), .animate-fade-up:not(.animate-in), .animate-zoom-in:not(.animate-in), .animate-stagger-up:not(.animate-in)');
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('animate-in');
            }
        });
    });
}
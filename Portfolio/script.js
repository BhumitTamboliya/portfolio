// JavaScript for interactivity and animations
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Custom smooth scroll function with easing
    function smoothScrollTo(targetPosition, duration = 1000) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // Easing function
        function easeInOutCubic(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t + b;
            t -= 2;
            return c/2*(t*t*t + 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight + 20; // Add 20px padding
                
                smoothScrollTo(targetPosition, 1000);
                
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Force skills section visibility
    function ensureSkillsVisible() {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.style.display = 'block';
            skillsSection.style.visibility = 'visible';
            skillsSection.style.opacity = '1';
            skillsSection.classList.add('skills-section-visible');
        }
        
        // Make all skill cards visible
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            card.style.display = 'flex';
            card.style.visibility = 'visible';
            card.style.opacity = '1';
        });
        
        // Make skill bars visible and animated
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            bar.style.display = 'block';
            bar.style.visibility = 'visible';
            bar.style.opacity = '1';
            
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                if (progress) {
                    bar.style.width = progress + '%';
                }
            }, 500 + (index * 100));
        });
    }

    // Skills section animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        const progress = entry.target.getAttribute('data-progress');
                        if (progress) {
                            entry.target.style.width = progress + '%';
                        }
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        skillBars.forEach(bar => {
            bar.style.width = '0';
            observer.observe(bar);
        });
    }

    // Initialize skills visibility and animations
    ensureSkillsVisible();
    
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1000,
        once: false,
        easing: 'ease-out-cubic',
        mirror: true,
        offset: 100,
        disable: 'mobile',
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        delay: 0
    });

    // Add scroll-triggered animations for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateOnScroll = () => {
        skillCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            const isVisible = (cardTop >= 0) && (cardBottom <= window.innerHeight);
            
            if (isVisible) {
                card.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.1}s`;
                card.classList.add('visible');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Initialize skill bar animations after a delay
    setTimeout(() => {
        animateSkillBars();
    }, 1000);

    // Create floating particles
    function createParticles() {
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'particles';
            heroSection.appendChild(particlesContainer);
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }
    }
    
    // Initialize particles
    createParticles();

    // Typing animation for hero section
    function typeWriter() {
        const textElement = document.querySelector('#home h1 span');
        if (!textElement) return;
        
        const words = ['Bhumit', 'a Developer', 'a Creator', 'an Innovator'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                textElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 100 : 150;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing animation after page load
        setTimeout(type, 1000);
    }

    // Initialize typing animation
    typeWriter();

    // Enhanced project card interactions
    function enhanceProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            });
        });
    }
    
    enhanceProjectCards();

    // Parallax effect for hero section
    function parallaxEffect() {
        const hero = document.querySelector('#home');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = document.querySelector('nav');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(parallaxEffect);
        handleNavbarScroll();
    });

    // Section visibility animation
    function initSectionAnimations() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        sections.forEach(section => {
            section.classList.add('section-animate');
            sectionObserver.observe(section);
        });
    }

    // Initialize section animations
    initSectionAnimations();

    // Form validation and enhancement
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    this.parentElement.classList.remove('focused');
                }
            });

            input.addEventListener('input', function() {
                // Remove error state when user starts typing
                this.parentElement.classList.remove('error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.style.display = 'none';
                }
            });
        });
    }

    // Smooth reveal for skill cards
    function revealSkillCards() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Initialize skill cards reveal
    setTimeout(revealSkillCards, 500);

    // Loading screen completion
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        // Ensure skills are visible after load
        setTimeout(ensureSkillsVisible, 100);
    });

    // Performance optimization: throttle scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateActiveNav();
                scrollTimeout = null;
            }, 10);
        }
    });

    console.log('Portfolio loaded successfully! ✨');
    console.log('Skills section visibility ensured.');
});

// Additional function to ensure skills are always visible
function forceSkillsVisibility() {
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsSection.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important;';
        
        const skillElements = skillsSection.querySelectorAll('*');
        skillElements.forEach(el => {
            if (el.classList.contains('skill-bar') || el.classList.contains('skill-progress') || el.classList.contains('skill-item') || el.classList.contains('skill-card')) {
                el.style.cssText = 'display: block !important; visibility: visible !important; opacity: 1 !important;';
            }
        });
    }
}

// Call this function multiple times to ensure visibility
setTimeout(forceSkillsVisibility, 100);
setTimeout(forceSkillsVisibility, 500);
setTimeout(forceSkillsVisibility, 1000);
// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Navigation Scroll Effect
    // ============================================
    const nav = document.getElementById('nav');
    
    // Optimisation : Utilisation de requestAnimationFrame pour le scroll event
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    let menuOpen = false;

    function toggleMenu() {
        menuOpen = !menuOpen;
        
        if (menuOpen) {
            mobileMenu.classList.remove('hidden');
            // Petit délai pour permettre la transition CSS
            setTimeout(() => {
                mobileMenu.classList.add('opacity-100');
                mobileMenu.classList.remove('opacity-0');
            }, 10);
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('opacity-100');
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 500);
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // ============================================
    // Smooth Scroll
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offset = 80; // Ajustement pour la navbar fixe
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Scroll Reveal Animation (Intersection Observer)
    // ============================================
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // On arrête d'observer une fois révélé
            }
        });
    }, revealOptions);

    // Initialiser les éléments à révéler
    // Ajoute automatiquement la classe .reveal aux éléments clés s'ils ne l'ont pas déjà
    const elementsToAnimate = document.querySelectorAll(
        'section h2, section h3, section p, .collection-card, .faq-item, article, .gallery-item, .bento-cell'
    );

    elementsToAnimate.forEach((el) => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // Observer également les éléments ayant déjà la classe .reveal
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ============================================
    // Parallax Effect (Simplifié et optimisé)
    // ============================================
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                el.style.backgroundPosition = `center ${yPos}px`;
            });
        }, { passive: true });
    }

    // ============================================
    // FAQ Accordion (Amélioré)
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Initialiser les réponses comme cachées (pas .hidden, mais via CSS)
            answer.classList.remove('hidden');
            
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                
                // Fermer tous les autres items (accordéon exclusif)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('open');
                    }
                });
                
                // Toggle l'item actuel avec animation
                if (isOpen) {
                    item.classList.remove('open');
                } else {
                    item.classList.add('open');
                    
                    // Scroll vers la question si nécessaire
                    setTimeout(() => {
                        const rect = item.getBoundingClientRect();
                        if (rect.top < 100) {
                            window.scrollBy({
                                top: rect.top - 120,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                }
            });
        }
    });

    // ============================================
    // Micro-interactions : Hover Effects
    // ============================================
    // Ajoute la classe hover-lift aux boutons et cartes automatiquement
    const interactives = document.querySelectorAll('.btn-primary, article, .collection-card');
    interactives.forEach(el => {
        el.classList.add('hover-lift');
    });

    console.log('🌸 Les Fleurs de Nila — Animations chargées');
});

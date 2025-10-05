// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Navigation Scroll Effect
    // ============================================
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
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

    mobileMenuBtn.addEventListener('click', toggleMenu);

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
                const offset = 96; // Navigation height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Intersection Observer for Fade In Animations
    // ============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with scroll reveal
    const animatedElements = document.querySelectorAll('.collection-card, .gallery-item');
    animatedElements.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        el.dataset.delay = index * 80;
        observer.observe(el);
    });

    // Also observe section headers
    const sectionHeaders = document.querySelectorAll('section > div > div:first-child');
    sectionHeaders.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        el.dataset.delay = 100;
        observer.observe(el);
    });

    // ============================================
    // Gallery Lightbox
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            createLightbox(img.src, img.alt);
        });
    });

    function createLightbox(src, alt) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-primary/95 z-[100] flex items-center justify-center p-6 cursor-pointer';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s ease';
        
        // Create image container
        const container = document.createElement('div');
        container.className = 'max-w-5xl w-full relative';
        container.style.opacity = '0';
        container.style.transform = 'scale(0.9)';
        container.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Create image
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.className = 'w-full h-auto max-h-[85vh] object-contain';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.className = 'absolute -top-12 right-0 text-cream text-5xl font-light hover:text-accent transition-colors';
        closeBtn.setAttribute('aria-label', 'Fermer');
        
        container.appendChild(img);
        container.appendChild(closeBtn);
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 10);
        
        // Close handlers
        function closeLightbox() {
            overlay.style.opacity = '0';
            container.style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }, 300);
        }
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target === closeBtn) {
                closeLightbox();
            }
        });
        
        closeBtn.addEventListener('click', closeLightbox);
        
        document.addEventListener('keydown', function handleEscape(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleEscape);
            }
        });
    }

    // ============================================
    // Parallax Effect (sophisticated)
    // ============================================
    
    // Hero image parallax
    const heroImage = document.querySelector('.hero-image');
    
    // Collection cards images parallax
    const collectionImages = document.querySelectorAll('.collection-card img');
    
    // About section image parallax
    const aboutImage = document.querySelector('#a-propos img');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        // Hero parallax (subtle downward movement)
        if (heroImage) {
            const heroRect = heroImage.getBoundingClientRect();
            if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
                const movement = scrolled * 0.15;
                heroImage.style.transform = `translate3d(0, ${movement}px, 0) scale(1.05)`;
            }
        }
        
        // Collection images parallax (upward movement on scroll)
        collectionImages.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const movement = scrollProgress * 30 - 15; // Range: -15px to +15px
                img.style.transform = `translate3d(0, ${movement}px, 0)`;
            }
        });
        
        // About image parallax
        if (aboutImage) {
            const rect = aboutImage.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                const movement = scrollProgress * 40 - 20;
                aboutImage.style.transform = `translate3d(0, ${movement}px, 0) scale(1.02)`;
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // ============================================
    // Lazy Loading Images
    // ============================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Preload Critical Images
    // ============================================
    const criticalImages = ['images/devanture1.jpg', 'images/fleuristeRose.jpg'];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // ============================================
    // Performance: Debounce Resize
    // ============================================
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    }, { passive: true });

    // Add CSS for resize animation stopper
    const style = document.createElement('style');
    style.textContent = `
        .resize-animation-stopper * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // Accessibility: Focus Management
    // ============================================
    const focusableElements = document.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select'
    );
    
    focusableElements.forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outlineOffset = '4px';
        });
    });

    // ============================================
    // Performance: Request Animation Frame
    // ============================================
    // (Handled by parallax function above)

    // ============================================
    // Carousel for Large Visuals
    // ============================================
    const carouselSlides = [
        [
            { src: 'images/aestethic1.jpg', alt: 'Création florale' },
            { src: 'images/SecBeau2.jpg', alt: 'Composition séchée' },
            { src: 'images/aestethic2.jpg', alt: 'Bouquet élégant' }
        ],
        [
            { src: 'images/SecBleu1.jpg', alt: 'Fleurs bleues séchées' },
            { src: 'images/aestethic3.jpg', alt: 'Arrangement artistique' },
            { src: 'images/aestethic4.jpg', alt: 'Composition raffinée' }
        ],
        [
            { src: 'images/bouquet2.jpg', alt: 'Bouquet frais' },
            { src: 'images/bouquetSEC.jpg', alt: 'Bouquet séché' },
            { src: 'images/global1.jpg', alt: 'Vue d\'ensemble' }
        ]
    ];

    let currentSlide = 0;
    const carouselContainer = document.querySelector('.carousel-slide');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    function updateCarousel() {
        if (!carouselContainer) return;
        
        const slides = carouselSlides[currentSlide];
        carouselContainer.innerHTML = slides.map(slide => `
            <div class="w-full md:w-1/3 h-[600px] lg:h-[700px] overflow-hidden rounded-lg">
                <img src="${slide.src}" alt="${slide.alt}" class="w-full h-full object-cover hover-zoom">
            </div>
        `).join('');
        
        // Fade in animation
        carouselContainer.style.opacity = '0';
        setTimeout(() => {
            carouselContainer.style.transition = 'opacity 0.6s ease';
            carouselContainer.style.opacity = '1';
        }, 50);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % carouselSlides.length;
            updateCarousel();
        });
    }

    // Auto-play carousel (optional)
    let autoplayInterval = setInterval(() => {
        if (nextBtn) {
            currentSlide = (currentSlide + 1) % carouselSlides.length;
            updateCarousel();
        }
    }, 5000);

    // Pause autoplay on hover
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % carouselSlides.length;
                updateCarousel();
            }, 5000);
        });
    }

    // ============================================
    // Initial Animation on Load
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    console.log('🌸 Les Fleurs de Nila — Site chargé avec élégance');
});

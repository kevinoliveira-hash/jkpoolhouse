/* ============================================================
   MAIN.JS - Core Functionality
   JK Pool House - Premium Vacation Rental
   ============================================================ */

'use strict';

// === DOM Ready ===
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initNavbar();
    initScrollReveal();
    initCounters();
    initFaq();
    initBackToTop();
    initSmoothScroll();
    initParallax();
    enhanceCounters();
    initInstagramFeed();
    initScrollProgress();
    initKeyboardNav();
    updateCopyrightYear();
});

// ============================================================
// LOADER (otimizado para mobile - mais rápido)
// ============================================================
function debounce(func, wait) {
    var timeout;
    return function executedFunction() {
        var context = this;
        var args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initLoader() {
    var loader = document.querySelector('.loader');
    var loaderBar = document.querySelector('.loader-bar-fill');
    
    if (!loader) return;
    
    var isMobile = window.matchMedia('(max-width: 767px)').matches;
    
    if (isMobile) {
        if (loaderBar) loaderBar.style.width = '100%';
        setTimeout(function() {
            loader.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 200);
        return;
    }
    
    var progress = 0;
    var interval = setInterval(function() {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        if (loaderBar) loaderBar.style.width = progress + '%';
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(function() {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 300);
        }
    }, 150);
    
    setTimeout(function() {
        if (!loader.classList.contains('hidden')) {
            if (loaderBar) loaderBar.style.width = '100%';
            setTimeout(function() {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 200);
        }
    }, 2000);
}

// ============================================================
// CUSTOM CURSOR
// ============================================================
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    if (!cursor || !follower) return;
    
    // Check for touch device
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }
    
    // Enable custom cursor visibility (CSS: body.cursor-enabled)
    document.body.classList.add('cursor-enabled');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .gallery-item, .highlight-card, .tour-card, .dayuse-card, .faq-question');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if (!navbar) return;
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
    // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Mobile menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            
            if (navCta) {
                navCta.classList.toggle('mobile-show');
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                if (navCta) navCta.classList.remove('mobile-show');
            });
        });
    }
}

// ============================================================
// SCROLL REVEAL (Intersection Observer)
// ============================================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    if (revealElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

// ============================================================
// COUNTERS ANIMATION
// ============================================================
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const step = Math.max(1, Math.floor(target / 60));
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        const displayText = counter.getAttribute('data-prefix') || '';
                        counter.textContent = displayText + current.toLocaleString();
                        requestAnimationFrame(() => setTimeout(updateCounter, 20));
                    } else {
                        const displayText = counter.getAttribute('data-prefix') || '';
                        counter.textContent = displayText + target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================================
// FAQ ACCORDION
// ============================================================
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const otherQuestion = other.querySelector('.faq-question');
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current
            const isActive = item.classList.toggle('active');
            question.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    });
}

// ============================================================
// BACK TO TOP
// ============================================================
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================
// PARALLAX EFFECT ON SCROLL
// ============================================================
function initParallax() {
    const heroBg = document.querySelector('.hero-background img');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY <= window.innerHeight) {
            heroBg.style.transform = 'scale(' + (1 + scrollY * 0.0005) + ') translateY(' + (scrollY * 0.1) + 'px)';
        }
    }, { passive: true });
}

// ============================================================
// INTERACTIVE COUNTERS WITH PLUS SIGN
// ============================================================
function enhanceCounters() {
    document.querySelectorAll('.counter-number').forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-target'));
        if (target > 1 && !isNaN(target)) {
            var observer = new MutationObserver(function() {
                var currentText = counter.textContent.replace(/[^0-9]/g, '');
                if (currentText === target.toString()) {
                    var prefix = counter.getAttribute('data-prefix') || '';
                    counter.textContent = prefix + target + '+';
                    observer.disconnect();
                }
            });
            observer.observe(counter, { childList: true, characterData: true, subtree: true });
        }
    });
}

// ============================================================
// INSTAGRAM FEED SIMULATION
// ============================================================
function initInstagramFeed() {
    const grid = document.querySelector('.instagram-grid');
    if (!grid) return;

    const instagramImages = [
        { src: 'imagens/piscina com hidro.jpg', alt: 'JK Pool House - Piscina' },
        { src: 'imagens/area gourmet.jpg', alt: 'JK Pool House - Área Gourmet' },
        { src: 'imagens/area lazer.jpg', alt: 'JK Pool House - Lazer' },
        { src: 'imagens/churrasqueira e  cozinha.jpg', alt: 'JK Pool House - Churrasqueira' }
    ];

    instagramImages.forEach(img => {
        const item = document.createElement('div');
        item.className = 'instagram-item';
        item.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '" loading="lazy"><div class="instagram-item-overlay"><span>📷</span></div>';
        grid.appendChild(item);
    });
}

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,#B8960F,#D4AF37,#F4D27A);transform-origin:left center;transform:scaleX(0);z-index:1000;transition:transform 0.1s ease;';
    document.body.appendChild(bar);

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.transform = 'scaleX(' + (winScroll / height) + ')';
    }, { passive: true });
}

// ============================================================
// KEYBOARD ACCESSIBILITY
// ============================================================
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// ============================================================
// DYNAMIC YEAR FOR COPYRIGHT
// ============================================================
function updateCopyrightYear() {
    const elements = document.querySelectorAll('.footer-bottom p:first-child');
    elements.forEach(el => {
        const year = new Date().getFullYear();
        el.textContent = el.textContent.replace(/\d{4}/, year);
    });
}

// ============================================================
// VIDEO TOGGLE (play/pause) - chamado via onclick no index.html
// ============================================================
function toggleVideo(card) {
    if (!card) return;

    const video = card.querySelector('video');

    if (!video) return;

    // Pausa todos os outros vídeos
    document.querySelectorAll('.video-card video').forEach(otherVideo => {
        if (otherVideo !== video) {
            otherVideo.pause();
            const otherCard = otherVideo.closest('.video-card');
            if (otherCard) otherCard.classList.remove('playing');
        }
    });

    const isPlaying = card.classList.contains('playing');

    if (isPlaying) {
        video.pause();
        card.classList.remove('playing');
    } else {
        video.play().catch(() => {
            // Fallback silencioso caso autoplay/bloqueio impeça a reprodução
            card.classList.remove('playing');
        });
        card.classList.add('playing');
    }
}


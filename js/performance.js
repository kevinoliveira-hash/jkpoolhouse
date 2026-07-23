/* ============================================================
   PERFORMANCE.JS - Image Optimization & Lazy Loading
   JK Pool House
   ============================================================ */

'use strict';

// ============================================================
// IMAGE OPTIMIZATION
// ============================================================
function initImageOptimization() {
    // Add loading="lazy" to all images that don't have it
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.loading = 'lazy';
    });

    // Add decoding="async" for non-critical images
    document.querySelectorAll('img:not([decoding])').forEach(img => {
        img.decoding = 'async';
    });

    // Serve WebP if supported
    checkWebPSupport();
}

// ============================================================
// WEBP SUPPORT CHECK
// ============================================================
function checkWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const isWebPSupported = canvas.toDataURL('image/webp').startsWith('data:image/webp');

    if (isWebPSupported) {
        document.documentElement.classList.add('webp');
        // Convert image sources to WebP if available
        document.querySelectorAll('img[src]').forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.includes('logo') && (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))) {
                // In production, you'd replace with actual WebP versions
                // const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                // img.setAttribute('data-webp', webpSrc);
                // img.setAttribute('onerror', "this.classList.remove('webp')");
            }
        });
    }
}

// ============================================================
// CRITICAL CSS INLINE (minimal above-the-fold styles)
// ============================================================
function injectCriticalCSS() {
    const criticalCSS = `
        .navbar {
            position: fixed;
            top: 0; left: 0;
            width: 100%;
            z-index: 50;
            padding: 1.25rem 0;
            transition: 0.4s ease;
        }
        .hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .loader {
            position: fixed;
            inset: 0;
            background: #050505;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.8s ease, visibility 0.8s ease;
        }
        .loader.hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }
    `;

    const style = document.createElement('style');
    style.id = 'critical-css';
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
}

// ============================================================
// REMOVE CRITICAL CSS AFTER LOAD
// ============================================================
function removeCriticalCSS() {
    window.addEventListener('load', () => {
        const critical = document.getElementById('critical-css');
        if (critical) {
            setTimeout(() => critical.remove(), 2000);
        }
    });
}

// ============================================================
// INTERSECTION OBSERVER FOR ADS/WIDGETS (future use)
// ============================================================
function initLazyWidgets() {
    const lazyElements = document.querySelectorAll('[data-lazy-widget]');
    if (lazyElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const widget = el.getAttribute('data-lazy-widget');
                if (widget === 'instagram') {
                    loadInstagramWidget(el);
                }
                observer.unobserve(el);
            }
        });
    }, { rootMargin: '200px' });

    lazyElements.forEach(el => observer.observe(el));
}

function loadInstagramWidget(container) {
    // Placeholder for Instagram embed
    const profile = container.getAttribute('data-instagram-profile') || 'jkpoolhouse';
    container.innerHTML = `
        <div style="text-align:center;padding:2rem;border:1px solid rgba(255,255,255,0.1);border-radius:16px;">
            <p style="color:#D4AF37;font-size:1rem;">📸 @${profile}</p>
            <p style="color:#C8C8C8;font-size:0.85rem;margin-top:0.5rem;">Siga-nos no Instagram para ver mais fotos!</p>
        </div>
    `;
}

// ============================================================
// NETWORK STATUS INDICATOR
// ============================================================
function initNetworkStatus() {
    const indicator = document.createElement('div');
    indicator.className = 'network-status';
    indicator.innerHTML = `
        <span class="network-dot"></span>
        <span class="network-text">Online</span>
    `;
    document.body.appendChild(indicator);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .network-status {
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10001;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.3rem 0.8rem;
            border-radius: 999px;
            background: rgba(0, 200, 83, 0.9);
            color: #fff;
            font-size: 0.7rem;
            opacity: 0;
            transition: all 0.4s ease;
            pointer-events: none;
        }
        .network-status.offline {
            background: rgba(255, 68, 68, 0.9);
            opacity: 1;
        }
        .network-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #fff;
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('online', () => {
        indicator.classList.remove('offline');
        indicator.querySelector('.network-text').textContent = 'Online';
        setTimeout(() => { indicator.style.opacity = '0'; }, 2000);
    });

    window.addEventListener('offline', () => {
        indicator.classList.add('offline');
        indicator.querySelector('.network-text').textContent = 'Offline';
        indicator.style.opacity = '1';
    });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    injectCriticalCSS();
    initImageOptimization();
    initLazyWidgets();
    initNetworkStatus();
});

window.addEventListener('load', () => {
    removeCriticalCSS();
});


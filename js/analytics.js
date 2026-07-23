/* ============================================================
   ANALYTICS.JS - Google Analytics & Tracking
   JK Pool House
   ============================================================ */

'use strict';

// Google Analytics Configuration
const GA_CONFIG = {
    id: 'G-XXXXXXXXXX', // Replace with your GA4 Measurement ID
    enabled: false // Set to true after adding your GA ID
};

// ============================================================
// INIT GOOGLE ANALYTICS
// ============================================================
function initAnalytics() {
    if (!GA_CONFIG.enabled) return;

    // Load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_CONFIG.id}`;
    document.head.appendChild(script);

    // Init gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_CONFIG.id, {
        cookie_flags: 'SameSite=None;Secure',
        cookie_domain: 'jkpoolhouse.com.br'
    });

    window.gtag = gtag;
}

// ============================================================
// ENABLE ANALYTICS (Called after cookie consent)
// ============================================================
function enableAnalytics() {
    if (!GA_CONFIG.enabled) return;
    if (typeof gtag !== 'function') return;

    gtag('consent', 'update', {
        'analytics_storage': 'granted'
    });
}

// ============================================================
// TRACK EVENTS
// ============================================================
function trackEvent(action, category, label, value) {
    if (!GA_CONFIG.enabled) return;
    if (typeof gtag !== 'function') return;

    gtag('event', action, {
        'event_category': category || 'engagement',
        'event_label': label || '',
        'value': value || 1
    });
}

// ============================================================
// TRACK CUSTOM EVENTS
// ============================================================
function initTracking() {
    // Track WhatsApp clicks
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action="whatsapp"], [data-reserve]');
        if (target) {
            const type = target.getAttribute('data-reserve') || 'info';
            trackEvent('whatsapp_click', 'conversion', `reserve_${type}`);
        }
    });

    // Track gallery opens
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.gallery-item, [data-action="open-gallery"]');
        if (target) {
            trackEvent('gallery_open', 'engagement');
        }
    });

    // Track video plays
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.video-card');
        if (target) {
            const title = target.querySelector('.video-title');
            trackEvent('video_play', 'engagement', title ? title.textContent : 'unknown');
        }
    });

    // Track FAQ interactions
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.faq-question');
        if (target) {
            trackEvent('faq_toggle', 'engagement');
        }
    });

    // Track navigation clicks
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            trackEvent('nav_click', 'navigation', link.textContent.trim());
        });
    });

    // Track form submissions
    const form = document.getElementById('reservationForm');
    if (form) {
        form.addEventListener('submit', () => {
            trackEvent('form_submit', 'conversion', 'reservation');
        });
    }

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
                trackEvent('scroll_depth', 'engagement', `${maxScroll}%`);
            }
        }
    }, { passive: true });

    // Track time on page
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 30;
        if (timeOnPage === 30 || timeOnPage === 60 || timeOnPage === 120 || timeOnPage === 300) {
            trackEvent('time_on_page', 'engagement', `${timeOnPage}s`);
        }
    }, 30000);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Only init analytics if cookies accepted
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted' && GA_CONFIG.enabled) {
        initAnalytics();
    }
    initTracking();
});

// Expose enableAnalytics globally
window.enableAnalytics = enableAnalytics;


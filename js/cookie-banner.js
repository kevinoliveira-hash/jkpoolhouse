/* ============================================================
   COOKIE-BANNER.JS - LGPD Cookie Consent Banner
   JK Pool House
   ============================================================ */

'use strict';

function initCookieBanner() {
    if (localStorage.getItem('cookieConsent')) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-banner-content">
            <div class="cookie-banner-icon">🍪</div>
            <div class="cookie-banner-text">
                <h4>Privacidade e Cookies</h4>
                <p>Utilizamos cookies para melhorar sua experiência, analisar o tráfego e personalizar conteúdo. Ao continuar navegando, você concorda com nossa <a href="#" onclick="alert('Política de Privacidade em breve')">Política de Privacidade</a>.</p>
            </div>
            <div class="cookie-banner-buttons">
                <button class="cookie-btn cookie-btn-secondary" onclick="rejectCookies()">Recusar</button>
                <button class="cookie-btn cookie-btn-primary" onclick="acceptCookies()">Aceitar Todos</button>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    // Show with animation
    requestAnimationFrame(() => {
        banner.classList.add('show');
    });

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(212, 175, 55, 0.2);
            padding: 0;
            transform: translateY(100%);
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.5);
        }
        .cookie-banner.show {
            transform: translateY(0);
        }
        .cookie-banner-content {
            max-width: 1280px;
            margin: 0 auto;
            padding: 1.5rem 2rem;
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .cookie-banner-icon {
            font-size: 2.5rem;
            flex-shrink: 0;
        }
        .cookie-banner-text {
            flex: 1;
        }
        .cookie-banner-text h4 {
            font-family: 'Cinzel', serif;
            font-size: 1rem;
            color: #D4AF37;
            margin-bottom: 0.25rem;
        }
        .cookie-banner-text p {
            font-size: 0.8rem;
            color: #C8C8C8;
            line-height: 1.5;
        }
        .cookie-banner-text a {
            color: #D4AF37;
            text-decoration: underline;
        }
        .cookie-banner-buttons {
            display: flex;
            gap: 0.75rem;
            flex-shrink: 0;
        }
        .cookie-btn {
            padding: 0.6rem 1.5rem;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }
        .cookie-btn-primary {
            background: linear-gradient(135deg, #B8960F, #D4AF37);
            color: #050505;
            border: none;
        }
        .cookie-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
        }
        .cookie-btn-secondary {
            background: transparent;
            color: #C8C8C8;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .cookie-btn-secondary:hover {
            border-color: #D4AF37;
            color: #D4AF37;
        }

        @media (max-width: 767px) {
            .cookie-banner-content {
                flex-direction: column;
                padding: 1rem 1.25rem;
                text-align: center;
            }
            .cookie-banner-icon { font-size: 1.5rem; }
            .cookie-banner-buttons { width: 100%; }
            .cookie-btn { flex: 1; text-align: center; font-size: 0.7rem; padding: 0.5rem 1rem; }
        }
    `;
    document.head.appendChild(style);
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 600);
    }
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    const banner = document.querySelector('.cookie-banner');
    if (banner) {
        banner.classList.remove('show');
        setTimeout(() => banner.remove(), 600);
    }
}

// Auto-init
document.addEventListener('DOMContentLoaded', initCookieBanner);


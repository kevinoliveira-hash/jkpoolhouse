/* ============================================================
   SOCIAL-SHARE.JS - Social Media Share & Directions
   JK Pool House
   ============================================================ */

'use strict';

const SHARE_CONFIG = {
    url: 'https://jkpoolhouse.com.br/',
    title: 'JK Pool House - Casa com Piscina para Festas e Eventos em SP',
    description: 'Espaço premium com piscina, churrasqueira, área gourmet e palco. Day Use para 120 pessoas ou pernoite para 20 hóspedes.',
    image: 'https://jkpoolhouse.com.br/imagens/piscina%20com%20hidro.jpg',
    whatsapp: '5511966152805'
};

// ============================================================
// SOCIAL SHARE FUNCTIONS
// ============================================================
function shareOnWhatsApp() {
    const text = `${SHARE_CONFIG.title}%0A%0A${SHARE_CONFIG.description}%0A%0A📍 ${SHARE_CONFIG.url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(decodeURIComponent(text))}`, '_blank');
}

function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_CONFIG.url)}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const text = `${SHARE_CONFIG.title} | ${SHARE_CONFIG.url}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400');
}

function shareOnTelegram() {
    const text = `${SHARE_CONFIG.title}%0A%0A${SHARE_CONFIG.description}%0A%0A${SHARE_CONFIG.url}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(SHARE_CONFIG.url)}&text=${encodeURIComponent(decodeURIComponent(text))}`, '_blank');
}

function shareNative() {
    if (navigator.share) {
        navigator.share({
            title: SHARE_CONFIG.title,
            text: SHARE_CONFIG.description,
            url: SHARE_CONFIG.url
        }).catch(() => {});
    } else {
        // Fallback: copy link
        copyToClipboard(SHARE_CONFIG.url);
    }
}

// ============================================================
// COPY TO CLIPBOARD
// ============================================================
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Link copiado! Compartilhe com seus amigos 📋');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Link copiado! 📋');
}

// ============================================================
// TOAST NOTIFICATION
// ============================================================
function showToast(message) {
    const existing = document.querySelector('.share-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    });
}

// ============================================================
// GOOGLE MAPS DIRECTIONS
// ============================================================
function getDirections() {
    const address = encodeURIComponent('Avenida Luiz Antonio de Paiva, 771, Ferraz de Vasconcelos - SP');
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(mapsUrl, '_blank');
}

function openWaze() {
    const address = encodeURIComponent('Avenida Luiz Antonio de Paiva, 771, Ferraz de Vasconcelos - SP');
    window.open(`https://waze.com/ul?q=${address}&navigate=yes`, '_blank');
}

// ============================================================
// INIT SHARE BUTTONS
// ============================================================
function initShareButtons() {
    // Add share section to hero or floating
    const shareBtn = document.createElement('div');
    shareBtn.className = 'share-floating';
    shareBtn.innerHTML = `
        <button class="share-fab" onclick="shareNative()" title="Compartilhar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
        </button>
        <div class="share-fab-options">
            <button onclick="shareOnWhatsApp()" title="WhatsApp" style="background:#25D366">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.436 9.884-9.885 9.884z"/></svg>
            </button>
            <button onclick="shareOnFacebook()" title="Facebook" style="background:#1877F2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </button>
            <button onclick="shareOnTelegram()" title="Telegram" style="background:#0088cc">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </button>
        </div>
    `;
    document.body.appendChild(shareBtn);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .share-floating {
            position: fixed;
            bottom: 6rem;
            right: 1.5rem;
            z-index: 45;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }
        .share-fab {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, #D4AF37, #B8960F);
            border: none;
            color: #050505;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
        }
        .share-fab:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(212, 175, 55, 0.5);
        }
        .share-fab-options {
            display: none;
            flex-direction: column;
            gap: 0.5rem;
        }
        .share-floating:hover .share-fab-options {
            display: flex;
        }
        .share-fab-options button {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: none;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .share-fab-options button:hover {
            transform: scale(1.15);
        }

        .share-toast {
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: #D4AF37;
            color: #050505;
            padding: 0.75rem 1.5rem;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transition: all 0.4s ease;
            box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
        }
        .share-toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }

        .get-directions-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1.25rem;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 999px;
            color: #E5E5E5;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
            margin-right: 0.5rem;
        }
        .get-directions-btn:hover {
            background: rgba(212,175,55,0.1);
            border-color: #D4AF37;
            color: #D4AF37;
            transform: translateY(-2px);
        }

        @media (max-width: 767px) {
            .share-floating {
                bottom: 5rem;
                right: 1rem;
            }
            .share-fab { width: 42px; height: 42px; }
            .share-fab svg { width: 18px; height: 18px; }
            .share-fab-options button { width: 36px; height: 36px; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
// INIT DIRECTIONS BUTTONS IN CONTACT SECTION
// ============================================================
function initDirectionsButtons() {
    const contactInfo = document.querySelector('.contact-info');
    if (!contactInfo) return;

    const directionsDiv = document.createElement('div');
    directionsDiv.style.marginTop = '1rem';
    directionsDiv.innerHTML = `
        <button class="get-directions-btn" onclick="getDirections()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Google Maps
        </button>
        <button class="get-directions-btn" onclick="openWaze()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13H9v8h2v-4h2v4h2V7zm-2 10h-2v2h2v-2z"/>
            </svg>
            Waze
        </button>
    `;
    contactInfo.appendChild(directionsDiv);
}

// Expose globally
window.shareOnWhatsApp = shareOnWhatsApp;
window.shareOnFacebook = shareOnFacebook;
window.shareOnTwitter = shareOnTwitter;
window.shareOnTelegram = shareOnTelegram;
window.shareNative = shareNative;
window.getDirections = getDirections;
window.openWaze = openWaze;
window.copyToClipboard = copyToClipboard;

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    initShareButtons();
    initDirectionsButtons();
});


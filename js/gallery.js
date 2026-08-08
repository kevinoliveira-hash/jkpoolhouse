/* ============================================================
   GALLERY.JS - Lightbox & Gallery Functionality
   JK Pool House - Premium Vacation Rental
   ============================================================ */

'use strict';

// Gallery configuration - all available images
const galleryImages = [
    { src: 'imagens/piscina_com_hidro.jpg', alt: 'Piscina com hidromassagem - JK Pool House' },
    { src: 'imagens/area_externa.jpg', alt: 'Área externa completa - JK Pool House' },
    { src: 'imagens/area_externa2.jpg', alt: 'Vista da área externa - JK Pool House' },
    { src: 'imagens/area_gourmet.jpg', alt: 'Área gourmet premium - JK Pool House' },
    { src: 'imagens/area_lazer.jpg', alt: 'Área de lazer completa - JK Pool House' },
    { src: 'imagens/area_lazer1.jpg', alt: 'Espaço de lazer - JK Pool House' },
    { src: 'imagens/churrasqueira_e_cozinha.jpg', alt: 'Churrasqueira e cozinha integrada' },
    { src: 'imagens/cozinha.jpg', alt: 'Cozinha completa equipada' },
    { src: 'imagens/espaço_kids.jpg', alt: 'Espaço kids divertido' },
    { src: 'imagens/espaço_kids2.jpg', alt: 'Área infantil - playground' },
    { src: 'imagens/espaço_kids3.jpg', alt: 'Brinquedos e diversão para crianças' },
    { src: 'imagens/mesa_sinuca.jpg', alt: 'Mesa de sinuca profissional' },
    { src: 'imagens/sala_sinuca.jpg', alt: 'Sala de sinuca elegante' },
    { src: 'imagens/sala_sinuca3.jpg', alt: 'Ambiente de jogos' },
    { src: 'imagens/sala_de_jogos.jpg', alt: 'Sala de jogos completa' },
    { src: 'imagens/palco.jpg', alt: 'Palco para apresentações' },
    { src: 'imagens/quarto_solteiros.jpg', alt: 'Quarto com camas de solteiro' },
    { src: 'imagens/banheiro_suite.jpg', alt: 'Banheiro da suíte master' },
    { src: 'imagens/banheiro_feminino.jpg', alt: 'Banheiro feminino' },
    { src: 'imagens/banheiro_masculino.jpg', alt: 'Banheiro masculino' },
    { src: 'imagens/corredor_dos_quartos.jpg', alt: 'Corredor dos quartos' },
    { src: 'imagens/descrição_lugar_e_diarias.jpg', alt: 'Descrição do local e diárias - JK Pool House' },
    { src: 'imagens/descrição_das_regras.jpg', alt: 'Regras da casa - JK Pool House' }
];

let currentLightboxIndex = 0;

// ============================================================
// INIT GALLERY
// ============================================================
function initGallery() {
    loadGalleryGrid();
    initLightbox();
}

// ============================================================
// LOAD GALLERY GRID
// ============================================================
function loadGalleryGrid() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    
    // Use first 5 images for the grid preview
    const previewImages = galleryImages.slice(0, 5);
    
    previewImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        if (index === 0) item.classList.add('gallery-main');
        
        item.innerHTML = `
            <img src="${img.src}" alt="${img.alt}" loading="lazy">
            <div class="gallery-item-overlay">
                <span>+</span>
            </div>
        `;
        
        item.addEventListener('click', () => openLightbox(index));
        grid.appendChild(item);
    });
}

// ============================================================
// LIGHTBOX
// ============================================================
function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;
    
    const close = lightbox.querySelector('.lightbox-close');
    const prev = lightbox.querySelector('.lightbox-prev');
    const next = lightbox.querySelector('.lightbox-next');
    
    close.addEventListener('click', closeLightbox);
    prev.addEventListener('click', () => navigateLightbox(-1));
    next.addEventListener('click', () => navigateLightbox(1));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) navigateLightbox(1);
            else navigateLightbox(-1);
        }
    }, { passive: true });
}

function openLightbox(index) {
    const lightbox = document.querySelector('.lightbox');
    const img = lightbox.querySelector('.lightbox-content img');
    const counter = lightbox.querySelector('.lightbox-counter');
    
    currentLightboxIndex = index;
    updateLightboxImage(img, counter);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = galleryImages.length - 1;
    } else if (currentLightboxIndex >= galleryImages.length) {
        currentLightboxIndex = 0;
    }
    
    const lightbox = document.querySelector('.lightbox');
    const img = lightbox.querySelector('.lightbox-content img');
    const counter = lightbox.querySelector('.lightbox-counter');
    
    updateLightboxImage(img, counter);
}

function updateLightboxImage(img, counter) {
    const image = galleryImages[currentLightboxIndex];
    img.src = image.src;
    img.alt = image.alt;
    if (counter) {
        counter.textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
    }
}

// ============================================================
// "SEE ALL PHOTOS" BUTTON
// ============================================================
function initGalleryCTA() {
    const ctaButtons = document.querySelectorAll('[data-action="open-gallery"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => openLightbox(0));
    });
}

// Export for use in modal
window.openLightbox = openLightbox;

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    initGalleryCTA();
});


/* ============================================================
   MODAL.JS - Modal Management
   JK Pool House - Premium Vacation Rental
   ============================================================ */

'use strict';

// ============================================================
// OPEN MODAL
// ============================================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate entrance
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px) scale(0.95)';
        
        requestAnimationFrame(() => {
            content.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// ============================================================
// CLOSE MODAL
// ============================================================
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const content = modal.querySelector('.modal-content');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px) scale(0.95)';
    }
    
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        if (content) {
            content.style.transition = 'none';
            content.style.opacity = '1';
            content.style.transform = 'none';
        }
    }, 300);
}

// ============================================================
// INIT MODALS
// ============================================================
function initModals() {
    // Close buttons
    document.querySelectorAll('.modal-close, [data-action="close-modal"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) closeModal(modal.id);
        });
    });
    
    // Open buttons
    document.querySelectorAll('[data-action="open-modal"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-modal');
            if (target) openModal(target);
        });
    });
    
    // Click outside to close
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

// ============================================================
// BOOKING MODAL WITH DATE PREFILL
// ============================================================
function openBookingModal(date, modality) {
    const modal = document.getElementById('bookingModal');
    if (!modal) return;
    
    // Pre-fill date
    if (date) {
        const dateInput = modal.querySelector('#formDate');
        if (dateInput) dateInput.value = date;
    }
    
    // Pre-fill modality
    if (modality) {
        const modalitySelect = modal.querySelector('#formModality');
        if (modalitySelect) modalitySelect.value = modality;
    }
    
    openModal('bookingModal');
}

// Expose globally
window.openModal = openModal;
window.closeModal = closeModal;
window.openBookingModal = openBookingModal;

// Auto-init
document.addEventListener('DOMContentLoaded', initModals);


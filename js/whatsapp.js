/* ============================================================
   WHATSAPP.JS - WhatsApp Integration & Booking
   JK Pool House - Premium Vacation Rental
   ============================================================ */

'use strict';

// === CONFIGURATION ===
const WHATSAPP_NUMBER = '5511966152805'; // 55 (Brazil) + 11 + 966152805
const WHATSAPP_MESSAGE_PREFIX = 'Olá! Gostaria de reservar a JK Pool House.%0A%0A';

// ============================================================
// SEND WHATSAPP MESSAGE
// ============================================================
function sendWhatsApp(message) {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE_PREFIX}${encodedMessage}`;
    window.open(url, '_blank');
}

// ============================================================
// QUICK RESERVATION (from buttons)
// ============================================================
function quickReserve(type) {
    let message = '';
    
    if (type === 'dayuse') {
        message = `*Modalidade:* Day Use%0A*Interesse:* Tenho interesse em conhecer os valores e disponibilidade para Day Use na JK Pool House.%0A%0AAguardo retorno, obrigado!`;
    } else if (type === 'pernoite') {
        message = `*Modalidade:* Pernoite%0A*Interesse:* Tenho interesse em conhecer os valores e disponibilidade para pernoite na JK Pool House.%0A%0AAguardo retorno, obrigado!`;
    } else {
        message = `*Interesse:* Gostaria de mais informações sobre a JK Pool House.%0A%0AAguardo retorno, obrigado!`;
    }
    
    sendWhatsApp(message);
}

// ============================================================
// RESERVATION FORM SUBMISSION
// ============================================================
function handleReservationForm(formData) {
    const { name, phone, email, guests, date, modality, observations } = formData;
    
    let message = `*Nome:* ${name}%0A`;
    message += `*Telefone:* ${phone}%0A`;
    
    if (email) message += `*E-mail:* ${email}%0A`;
    message += `*Quantidade de Pessoas:* ${guests}%0A`;
    if (date) message += `*Data Pretendida:* ${date}%0A`;
    message += `*Modalidade:* ${modality || 'A definir'}%0A`;
    if (observations) message += `*Observações:* ${observations}%0A`;
    
    message += `%0A*_Aguardando retorno para confirmar disponibilidade!_*`;
    
    sendWhatsApp(message);
}

// ============================================================
// AUTO-SETUP WHATSAPP BUTTONS
// ============================================================
function initWhatsAppButtons() {
    // All buttons with data-action="whatsapp" or data-reserve
    document.querySelectorAll('[data-action="whatsapp"], [data-reserve]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = btn.getAttribute('data-reserve') || 'info';
            quickReserve(type);
        });
    });
    
    // Floating WhatsApp button
    const floatBtn = document.querySelector('.whatsapp-float');
    if (floatBtn) {
        floatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            quickReserve('info');
        });
    }
}

// ============================================================
// FORM HANDLER
// ============================================================
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.querySelector('#formName')?.value || '',
            phone: form.querySelector('#formPhone')?.value || '',
            email: form.querySelector('#formEmail')?.value || '',
            guests: form.querySelector('#formGuests')?.value || '',
            date: form.querySelector('#formDate')?.value || '',
            modality: form.querySelector('#formModality')?.value || '',
            observations: form.querySelector('#formObservations')?.value || ''
        };
        
        if (!formData.name || !formData.phone) {
            alert('Por favor, preencha seu nome e telefone.');
            return;
        }
        
        handleReservationForm(formData);
    });
}

// ============================================================
// FORM VALIDATION ENHANCEMENT
// ============================================================
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('invalid', (e) => {
                e.preventDefault();
                input.style.borderColor = '#ff4444';
            });
            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    input.style.borderColor = '';
                }
            });
        });
    });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initWhatsAppButtons();
    initReservationForm();
    initFormValidation();
});


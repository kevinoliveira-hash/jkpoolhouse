/* ============================================================
   WHATSAPP.JS - WhatsApp Integration & Booking
   JK Pool House - Premium Vacation Rental
   ============================================================ */

'use strict';

// === CONFIGURATION ===
const WHATSAPP_NUMBER = '5511966152805'; // 55 (Brazil) + 11 + 966152805

// ============================================================
// BUILD WHATSAPP URL
// ============================================================
function buildWhatsAppUrl(message) {
    // Replace literal %0A with actual newlines for encoding, then encode
    const withNewlines = message.replace(/%0A/g, '\n');
    const encoded = encodeURIComponent(withNewlines);
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encoded;
}

// ============================================================
// SEND WHATSAPP MESSAGE
// ============================================================
function sendWhatsApp(message) {
    const url = buildWhatsAppUrl(message);
    window.open(url, '_blank', "noopener,noreferrer");
}

// ============================================================
// FORMAT FIELD (helper)
// ============================================================
function fmt(label, value) {
    return value ? '*' + label + ':* ' + value + '%0A' : '';
}

// ============================================================
// SANITIZE INPUT (XSS protection)
// ============================================================
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .trim();
}

// ============================================================
// QUICK RESERVATION (from buttons)
// ============================================================
function quickReserve(type) {
    let message = '';

    if (type === 'dayuse') {
        message =
            'Olá! Gostaria de informações sobre o *Day Use* na JK Pool House.%0A%0A' +
            '📅 *Data:* A definir%0A' +
            '👥 *Pessoas:* —%0A' +
            '📦 *Modalidade:* Day Use%0A%0A' +
            '_Aguardo retorno com valores e disponibilidade. Obrigado!_';
    } else if (type === 'pernoite') {
        message =
            'Olá! Gostaria de informações sobre *Pernoite* na JK Pool House.%0A%0A' +
            '📅 *Data:* A definir%0A' +
            '👥 *Hóspedes:* —%0A' +
            '📦 *Modalidade:* Pernoite%0A%0A' +
            '_Aguardo retorno com valores e disponibilidade. Obrigado!_';
    } else {
        message =
            'Olá! Gostaria de mais informações sobre a JK Pool House.%0A%0A' +
            '📍 *Local:* JK Pool House%0A' +
            '💬 *Interesse:* Conhecer valores, estrutura e disponibilidade%0A%0A' +
            '_Aguardo retorno. Obrigado!_';
    }

    sendWhatsApp(message);
}

// ============================================================
// RESERVATION FORM SUBMISSION
// ============================================================
function handleReservationForm(formData) {
    var name = sanitize(formData.name);
    var phone = sanitize(formData.phone);
    var email = sanitize(formData.email);
    var guests = sanitize(formData.guests);
    var date = sanitize(formData.date);
    var modality = sanitize(formData.modality);
    var observations = sanitize(formData.observations);

    var message = '🆕 *Nova Solicitação de Reserva* 🆕%0A%0A';
    message += fmt('Nome', name);
    message += fmt('Telefone', phone);
    message += fmt('E-mail', email);
    message += fmt('👥 Pessoas', guests);
    message += fmt('📅 Data', date);
    message += fmt('📦 Modalidade', modality || 'A definir');
    message += fmt('📝 Observações', observations);
    message += '%0A⏳ *Aguardando retorno para confirmar disponibilidade!*';

    sendWhatsApp(message);
}

// ============================================================
// AUTO-SETUP WHATSAPP BUTTONS
// ============================================================
function initWhatsAppButtons() {
    document.querySelectorAll('[data-action="whatsapp"], [data-reserve]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var type = btn.getAttribute('data-reserve') || 'info';
            quickReserve(type);
        });
    });

    var floatBtn = document.querySelector('.whatsapp-float');
    if (floatBtn) {
        floatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            quickReserve('info');
        });
    }
}

// ============================================================
// FORM HANDLER
// ============================================================
function initReservationForm() {
    var form = document.getElementById('reservationForm');
    if (!form) return;

    var errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    errorEl.style.cssText = 'color:#ff6b6b;font-size:0.875rem;margin-top:0.5rem;display:none;';
    form.appendChild(errorEl);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        errorEl.style.display = 'none';

        var formData = {
            name: (form.querySelector('#formName') || {}).value || '',
            phone: (form.querySelector('#formPhone') || {}).value || '',
            email: (form.querySelector('#formEmail') || {}).value || '',
            guests: (form.querySelector('#formGuests') || {}).value || '',
            date: (form.querySelector('#formDate') || {}).value || '',
            modality: (form.querySelector('#formModality') || {}).value || '',
            observations: (form.querySelector('#formObservations') || {}).value || ''
        };

        if (!formData.name || !formData.phone) {
            errorEl.textContent = 'Por favor, preencha seu nome e telefone.';
            errorEl.style.display = 'block';
            return;
        }

        handleReservationForm(formData);
    });
}

// ============================================================
// FORM VALIDATION ENHANCEMENT
// ============================================================
function initFormValidation() {
    var forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        var inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(function(input) {
            input.addEventListener('invalid', function(e) {
                e.preventDefault();
                input.style.borderColor = '#ff4444';
            });
            input.addEventListener('input', function() {
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
document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppButtons();
    initReservationForm();
    initFormValidation();
});


/* ============================================================
   CALENDAR.JS - Availability Calendar
   JK Pool House - Premium Vacation Rental
   ============================================================ */

'use strict';

// === Calendar Configuration ===
const CALENDAR_CONFIG = {
    minDate: new Date(), // Today
    maxDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year ahead
    // Example blocked dates (YYYY-MM-DD format)
    // In production, these would come from a backend/API
    blockedDates: []
};

// ============================================================
// MONTH NAMES
// ============================================================
const MONTHS = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// ============================================================
// STATE
// ============================================================
let calendarState = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    selectedDate: null
};

// ============================================================
// RENDER CALENDAR
// ============================================================
function renderCalendar(containerId = 'calendar') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const { currentMonth, currentYear } = calendarState;
    const today = new Date();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    // Create header
    let html = `
        <div class="calendar-header">
            <button class="calendar-nav" onclick="changeMonth(-1)" ${currentMonth === today.getMonth() && currentYear === today.getFullYear() ? 'disabled' : ''}>
                ←
            </button>
            <h3 class="calendar-title">${MONTHS[currentMonth]} ${currentYear}</h3>
            <button class="calendar-nav" onclick="changeMonth(1)" ${currentMonth === CALENDAR_CONFIG.maxDate.getMonth() && currentYear === CALENDAR_CONFIG.maxDate.getFullYear() ? 'disabled' : ''}>
                →
            </button>
        </div>
    `;
    
    // Days of week
    html += '<div class="calendar-weekdays">';
    DAYS.forEach(day => {
        html += `<span class="calendar-weekday">${day}</span>`;
    });
    html += '</div>';
    
    // Calendar days
    html += '<div class="calendar-days">';
    
    // Empty cells before first day
    for (let i = 0; i < startDay; i++) {
        html += '<div class="calendar-day empty"></div>';
    }
    
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dateStr = formatDate(date);
        const isToday = isSameDay(date, today);
        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isBlocked = CALENDAR_CONFIG.blockedDates.includes(dateStr);
        const isSelected = calendarState.selectedDate === dateStr;
        
        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (isPast) classes += ' past';
        if (isBlocked) classes += ' blocked';
        if (isSelected) classes += ' selected';
        
        html += `
            <div class="${classes}" 
                 onclick="${!isPast && !isBlocked ? `selectDate('${dateStr}')` : ''}"
                 ${!isPast && !isBlocked ? 'style="cursor:pointer"' : ''}>
                ${day}
            </div>
        `;
    }
    
    html += '</div>';
    
    // Legend
    html += `
        <div class="calendar-legend">
            <span class="legend-item"><span class="legend-dot available"></span> Disponível</span>
            <span class="legend-item"><span class="legend-dot blocked"></span> Reservado</span>
            <span class="legend-item"><span class="legend-dot selected"></span> Selecionado</span>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Update selected date display
    updateSelectedDisplay();
}

// ============================================================
// CHANGE MONTH
// ============================================================
function changeMonth(delta) {
    calendarState.currentMonth += delta;
    
    if (calendarState.currentMonth > 11) {
        calendarState.currentMonth = 0;
        calendarState.currentYear++;
    } else if (calendarState.currentMonth < 0) {
        calendarState.currentMonth = 11;
        calendarState.currentYear--;
    }
    
    renderCalendar();
}

// ============================================================
// SELECT DATE
// ============================================================
function selectDate(dateStr) {
    calendarState.selectedDate = dateStr;
    renderCalendar();
    
    // Update form field if exists
    const dateInput = document.getElementById('formDate');
    if (dateInput) {
        const [year, month, day] = dateStr.split('-');
        dateInput.value = `${day}/${month}/${year}`;
    }
}

// ============================================================
// HELPERS
// ============================================================
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

function updateSelectedDisplay() {
    const display = document.getElementById('selectedDateDisplay');
    if (!display) return;
    
    if (calendarState.selectedDate) {
        const [year, month, day] = calendarState.selectedDate.split('-');
        display.textContent = `📅 ${day} de ${MONTHS[parseInt(month) - 1]} de ${year}`;
        display.style.color = 'var(--color-gold)';
    } else {
        display.textContent = '📅 Selecione uma data disponível';
        display.style.color = 'var(--color-gray)';
    }
}

// ============================================================
// INIT
// ============================================================
function initCalendar(containerId = 'calendar') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Add calendar styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .calendar-widget {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: var(--radius-lg);
            padding: var(--space-xl);
            max-width: 400px;
            margin: 0 auto;
        }
        
        .calendar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: var(--space-lg);
        }
        
        .calendar-title {
            font-family: var(--font-heading);
            font-size: var(--text-lg);
            color: var(--color-gold);
        }
        
        .calendar-nav {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--color-white);
            width: 36px;
            height: 36px;
            border-radius: var(--radius-full);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition-base);
        }
        
        .calendar-nav:hover:not(:disabled) {
            background: var(--color-gold);
            color: var(--color-black);
            border-color: var(--color-gold);
        }
        
        .calendar-nav:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
        
        .calendar-weekdays {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 4px;
            margin-bottom: var(--space-sm);
        }
        
        .calendar-weekday {
            text-align: center;
            font-size: var(--text-xs);
            color: var(--color-gray-dark);
            padding: var(--space-xs);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .calendar-days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 4px;
        }
        
        .calendar-day {
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--text-sm);
            color: var(--color-white);
            border-radius: var(--radius-sm);
            transition: var(--transition-base);
        }
        
        .calendar-day.today {
            border: 1px solid var(--color-gold);
            color: var(--color-gold);
        }
        
        .calendar-day.selected {
            background: var(--color-gold);
            color: var(--color-black);
            font-weight: 600;
        }
        
        .calendar-day.past {
            color: var(--color-gray-dark);
        }
        
        .calendar-day.blocked {
            color: var(--color-gray-dark);
            position: relative;
        }
        
        .calendar-day.blocked::after {
            content: '';
            position: absolute;
            width: 60%;
            height: 1px;
            background: var(--color-gray-dark);
            transform: rotate(-45deg);
        }
        
        .calendar-day:not(.past):not(.blocked):hover {
            background: rgba(212, 175, 55, 0.15);
        }
        
        .calendar-legend {
            display: flex;
            justify-content: center;
            gap: var(--space-lg);
            margin-top: var(--space-lg);
            padding-top: var(--space-lg);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: var(--space-xs);
            font-size: var(--text-xs);
            color: var(--color-gray);
        }
        
        .legend-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
        
        .legend-dot.available {
            background: transparent;
            border: 1px solid var(--color-gold);
        }
        
        .legend-dot.blocked {
            background: var(--color-gray-dark);
        }
        
        .legend-dot.selected {
            background: var(--color-gold);
        }
        
        .calendar-selected-display {
            text-align: center;
            margin-top: var(--space-lg);
            font-size: var(--text-sm);
        }
    `;
    document.head.appendChild(style);
    
    // Wrap container
    container.classList.add('calendar-widget');
    
    // Add selected date display
    const display = document.createElement('div');
    display.className = 'calendar-selected-display';
    display.id = 'selectedDateDisplay';
    display.textContent = '📅 Selecione uma data disponível';
    container.appendChild(display);
    
    renderCalendar(containerId);
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
});


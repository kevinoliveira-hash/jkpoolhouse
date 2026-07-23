/* ============================================================
   NOTIFICATIONS.JS - Push Notifications
   JK Pool House
   ============================================================ */

'use strict';

// ============================================================
// CHECK PUSH NOTIFICATION SUPPORT
// ============================================================
function isPushSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

// ============================================================
// REQUEST PERMISSION
// ============================================================
function requestNotificationPermission() {
    if (!isPushSupported()) return;

    // Don't ask if already denied
    if (Notification.permission === 'denied') return;
    if (Notification.permission === 'granted') return;

    // Show a custom prompt first (non-intrusive)
    showNotificationPrompt();
}

// ============================================================
// NOTIFICATION PROMPT UI
// ============================================================
function showNotificationPrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'notification-prompt';
    prompt.innerHTML = `
        <div class="notification-prompt-content">
            <div class="notification-prompt-icon">🔔</div>
            <div class="notification-prompt-text">
                <h4>Fique por dentro!</h4>
                <p>Receba notificações sobre promoções e novidades da JK Pool House.</p>
            </div>
            <div class="notification-prompt-buttons">
                <button class="notification-btn notification-btn-secondary" onclick="dismissNotificationPrompt()">Agora não</button>
                <button class="notification-btn notification-btn-primary" onclick="enableNotifications()">Ativar</button>
            </div>
        </div>
    `;
    document.body.appendChild(prompt);

    requestAnimationFrame(() => {
        prompt.classList.add('show');
    });
}

function dismissNotificationPrompt() {
    const prompt = document.querySelector('.notification-prompt');
    if (prompt) {
        prompt.classList.remove('show');
        setTimeout(() => prompt.remove(), 400);
    }
    localStorage.setItem('notificationPromptDismissed', 'true');
}

// ============================================================
// ENABLE NOTIFICATIONS
// ============================================================
async function enableNotifications() {
    dismissNotificationPrompt();

    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            localStorage.setItem('notificationsEnabled', 'true');
            showToast('🔔 Notificações ativadas!');
            
            // Register service worker for push
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;
                
                // In production, you would subscribe to push service here
                // const subscription = await registration.pushManager.subscribe({
                //     userVisibleOnly: true,
                //     applicationServerKey: urlBase64ToUint8Array('YOUR_PUBLIC_VAPID_KEY')
                // });
                // Send subscription to your server
                
                // For demo, show a test notification
                if (Notification.permission === 'granted') {
                    registration.showNotification('JK Pool House', {
                        body: 'Obrigado por ativar as notificações! 🎉',
                        icon: '/imagens/logo.jpg',
                        badge: '/imagens/logo.jpg',
                        vibrate: [200, 100, 200]
                    });
                }
            }
        } else {
            showToast('Notificações desativadas. Você pode ativar nas configurações.');
        }
    } catch (error) {
        console.log('Notification error:', error);
    }
}

// ============================================================
// SHOW BROWSER NOTIFICATION
// ============================================================
function showBrowserNotification(title, body, url) {
    if (!isPushSupported()) return;
    if (Notification.permission !== 'granted') return;

    try {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title || 'JK Pool House', {
                body: body || 'Novidades no espaço!',
                icon: '/imagens/logo.jpg',
                badge: '/imagens/logo.jpg',
                vibrate: [200, 100, 200],
                data: {
                    url: url || '/'
                }
            });
        });
    } catch (error) {
        console.log('Show notification error:', error);
    }
}

// ============================================================
// TOAST HELPER
// ============================================================
function showToast(message) {
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    });
}

// ============================================================
// ADD STYLES
// ============================================================
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification-prompt {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 10000;
            background: rgba(10, 10, 10, 0.98);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            transform: translateY(-100%);
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        .notification-prompt.show {
            transform: translateY(0);
        }
        .notification-prompt-content {
            max-width: 1280px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .notification-prompt-icon { font-size: 2rem; flex-shrink: 0; }
        .notification-prompt-text { flex: 1; }
        .notification-prompt-text h4 {
            font-family: 'Cinzel', serif;
            font-size: 0.9rem;
            color: #D4AF37;
            margin-bottom: 0.15rem;
        }
        .notification-prompt-text p {
            font-size: 0.78rem;
            color: #C8C8C8;
        }
        .notification-prompt-buttons {
            display: flex;
            gap: 0.5rem;
            flex-shrink: 0;
        }
        .notification-btn {
            padding: 0.5rem 1.25rem;
            border-radius: 999px;
            font-size: 0.78rem;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }
        .notification-btn-primary {
            background: linear-gradient(135deg, #B8960F, #D4AF37);
            color: #050505;
            border: none;
        }
        .notification-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        .notification-btn-secondary {
            background: transparent;
            color: #C8C8C8;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .notification-btn-secondary:hover {
            border-color: #D4AF37;
            color: #D4AF37;
        }

        .notification-toast {
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%) translateY(-20px);
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
        .notification-toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }

        @media (max-width: 767px) {
            .notification-prompt-content {
                flex-direction: column;
                text-align: center;
                padding: 0.75rem 1rem;
            }
            .notification-prompt-icon { font-size: 1.5rem; }
            .notification-prompt-buttons { width: 100%; }
            .notification-btn { flex: 1; font-size: 0.7rem; padding: 0.4rem 0.75rem; }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    addNotificationStyles();

    // Check if we should show the notification prompt
    const dismissed = localStorage.getItem('notificationPromptDismissed');
    const enabled = localStorage.getItem('notificationsEnabled');
    
    if (!dismissed && !enabled) {
        // Show prompt after some delay
        setTimeout(requestNotificationPermission, 15000);
    }
});

// Expose globally
window.enableNotifications = enableNotifications;
window.dismissNotificationPrompt = dismissNotificationPrompt;
window.showBrowserNotification = showBrowserNotification;


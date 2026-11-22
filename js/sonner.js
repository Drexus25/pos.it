/**
 * Sonner Toast - Minimalist & Sleek Toast Notification Library
 * Inspired by Emil Kowalski's Sonner
 */
(function (global) {
    'use strict';

    // Inject styles
    const styles = `
        .sonner-toaster {
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            box-sizing: border-box;
        }

        .sonner-toaster * {
            box-sizing: border-box;
        }

        .sonner-toast {
            pointer-events: auto;
            position: relative;
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            max-width: 420px;
            padding: 13px 16px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 10px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
            font-size: 0.875rem;
            color: #111827;
            cursor: pointer;
            user-select: none;
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            animation: sonner-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .sonner-toast:hover {
            box-shadow: 0 14px 28px -4px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .sonner-toast.sonner-exiting {
            animation: sonner-exit 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes sonner-enter {
            from {
                opacity: 0;
                transform: translateY(-16px) scale(0.96);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes sonner-exit {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(-10px) scale(0.96);
            }
        }

        .sonner-icon {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
        }

        .sonner-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
            overflow: hidden;
        }

        .sonner-title {
            font-weight: 500;
            line-height: 1.4;
            color: #111827;
            word-break: break-word;
        }

        .sonner-description {
            font-size: 0.8125rem;
            color: #6b7280;
            line-height: 1.4;
        }

        .sonner-close {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            border-radius: 6px;
            border: none;
            background: transparent;
            color: #9ca3af;
            cursor: pointer;
            padding: 0;
            opacity: 0.6;
            transition: opacity 0.15s, background-color 0.15s, color 0.15s;
        }

        .sonner-close:hover {
            opacity: 1;
            color: #374151;
            background-color: #f3f4f6;
        }

        .sonner-toast-confirm {
            align-items: flex-start;
            padding: 16px 18px;
            min-width: 340px;
            max-width: 440px;
            cursor: default;
        }

        .sonner-toast-confirm .sonner-icon {
            margin-top: 2px;
        }

        .sonner-actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            margin-top: 12px;
            width: 100%;
        }

        .sonner-btn {
            border: none;
            border-radius: 6px;
            font-size: 0.8125rem;
            font-weight: 600;
            padding: 7px 14px;
            cursor: pointer;
            font-family: inherit;
            transition: all 0.15s ease;
        }

        .sonner-btn-cancel {
            background: #f3f4f6;
            color: #4b5563;
            border: 1px solid #e5e7eb;
        }

        .sonner-btn-cancel:hover {
            background: #e5e7eb;
            color: #111827;
        }

        .sonner-btn-confirm {
            background: #111827;
            color: #ffffff;
        }

        .sonner-btn-confirm:hover {
            background: #1f2937;
        }

        .sonner-btn-confirm.danger {
            background: #dc2626;
            color: #ffffff;
        }

        .sonner-btn-confirm.danger:hover {
            background: #b91c1c;
        }

        @media (max-width: 640px) {
            .sonner-toaster {
                left: 16px;
                right: 16px;
                top: 16px;
                bottom: auto;
            }
            .sonner-toast {
                min-width: 100%;
                max-width: 100%;
            }
        }
    `;

    // Initialize container
    let container = null;

    function getContainer() {
        if (!container || !document.body || !document.body.contains(container)) {
            container = document.createElement('div');
            container.className = 'sonner-toaster';
            container.setAttribute('aria-live', 'polite');
            if (document.body) {
                document.body.appendChild(container);
            }
        }
        return container;
    }

    function initStyles() {
        if (!document.getElementById('sonner-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'sonner-styles';
            styleEl.textContent = styles;
            if (document.head) {
                document.head.appendChild(styleEl);
            } else {
                document.addEventListener('DOMContentLoaded', () => document.head.appendChild(styleEl));
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initStyles();
            getContainer();
        });
    } else {
        initStyles();
    }

    // Icons
    const icons = {
        success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
        error: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
        default: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
        trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,
        logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
        close: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
    };

    /**
     * Create a toast
     */
    function createToast(title, options = {}) {
        initStyles();
        if (!document.body) {
            document.addEventListener('DOMContentLoaded', () => createToast(title, options));
            return;
        }
        const parent = getContainer();

        const type = options.type || 'default';
        const duration = typeof options.duration === 'number' ? options.duration : 3500;
        const description = options.description || '';

        const toastEl = document.createElement('div');
        toastEl.className = `sonner-toast sonner-toast-${type}`;

        // Icon
        const iconContainer = document.createElement('div');
        iconContainer.className = 'sonner-icon';
        iconContainer.innerHTML = options.icon || icons[type] || icons.default;
        toastEl.appendChild(iconContainer);

        // Content
        const content = document.createElement('div');
        content.className = 'sonner-content';

        const titleEl = document.createElement('div');
        titleEl.className = 'sonner-title';
        titleEl.textContent = title;
        content.appendChild(titleEl);

        if (description) {
            const descEl = document.createElement('div');
            descEl.className = 'sonner-description';
            descEl.textContent = description;
            content.appendChild(descEl);
        }
        toastEl.appendChild(content);

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'sonner-close';
        closeBtn.innerHTML = icons.close;
        closeBtn.setAttribute('aria-label', 'Close toast');
        toastEl.appendChild(closeBtn);

        // Add to DOM
        parent.appendChild(toastEl);

        let timeoutId = null;
        let isDismissed = false;

        function dismiss() {
            if (isDismissed) return;
            isDismissed = true;
            toastEl.classList.add('sonner-exiting');

            toastEl.addEventListener('animationend', () => {
                if (toastEl.parentNode) {
                    toastEl.parentNode.removeChild(toastEl);
                }
                if (typeof options.onDismiss === 'function') {
                    options.onDismiss();
                }
            }, { once: true });
        }

        function startTimer() {
            if (duration > 0) {
                timeoutId = setTimeout(dismiss, duration);
            }
        }

        function pauseTimer() {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        }

        // Event listeners
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dismiss();
        });

        toastEl.addEventListener('click', () => {
            dismiss();
        });

        toastEl.addEventListener('mouseenter', pauseTimer);
        toastEl.addEventListener('mouseleave', startTimer);

        startTimer();

        return {
            id: toastEl,
            dismiss
        };
    }

    // Main toast function
    function toast(title, options) {
        return createToast(title, options);
    }

    toast.success = function (title, options = {}) {
        return createToast(title, { ...options, type: 'success' });
    };

    toast.error = function (title, options = {}) {
        return createToast(title, { ...options, type: 'error' });
    };

    toast.warning = function (title, options = {}) {
        return createToast(title, { ...options, type: 'warning' });
    };

    toast.info = function (title, options = {}) {
        return createToast(title, { ...options, type: 'info' });
    };

    /**
     * Confirmation dialog in Sonner style
     */
    toast.confirm = function (title, options = {}) {
        return new Promise((resolve) => {
            initStyles();
            if (!document.body) {
                document.addEventListener('DOMContentLoaded', () => toast.confirm(title, options).then(resolve));
                return;
            }
            const parent = getContainer();

            const description = options.description || '';
            const confirmText = options.confirmText || 'Konfirmasi';
            const cancelText = options.cancelText || 'Batal';
            const isDanger = options.danger !== false;

            const toastEl = document.createElement('div');
            toastEl.className = 'sonner-toast sonner-toast-confirm';

            // Icon
            const iconContainer = document.createElement('div');
            iconContainer.className = 'sonner-icon';
            iconContainer.innerHTML = options.icon || (isDanger ? icons.trash : icons.warning);
            toastEl.appendChild(iconContainer);

            // Content
            const content = document.createElement('div');
            content.className = 'sonner-content';

            const titleEl = document.createElement('div');
            titleEl.className = 'sonner-title';
            titleEl.textContent = title;
            content.appendChild(titleEl);

            if (description) {
                const descEl = document.createElement('div');
                descEl.className = 'sonner-description';
                descEl.textContent = description;
                content.appendChild(descEl);
            }

            // Action Buttons
            const actionsEl = document.createElement('div');
            actionsEl.className = 'sonner-actions';

            const cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'sonner-btn sonner-btn-cancel';
            cancelBtn.textContent = cancelText;

            const confirmBtn = document.createElement('button');
            confirmBtn.type = 'button';
            confirmBtn.className = `sonner-btn sonner-btn-confirm ${isDanger ? 'danger' : ''}`;
            confirmBtn.textContent = confirmText;

            actionsEl.appendChild(cancelBtn);
            actionsEl.appendChild(confirmBtn);
            content.appendChild(actionsEl);
            toastEl.appendChild(content);

            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'sonner-close';
            closeBtn.innerHTML = icons.close;
            closeBtn.setAttribute('aria-label', 'Close');
            toastEl.appendChild(closeBtn);

            parent.appendChild(toastEl);

            let isDismissed = false;

            function dismiss(result) {
                if (isDismissed) return;
                isDismissed = true;
                toastEl.classList.add('sonner-exiting');

                toastEl.addEventListener('animationend', () => {
                    if (toastEl.parentNode) {
                        toastEl.parentNode.removeChild(toastEl);
                    }
                    if (result) {
                        if (typeof options.onConfirm === 'function') options.onConfirm();
                    } else {
                        if (typeof options.onCancel === 'function') options.onCancel();
                    }
                    resolve(result);
                }, { once: true });
            }

            cancelBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismiss(false);
            });

            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismiss(false);
            });

            confirmBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismiss(true);
            });
        });
    };

    // Replace native window.alert with Sonner
    const originalAlert = global.alert;
    global.alert = function (message, callback) {
        if (!message) return;
        const msgStr = String(message).toLowerCase();

        let type = 'default';
        if (msgStr.includes('berhasil') || msgStr.includes('sukses') || msgStr.includes('disimpan')) {
            type = 'success';
        } else if (msgStr.includes('gagal') || msgStr.includes('salah') || msgStr.includes('tidak ditemukan')) {
            type = 'error';
        } else if (
            msgStr.includes('kurang') ||
            msgStr.includes('habis') ||
            msgStr.includes('tersisa') ||
            msgStr.includes('wajib') ||
            msgStr.includes('tidak boleh') ||
            msgStr.includes('maksimal')
        ) {
            type = 'warning';
        }

        const onDismiss = typeof callback === 'function' ? callback : undefined;
        return createToast(String(message), { type, onDismiss });
    };

    global.toast = toast;

    // Automatic logout confirmation handler for all sidebar logout links
    document.addEventListener('click', function (e) {
        const logoutLink = e.target.closest('.sidebar-logout a, [data-action="logout"]');
        if (logoutLink) {
            e.preventDefault();
            toast.confirm('Keluar dari akun?', {
                description: 'Sesi Anda saat ini akan diakhiri.',
                confirmText: 'Ya, Keluar',
                cancelText: 'Batal',
                danger: true,
                icon: icons.logout,
                onConfirm: () => {
                    sessionStorage.removeItem('pos_user');
                    toast.success('Berhasil keluar.');
                    setTimeout(() => {
                        window.location.href = logoutLink.getAttribute('href') || 'login.html';
                    }, 750);
                }
            });
        }
    });
})(typeof window !== 'undefined' ? window : this);

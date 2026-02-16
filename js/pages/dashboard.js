// ============================================================
// dashboard.js — Kernel Apps Copilot Landing
// Purpose: Premium Copilot-style input with typewriter animation
// Dependencies: components.js, auth.js
// ============================================================

const DashboardPage = (() => {

    let _animFrame = null;
    let _animRunning = false;

    const PLACEHOLDERS = [
        'Describe your task to open the right feature',
        'Security Role Management',
        'User Profile Enrichment',
        'Module Management',
        'User Role Assignment',
        'Audit Logs'
    ];

    const TYPING_SPEED = 60;
    const DELETING_SPEED = 40;
    const PAUSE_AFTER = 1800;

    function render() {
        document.getElementById('login-page').classList.add('d-none');
        document.getElementById('app-layout').classList.remove('d-none');
        Components.renderNavbar('kernel');
        Components.renderSidebar('kernel-dashboard');

        const user = Auth.getCurrentUser();
        const firstName = user.name.split(' ')[0];

        const center = document.getElementById('center-stage');
        center.className = 'center-stage kernel-dashboard';

        center.innerHTML = `
            <div class="copilot-landing">
                <h1 class="copilot-heading">Welcome, how can I help?</h1>
                <div class="copilot-input-bar">
                    <input
                        type="text"
                        id="copilot-input"
                        class="copilot-input"
                        aria-label="Copilot command"
                        autocomplete="off"
                    >
                    <span id="copilot-ghost" class="copilot-ghost"></span>
                </div>
            </div>
        `;

        _initTypewriter();
    }

    // ---- Typewriter animation ----
    function _initTypewriter() {
        const input = document.getElementById('copilot-input');
        const ghost = document.getElementById('copilot-ghost');
        if (!input || !ghost) return;

        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let lastTime = 0;
        let pauseUntil = 0;

        function shouldAnimate() {
            return document.activeElement !== input && input.value === '';
        }

        function tick(timestamp) {
            if (!shouldAnimate()) {
                ghost.textContent = '';
                _animFrame = requestAnimationFrame(tick);
                return;
            }

            if (timestamp < pauseUntil) {
                _animFrame = requestAnimationFrame(tick);
                return;
            }

            const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
            if (timestamp - lastTime < speed) {
                _animFrame = requestAnimationFrame(tick);
                return;
            }
            lastTime = timestamp;

            const phrase = PLACEHOLDERS[phraseIdx];

            if (!isDeleting) {
                charIdx++;
                ghost.textContent = phrase.substring(0, charIdx);

                if (charIdx === phrase.length) {
                    isDeleting = true;
                    pauseUntil = timestamp + PAUSE_AFTER;
                }
            } else {
                charIdx--;
                ghost.textContent = phrase.substring(0, charIdx);

                if (charIdx === 0) {
                    isDeleting = false;
                    phraseIdx = (phraseIdx + 1) % PLACEHOLDERS.length;
                }
            }

            _animFrame = requestAnimationFrame(tick);
        }

        // Start animation
        _animFrame = requestAnimationFrame(tick);
        _animRunning = true;

        // Hide ghost on focus / show on blur if empty
        input.addEventListener('focus', () => {
            ghost.textContent = '';
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                // Animation loop will handle re-showing
            }
        });

        input.addEventListener('input', () => {
            if (input.value !== '') {
                ghost.textContent = '';
            }
        });
    }

    function destroy() {
        if (_animFrame) {
            cancelAnimationFrame(_animFrame);
            _animFrame = null;
            _animRunning = false;
        }
    }

    return { render, destroy };
})();

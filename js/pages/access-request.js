// ============================================================
// access-request.js — Access Request Page (ECC locked app flow)
// Purpose: Form to request access to locked applications
// Dependencies: store.js, auth.js, components.js
// ============================================================

const AccessRequestPage = (() => {

    function render() {
        document.getElementById('login-page').classList.add('d-none');
        document.getElementById('app-layout').classList.remove('d-none');
        Components.hideSidebar();
        Components.renderNavbar('ecc');

        const appData = (() => {
            try {
                const raw = sessionStorage.getItem('accessRequestApp');
                return raw ? JSON.parse(raw) : null;
            } catch (_) { return null; }
        })();

        if (!appData?.appId) {
            Router.navigate('ecc');
            return;
        }

        const appId = appData.appId;
        const appName = appData.appName || 'Unknown Application';

        const center = document.getElementById('center-stage');
        center.className = 'center-stage feature-page';

        center.innerHTML = `
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1>Request Access</h1>
                        <p class="page-subtitle">Submit a request to access this application</p>
                    </div>
                </div>

                <div class="access-request-card">
                    <form id="access-request-form" class="form-grid">
                        <div class="form-group full-width">
                            <label>Application Name</label>
                            <input type="text" id="f-app-name" readonly placeholder="(no application selected)">
                        </div>
                        <div class="form-group full-width">
                            <label>Reason for Access *</label>
                            <textarea id="f-reason" rows="3" required placeholder="Explain why you need access to this application"></textarea>
                        </div>
                        <div class="form-group full-width">
                            <label>Business Justification *</label>
                            <textarea id="f-justification" rows="3" required placeholder="Provide business justification for your access request"></textarea>
                        </div>
                        <div class="form-group full-width">
                            <label>Duration Needed <span class="optional">(optional)</span></label>
                            <input type="text" id="f-duration" placeholder="e.g., 6 months, permanent">
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-secondary" onclick="AccessRequestPage.cancel()">Cancel</button>
                            <button type="submit" class="btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('f-app-name').value = appName || '(no application selected)';

        document.getElementById('access-request-form').addEventListener('submit', (e) => {
            e.preventDefault();
            submitRequest(appId, appName);
        });
    }

    function submitRequest(appId, appName) {
        const reason = document.getElementById('f-reason').value.trim();
        const justification = document.getElementById('f-justification').value.trim();
        const duration = document.getElementById('f-duration').value.trim();

        if (!reason || !justification) {
            Components.showToast('Please fill in all required fields', 'error');
            return;
        }

        const user = Auth.getCurrentUser();
        const message = [
            `Reason: ${reason}`,
            `Justification: ${justification}`,
            duration ? `Duration: ${duration}` : ''
        ].filter(Boolean).join('\n');

        const requestRecord = Store.add('access_requests', {
            request_id: Store.generateId('AR'),
            app_id: appId,
            app_name: appName,
            user_id: user?.email || '',
            message: message,
            created_at: new Date().toISOString(),
            status: 'pending'
        });

        const admins = Store.getModuleAdmins(appId);
        admins.forEach(admin => {
            Store.add('notifications', {
                notification_id: Store.generateId('NT'),
                user_email: admin.entra_email_id,
                type: 'ACCESS_REQUEST',
                reference_id: requestRecord.request_id,
                module_id: appId,
                created_at: new Date().toISOString(),
                is_read: false
            });
        });

        sessionStorage.removeItem('accessRequestApp');
        Components.showToast('Access request submitted successfully', 'success');
        Router.navigate('ecc');
    }

    function cancel() {
        sessionStorage.removeItem('accessRequestApp');
        Router.navigate('ecc');
    }

    return { render, submitRequest, cancel };
})();

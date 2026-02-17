// ============================================================
// admin-access-requests.js — Admin Access Requests Page
// Purpose: View/approve access requests for modules where user is admin
// Dependencies: store.js, auth.js, components.js
// ============================================================

const AdminAccessRequestsPage = (() => {

    function render() {
        document.getElementById('login-page').classList.add('d-none');
        document.getElementById('app-layout').classList.remove('d-none');
        Components.renderNavbar('kernel');
        Components.renderSidebar('module-mgmt');

        const currentUser = Auth.getCurrentUser();
        if (!currentUser) {
            Router.navigate('login');
            return;
        }

        const allRequests = Store.getAll('access_requests');
        const visibleRequests = allRequests.filter(req =>
            Store.isModuleAdmin(currentUser.email, req.app_id)
        );

        const center = document.getElementById('center-stage');
        center.className = 'center-stage feature-page';

        center.innerHTML = `
            ${Components.renderTabBar('admin-access-requests')}
            <div class="page-content">
                <div class="page-header">
                    <div>
                        <h1>Access Requests</h1>
                        <p class="page-subtitle">Review and manage access requests for your modules</p>
                    </div>
                    <button class="btn-secondary" onclick="Router.navigate('ecc')">
                        <i class="fas fa-arrow-left"></i> Back to ECC
                    </button>
                </div>

                <div class="data-table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Application</th>
                                <th>Requester</th>
                                <th>Message</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${visibleRequests.length > 0 ? visibleRequests.map(r => `
                                <tr>
                                    <td><strong>${r.app_name || r.app_id}</strong></td>
                                    <td>${r.user_id || '-'}</td>
                                    <td class="desc-cell">${(r.message || '').substring(0, 60)}${(r.message || '').length > 60 ? '...' : ''}</td>
                                    <td>${formatDate(r.created_at)}</td>
                                    <td><span class="status-badge ${r.status === 'pending' ? 'active' : r.status === 'approved' ? 'active' : 'inactive'}">${r.status || 'pending'}</span></td>
                                    <td class="actions-cell">
                                        ${r.status === 'pending' ? `
                                            <button class="icon-btn edit" onclick="AdminAccessRequestsPage.approve('${r.request_id}')" title="Approve"><i class="fas fa-check"></i></button>
                                            <button class="icon-btn delete" onclick="AdminAccessRequestsPage.reject('${r.request_id}')" title="Reject"><i class="fas fa-times"></i></button>
                                        ` : '-'}
                                    </td>
                                </tr>
                            `).join('') : '<tr><td colspan="6" class="empty-cell">No access requests for your modules.</td></tr>'}
                        </tbody>
                    </table>
                    <div class="table-footer">Showing ${visibleRequests.length} of ${visibleRequests.length} requests</div>
                </div>
            </div>
        `;
    }

    function formatDate(isoStr) {
        if (!isoStr) return '-';
        try {
            const d = new Date(isoStr);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (_) { return isoStr; }
    }

    function approve(requestId) {
        Store.update('access_requests', 'request_id', requestId, { status: 'approved' });
        Components.showToast('Access request approved');
        render();
    }

    function reject(requestId) {
        Store.update('access_requests', 'request_id', requestId, { status: 'rejected' });
        Components.showToast('Access request rejected');
        render();
    }

    return { render, approve, reject };
})();

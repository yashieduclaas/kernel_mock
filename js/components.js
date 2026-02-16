// ============================================================
// components.js — Reusable UI Components
// Accordion sidebar with Fluent UI System Icons (Entra-style)
// Dependencies: auth.js, store.js
// ============================================================

const Components = (() => {

    // Fluent UI SVG icons for each module group (parent-level)
    const MODULE_SVG_ICONS = {
        scc: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L3 6.5V11.5C3 17.09 6.84 22.28 12 23.5C17.16 22.28 21 17.09 21 11.5V6.5L12 2ZM12 4.18L19 7.63V11.5C19 16.05 15.97 20.22 12 21.44C8.03 20.22 5 16.05 5 11.5V7.63L12 4.18ZM10.29 10.71L8.71 12.29L11 14.59L15.29 10.29L13.71 8.71L11 11.41L10.29 10.71Z" stroke="currentColor" stroke-width="0.3" fill="currentColor"/></svg>`,

        acc: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5ZM12 10.5C11.17 10.5 10.5 11.17 10.5 12C10.5 12.83 11.17 13.5 12 13.5C12.83 13.5 13.5 12.83 13.5 12C13.5 11.17 12.83 10.5 12 10.5ZM19.43 12.97C19.47 12.65 19.5 12.33 19.5 12C19.5 11.67 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.65 4.57 12.97L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.95C7.96 18.35 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.67 16.04 18.34 16.56 17.95L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.97Z" fill="currentColor"/></svg>`,

        helpdesk: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1C7.03 1 3 5.03 3 10V16C3 17.66 4.34 19 6 19H8V12H5V10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10V12H16V19H19C20.66 19 22 17.66 22 16V10C22 5.03 17.97 1 12 1ZM7 14V17H6C5.45 17 5 16.55 5 16V14H7ZM19 16C19 16.55 18.55 17 18 17H17V14H19V16Z" fill="currentColor"/></svg>`
    };

    // Fluent UI SVG icons for child nav items
    const CHILD_SVG_ICONS = {
        // SCC children
        'scc-dashboard': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor"/></svg>`,
        'module-mgmt': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM4 20H8V16H4V20ZM4 14H8V10H4V14ZM10 14H14V10H10V14ZM16 4V8H20V4H16ZM10 8H14V4H10V8ZM16 14H20V10H16V14ZM16 20H20V16H16V20Z" fill="currentColor"/></svg>`,
        'user-profile': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 13C9.33 13 4 14.34 4 17V20H20V17C20 14.34 14.67 13 12 13ZM18 18H6V17.01C6.2 16.29 9.3 15 12 15C14.7 15 17.8 16.29 18 17V18Z" fill="currentColor"/></svg>`,
        'role-mgmt': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="currentColor"/></svg>`,
        'user-role-assign': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/></svg>`,
        'audit-logs': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="currentColor"/></svg>`,
        // ACC children
        'acc-governance': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M4 9H20V11H4V9ZM4 13H14V15H4V13ZM18 13L16 15L18 17L22 13H18ZM4 17H14V19H4V17ZM4 5H20V7H4V5Z" fill="currentColor"/></svg>`,
        'acc-workflows': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M22 11V3H15V6H9V3H2V11H9V8H11V18H15V21H22V13H15V16H13V8H15V11H22ZM7 9H4V5H7V9ZM17 15H20V19H17V15ZM17 5H20V9H17V5Z" fill="currentColor"/></svg>`,
        'acc-analytics': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M3.5 18.49L9.5 12.48L13.5 16.48L22 6.92L20.59 5.51L13.5 13.48L9.5 9.48L2 16.99L3.5 18.49Z" fill="currentColor"/></svg>`,
        'acc-deployment': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M9.19 6.35C8.41 7.28 7.3 7.86 6.08 7.97C5.84 9.34 6.17 10.72 6.99 11.81C7.23 12.12 7.28 12.54 7.11 12.89L5 17.5L7.5 17.5L8.5 20L11.16 14.33C11.37 13.93 11.79 13.64 12.29 13.68C12.5 13.7 12.72 13.7 12.92 13.68C13.42 13.64 13.82 13.93 14.04 14.33L16.7 20L17.7 17.5L20.2 17.5L18.1 12.89C17.93 12.54 17.97 12.12 18.22 11.81C19.04 10.72 19.37 9.34 19.13 7.97C17.91 7.86 16.79 7.28 16.02 6.35C15.03 7.08 13.78 7.5 12.5 7.5C11.22 7.5 9.97 7.08 9 6.35L9.19 6.35ZM12.5 2C14.16 2 15.5 3.34 15.5 5C15.5 6.66 14.16 8 12.5 8C10.84 8 9.5 6.66 9.5 5C9.5 3.34 10.84 2 12.5 2Z" fill="currentColor"/></svg>`,
        // Helpdesk children
        'hd-access-request': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M12.65 10C11.83 7.67 9.61 6 7 6C3.69 6 1 8.69 1 12C1 15.31 3.69 18 7 18C9.61 18 11.83 16.33 12.65 14H17V18H21V14H23V10H12.65ZM7 14C5.9 14 5 13.1 5 12C5 10.9 5.9 10 7 10C8.1 10 9 10.9 9 12C9 13.1 8.1 14 7 14Z" fill="currentColor"/></svg>`,
        'hd-ticketing': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M22 10V6C22 4.89 21.1 4 20 4H4C2.9 4 2 4.89 2 6V10C3.11 10 4 10.9 4 12C4 13.1 3.11 14 2 14V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V14C20.89 14 20 13.1 20 12C20 10.9 20.9 10 22 10ZM13 17.5H11V15.5H13V17.5ZM13 13H11V11H13V13ZM13 8.5H11V6.5H13V8.5Z" fill="currentColor"/></svg>`,
        'hd-knowledge': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z" fill="currentColor"/></svg>`,
        'hd-copilot': `<svg class="nav-child-icon" viewBox="0 0 24 24" fill="none"><path d="M20 9V7C20 5.9 19.1 5 18 5H6C4.9 5 4 5.9 4 7V9C2.9 9 2 9.9 2 11V15C2 16.1 2.9 17 4 17H8L12 21L16 17H20C21.1 17 22 16.1 22 15V11C22 9.9 21.1 9 20 9ZM18 7V9H13V7H18ZM6 7H11V9H6V7ZM20 15H15.17L12 18.17L8.83 15H4V11H20V15ZM6 12H10V14H6V12ZM11 12H13V14H11V12ZM14 12H18V14H14V12Z" fill="currentColor"/></svg>`
    };

    // Define which nav items belong to each module
    const MODULE_NAV = {
        scc: {
            label: 'Security Control Centre',
            icon: 'scc',
            items: [
                { id: 'scc-dashboard', label: 'Dashboard' },
                { id: 'module-mgmt', label: 'Module Management' },
                { id: 'user-profile', label: 'User Profile Enrichment' },
                { id: 'role-mgmt', label: 'Security Role Management' },
                { id: 'user-role-assign', label: 'User Role Assignment' },
                { id: 'audit-logs', label: 'Audit Logs' },
            ]
        },
        acc: {
            label: 'Admin Control Centre',
            icon: 'acc',
            items: [
                { id: 'acc-governance', label: 'Governance & Compliance' },
                { id: 'acc-workflows', label: 'Workflow Automation' },
                { id: 'acc-analytics', label: 'Analytics & KPIs' },
                { id: 'acc-deployment', label: 'Deployment & Release' },
            ]
        },
        helpdesk: {
            label: 'Helpdesk',
            icon: 'helpdesk',
            items: [
                { id: 'hd-access-request', label: 'Access Requests' },
                { id: 'hd-ticketing', label: 'Issue Ticketing' },
                { id: 'hd-knowledge', label: 'Knowledge Base' },
                { id: 'hd-copilot', label: 'AI Assistant' },
            ]
        }
    };

    // ---------- Determine which module a page belongs to ----------
    function getModuleForPage(pageId) {
        for (const [modKey, mod] of Object.entries(MODULE_NAV)) {
            if (mod.items.some(item => item.id === pageId)) return modKey;
        }
        return null; // kernel-dashboard or unknown
    }

    // ---------- Top Navbar ----------
    function renderNavbar(context) {
        const user = Auth.getCurrentUser();
        const initials = Auth.getInitials(user.name);
        const navEl = document.getElementById('top-navbar');
        navEl.className = 'top-nav';

        // CLaaS2SaaS brand (always navigates to ECC landing)
        const brandHtml = `
            <div class="nav-brand" onclick="Router.navigate('ecc')">
                <span class="brand-c">C</span><span class="brand-l">L</span><span class="brand-a1">a</span><span class="brand-a2">a</span><span class="brand-s1">S</span><span class="brand-2">2</span><span class="brand-s2">S</span><span class="brand-a3">a</span><span class="brand-a4">a</span><span class="brand-s3">S</span>
            </div>`;

        // Context label (always with separator)
        const contextLabel = context === 'ecc'
            ? '<span class="nav-separator">|</span><span class="nav-context-label">Enterprise Control Centre</span>'
            : '<span class="nav-separator">|</span><span class="nav-context-label" style="cursor:pointer" onclick="Router.navigate(\'kernel-dashboard\')">Kernel Apps</span>';

        // Centered search bar (white, with role badge)
        const searchBar = `
            <div class="nav-search-wrapper">
                <div class="nav-search-bar">
                    <i class="fas fa-search nav-search-icon"></i>
                    <input type="text" class="nav-search-input" placeholder="Search modules..." aria-label="Search modules">
                    <span class="nav-search-role-badge"><i class="fas fa-user"></i> ${user.role_label}</span>
                </div>
            </div>`;

        // Environment banner (inline on header, no bg — just text)
        const envBanner = `
            <div class="nav-env-banner" onclick="Components.toggleEnvPanel()" title="Select environment">
                <i class="fas fa-globe nav-env-icon"></i>
                <div class="nav-env-text">
                    <span class="nav-env-label">Environment</span>
                    <span class="nav-env-name">CLaaS2SaaS (default)</span>
                </div>
            </div>`;

        // Environment selection panel (Power Apps style)
        const envPanel = `
            <div id="env-panel" class="env-panel d-none">
                <div class="env-panel-header">
                    <h3>Select environment</h3>
                    <button class="env-panel-close" onclick="Components.toggleEnvPanel()"><i class="fas fa-times"></i></button>
                </div>
                <p class="env-panel-desc">Spaces to create, store, and work with data and apps.<br><a href="#" class="env-learn-more">Learn more</a></p>
                <div class="env-panel-search">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Search" aria-label="Search environments">
                    <button class="env-filter-btn"><i class="fas fa-filter"></i> Filter</button>
                </div>
                <div class="env-accordion">
                    <div class="env-acc-group">
                        <button class="env-acc-header" onclick="this.classList.toggle('open')"><i class="fas fa-chevron-right env-acc-chevron"></i> Build apps with Dataverse (0)</button>
                    </div>
                    <div class="env-acc-group">
                        <button class="env-acc-header open" onclick="this.classList.toggle('open')"><i class="fas fa-chevron-right env-acc-chevron"></i> Other environments (1)</button>
                        <div class="env-acc-body">
                            <div class="env-acc-item active">
                                <i class="fas fa-check env-check"></i>
                                <span>CLaaS2SaaS (default)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

        // Right-side icon buttons
        const rightIcons = `
            <div class="nav-right">
                ${envBanner}
                <button class="nav-icon-btn" title="Notifications"><i class="fas fa-bell"></i><span class="badge-dot">3</span></button>
                <button class="nav-icon-btn" title="Settings"><i class="fas fa-gear"></i></button>
                <button class="nav-icon-btn" title="Help"><i class="fas fa-question-circle"></i></button>
                <div class="nav-user" onclick="Components.toggleUserMenu()">
                    <span class="user-avatar">${initials}</span>
                </div>
                <div id="user-dropdown" class="user-dropdown d-none">
                    <div class="dropdown-user-header">
                        <span class="dropdown-avatar">${initials}</span>
                        <div class="dropdown-user-info">
                            <span class="dropdown-user-name">${user.name}</span>
                            <span class="dropdown-user-role">${user.role_label}</span>
                        </div>
                    </div>
                    <div class="dropdown-divider"></div>
                    <button onclick="Router.navigate('user-profile')"><i class="fas fa-user"></i> My Profile</button>
                    <button onclick="Components.handleLogout()"><i class="fas fa-sign-out-alt"></i> Logout</button>
                    <button onclick="Store.resetDB(); location.reload();"><i class="fas fa-database"></i> Reset Data</button>
                </div>
            </div>
            ${envPanel}`;

        navEl.innerHTML = `
            <div class="nav-left">
                ${brandHtml}
                ${contextLabel}
            </div>
            ${searchBar}
            ${rightIcons}
        `;
    }

    // ---------- Left Sidebar — Accordion (Entra-style) ----------
    function renderSidebar(activeItem) {
        const sidebar = document.getElementById('left-sidebar');
        sidebar.classList.remove('d-none');
        sidebar.className = 'left-sidebar';

        const activeModule = getModuleForPage(activeItem);

        // Build accordion groups for all modules
        const shortLabels = { scc: 'SCC', acc: 'ACC', helpdesk: 'Helpdesk' };
        const groupsHtml = Object.entries(MODULE_NAV).map(([key, mod]) => {
            const isOpen = activeModule === key;
            const parentIcon = MODULE_SVG_ICONS[key] || '';
            const shortLabel = shortLabels[key] || '';

            const childrenHtml = mod.items.map(item => {
                const isActive = item.id === activeItem;
                const childIcon = CHILD_SVG_ICONS[item.id] || '';
                return `
                    <div class="nav-child ${isActive ? 'active' : ''}" onclick="Router.navigate('${item.id}')">
                        ${childIcon}
                        <span class="nav-child-text">${item.label}</span>
                    </div>
                `;
            }).join('');

            return `
                <div class="nav-group ${isOpen ? 'open' : ''}" data-group="${key}">
                    <div class="nav-parent" title="${mod.label}" onclick="Components.toggleAccordion(this)">
                        ${parentIcon}
                        <span class="nav-short-label">${shortLabel}</span>
                        <span class="chevron">
                            <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="currentColor"/></svg>
                        </span>
                    </div>
                    <div class="nav-children">
                        ${childrenHtml}
                    </div>
                </div>
            `;
        }).join('<div class="nav-divider"></div>');

        sidebar.innerHTML = `
            <nav class="sidebar-nav-accordion">
                ${groupsHtml}
            </nav>
            <button class="sidebar-collapse-btn" onclick="Components.toggleSidebar()" aria-label="Toggle sidebar">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                    <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        `;
    }

    // ---------- Accordion toggle (user-driven only) ----------
    function toggleAccordion(parentEl) {
        const sidebar = document.getElementById('left-sidebar');
        if (sidebar.classList.contains('collapsed')) return;

        const group = parentEl.parentElement;
        group.classList.toggle('open');
    }

    function hideSidebar() {
        const sidebar = document.getElementById('left-sidebar');
        sidebar.classList.add('d-none');
        sidebar.className = 'left-sidebar d-none';
    }

    function toggleSidebar() {
        const sidebar = document.getElementById('left-sidebar');
        sidebar.classList.toggle('collapsed');
    }

    function toggleUserMenu() {
        const dd = document.getElementById('user-dropdown');
        dd.classList.toggle('d-none');
        // Close env panel if open
        const ep = document.getElementById('env-panel');
        if (ep) ep.classList.add('d-none');
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!e.target.closest('.nav-user') && !e.target.closest('.user-dropdown')) {
                    dd.classList.add('d-none');
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 10);
    }

    // ==================== ENVIRONMENT PANEL ====================
    function toggleEnvPanel() {
        const panel = document.getElementById('env-panel');
        if (!panel) return;
        panel.classList.toggle('d-none');
        // Close user menu if open
        const dd = document.getElementById('user-dropdown');
        if (dd) dd.classList.add('d-none');
        if (!panel.classList.contains('d-none')) {
            setTimeout(() => {
                document.addEventListener('click', function closePanel(e) {
                    if (!e.target.closest('.env-panel') && !e.target.closest('.nav-env-banner')) {
                        panel.classList.add('d-none');
                        document.removeEventListener('click', closePanel);
                    }
                });
            }, 10);
        }
    }

    function handleLogout() {
        Auth.logout();
        Router.navigate('login');
    }

    // ---------- Modal ----------
    function showModal(title, bodyHtml, footerHtml, options = {}) {
        const size = options.size || '';
        const container = document.getElementById('modal-container');
        container.innerHTML = `
            <div class="modal-overlay" onclick="Components.closeModal()">
                <div class="modal-box ${size}" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close" onclick="Components.closeModal()"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="modal-body">${bodyHtml}</div>
                    ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
                </div>
            </div>
        `;
    }

    function closeModal() {
        document.getElementById('modal-container').innerHTML = '';
    }

    // ---------- Toast ----------
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-msg toast-${type}`;
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ---------- Tab Bar — REMOVED ----------
    function renderTabBar() { return ''; }

    return {
        renderNavbar, renderSidebar, hideSidebar,
        toggleSidebar, toggleAccordion, toggleUserMenu, toggleEnvPanel,
        handleLogout, showModal, closeModal, showToast, renderTabBar
    };
})();

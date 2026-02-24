# CLaaS2SaaS Project Extraction Report

## 1. Source Mockup (kernel-prototype-1)

### 1.1 All Pages/Screens in `js/pages/`

| Route ID | File | Description | Layout |
|----------|------|-------------|--------|
| `login` | `login.js` | Entra ID SSO mock: user selection | Full-page, no nav |
| `first-time` | `placeholders.js` | First-time user (no roles) welcome | Full-page card |
| `ecc` | `ecc.js` | Enterprise Control Centre — module cards (Unlocked/Locked) | Navbar only, no sidebar |
| `access-request` | `access-request.js` | Access request form for locked ECC apps | Navbar only |
| `admin-access-requests` | `admin-access-requests.js` | **DELETED** (git status) — Admin access request review | Kernel layout |
| `kernel-dashboard` | `dashboard.js` | Kernel Apps Copilot landing (typewriter input) | Navbar + Sidebar |
| `scc-dashboard` | `scc-dashboard.js` | SCC analytics: compliance ring, KPIs, role bars, audit table | Navbar + Sidebar |
| `module-mgmt` | `module-mgmt.js` | Solution/Module CRUD table | Navbar + Sidebar |
| `user-profile` | `user-profile.js` | Security User CRUD, search | Navbar + Sidebar |
| `role-mgmt` | `role-mgmt.js` | Security Role CRUD, permissions modal | Navbar + Sidebar |
| `user-role-assign` | `user-role-assign.js` | User Role Assignment CRUD, filter tabs | Navbar + Sidebar |
| `audit-logs` | `audit-logs.js` | Session/Action logs, audit tabs | Navbar + Sidebar |
| `acc-governance` | `placeholders.js` | Placeholder | Navbar + Sidebar |
| `acc-workflows` | `placeholders.js` | Placeholder | Navbar + Sidebar |
| `acc-analytics` | `placeholders.js` | Placeholder | Navbar + Sidebar |
| `acc-deployment` | `placeholders.js` | Placeholder | Navbar + Sidebar |
| `hd-access-request` | `placeholders.js` | Placeholder | Navbar + Sidebar |
| `hd-ticketing` | `placeholders.js` | Placeholder | Navbar + Sidebar |
| `hd-knowledge` | `placeholders.js` | Placeholder | Navbar + Sidebar |
| `hd-copilot` | `placeholders.js` | Placeholder | Navbar + Sidebar |

---

### 1.2 All Components in `js/components.js`

| Component | Purpose |
|-----------|---------|
| **Environment** | `getCurrentEnvironment`, `setCurrentEnvironment`, `selectEnvironment`, `getEnvListHtml`, `toggleEnvPanel` |
| **Navbar** | `renderNavbar(context)` — brand, context label, search bar + role badge, env banner, notification panel, user dropdown |
| **Sidebar** | `renderSidebar(activeItem)`, `hideSidebar`, `toggleSidebar`, `toggleAccordion` — accordion groups (SCC, ACC, Helpdesk) |
| **Modals** | `showModal(title, bodyHtml, footerHtml, options)`, `closeModal`, `showConfirmModal(options)` |
| **Toast** | `showToast(message, type)` — success/error/info |
| **Tab Bar** | `renderTabBar()` — returns empty string (removed) |

**MODULE_NAV structure:**
- **scc** — Security Control Centre: Dashboard, Module Management, User Profile, Role Management, User Role Assignment, Audit Logs  
- **acc** — Admin Control Centre: Governance, Workflows, Analytics, Deployment  
- **helpdesk** — Helpdesk: Access Requests, Ticketing, Knowledge Base, AI Assistant  

**Icons:** `MODULE_SVG_ICONS` (scc, acc, helpdesk), `CHILD_SVG_ICONS` (all child nav items) — Fluent-style SVGs.

---

### 1.3 CSS Files and Key Styles

**Files:**  
- `css/styles.css` (single file)

**Key design tokens (CSS variables):**

```css
--midnight: #193e6b;    /* primary */
--gold: #B3A125;        /* accent */
--violet: #7F3F98;
--jelly-blue: #448E9D;  /* secondary */
--sunray: #E9AC53;
--avocado: #5F8025;     /* success */
--violet-red: #991547;  /* danger */
--beige: #EEE7E0;       /* bg */
--white: #FFFFFF;
--font-heading: 'Montserrat', sans-serif;
--font-body: 'Source Sans 3', sans-serif;
--header-height: 64px;
--sidebar-width: 270px;
--radius: 8px;
--radius-lg: 12px;
```

**Main style groups:**
- Login: `login-container`, `login-card`, `login-user-btn`, geometric shapes
- Top navbar: `top-nav`, `nav-search-bar`, `nav-env-banner`, `user-dropdown`, `notification-panel`
- Environment panel: `env-panel`, `env-list`, `env-item`
- Sidebar: `left-sidebar`, `nav-group`, `nav-parent`, `nav-child`, `nav-children`, collapsed rail
- Buttons: `btn-primary`, `btn-secondary`, `btn-accent`, `btn-manage`
- Data table: `data-table-wrapper`, `data-table`, `table-toolbar`, `search-bar`, `filter-tabs`, `filter-btn`
- Forms: `form-grid`, `form-row`, `form-group`, `access-request-card`
- Modals: `modal-overlay`, `modal-box`, `modal-header`, `modal-body`, `modal-footer`
- Badges: `status-badge`, `role-badge`, `code-badge`, `version-badge`, `type-badge`
- SCC dashboard: `scc-dash`, `scc-compliance-ring`, `scc-kpi-card`, `scc-panel`, `role-bars`, `scc-audit-table`
- Placeholder: `placeholder-page`, `placeholder-icon`, `first-time-card`
- Copilot landing: `copilot-landing`, `copilot-input-bar`, `copilot-ghost`

---

### 1.4 `index.html` Structure and Script Load Order

**Structure:**
```html
<body>
  <div id="login-page" class="d-none">        <!-- Login (auth.js controls) -->
  <div id="app-layout" class="d-none">        <!-- Main app -->
    <nav id="top-navbar"></nav>
    <div class="app-body">
      <aside id="left-sidebar" class="d-none"></aside>
      <main id="center-stage"></main>
    </div>
  </div>
  <div id="modal-container"></div>
</body>
```

**Script load order:**
1. `js/store.js` — mock Dataverse
2. `js/auth.js` — login/session
3. `js/components.js` — reusable UI
4. `js/pages/login.js`
5. `js/pages/ecc.js`
6. `js/pages/access-request.js`
7. `js/pages/admin-access-requests.js` (file deleted)
8. `js/pages/dashboard.js`
9. `js/pages/scc-dashboard.js`
10. `js/pages/module-mgmt.js`
11. `js/pages/user-profile.js`
12. `js/pages/role-mgmt.js`
13. `js/pages/user-role-assign.js`
14. `js/pages/audit-logs.js`
15. `js/pages/placeholders.js`
16. `js/router.js` — hash router

---

### 1.5 Extracted UI Elements

| Category | Elements |
|----------|----------|
| **Tables** | `data-table`, `scc-audit-table`, `perm-table` — headers, rows, `desc-cell`, `email-cell`, `actions-cell`, `table-footer` |
| **Forms** | `form-grid`, `form-row`, `form-group`, `form-actions` — input, select, textarea, char-count, optional label |
| **Modals** | Default, `modal-lg`, `modal-xl` — overlay, header, body, footer, close button |
| **Cards** | `ecc-module-card`, `dashboard-card`, `stat-card`, `scc-kpi-card`, `scc-panel`, `access-request-card`, `first-time-card` |
| **Empty states** | `placeholder-page`, `notification-empty`, `first-time-container` |
| **Icons** | Font Awesome 6.5.0, Fluent-style SVG in `components.js` and `ecc.js`, `assets/icons/copilot.png` |
| **Typography** | Montserrat (headings), Source Sans 3 (body), sizes 11px–2rem |

---

## 2. Target Monorepo (`/apps/web`)

**Status:** The path `apps/web` was **not found** in the workspace (`c:\Users\Asus\kernel2\kernel-prototype-1`). The following describes the expected structure and extension points typical for a React + Fluent UI monorepo migration.

### 2.1 Expected Folder Structure (`apps/web/src/`)

```
apps/web/src/
├── App.tsx
├── main.tsx
├── components/       # shared layout/components
├── features/         # feature modules
├── layouts/          # AppLayout, NavRail
├── providers/        # PermissionProvider, AuthProvider
├── routes/          # route config, RoutePermissionMap
├── theme/            # Griffel tokens, Fluent theme
└── utils/
```

### 2.2 Expected Extension Points

- **AppLayout** — Top navbar, optional sidebar, `center-stage` equivalent
- **NavRail** — Collapsible sidebar with accordion groups (SCC / ACC / Helpdesk)
- **PermissionProvider** — Wraps app, exposes user permissions
- **RoutePermissionMap** — `{ path: string, requiredPermission?: string }[]` for route guards
- **Feature modules** — One folder per feature (e.g. `scc-dashboard`, `module-mgmt`, `audit-logs`)

### 2.3 Fluent UI / Griffel Setup (from `package.json`)

**kernel-prototype-1 `package.json`:**
```json
{
  "dependencies": {
    "@fluentui/react-icons": "^2.0.319",
    "simple-icons": "16.9.0"
  }
}
```

**`package-lock.json` references:**
- `@fluentui/react-icons`: ^2.0.319
- `@griffel/react`: ^1.0.0 (≈ 1.5.32)
- `@griffel/core`: ^1.19.2
- `@griffel/style-types`: ^1.3.0

**Note:** The mockup uses Bootstrap 5.3.2 and Font Awesome 6.5.0 via CDN; the React target would use Fluent UI components and Griffel for styling.

---

## 3. Mockup Screens → UI Elements Mapping

| Screen | Tables | Forms | Modals | Cards | Empty States | Icons |
|--------|--------|-------|--------|-------|--------------|-------|
| Login | — | — | — | login-card | — | fa-shield-halved |
| ECC | — | — | confirm | ecc-module-card | — | Fluent SVG per module |
| Access Request | — | access-request form | — | access-request-card | — | — |
| Kernel Dashboard | — | — | — | — | — | — |
| SCC Dashboard | scc-audit-table | — | — | scc-kpi-card | — | fa-shield, fa-users, etc. |
| Module Mgmt | data-table | Add/Edit module | Add/Edit | — | — | fa-plus, fa-pen, fa-trash |
| User Profile | data-table | Add/Edit user | Add/Edit | — | — | fa-plus, fa-pen, fa-trash |
| Role Mgmt | data-table | Add/Edit role | Add/Edit, Permissions | — | — | fa-plus, fa-cog |
| User Role Assign | data-table | Assign form | Assign/Edit | — | — | fa-plus, filter icons |
| Audit Logs | data-table (sessions/actions) | — | — | — | — | fa-clock, fa-bolt |
| Placeholders | — | — | — | feature-card-mini | placeholder-page | configurable |

---

## 4. Package Dependencies Summary

| Package | Version (mockup) | Purpose |
|---------|------------------|---------|
| Bootstrap | 5.3.2 (CDN) | Grid, utilities |
| Font Awesome | 6.5.0 (CDN) | Icons |
| @fluentui/react-icons | ^2.0.319 | SVG icons (package.json) |
| @griffel/react | ~1.5.32 | CSS-in-JS (via react-icons) |
| @griffel/core | ~1.19.2 | — |

---

## 5. Action Items for Target Migration

1. Recreate `admin-access-requests.js` or implement equivalent in React (file deleted in current branch).
2. Map mockup routes to React routes and `RoutePermissionMap`.
3. Implement NavRail with SCC/ACC/Helpdesk accordion groups.
4. Replace Bootstrap/Font Awesome with Fluent UI + Griffel.
5. Port design tokens to Griffel/Fluent theme.

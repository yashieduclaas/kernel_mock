# CLaaS2SaaS Security Kernel — UI Structure Extraction

## STEP 1 — STRUCTURED UI DECOMPOSITION

### Screen → Sections → Components → UI Elements

---

### 1. Login Page (`login`)
- **Layout:** Full-page, no nav
- **Sections:**
  - Background (geometric shapes overlay)
  - Brand (top-left)
  - Login Card
- **Components:**
  - LoginContainer, LoginBackground, LoginBrand, LoginCard
- **UI Elements:**
  - Card header: icon, h2 title, subtitle
  - User selection: list of buttons (avatar, name, email, role, arrow icon)
  - Footer: "Secured by Microsoft Entra ID"
- **Icons:** fa-shield-halved, fa-arrow-right, fa-lock
- **Empty state:** N/A (always has users)
- **Interaction:** Click user → login

---

### 2. First-Time User (`first-time`)
- **Layout:** Full-page, no nav
- **Sections:** Login container + first-time card
- **Components:** FirstTimeCard
- **UI Elements:**
  - Welcome h2
  - Subtitle text
  - Buttons: Copilot Agent, Cancel
- **Icons:** fa-user-plus, fa-robot
- **Empty state:** N/A

---

### 3. Enterprise Control Centre (`ecc`)
- **Layout:** Navbar only, no sidebar
- **Sections:**
  - ecc-header (h1, subtitle)
  - ecc-section (Unlocked)
  - ecc-section (Locked)
- **Components:**
  - ECCHeader
  - ECCSection
  - ModuleCard (icon, name, badge Open/locked)
- **UI Elements:**
  - Section icon (unlock/lock)
  - Section divider
  - App grid of cards
  - Confirm modal (Access Restricted)
- **Icons:** Per-module Fluent SVG (AGNT_HR, KNL, etc.), fa-lock-open, fa-lock
- **Interaction:** Kernel card → navigate; Locked card → confirm modal → access-request

---

### 4. Access Request (`access-request`)
- **Layout:** Navbar only
- **Sections:** page-header, access-request-card
- **Components:** PageHeader, AccessRequestForm
- **UI Elements:**
  - Form: Application Name (readonly), Reason *, Business Justification *, Duration (optional)
  - Form actions: Cancel, Submit
- **Icons:** None
- **Empty state:** Redirect if no appData

---

### 5. Kernel Dashboard (`kernel-dashboard`)
- **Layout:** Navbar + Sidebar
- **Sections:** copilot-landing
- **Components:** CopilotLanding
- **UI Elements:**
  - h1: "Welcome, how can I help?"
  - Input bar with ghost placeholder (typewriter)
- **Icons:** None (copilot icon in nav)
- **Loading:** N/A

---

### 6. SCC Dashboard (`scc-dashboard`)
- **Layout:** Navbar + Sidebar
- **Sections:**
  - scc-dash-header (title, compliance ring)
  - scc-kpi-row (4 KPI cards)
  - scc-mid-row (Role Distribution panel, Access Metrics panel)
  - scc-panel-full (Recent Audit Activity table)
- **Components:**
  - SCCHeader
  - ComplianceRing
  - KPICard (×4)
  - RoleDistributionBars
  - AccessMetricsPanel
  - AuditTable (compact)
  - PanelLinkButton
- **UI Elements:**
  - Compliance ring: SVG circle, score, label
  - KPI card: icon, num, label, sub
  - Role bar row: label, track, fill, count
  - Metric row: name, val, bar
  - Table: Timestamp, User, Action, Status, Details
- **Icons:** fa-shield-halved, fa-users, fa-user-shield, fa-circle-check, fa-triangle-exclamation, fa-user-lock, fa-chart-line, fa-file-shield, fa-arrow-right

---

### 7. Module Management (`module-mgmt`)
- **Layout:** Navbar + Sidebar
- **Sections:** page-header, data-table-wrapper
- **Components:**
  - PageHeader
  - DataTable, TableFooter
  - AddModuleModal, EditModuleModal
- **UI Elements:**
  - Header: h1, subtitle, Add button
  - Table: Solution Code, Solution Name, Module Code, Module Name, Description, Module Lead, Version, Documentation, Actions
  - Badges: code-badge, version-badge
  - Actions: Edit, Delete icon buttons
  - Modal: form-grid (Solution, Module, Version, Lead, Description, URL), char-count
- **Icons:** fa-plus, fa-pen, fa-trash, fa-external-link-alt
- **Empty state:** Table shows 0 rows

---

### 8. User Profile Enrichment (`user-profile`)
- **Layout:** Navbar + Sidebar
- **Sections:** page-header, data-table-wrapper
- **Components:** PageHeader, SearchBar, DataTable, TableFooter, AddUserModal
- **UI Elements:**
  - Toolbar: table-title, table-count
  - Search bar
  - Table: Entra Email, Display Name, Org Role, Manager, Status, Actions
  - Status badge, copy-to-clipboard link
- **Icons:** fa-plus, fa-pen, fa-trash, fa-search

---

### 9. Role Management (`role-mgmt`)
- **Layout:** Navbar + Sidebar
- **Sections:** page-header, data-table-wrapper
- **Components:** PageHeader, SearchBar, DataTable, AddRoleModal, PermissionsModal
- **UI Elements:**
  - Table: Solution, Module, Role Code, Role Name, Role Type, Permissions (Manage), Actions
  - Badges: role-badge, type-badge
  - Permissions modal: perm-table (C, R, U, D, All User, Module Admin, All Admin)
- **Icons:** fa-plus, fa-pen, fa-trash, fa-cog, fa-search, fa-check, fa-times

---

### 10. User Role Assignment (`user-role-assign`)
- **Layout:** Navbar + Sidebar
- **Sections:** page-header, data-table-wrapper
- **Components:** PageHeader, SearchBar, FilterTabs, DataTable, AssignModal
- **UI Elements:**
  - Filter tabs: All, Active, Inactive
  - Table: Actions, User, Solution/Module, Role, Assigned Date, Disable Date, Assigned By, Status
  - Assign modal: User, Solution, Module, Role, Date, Assigned By, Status, Reason, Disable Date
- **Icons:** fa-plus, fa-pen, fa-trash, fa-list, fa-circle-check, fa-circle-xmark, fa-calendar, fa-search

---

### 11. Audit Logs (`audit-logs`)
- **Layout:** Navbar + Sidebar
- **Sections:** page-header, audit-tabs, audit-content
- **Components:** PageHeader, AuditTabs, SessionLogsTable, ActionLogsTable
- **UI Elements:**
  - Tabs: Session Logs, Action Logs
  - Session filters: All, Successful, Failed, Active
  - Session table: User, Module, Session Start, Duration, IP, Device, Status
  - Action table: User, Action, Permission Code, Module, Timestamp, Status, Details
- **Icons:** fa-clock, fa-bolt, fa-calendar, fa-network-wired, fa-desktop
- **Empty state:** Table with 0 rows

---

### 12. Placeholder Pages (ACC, Helpdesk)
- **Layout:** Navbar + Sidebar
- **Sections:** placeholder-page
- **Components:** PlaceholderPage
- **UI Elements:**
  - Icon (48px)
  - h1 title
  - Subtitle
  - Planned Features: feature-cards
  - Badge: "Coming in a future release"
- **Icons:** Configurable per page (fa-scale-balanced, fa-diagram-project, etc.)

---

## Typography Hierarchy
- Page title: 1.5rem / 600
- Subtitle: 0.875rem
- Section heading: 1rem / 600
- Table header: 0.75rem / 600
- Body: 0.875rem

## Spacing Rhythm
- Section gap: 24px
- Card padding: 16px–24px
- Form row gap: 16px
- Table cell padding: 12px

## Interaction States
- Hover: subtle bg, border accent
- Active: accent bg
- Disabled: opacity 0.5, cursor not-allowed

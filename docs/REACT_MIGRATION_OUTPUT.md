# CLaaS2SaaS Security Kernel — React Feature-Slice Migration Output

## STEP 4 — OUTPUT FORMAT

### 1. Final Folder Tree

```
apps/web/src/
├── shared/
│   ├── constants/
│   │   └── icon-sizes.ts
│   ├── components/
│   │   └── PageHeader.tsx
│   └── index.ts
└── features/
    ├── ecc/
    │   ├── EccPage.tsx
    │   └── index.ts
    ├── access-request/
    │   ├── AccessRequestPage.tsx
    │   └── index.ts
    ├── kernel-dashboard/
    │   ├── KernelDashboardPage.tsx
    │   └── index.ts
    ├── scc-dashboard/
    │   ├── SccDashboardPage.tsx
    │   └── index.ts
    ├── module-mgmt/
    │   ├── ModuleMgmtPage.tsx
    │   └── index.ts
    ├── user-profile/
    │   ├── UserProfilePage.tsx
    │   └── index.ts
    ├── role-mgmt/
    │   ├── RoleMgmtPage.tsx
    │   └── index.ts
    ├── user-role-assign/
    │   ├── UserRoleAssignPage.tsx
    │   └── index.ts
    ├── audit-logs/
    │   ├── AuditLogsPage.tsx
    │   └── index.ts
    └── placeholders/
        ├── PlaceholderPage.tsx
        ├── FirstTimePage.tsx
        └── index.ts
```

---

### 2. Required Imports (per feature)

**Griffel:**
```ts
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
```

**Fluent Theme:**
```ts
import { tokens } from '@fluentui/react-theme';
```

**Fluent Components (as needed):**
```ts
import { Button, Input, Textarea, Field, Dialog, ... } from '@fluentui/react-components';
```

**Fluent Icons:**
```ts
import { Add16Regular, Edit16Regular, Delete16Regular, ... } from '@fluentui/react-icons';
```

**Shared:**
```ts
import { ICON_SIZES, PageHeader } from '../../shared';
```

---

### 3. Token Usage

| Category | Token | Usage |
|----------|-------|-------|
| **Typography** | `tokens.fontSizeBase600` | Page titles |
| | `tokens.fontSizeBase500` | KPI numbers, ring score |
| | `tokens.fontSizeBase400` | Section headings, card names |
| | `tokens.fontSizeBase300` | Body text, subtitles |
| | `tokens.fontSizeBase200` | Table headers, badges |
| | `tokens.fontWeightSemibold` | Titles, labels |
| **Spacing** | `tokens.spacingVerticalXL` | Page padding |
| | `tokens.spacingVerticalM` | Section gaps |
| | `tokens.spacingHorizontalM` | Horizontal gaps |
| | `tokens.spacingHorizontalL` | Header gaps |
| **Colors** | `tokens.colorNeutralForeground1` | Primary text |
| | `tokens.colorNeutralForeground2` | Secondary text |
| | `tokens.colorNeutralForeground3` | Muted, empty states |
| | `tokens.colorNeutralBackground1` | Cards, surfaces |
| | `tokens.colorNeutralStroke2` | Borders |
| | `tokens.colorBrandForeground1` | Accent, links |
| | `tokens.colorBrandBackground` | Primary actions |
| | `tokens.colorPaletteGreenForeground1` | Success |
| | `tokens.colorPaletteRedForeground1` | Error, denied |
| | `tokens.colorPaletteYellowForeground1` | Warning |
| **Borders** | `tokens.borderRadiusMedium` | Cards, inputs |
| | `tokens.borderRadiusSmall` | Badges |
| | `tokens.borderRadiusLarge` | First-time card |

---

### 4. Icon Mapping Table

| Mockup (Font Awesome) | React (@fluentui/react-icons) |
|-----------------------|-------------------------------|
| fa-shield-halved | Shield16Regular |
| fa-lock-open | LockOpen20Regular * |
| fa-lock | LockClosed20Regular * |
| fa-plus | Add16Regular |
| fa-pen | Edit16Regular |
| fa-trash | Delete16Regular |
| fa-users | People16Regular |
| fa-user-shield | PersonCircle16Regular |
| fa-circle-check | CheckmarkCircle16Regular |
| fa-triangle-exclamation | Warning16Regular |
| fa-user-lock | LockClosed16Regular |
| fa-chart-line | DataTrending16Regular |
| fa-file-shield | DocumentShield16Regular |
| fa-arrow-right | ArrowRight16Regular |
| fa-search | Search16Regular |
| fa-cog | Settings16Regular |
| fa-clock | Clock16Regular |
| fa-bolt | Flash16Regular |
| fa-scale-balanced | ScaleBalance20Regular |
| fa-diagram-project | Flow20Regular |
| fa-chart-line | DataTrending20Regular |
| fa-rocket | Rocket20Regular |
| fa-key | Key20Regular |
| fa-ticket | Ticket20Regular |
| fa-book | BookOpen20Regular |
| fa-robot | Bot20Regular |
| fa-wrench | Wrench20Regular |
| fa-external-link-alt | Open16Regular |
| fa-list | List16Regular |
| fa-circle-xmark | DismissCircle16Regular |

*If LockOpen20Regular / LockClosed20Regular do not exist in your icons package, use `LockOpen20Filled` / `Lock20Regular` or equivalent.

---

### 5. Fluent Components Used

| Component | Usage |
|-----------|-------|
| `Button` | Primary/secondary actions, icon buttons, tab triggers |
| `Input` | Text inputs, search bars |
| `Textarea` | Multi-line form fields |
| `Field` | Form field wrappers with labels |
| `Label` | Standalone labels |
| `Dialog`, `DialogSurface`, `DialogTitle`, `DialogBody`, `DialogContent`, `DialogActions`, `DialogTrigger` | Modals for Add/Edit |
| `Badge` | (Optional) Status badges; custom spans used for styling control |

Native HTML used where Fluent has no direct equivalent: `<table>`, `<select>`, `<button>` for filter tabs (styled via Griffel).

---

### 6. Additive Route Entry (for RoutePermissionMap)

```ts
// Add these entries to your existing RoutePermissionMap
{ path: '/ecc', requiredPermission?: undefined },
{ path: '/access-request', requiredPermission?: undefined },
{ path: '/kernel-dashboard', requiredPermission?: undefined },
{ path: '/scc-dashboard', requiredPermission?: undefined },
{ path: '/module-mgmt', requiredPermission?: undefined },
{ path: '/user-profile', requiredPermission?: undefined },
{ path: '/role-mgmt', requiredPermission?: undefined },
{ path: '/user-role-assign', requiredPermission?: undefined },
{ path: '/audit-logs', requiredPermission?: undefined },
{ path: '/first-time', requiredPermission?: undefined },
{ path: '/acc-governance', requiredPermission?: undefined },
{ path: '/acc-workflows', requiredPermission?: undefined },
{ path: '/acc-analytics', requiredPermission?: undefined },
{ path: '/acc-deployment', requiredPermission?: undefined },
{ path: '/hd-access-request', requiredPermission?: undefined },
{ path: '/hd-ticketing', requiredPermission?: undefined },
{ path: '/hd-knowledge', requiredPermission?: undefined },
{ path: '/hd-copilot', requiredPermission?: undefined },
```

---

### 7. Integration Notes

- **Data / state:** All page components receive data and callbacks via props. No direct DOM access or global store imports.
- **Permission gating:** Handled by existing `PermissionProvider` and route guards. No role checks inside feature components.
- **Modals:** Module Mgmt uses Fluent `Dialog`. Other features (Role Mgmt permissions, User/Role Add/Edit) can be wired to the same pattern.
- **Toasts / confirmations:** Use Fluent `Toast` and `Alert` from the shell or a shared provider; not implemented inside features.

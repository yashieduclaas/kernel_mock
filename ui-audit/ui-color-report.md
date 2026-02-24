# Kernel Prototype — UI Color Audit Report

**Audit Date:** 2025-02-23  
**Scope:** Full codebase scan (CSS, JS, SVG, React components)  
**Output Location:** `/ui-audit/`

---

## 1. Summary

| Metric | Value |
|--------|-------|
| **Total unique hex colors** | 38 |
| **Brand primary** | `#193e6b` (--midnight) |
| **Page background** | `#EEE7E0` (--beige) |
| **Total badge color combos** | 10 |
| **Inconsistencies detected** | 7 (see color-conflicts.md) |

---

## 2. Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brandPrimary` | `#193e6b` | Top nav, primary buttons, headings, links |
| `brandPrimaryHover` | `#142a53` | Primary button hover |
| `brandPrimaryActive` | `#112c4e` | Login gradient start |
| `brandAccent` | `#B3A125` | Active sidebar, focus ring, gold highlights |

**Active sidebar highlight:** `rgba(179, 161, 37, 0.1)` background + `#B3A125` left border

---

## 3. Background Layers

| Layer | Color | Token / Source |
|-------|-------|----------------|
| Page | `#EEE7E0` | `--beige` |
| Card / Surface | `#FFFFFF` | `--white` |
| Modal | `#FFFFFF` | `--white` |
| Drawer (env panel) | `#FFFFFF` | `--white` |
| Table background | `#FFFFFF` | `--surface` |
| Table header | `rgba(0, 0, 0, 0.02)` | — |
| Hover row | `rgba(0, 0, 0, 0.02)` | — |
| Readonly input | `#f5f5f5` | — |
| Nav role badge | `#f0f2f5` | — |

---

## 4. Semantic Grouping

- **Primary:** `#193e6b`
- **Secondary:** `#448E9D`
- **Success:** `#5F8025`
- **Warning:** `#E9AC53` (dark: `#b07a1a`)
- **Danger:** `#991547`
- **Accent:** `#B3A125`
- **Violet:** `#7F3F98` (SCC card accent)

---

## 5. Badge System

| Badge type | Background | Text |
|------------|------------|------|
| Active / Success | `rgba(95, 128, 37, 0.12)` | `#5F8025` |
| Inactive / Danger | `rgba(153, 21, 71, 0.1)` | `#991547` |
| Warning | `rgba(233, 172, 83, 0.1)` | `#E9AC53` |
| Secondary / Collaborator | `rgba(68, 142, 157, 0.1)` | `#448E9D` |
| Accent / Viewer | `rgba(179, 161, 37, 0.1)` | `#B3A125` |
| Primary / Admin | `rgba(25, 62, 107, 0.08)` | `#193e6b` |
| Global Admin | `rgba(153, 21, 71, 0.15)` | `#991547` |
| Audit Failed | `rgba(233, 172, 83, 0.15)` | `#b07a1a` |
| Locked | `rgba(0, 0, 0, 0.06)` | `#999999` |
| Nav role | `#f0f2f5` | `#555555` |

---

## 6. Typography Colors

| Role | Color |
|------|-------|
| Heading | `#193e6b` (primary) |
| Body | `#333333` (dark) |
| Muted | `#999999` (undefined `--muted` — see conflicts) |
| Link | `#0078d4` (env/action links) / `#193e6b` (default) |
| Disabled | `#999999` |
| Secondary link | `#2563eb` (module lead) |

---

## 7. Border System

| Context | Color |
|---------|-------|
| Input default | `rgba(0, 0, 0, 0.12)` |
| Input focus | `#B3A125` |
| Card | `rgba(0, 0, 0, 0.05)` |
| Table border | `rgba(0, 0, 0, 0.1)` / `rgba(0, 0, 0, 0.05)` |
| Divider | `#eeeeee` / `rgba(0, 0, 0, 0.06)` |
| Focus ring | `2px solid #B3A125` + `0 0 0 3px rgba(179, 161, 37, 0.15)` |

---

## 8. Shadow Colors

| Context | Value |
|---------|-------|
| Card | `0 3px 10px rgba(0, 0, 0, 0.05)` |
| Large | `0 5px 20px rgba(0, 0, 0, 0.08)` |
| Modal | `0 20px 60px rgba(0, 0, 0, 0.3)` |
| Dropdown | `0 8px 32px rgba(0, 0, 0, 0.18)` |
| Tooltip | `0 2px 8px rgba(0, 0, 0, 0.15)` |
| Env panel | `-4px 0 24px rgba(0, 0, 0, 0.15)` |

---

## 9. Hover States

| Component | Color |
|-----------|-------|
| Primary button | `#142a53` |
| Accent button | `#3a7d8a` |
| Nav item | `rgba(0, 0, 0, 0.04)` |
| Sidebar active | `rgba(179, 161, 37, 0.1)` |
| White on primary | `rgba(255, 255, 255, 0.12)` |

---

## 10. Accessibility Notes

- **Primary (#193e6b) on white:** ~6.5:1 (AA for normal text)
- **Gold (#B3A125) on white:** ~3.2:1 — below AA for small text; suitable for large text and non-text
- **Beige (#EEE7E0) contrast:** Ensure dark text (#333) remains readable (OK)
- **`--muted` (#999) on white:** ~2.8:1 — below AA for body text; use for supplementary content only

---

## 11. Generated Files

| File | Purpose |
|------|---------|
| `color-inventory.json` | Raw color list with usage counts |
| `semantic-palette.json` | Semantic mapping |
| `react-theme.ts` | React theme object |
| `colors.css` | CSS variables |
| `tailwind-colors.js` | Tailwind config (project does not use Tailwind) |
| `color-conflicts.md` | Inconsistencies and consolidation suggestions |
| `ui-color-report.md` | This report |

# Color Conflicts & Inconsistencies

## Similar Colors — Possible Consolidation

### 1. Gray scale fragmentation

| Color   | Usage                                      | Suggestion                             |
|---------|--------------------------------------------|----------------------------------------|
| #666666 | login subtitle, ecc, filter, pill, desc     | Use as `--text-secondary` consistently |
| #888888 | search icon, table count, ring label       | Use as `--text-hint`                   |
| #999999 | placeholder, muted, empty state (22 uses)  | Use as `--text-muted`                  |
| #777777 | filter btn, scc subtitle, audit detail     | Consider merging with #666 or #888     |
| #555555 | secondary btn, nav badge, role label       | Consider merging with #666             |

**Recommendation:** Define `--text-secondary: #666`, `--text-muted: #999`, `--text-hint: #888` and replace ad-hoc grays.

---

### 2. Undefined `--muted` variable

- **Issue:** `var(--muted)` is used in `css/styles.css` (lines 623, 907) but **never defined** in `:root`.
- **Where used:** `.env-panel-desc`, `.dropdown-user-role`
- **Recommendation:** Add `--muted: #888888` or `#999999` to `:root`.

---

### 3. Link blue vs primary

| Color   | Usage                       | Context              |
|---------|-----------------------------|----------------------|
| #0078d4 | env links, focus, check      | Microsoft-style link blue |
| #2563eb | module lead link            | Slightly different blue   |
| #193e6b | primary, links (default)    | Brand primary        |

**Recommendation:** Decide on one link color. `#0078d4` is used more for interactive links; `#2563eb` appears in one place (module-lead-link). Consider consolidating to `#0078d4` for all external/action links.

---

### 4. Warning text variants

| Color   | Usage                    |
|---------|---------------------------|
| #E9AC53 | --sunray, status warning  |
| #b07a1a | audit-failed badge text   |

**Note:** `#b07a1a` is a darker variant of the warning/sunray hue for better contrast on light bg. Keep both; document as `warning.main` and `warning.dark`.

---

### 5. Toast vs danger/success

| Color   | Usage            |
|---------|------------------|
| #2d6b47 | toast success   |
| #5F8025 | --avocado/success |

| Color   | Usage          |
|---------|----------------|
| #7a1f3a | toast error   |
| #991547 | --violet-red/danger |

**Recommendation:** Toast uses darker, more saturated variants for visibility. Document as `toast.success` and `toast.error` distinct from semantic `success`/`danger`.

---

### 6. Primary gradient endpoints

| Color   | Role                      |
|---------|---------------------------|
| #112c4e | login gradient start      |
| #193e6b | --midnight (center)       |
| #1f4d82 | login gradient end        |
| #142a53 | primary button hover      |

**Note:** `#112c4e` and `#142a53` are very similar. `#142a53` is slightly lighter. Consider using one value for both gradient start and button hover.

---

### 7. Badge role badge (nav) vs others

- **Nav role badge:** `#f0f2f5` bg, `#e0e3e8` border, `#555` text — unique gray combo.
- **Other badges:** Use semantic colors (success, danger, etc.).

**Recommendation:** Keep nav badge distinct; it sits inside the white search bar and needs softer contrast.

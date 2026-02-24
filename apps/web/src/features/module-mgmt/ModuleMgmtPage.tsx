import * as React from 'react';
import {
  makeStyles,
  shorthands,
} from '@griffel/react';
import {
  tokens,
} from '@fluentui/react-theme';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Input,
  Textarea,
  Field,
} from '@fluentui/react-components';
import { Add16Regular, Edit16Regular, Delete16Regular, Open16Regular } from '@fluentui/react-icons';
import { PageHeader } from '../../shared';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  tableWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.overflow('auto'),
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: tokens.fontSizeBase300,
  },
  th: {
    textAlign: 'left' as const,
    padding: tokens.spacingVerticalS,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    whiteSpace: 'nowrap' as const,
  },
  td: {
    padding: tokens.spacingVerticalS,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
    color: tokens.colorNeutralForeground1,
  },
  descCell: {
    maxWidth: '200px',
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  actionsCell: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  iconBtn: {
    minWidth: 'unset',
    width: '32px',
    height: '32px',
    padding: 0,
  },
  codeBadge: {
    display: 'inline-block',
    fontSize: tokens.fontSizeBase200,
    ...shorthands.padding('2px', '8px'),
    backgroundColor: tokens.colorNeutralBackground4,
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    fontFamily: tokens.fontFamilyMonospace,
  },
  versionBadge: {
    display: 'inline-block',
    fontSize: tokens.fontSizeBase200,
    ...shorthands.padding('2px', '8px'),
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  tableFooter: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  formFullWidth: {
    gridColumn: '1 / -1',
  },
  charCount: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
  },
  select: {
    width: '100%',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    fontSize: tokens.fontSizeBase300,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
});

export interface ModuleRecord {
  solution_module_id: string;
  solution_code: string;
  solution_name: string;
  module_code: string;
  module_name: string;
  description: string;
  module_lead?: string;
  module_lead_email?: string;
  module_version: string;
  documentation_url?: string;
}

export interface ModuleMgmtPageProps {
  modules: ModuleRecord[];
  solutions: Array<{ code: string; name: string }>;
  onAdd: (data: Omit<ModuleRecord, 'solution_module_id'>) => void;
  onEdit: (id: string, data: Partial<ModuleRecord>) => void;
  onDelete: (id: string) => void;
}

export const ModuleMgmtPage: React.FC<ModuleMgmtPageProps> = ({
  modules,
  solutions,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const styles = useStyles();
  const [addOpen, setAddOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState({
    solution_code: '',
    solution_name: '',
    module_code: '',
    module_name: '',
    module_version: 'v1.0.0',
    module_lead: '',
    description: '',
    documentation_url: '',
  });

  const resetForm = () => {
    setForm({
      solution_code: '',
      solution_name: '',
      module_code: '',
      module_name: '',
      module_version: 'v1.0.0',
      module_lead: '',
      description: '',
      documentation_url: '',
    });
    setEditingId(null);
  };

  const handleSolutionChange = (code: string) => {
    const s = solutions.find((x) => x.code === code);
    setForm((p) => ({ ...p, solution_code: code, solution_name: s?.name ?? '' }));
  };

  const handleSave = () => {
    if (!form.solution_code || !form.module_code || !form.module_name || !form.description) return;
    if (editingId) {
      onEdit(editingId, { ...form });
    } else {
      onAdd(form as Omit<ModuleRecord, 'solution_module_id'>);
    }
    setAddOpen(false);
    resetForm();
  };

  const handleEdit = (m: ModuleRecord) => {
    setForm({
      solution_code: m.solution_code,
      solution_name: m.solution_name,
      module_code: m.module_code,
      module_name: m.module_name,
      module_version: m.module_version,
      module_lead: m.module_lead ?? '',
      description: m.description,
      documentation_url: m.documentation_url ?? '',
    });
    setEditingId(m.solution_module_id);
    setAddOpen(true);
  };

  return (
    <main className={styles.root}>
      <PageHeader
        title="Module Management System"
        subtitle="Manage your Solutions and Modules"
        action={
          <Button
            appearance="primary"
            icon={<Add16Regular />}
            onClick={() => {
              resetForm();
              setAddOpen(true);
            }}
          >
            Add New Module
          </Button>
        }
      />

      <div className={styles.tableWrapper}>
        <table className={styles.table} role="grid">
          <thead>
            <tr>
              <th className={styles.th}>Solution Code</th>
              <th className={styles.th}>Solution Name</th>
              <th className={styles.th}>Module Code</th>
              <th className={styles.th}>Module Name</th>
              <th className={styles.th}>Description</th>
              <th className={styles.th}>Module Lead</th>
              <th className={styles.th}>Version</th>
              <th className={styles.th}>Documentation</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((m) => (
              <tr key={m.solution_module_id}>
                <td className={styles.td}><span className={styles.codeBadge}>{m.solution_code}</span></td>
                <td className={styles.td}>{m.solution_name}</td>
                <td className={styles.td}><span className={styles.codeBadge}>{m.module_code}</span></td>
                <td className={styles.td}><strong>{m.module_name}</strong></td>
                <td className={mergeClasses(styles.td, styles.descCell)}>{m.description.slice(0, 40)}...</td>
                <td className={styles.td}>{m.module_lead ?? '—'}</td>
                <td className={styles.td}><span className={styles.versionBadge}>{m.module_version}</span></td>
                <td className={styles.td}>
                  {m.documentation_url ? (
                    <Button appearance="subtle" size="small" icon={<Open16Regular />} as="a" href={m.documentation_url} target="_blank" rel="noopener noreferrer">
                      View
                    </Button>
                  ) : (
                    '—'
                  )}
                </td>
                <td className={styles.td}>
                  <div className={styles.actionsCell}>
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Edit16Regular />}
                      onClick={() => handleEdit(m)}
                      aria-label="Edit module"
                    />
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Delete16Regular />}
                      onClick={() => onDelete(m.solution_module_id)}
                      aria-label="Delete module"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tableFooter}>
          Showing {modules.length} of {modules.length} modules
        </div>
      </div>

      <Dialog open={addOpen} onOpenChange={(_, d) => { setAddOpen(d.open); if (!d.open) resetForm(); }}>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{editingId ? 'Edit Module' : 'Add New Module'}</DialogTitle>
            <DialogContent>
              <div className={styles.formGrid}>
                <div className={styles.formRow}>
                  <Field label="Solution Code" required>
                    <select
                      className={styles.select}
                      value={form.solution_code}
                      onChange={(e) => handleSolutionChange(e.target.value)}
                    >
                      <option value="">Select Solution Code</option>
                      {solutions.map((s) => (
                        <option key={s.code} value={s.code}>{s.code}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Solution Name">
                    <Input value={form.solution_name} readOnly placeholder="Auto-filled" />
                  </Field>
                </div>
                <div className={styles.formRow}>
                  <Field label="Module Code" required>
                    <Input
                      value={form.module_code}
                      onChange={(_, d) => setForm((p) => ({ ...p, module_code: d.value }))}
                      placeholder="e.g., AGNT_HR"
                    />
                  </Field>
                  <Field label="Module Name" required>
                    <Input
                      value={form.module_name}
                      onChange={(_, d) => setForm((p) => ({ ...p, module_name: d.value }))}
                      placeholder="e.g., Agentic HR"
                    />
                  </Field>
                </div>
                <div className={styles.formRow}>
                  <Field label="Module Version">
                    <Input
                      value={form.module_version}
                      onChange={(_, d) => setForm((p) => ({ ...p, module_version: d.value }))}
                      placeholder="e.g., v1.0.0"
                    />
                  </Field>
                  <Field label="Module Lead (optional)">
                    <Input
                      value={form.module_lead}
                      onChange={(_, d) => setForm((p) => ({ ...p, module_lead: d.value }))}
                      placeholder="Enter module lead name"
                    />
                  </Field>
                </div>
                <Field label="Description" required className={styles.formFullWidth}>
                  <Textarea
                    value={form.description}
                    onChange={(_, d) => setForm((p) => ({ ...p, description: d.value }))}
                    placeholder="Enter module description"
                    maxLength={255}
                    rows={3}
                  />
                  <span className={styles.charCount}>{form.description.length}/255</span>
                </Field>
                <Field label="Documentation URL" className={styles.formFullWidth}>
                  <Input
                    value={form.documentation_url}
                    onChange={(_, d) => setForm((p) => ({ ...p, documentation_url: d.value }))}
                    placeholder="https://docs.example.com/module"
                  />
                </Field>
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
              <Button appearance="primary" onClick={handleSave}>
                {editingId ? 'Save Changes' : 'Add Module'}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </main>
  );
};

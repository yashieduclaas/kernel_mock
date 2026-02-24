import * as React from 'react';
import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import {
  Button,
  Input,
  Search16Regular,
  Add16Regular,
  Edit16Regular,
  Delete16Regular,
  List16Regular,
  CheckmarkCircle16Regular,
  DismissCircle16Regular,
} from '@fluentui/react-components';
import { PageHeader } from '../../shared';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    maxWidth: '500px',
  },
  filterTabs: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    border: '1px solid transparent',
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
  },
  filterBtnActive: {
    backgroundColor: tokens.colorNeutralBackground4,
    ...shorthands.borderColor(tokens.colorBrandStroke1),
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
  },
  td: {
    padding: tokens.spacingVerticalS,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
    color: tokens.colorNeutralForeground1,
  },
  roleBadge: {
    display: 'inline-block',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.padding('2px', '8px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    backgroundColor: tokens.colorNeutralBackground4,
  },
  statusBadge: {
    display: 'inline-block',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.padding('2px', '8px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  statusActive: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground1,
  },
  statusInactive: {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground3,
  },
  actionsCell: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  tableFooter: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
  },
  muted: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

export type FilterType = 'all' | 'active' | 'inactive';

export interface AssignmentRecord {
  id: string;
  entra_email_id: string;
  displayName?: string;
  solutionCode?: string;
  moduleCode?: string;
  roleCode?: string;
  roleName?: string;
  assigned_date: string;
  disabled_date?: string;
  assigned_by_name?: string;
  is_active: boolean;
}

export interface UserRoleAssignPageProps {
  assignments: AssignmentRecord[];
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onAssign: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const formatDate = (isoStr: string) => {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' +
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const UserRoleAssignPage: React.FC<UserRoleAssignPageProps> = ({
  assignments,
  filter,
  onFilterChange,
  onSearch,
  searchQuery,
  onAssign,
  onEdit,
  onDelete,
}) => {
  const styles = useStyles();

  return (
    <main className={styles.root}>
      <PageHeader
        title="Security User Role Assignment"
        subtitle="Assign Security Roles to Users for Specific Solutions and Modules"
        action={
          <Button appearance="primary" icon={<Add16Regular />} onClick={onAssign}>
            Assign Role to User
          </Button>
        }
      />

      <div className={styles.tableWrapper}>
        <div className={styles.searchBar}>
          <Search16Regular aria-hidden />
          <Input
            value={searchQuery}
            onChange={(_, d) => onSearch(d.value)}
            placeholder="Search by User, Role, Solution, Module, Reason, or Assigned By..."
          />
        </div>
        <div className={styles.filterTabs} role="tablist">
          <button
            role="tab"
            className={mergeClasses(styles.filterBtn, filter === 'all' && styles.filterBtnActive)}
            onClick={() => onFilterChange('all')}
            aria-selected={filter === 'all'}
          >
            <List16Regular aria-hidden /> All Assignments
          </button>
          <button
            role="tab"
            className={mergeClasses(styles.filterBtn, filter === 'active' && styles.filterBtnActive)}
            onClick={() => onFilterChange('active')}
            aria-selected={filter === 'active'}
          >
            <CheckmarkCircle16Regular aria-hidden /> Active
          </button>
          <button
            role="tab"
            className={mergeClasses(styles.filterBtn, filter === 'inactive' && styles.filterBtnActive)}
            onClick={() => onFilterChange('inactive')}
            aria-selected={filter === 'inactive'}
          >
            <DismissCircle16Regular aria-hidden /> Inactive
          </button>
        </div>
        <table className={styles.table} role="grid">
          <thead>
            <tr>
              <th className={styles.th}>Actions</th>
              <th className={styles.th}>User</th>
              <th className={styles.th}>Solution/Module</th>
              <th className={styles.th}>Role</th>
              <th className={styles.th}>Assigned Date</th>
              <th className={styles.th}>Disable Date</th>
              <th className={styles.th}>Assigned By</th>
              <th className={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a.id}>
                <td className={styles.td}>
                  <div className={styles.actionsCell}>
                    <Button appearance="subtle" size="small" icon={<Edit16Regular />} onClick={() => onEdit(a.id)} aria-label="Edit" />
                    <Button appearance="subtle" size="small" icon={<Delete16Regular />} onClick={() => onDelete(a.id)} aria-label="Delete" />
                  </div>
                </td>
                <td className={styles.td}>
                  <strong>{a.displayName ?? a.entra_email_id}</strong><br />
                  <small className={styles.muted}>{a.entra_email_id}</small>
                </td>
                <td className={styles.td}>
                  {a.solutionCode ?? '—'}<br />
                  <small className={styles.muted}>{a.moduleCode ?? ''}</small>
                </td>
                <td className={styles.td}>
                  <span className={styles.roleBadge}>{a.roleCode ?? '—'}</span><br />
                  <small>{a.roleName ?? ''}</small>
                </td>
                <td className={styles.td}>{formatDate(a.assigned_date)}</td>
                <td className={styles.td}>{a.disabled_date ? formatDate(a.disabled_date) : '—'}</td>
                <td className={styles.td}>{a.assigned_by_name ?? '—'}</td>
                <td className={styles.td}>
                  <span
                    className={mergeClasses(
                      styles.statusBadge,
                      a.is_active ? styles.statusActive : styles.statusInactive
                    )}
                  >
                    {a.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tableFooter}>
          Showing {assignments.length} of {assignments.length} user role assignments
        </div>
      </div>
    </main>
  );
};

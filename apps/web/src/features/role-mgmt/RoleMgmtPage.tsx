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
  Settings16Regular,
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
  typeBadge: {
    display: 'inline-block',
    fontSize: tokens.fontSizeBase200,
    ...shorthands.padding('2px', '8px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  typeSystem: {
    backgroundColor: tokens.colorPaletteBlueBackground2,
    color: tokens.colorPaletteBlueForeground1,
  },
  typeCustom: {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground2,
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

export interface RoleRecord {
  sec_role_id: string;
  solution_module_id: string;
  sec_role_code: string;
  sec_role_name: string;
  is_system_role: boolean;
  solutionCode?: string;
  solutionName?: string;
  moduleCode?: string;
  moduleName?: string;
}

export interface RoleMgmtPageProps {
  roles: RoleRecord[];
  onSearch: (query: string) => void;
  searchQuery: string;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onManagePermissions: (id: string) => void;
}

export const RoleMgmtPage: React.FC<RoleMgmtPageProps> = ({
  roles,
  onSearch,
  searchQuery,
  onAdd,
  onEdit,
  onDelete,
  onManagePermissions,
}) => {
  const styles = useStyles();

  return (
    <main className={styles.root}>
      <PageHeader
        title="Security Role Management"
        subtitle="Manage Security Roles for Solutions and Modules"
        action={
          <Button appearance="primary" icon={<Add16Regular />} onClick={onAdd}>
            Add New Role
          </Button>
        }
      />

      <div className={styles.tableWrapper}>
        <div className={styles.searchBar}>
          <Search16Regular aria-hidden />
          <Input
            value={searchQuery}
            onChange={(_, d) => onSearch(d.value)}
            placeholder="Search Roles by Name, Code, Solution, or Module..."
          />
        </div>
        <table className={styles.table} role="grid">
          <thead>
            <tr>
              <th className={styles.th}>Solution</th>
              <th className={styles.th}>Module</th>
              <th className={styles.th}>Role Code</th>
              <th className={styles.th}>Role Name</th>
              <th className={styles.th}>Role Type</th>
              <th className={styles.th}>Permissions</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.sec_role_id}>
                <td className={styles.td}>
                  {r.solutionCode ?? '—'}<br />
                  <small className={styles.muted}>{r.solutionName ?? ''}</small>
                </td>
                <td className={styles.td}>
                  {r.moduleCode ?? '—'}<br />
                  <small className={styles.muted}>{r.moduleName ?? ''}</small>
                </td>
                <td className={styles.td}>
                  <span className={styles.roleBadge}>{r.sec_role_code}</span>
                </td>
                <td className={styles.td}>{r.sec_role_name}</td>
                <td className={styles.td}>
                  <span
                    className={mergeClasses(
                      styles.typeBadge,
                      r.is_system_role ? styles.typeSystem : styles.typeCustom
                    )}
                  >
                    {r.is_system_role ? 'System' : 'Custom'}
                  </span>
                </td>
                <td className={styles.td}>
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<Settings16Regular />}
                    onClick={() => onManagePermissions(r.sec_role_id)}
                  >
                    Manage
                  </Button>
                </td>
                <td className={styles.td}>
                  <div className={styles.actionsCell}>
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Edit16Regular />}
                      onClick={() => onEdit(r.sec_role_id)}
                      aria-label="Edit role"
                    />
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Delete16Regular />}
                      onClick={() => onDelete(r.sec_role_id)}
                      aria-label="Delete role"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tableFooter}>
          Showing {roles.length} of {roles.length} security roles
        </div>
      </div>
    </main>
  );
};

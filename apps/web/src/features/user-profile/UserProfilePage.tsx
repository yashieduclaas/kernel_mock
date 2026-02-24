import * as React from 'react';
import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import {
  tokens,
} from '@fluentui/react-theme';
import {
  Button,
  Input,
  Search16Regular,
  Add16Regular,
  Edit16Regular,
  Delete16Regular,
} from '@fluentui/react-components';
import { PageHeader } from '../../shared';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    width: '100%',
    maxWidth: '400px',
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
});

export interface UserRecord {
  user_id: string;
  entra_email_id: string;
  display_name: string;
  org_role: string;
  manager_name?: string;
  manager_email_id?: string;
  is_active: boolean;
}

export interface UserProfilePageProps {
  users: UserRecord[];
  onSearch: (query: string) => void;
  searchQuery: string;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UserProfilePage: React.FC<UserProfilePageProps> = ({
  users,
  onSearch,
  searchQuery,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const styles = useStyles();

  return (
    <main className={styles.root}>
      <PageHeader
        title="User Profile Enrichment"
        subtitle="Manage User Profiles and Access Control"
        action={
          <Button appearance="primary" icon={<Add16Regular />} onClick={onAdd}>
            Add New User
          </Button>
        }
      />

      <div className={styles.tableWrapper}>
        <div className={styles.toolbar}>
          <span>User Listing</span>
          <span>{users.length} users found</span>
        </div>
        <div className={styles.searchBar}>
          <Search16Regular aria-hidden />
          <Input
            value={searchQuery}
            onChange={(_, d) => onSearch(d.value)}
            placeholder="Search by Name, Email, Role, Manager, or Entra ID..."
          />
        </div>
        <table className={styles.table} role="grid">
          <thead>
            <tr>
              <th className={styles.th}>Entra Email Id</th>
              <th className={styles.th}>Display Name</th>
              <th className={styles.th}>Organizational Role</th>
              <th className={styles.th}>Manager</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td className={styles.td}>{u.entra_email_id}</td>
                <td className={styles.td}><strong>{u.display_name}</strong></td>
                <td className={styles.td}>{u.org_role}</td>
                <td className={styles.td}>{u.manager_name ?? '—'}</td>
                <td className={styles.td}>
                  <span
                    className={mergeClasses(
                      styles.statusBadge,
                      u.is_active ? styles.statusActive : styles.statusInactive
                    )}
                  >
                    {u.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className={styles.td}>
                  <div className={styles.actionsCell}>
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Edit16Regular />}
                      onClick={() => onEdit(u.user_id)}
                      aria-label="Edit user"
                    />
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Delete16Regular />}
                      onClick={() => onDelete(u.user_id)}
                      aria-label="Delete user"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.tableFooter}>
          Showing {users.length} of {users.length} total users
        </div>
      </div>
    </main>
  );
};

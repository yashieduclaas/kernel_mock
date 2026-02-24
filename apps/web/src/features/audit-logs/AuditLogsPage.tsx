import * as React from 'react';
import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import {
  Input,
  Clock16Regular,
  Flash16Regular,
  Search16Regular,
} from '@fluentui/react-components';
import { PageHeader } from '../../shared';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  tabs: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    border: '1px solid transparent',
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
  },
  tabActive: {
    backgroundColor: tokens.colorNeutralBackground4,
    ...shorthands.borderColor(tokens.colorBrandStroke1),
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
  statusBadge: {
    display: 'inline-block',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.padding('2px', '8px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  statusSuccess: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground1,
  },
  statusFailed: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
  },
  statusDenied: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
  },
  descCell: {
    maxWidth: '200px',
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
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

export type AuditTab = 'sessions' | 'actions';
export type SessionFilter = 'all' | 'success' | 'failed' | 'active';

export interface SessionRecord {
  entra_email_id: string;
  displayName?: string;
  solutionCode?: string;
  moduleCode?: string;
  session_start_time: string;
  session_end_time?: string;
  ip_address?: string;
  device_info?: string;
  is_success: boolean;
}

export interface ActionRecord {
  entra_email_id: string;
  displayName?: string;
  action_name: string;
  permission_code?: string;
  solutionCode?: string;
  moduleCode?: string;
  action_timestamp: string;
  action_status: 'Success' | 'Denied';
  additional_info?: string;
}

export interface AuditLogsPageProps {
  tab: AuditTab;
  onTabChange: (t: AuditTab) => void;
  sessionFilter?: SessionFilter;
  onSessionFilterChange?: (f: SessionFilter) => void;
  sessionSearchQuery?: string;
  actionSearchQuery?: string;
  onSessionSearch?: (q: string) => void;
  onActionSearch?: (q: string) => void;
  sessions: SessionRecord[];
  actions: ActionRecord[];
}

const formatDate = (isoStr: string) => {
  if (!isoStr) return '—';
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' +
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const getDuration = (start: string, end?: string) => {
  if (!end) return 'Active';
  const diff = new Date(end).getTime() - new Date(start).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return `${hrs}h ${rem}m`;
};

export const AuditLogsPage: React.FC<AuditLogsPageProps> = ({
  tab,
  onTabChange,
  sessionFilter = 'all',
  onSessionFilterChange,
  sessionSearchQuery = '',
  actionSearchQuery = '',
  onSessionSearch,
  onActionSearch,
  sessions,
  actions,
}) => {
  const styles = useStyles();

  return (
    <main className={styles.root}>
      <PageHeader
        title="Audit Log Viewer"
        subtitle="Monitor User Sessions, Login Attempts, and System Actions"
      />

      <div className={styles.tabs} role="tablist">
        <button
          role="tab"
          className={mergeClasses(styles.tab, tab === 'sessions' && styles.tabActive)}
          onClick={() => onTabChange('sessions')}
          aria-selected={tab === 'sessions'}
        >
          <Clock16Regular aria-hidden /> Session Logs
        </button>
        <button
          role="tab"
          className={mergeClasses(styles.tab, tab === 'actions' && styles.tabActive)}
          onClick={() => onTabChange('actions')}
          aria-selected={tab === 'actions'}
        >
          <Flash16Regular aria-hidden /> Action Logs
        </button>
      </div>

      {tab === 'sessions' && (
        <div className={styles.tableWrapper}>
          <div className={styles.searchBar}>
            <Search16Regular aria-hidden />
            <Input
              value={sessionSearchQuery}
              onChange={(_, d) => onSessionSearch?.(d.value)}
              placeholder="Search by User, Email, IP Address, Device, Module, or Session Token..."
            />
          </div>
          {onSessionFilterChange && (
            <div className={styles.filterTabs}>
              {(['all', 'success', 'failed', 'active'] as const).map((f) => (
                <button
                  key={f}
                  className={mergeClasses(styles.filterBtn, sessionFilter === f && styles.filterBtnActive)}
                  onClick={() => onSessionFilterChange(f)}
                >
                  {f === 'all' && 'All Sessions'}
                  {f === 'success' && 'Successful Logins'}
                  {f === 'failed' && 'Failed Logins'}
                  {f === 'active' && 'Active Sessions'}
                </button>
              ))}
            </div>
          )}
          <table className={styles.table} role="grid">
            <thead>
              <tr>
                <th className={styles.th}>User</th>
                <th className={styles.th}>Module</th>
                <th className={styles.th}>Session Start</th>
                <th className={styles.th}>Duration</th>
                <th className={styles.th}>IP Address</th>
                <th className={styles.th}>Device</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i}>
                  <td className={styles.td}>
                    <strong>{s.displayName ?? s.entra_email_id}</strong><br />
                    <small className={styles.muted}>{s.entra_email_id}</small>
                  </td>
                  <td className={styles.td}>
                    {s.solutionCode ?? '—'}<br />
                    <small className={styles.muted}>{s.moduleCode ?? ''}</small>
                  </td>
                  <td className={styles.td}>{formatDate(s.session_start_time)}</td>
                  <td className={styles.td}>{getDuration(s.session_start_time, s.session_end_time)}</td>
                  <td className={styles.td}>{s.ip_address ?? '—'}</td>
                  <td className={styles.td}>{s.device_info ? s.device_info.slice(0, 35) + '...' : '—'}</td>
                  <td className={styles.td}>
                    <span
                      className={mergeClasses(
                        styles.statusBadge,
                        s.is_success ? styles.statusSuccess : styles.statusFailed
                      )}
                    >
                      {s.is_success ? 'Success' : 'Failed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.tableFooter}>Showing {sessions.length} of {sessions.length} session logs</div>
        </div>
      )}

      {tab === 'actions' && (
        <div className={styles.tableWrapper}>
          <div className={styles.searchBar}>
            <Search16Regular aria-hidden />
            <Input
              value={actionSearchQuery}
              onChange={(_, d) => onActionSearch?.(d.value)}
              placeholder="Search by User, Action, Permission Code, or Status..."
            />
          </div>
          <table className={styles.table} role="grid">
            <thead>
              <tr>
                <th className={styles.th}>User</th>
                <th className={styles.th}>Action</th>
                <th className={styles.th}>Permission Code</th>
                <th className={styles.th}>Module</th>
                <th className={styles.th}>Timestamp</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Details</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((a, i) => (
                <tr key={i}>
                  <td className={styles.td}>
                    <strong>{a.displayName ?? a.entra_email_id}</strong><br />
                    <small className={styles.muted}>{a.entra_email_id}</small>
                  </td>
                  <td className={styles.td}><strong>{a.action_name}</strong></td>
                  <td className={styles.td}><code>{a.permission_code ?? '—'}</code></td>
                  <td className={styles.td}>{a.solutionCode && a.moduleCode ? `${a.solutionCode} / ${a.moduleCode}` : '—'}</td>
                  <td className={styles.td}>{formatDate(a.action_timestamp)}</td>
                  <td className={styles.td}>
                    <span
                      className={mergeClasses(
                        styles.statusBadge,
                        a.action_status === 'Success' && styles.statusSuccess,
                        a.action_status === 'Denied' && styles.statusDenied
                      )}
                    >
                      {a.action_status}
                    </span>
                  </td>
                  <td className={mergeClasses(styles.td, styles.descCell)}>
                    {a.additional_info ? a.additional_info.slice(0, 50) + '...' : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.tableFooter}>Showing {actions.length} of {actions.length} action logs</div>
        </div>
      )}
    </main>
  );
};

import * as React from 'react';
import {
  makeStyles,
  mergeClasses,
  shorthands,
} from '@griffel/react';
import {
  tokens,
} from '@fluentui/react-theme';
import { Button } from '@fluentui/react-components';
import {
  Shield16Regular,
  People16Regular,
  PersonCircle16Regular,
  CheckmarkCircle16Regular,
  Warning16Regular,
  LockClosed16Regular,
  DataTrending16Regular,
  Document Shield16Regular,
  ArrowRight16Regular,
} from '@fluentui/react-icons';
import { ICON_SIZES } from '../../shared';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.gap(tokens.spacingVerticalXXL),
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  complianceRing: {
    width: '80px',
    height: '80px',
    position: 'relative' as const,
    flexShrink: 0,
  },
  ringSvg: {
    transform: 'rotate(-90deg)',
    width: '100%',
    height: '100%',
  },
  ringBg: {
    fill: 'none',
    stroke: tokens.colorNeutralStroke2,
    strokeWidth: 6,
  },
  ringFill: {
    fill: 'none',
    strokeWidth: 6,
    strokeLinecap: 'round' as const,
    transition: 'stroke-dasharray 0.3s ease',
  },
  ringLabel: {
    position: 'absolute' as const,
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringNum: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: 1,
  },
  ringText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  kpiRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  kpiCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  kpiIcon: {
    width: `${ICON_SIZES.INLINE * 2}px`,
    height: `${ICON_SIZES.INLINE * 2}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    flexShrink: 0,
  },
  kpiBlue: { backgroundColor: tokens.colorPaletteBlueBackground2, color: tokens.colorPaletteBlueForeground1 },
  kpiGold: { backgroundColor: tokens.colorPaletteYellowBackground2, color: tokens.colorPaletteYellowForeground1 },
  kpiGreen: { backgroundColor: tokens.colorPaletteGreenBackground2, color: tokens.colorPaletteGreenForeground1 },
  kpiRed: { backgroundColor: tokens.colorPaletteRedBackground2, color: tokens.colorPaletteRedForeground1 },
  kpiBody: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXS),
  },
  kpiNum: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  kpiLabel: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  kpiSub: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  midRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  '@media (max-width: 768px)': {
    midRow: {
      gridTemplateColumns: '1fr',
    },
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.overflow('hidden'),
  },
  panelHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  panelBody: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
  roleBarRow: {
    display: 'grid',
    gridTemplateColumns: '120px 1fr 40px',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalXS, 0),
  },
  roleBarLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  roleBarTrack: {
    height: '8px',
    backgroundColor: tokens.colorNeutralStroke2,
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    overflow: 'hidden',
  },
  roleBarFill: {
    height: '100%',
    backgroundColor: tokens.colorBrandBackground,
    transition: 'width 0.3s ease',
  },
  roleBarCount: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    textAlign: 'right' as const,
  },
  metricRow: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
    ...shorthands.padding(tokens.spacingVerticalXS, 0),
  },
  metricInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  metricBarTrack: {
    height: '6px',
    backgroundColor: tokens.colorNeutralStroke2,
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
    transition: 'width 0.3s ease',
  },
  metricGreen: { backgroundColor: tokens.colorPaletteGreenForeground1 },
  metricBlue: { backgroundColor: tokens.colorBrandBackground },
  metricGold: { backgroundColor: tokens.colorPaletteYellowForeground1 },
  metricViolet: { backgroundColor: tokens.colorBrandForeground1 },
  auditTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: tokens.fontSizeBase300,
  },
  auditTh: {
    textAlign: 'left' as const,
    padding: tokens.spacingVerticalS,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  auditTd: {
    padding: tokens.spacingVerticalS,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke1),
    color: tokens.colorNeutralForeground1,
  },
  auditBadge: {
    display: 'inline-block',
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.padding('2px', '8px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
  auditSuccess: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground1,
  },
  auditDenied: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
  },
});

export interface AuditActionRecord {
  action_timestamp: string;
  entra_email_id: string;
  action_name: string;
  action_status: 'Success' | 'Denied';
  additional_info?: string;
}

export interface SccDashboardPageProps {
  complianceScore: number;
  activeUsers: number;
  totalUsers: number;
  roleAssignments: number;
  totalRoles: number;
  successSessions: number;
  sessionRate: number;
  anomaliesCount: number;
  anomaliesSubtext: string;
  roleDistribution: Array<{ name: string; count: number }>;
  accessMetrics: Array<{ name: string; value: number }>;
  recentActions: AuditActionRecord[];
  onViewAllAudit: () => void;
}

const formatTs = (ts: string) => {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    + ' ' + d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
};

export const SccDashboardPage: React.FC<SccDashboardPageProps> = ({
  complianceScore,
  activeUsers,
  totalUsers,
  roleAssignments,
  totalRoles,
  successSessions,
  sessionRate,
  anomaliesCount,
  anomaliesSubtext,
  roleDistribution,
  accessMetrics,
  recentActions,
  onViewAllAudit,
}) => {
  const styles = useStyles();
  const maxRoleCount = Math.max(...roleDistribution.map((r) => r.count), 1);
  const ringColor = complianceScore >= 80
    ? tokens.colorPaletteGreenForeground1
    : complianceScore >= 60
      ? tokens.colorPaletteYellowForeground1
      : tokens.colorPaletteRedForeground1;

  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>
            <Shield16Regular aria-hidden /> Security Control Center
          </h1>
          <p className={styles.subtitle}>
            Security Analytics Overview — Users, Roles, Sessions & Audit Activity
          </p>
        </div>
        <div className={styles.complianceRing}>
          <svg className={styles.ringSvg} viewBox="0 0 80 80">
            <circle className={styles.ringBg} cx="40" cy="40" r="32" />
            <circle
              className={styles.ringFill}
              cx="40"
              cy="40"
              r="32"
              stroke={ringColor}
              strokeDasharray={`${Math.round(complianceScore * 2.01)} 201`}
            />
          </svg>
          <div className={styles.ringLabel}>
            <span className={styles.ringNum}>{complianceScore}</span>
            <span className={styles.ringText}>Compliance</span>
          </div>
        </div>
      </header>

      <div className={styles.kpiRow}>
        <div className={styles.kpiCard}>
          <div className={mergeClasses(styles.kpiIcon, styles.kpiBlue)}>
            <People16Regular aria-hidden />
          </div>
          <div className={styles.kpiBody}>
            <span className={styles.kpiNum}>{activeUsers}</span>
            <span className={styles.kpiLabel}>Active Users</span>
            <span className={styles.kpiSub}>{totalUsers} total registered</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={mergeClasses(styles.kpiIcon, styles.kpiGold)}>
            <PersonCircle16Regular aria-hidden />
          </div>
          <div className={styles.kpiBody}>
            <span className={styles.kpiNum}>{roleAssignments}</span>
            <span className={styles.kpiLabel}>Role Assignments</span>
            <span className={styles.kpiSub}>{totalRoles} roles defined</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={mergeClasses(styles.kpiIcon, styles.kpiGreen)}>
            <CheckmarkCircle16Regular aria-hidden />
          </div>
          <div className={styles.kpiBody}>
            <span className={styles.kpiNum}>{successSessions}</span>
            <span className={styles.kpiLabel}>Successful Sessions</span>
            <span className={styles.kpiSub}>{sessionRate}% success rate</span>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <div className={mergeClasses(styles.kpiIcon, styles.kpiRed)}>
            <Warning16Regular aria-hidden />
          </div>
          <div className={styles.kpiBody}>
            <span className={styles.kpiNum}>{anomaliesCount}</span>
            <span className={styles.kpiLabel}>Anomalies Detected</span>
            <span className={styles.kpiSub}>{anomaliesSubtext}</span>
          </div>
        </div>
      </div>

      <div className={styles.midRow}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <LockClosed16Regular aria-hidden /> Role Distribution
          </div>
          <div className={styles.panelBody}>
            {roleDistribution.map((r) => (
              <div key={r.name} className={styles.roleBarRow}>
                <span className={styles.roleBarLabel}>{r.name}</span>
                <div className={styles.roleBarTrack}>
                  <div
                    className={styles.roleBarFill}
                    style={{ width: `${Math.round((r.count / maxRoleCount) * 100)}%` }}
                  />
                </div>
                <span className={styles.roleBarCount}>{r.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <DataTrending16Regular aria-hidden /> Access Metrics
          </div>
          <div className={styles.panelBody}>
            {accessMetrics.map((m, i) => (
              <div key={m.name} className={styles.metricRow}>
                <div className={styles.metricInfo}>
                  <span>{m.name}</span>
                  <span>{m.value}%</span>
                </div>
                <div className={styles.metricBarTrack}>
                  <div
                    className={mergeClasses(
                      styles.metricBarFill,
                      i === 0 && styles.metricGreen,
                      i === 1 && styles.metricBlue,
                      i === 2 && styles.metricGold,
                      i === 3 && styles.metricViolet
                    )}
                    style={{ width: `${m.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <DocumentShield16Regular aria-hidden /> Recent Audit Activity
          <Button
            appearance="subtle"
            size="small"
            icon={<ArrowRight16Regular />}
            onClick={onViewAllAudit}
            aria-label="View all audit logs"
          >
            View All
          </Button>
        </div>
        <div className={styles.panelBody}>
          <table className={styles.auditTable} role="grid">
            <thead>
              <tr>
                <th className={styles.auditTh}>Timestamp</th>
                <th className={styles.auditTh}>User</th>
                <th className={styles.auditTh}>Action</th>
                <th className={styles.auditTh}>Status</th>
                <th className={styles.auditTh}>Details</th>
              </tr>
            </thead>
            <tbody>
              {recentActions.map((a, idx) => (
                <tr key={idx}>
                  <td className={styles.auditTd}>{formatTs(a.action_timestamp)}</td>
                  <td className={styles.auditTd}>{a.entra_email_id}</td>
                  <td className={styles.auditTd}>{a.action_name}</td>
                  <td className={styles.auditTd}>
                    <span
                      className={mergeClasses(
                        styles.auditBadge,
                        a.action_status === 'Success' ? styles.auditSuccess : styles.auditDenied
                      )}
                    >
                      {a.action_status}
                    </span>
                  </td>
                  <td className={styles.auditTd}>{a.additional_info ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

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
  LockOpen16Regular,
  LockClosed16Regular,
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
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  accent: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  sectionDivider: {
    flex: 1,
    height: '1px',
    backgroundColor: tokens.colorNeutralStroke2,
  },
  appGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalM, tokens.spacingVerticalM),
  },
  moduleCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    cursor: 'pointer',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '200ms',
    position: 'relative',
    ':hover': {
      ...shorthands.borderColor(tokens.colorBrandStroke1),
      boxShadow: tokens.shadow8,
    },
  },
  kernelCard: {
    ...shorthands.borderColor(tokens.colorBrandStroke1),
  },
  cardIcon: {
    width: `${ICON_SIZES.EMPTY_ERROR}px`,
    height: `${ICON_SIZES.EMPTY_ERROR}px`,
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  cardName: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  badge: {
    position: 'absolute' as const,
    top: tokens.spacingVerticalS,
    right: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  badgeLocked: {
    color: tokens.colorNeutralForeground3,
  },
});

export interface ModuleInfo {
  solution_module_id: string;
  module_code: string;
  module_name: string;
}

export interface EccPageProps {
  unlockedModules: ModuleInfo[];
  lockedModules: ModuleInfo[];
  onModuleClick: (moduleId: string) => void;
  onLockedModuleClick: (moduleId: string, moduleName: string) => void;
  renderModuleIcon?: (moduleCode: string) => React.ReactNode;
}

export const EccPage: React.FC<EccPageProps> = ({
  unlockedModules,
  lockedModules,
  onModuleClick,
  onLockedModuleClick,
  renderModuleIcon,
}) => {
  const styles = useStyles();

  const defaultIcon = (
    <svg
      className={styles.cardIcon}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8.75 13C9.99 13 11 14 11 15.25v3.5C11 19.99 10 21 8.75 21h-3.5C4.01 21 3 20 3 18.75v-3.5C3 14.01 4 13 5.25 13h3.5Zm10 0c1.24 0 2.25 1 2.25 2.25v3.5c0 1.24-1 2.25-2.25 2.25h-3.5C14.01 21 13 20 13 18.75v-3.5c0-1.24 1-2.25 2.25-2.25h3.5Z" />
    </svg>
  );

  const renderCard = (m: ModuleInfo, isKernel: boolean) => {
    const icon = renderModuleIcon?.(m.module_code) ?? defaultIcon;
    return (
      <div
        key={m.solution_module_id}
        role="button"
        tabIndex={0}
        className={mergeClasses(
          styles.moduleCard,
          isKernel && styles.kernelCard
        )}
        onClick={() =>
          isKernel
            ? onModuleClick(m.solution_module_id)
            : onLockedModuleClick(m.solution_module_id, m.module_name)
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            isKernel
              ? onModuleClick(m.solution_module_id)
              : onLockedModuleClick(m.solution_module_id, m.module_name);
          }
        }}
        aria-label={`${m.module_name} - ${isKernel ? 'Open' : 'Locked'}`}
      >
        <span className={mergeClasses(styles.badge, !isKernel && styles.badgeLocked)}>
          {isKernel ? (
            <>
              <LockOpen16Regular aria-hidden /> Open
            </>
          ) : (
            <>
              <LockClosed16Regular aria-hidden /> Locked
            </>
          )}
        </span>
        <div className={styles.cardIcon}>{icon}</div>
        <span className={styles.cardName}>{m.module_name}</span>
      </div>
    );
  };

  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to Enterprise Control Centre</h1>
        <p className={styles.subtitle}>
          Centralized role-based management for <strong>CLaaS<span className={styles.accent}>2</span>SaaS</strong>
        </p>
      </header>

      {unlockedModules.length > 0 && (
        <section className={styles.section} aria-labelledby="unlocked-section">
          <div className={styles.sectionHeader}>
            <LockOpen16Regular aria-hidden />
            <div className={styles.sectionDivider} />
          </div>
          <div className={styles.appGrid} id="unlocked-section">
            {unlockedModules.map((m) => renderCard(m, m.module_code === 'KNL'))}
          </div>
        </section>
      )}

      {lockedModules.length > 0 && (
        <section className={styles.section} aria-labelledby="locked-section">
          <div className={styles.sectionHeader}>
            <LockClosed16Regular aria-hidden />
            <div className={styles.sectionDivider} />
          </div>
          <div className={styles.appGrid} id="locked-section">
            {lockedModules.map((m) => renderCard(m, false))}
          </div>
        </section>
      )}
    </main>
  );
};

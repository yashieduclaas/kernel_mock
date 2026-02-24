import * as React from 'react';
import {
  makeStyles,
  shorthands,
} from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import {
  ScaleBalance20Regular,
  Flow20Regular,
  DataTrending20Regular,
  Rocket20Regular,
  Key20Regular,
  Ticket20Regular,
  BookOpen20Regular,
  Bot20Regular,
  Wrench20Regular,
  CheckmarkCircle16Regular,
} from '@fluentui/react-icons';
import { ICON_SIZES } from '../../shared';

const ICON_MAP: Record<string, React.ReactNode> = {
  'acc-governance': <ScaleBalance20Regular />,
  'acc-workflows': <Flow20Regular />,
  'acc-analytics': <DataTrending20Regular />,
  'acc-deployment': <Rocket20Regular />,
  'hd-access-request': <Key20Regular />,
  'hd-ticketing': <Ticket20Regular />,
  'hd-knowledge': <BookOpen20Regular />,
  'hd-copilot': <Bot20Regular />,
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  iconWrapper: {
    width: `${ICON_SIZES.EMPTY_ERROR}px`,
    height: `${ICON_SIZES.EMPTY_ERROR}px`,
    color: tokens.colorNeutralForeground3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    margin: 0,
    textAlign: 'center',
    maxWidth: '560px',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    marginTop: tokens.spacingVerticalM,
  },
  featuresHeading: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  featureCards: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap(tokens.spacingHorizontalS, tokens.spacingVerticalS),
  },
  featureCard: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  featureIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground4,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalM,
  },
});

export interface PlaceholderConfig {
  pageId: string;
  title: string;
  subtitle: string;
  features?: string[];
}

export interface PlaceholderPageProps {
  config: PlaceholderConfig;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ config }) => {
  const styles = useStyles();
  const icon = ICON_MAP[config.pageId];

  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <div className={styles.iconWrapper} aria-hidden>
          {icon ?? <Wrench20Regular />}
        </div>
        <h1 className={styles.title}>{config.title}</h1>
        <p className={styles.subtitle}>{config.subtitle}</p>

        {config.features && config.features.length > 0 && (
          <div className={styles.features}>
            <h3 className={styles.featuresHeading}>Planned Features</h3>
            <div className={styles.featureCards}>
              {config.features.map((f) => (
                <div key={f} className={styles.featureCard}>
                  <span className={styles.featureIcon}><CheckmarkCircle16Regular aria-hidden /></span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.badge}>
          <Wrench20Regular aria-hidden /> Coming in a future release
        </div>
      </div>
    </main>
  );
};

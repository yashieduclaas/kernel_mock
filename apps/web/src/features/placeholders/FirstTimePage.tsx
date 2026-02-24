import * as React from 'react';
import {
  makeStyles,
  shorthands,
} from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { Button } from '@fluentui/react-components';
import { Bot20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXL),
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    maxWidth: '480px',
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
    marginTop: tokens.spacingVerticalS,
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginTop: tokens.spacingVerticalL,
  },
});

export interface FirstTimePageProps {
  userName: string;
  subtitle: string;
  onCopilotClick: () => void;
  onCancelClick: () => void;
}

export const FirstTimePage: React.FC<FirstTimePageProps> = ({
  userName,
  subtitle,
  onCopilotClick,
  onCancelClick,
}) => {
  const styles = useStyles();

  return (
    <main className={styles.root}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome, {userName}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.buttons}>
          <Button appearance="primary" icon={<Bot20Regular />} onClick={onCopilotClick}>
            Copilot Agent
          </Button>
          <Button appearance="secondary" onClick={onCancelClick}>
            Cancel
          </Button>
        </div>
      </div>
    </main>
  );
};

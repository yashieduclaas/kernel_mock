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
  Input,
  Textarea,
  Field,
} from '@fluentui/react-components';

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
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    maxWidth: '600px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  formActions: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginTop: tokens.spacingVerticalM,
  },
  optional: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightRegular,
  },
});

export interface AccessRequestPageProps {
  appName: string;
  onSubmit: (data: {
    reason: string;
    justification: string;
    duration?: string;
  }) => void;
  onCancel: () => void;
}

export const AccessRequestPage: React.FC<AccessRequestPageProps> = ({
  appName,
  onSubmit,
  onCancel,
}) => {
  const styles = useStyles();
  const [reason, setReason] = React.useState('');
  const [justification, setJustification] = React.useState('');
  const [duration, setDuration] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || !justification.trim()) return;
    onSubmit({ reason: reason.trim(), justification: justification.trim(), duration: duration.trim() || undefined });
  };

  return (
    <main className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.title}>Request Access</h1>
        <p className={styles.subtitle}>Submit a request to access this application</p>
      </header>

      <div className={styles.card}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Field label="Application Name">
            <Input
              value={appName}
              readOnly
              placeholder="(no application selected)"
              aria-readonly
            />
          </Field>
          <Field label="Reason for Access" required>
            <Textarea
              value={reason}
              onChange={(_, d) => setReason(d.value)}
              placeholder="Explain why you need access to this application"
              rows={3}
              required
            />
          </Field>
          <Field label="Business Justification" required>
            <Textarea
              value={justification}
              onChange={(_, d) => setJustification(d.value)}
              placeholder="Provide business justification for your access request"
              rows={3}
              required
            />
          </Field>
          <Field label={<>Duration Needed <span className={styles.optional}>(optional)</span></>}>
            <Input
              value={duration}
              onChange={(_, d) => setDuration(d.value)}
              placeholder="e.g., 6 months, permanent"
            />
          </Field>
          <div className={styles.formActions}>
            <Button appearance="secondary" onClick={onCancel} type="button">
              Cancel
            </Button>
            <Button appearance="primary" type="submit" disabled={!reason.trim() || !justification.trim()}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

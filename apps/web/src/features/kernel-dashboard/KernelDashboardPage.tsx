import * as React from 'react';
import {
  makeStyles,
  shorthands,
} from '@griffel/react';
import {
  tokens,
} from '@fluentui/react-theme';
import { Input } from '@fluentui/react-components';

const PLACEHOLDERS = [
  'Describe your task to open the right feature',
  'Security Role Management',
  'User Profile Enrichment',
  'Module Management',
  'User Role Assignment',
  'Audit Logs',
];

const TYPING_SPEED = 60;
const DELETING_SPEED = 40;
const PAUSE_AFTER = 1800;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXL),
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  heading: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  inputBar: {
    position: 'relative' as const,
    width: '100%',
    maxWidth: '560px',
  },
  input: {
    width: '100%',
    fontSize: tokens.fontSizeBase400,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
  },
  ghost: {
    position: 'absolute' as const,
    left: tokens.spacingHorizontalL,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground3,
    pointerEvents: 'none' as const,
  },
});

export interface KernelDashboardPageProps {
  onCommand?: (command: string) => void;
}

export const KernelDashboardPage: React.FC<KernelDashboardPageProps> = ({
  onCommand,
}) => {
  const styles = useStyles();
  const [value, setValue] = React.useState('');
  const [ghostText, setGhostText] = React.useState('');
  const [phraseIdx, setPhraseIdx] = React.useState(0);
  const [charIdx, setCharIdx] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const animRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    let lastTime = 0;
    let pauseUntil = 0;

    const tick = (timestamp: number) => {
      const focused = document.activeElement === inputRef.current;
      if (focused || value !== '') {
        setGhostText('');
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      if (timestamp < pauseUntil) {
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
      if (timestamp - lastTime < speed) {
        animRef.current = requestAnimationFrame(tick);
        return;
      }
      lastTime = timestamp;

      const phrase = PLACEHOLDERS[phraseIdx];

      if (!isDeleting) {
        const next = charIdx + 1;
        setCharIdx(next);
        setGhostText(phrase.substring(0, next));
        if (next === phrase.length) {
          setIsDeleting(true);
          pauseUntil = timestamp + PAUSE_AFTER;
        }
      } else {
        const next = charIdx - 1;
        setCharIdx(next);
        setGhostText(phrase.substring(0, next));
        if (next === 0) {
          setIsDeleting(false);
          setPhraseIdx((phraseIdx + 1) % PLACEHOLDERS.length);
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [phraseIdx, charIdx, isDeleting, value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = value.trim();
    if (cmd) onCommand?.(cmd);
  };

  return (
    <main className={styles.root}>
      <h1 className={styles.heading}>Welcome, how can I help?</h1>
      <form onSubmit={handleSubmit} className={styles.inputBar}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="Copilot command"
          autoComplete="off"
        />
        {!value && <span className={styles.ghost} aria-hidden>{ghostText}</span>}
      </form>
    </main>
  );
};

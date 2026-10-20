import styles from './ChatChips.module.scss';

export interface ChatChip {
  id: string;
  label: string;
}

type ChatChipsVariant = 'wrap' | 'strip';

interface ChatChipsProps {
  chips: ChatChip[];
  label: string;
  variant?: ChatChipsVariant;
  disabled?: boolean;
  onSelect: (id: string) => void;
}

export const ChatChips = ({
  chips,
  label,
  variant = 'wrap',
  disabled = false,
  onSelect,
}: ChatChipsProps) => {
  const classes = [styles.root, styles[variant]].join(' ');

  return (
    <div
      className={classes}
      role="group"
      aria-label={label}
    >
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          className={styles.chip}
          disabled={disabled}
          onClick={() => onSelect(chip.id)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
};

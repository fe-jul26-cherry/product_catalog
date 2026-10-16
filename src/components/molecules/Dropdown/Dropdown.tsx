import { useId, useState } from 'react';

import styles from './Dropdown.module.scss';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  description?: string;
  placeholder?: string;
  name?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Dropdown = ({
  options,
  value,
  onChange,
  description,
  placeholder,
  name,
  error,
  fullWidth,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const errorId = useId();
  const selected = options.find((o) => o.value === value);

  const wrapperClasses = [styles.wrapper, fullWidth && styles.full]
    .filter(Boolean)
    .join(' ');

  const controlClasses = [
    styles.control,
    open && styles.focus,
    error && styles.invalid,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {description && <span className={styles.description}>{description}</span>}

      <div className={styles.select}>
        <button
          type="button"
          name={name}
          className={controlClasses}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-describedby={error ? errorId : undefined}
        >
          {selected ?
            selected.label
          : <span className={styles.placeholder}>{placeholder}</span>}
          <span
            className={open ? `${styles.arrow} ${styles.up}` : styles.arrow}
            aria-hidden
          />
        </button>

        {open && options.length > 0 && (
          <ul
            className={styles.menu}
            role="listbox"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  className={
                    option.value === value ?
                      `${styles.item} ${styles.hover}`
                    : styles.item
                  }
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <span
          id={errorId}
          className={styles.error}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};

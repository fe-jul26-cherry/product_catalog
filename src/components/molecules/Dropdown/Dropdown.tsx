import { useState } from 'react';

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
}

export const Dropdown = ({
  options,
  value,
  onChange,
  description,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className={styles.wrapper}>
      {description && <span className={styles.description}>{description}</span>}

      <div className={styles.select}>
        <button
          type="button"
          className={
            open ? `${styles.control} ${styles.focus}` : styles.control
          }
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
        >
          {selected?.label}
          <span
            className={open ? `${styles.arrow} ${styles.up}` : styles.arrow}
            aria-hidden
          />
        </button>

        {open && (
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
    </div>
  );
};

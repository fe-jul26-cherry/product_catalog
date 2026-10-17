import { useEffect, useRef } from 'react';

import search from '@/assets/icons/search.svg';
import { Icon } from '@/components/atoms/Icon';

import styles from './SearchInput.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEscape?: () => void;
  placeholder: string;
  label: string;
  focusOnMount?: boolean;
}

export const SearchInput = ({
  value,
  onChange,
  onEscape,
  placeholder,
  label,
  focusOnMount = false,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusOnMount) {
      inputRef.current?.focus();
    }
  }, [focusOnMount]);

  return (
    <div className={styles.root}>
      <Icon
        src={search}
        alt=""
        size="sm"
        className={styles.icon}
      />
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        name="search"
        value={value}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            onEscape?.();
          }
        }}
      />
    </div>
  );
};

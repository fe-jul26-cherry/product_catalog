import { useEffect, useId, useRef } from 'react';

import closeIcon from '@/assets/icons/close.svg';
import { Icon } from '@/components/atoms/Icon';

import styles from './Modal.module.scss';

import type { ReactNode, SyntheticEvent } from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ title, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) {
      dialog.showModal();
    }

    const handleBackdropPress = (event: MouseEvent) => {
      if (event.target === dialog) {
        onClose();
      }
    };

    dialog.addEventListener('mousedown', handleBackdropPress);

    return () => {
      dialog.removeEventListener('mousedown', handleBackdropPress);
    };
  }, [onClose]);

  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.root}
      aria-labelledby={titleId}
      onCancel={handleCancel}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h2
            id={titleId}
            className={styles.title}
          >
            {title}
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Close"
            onClick={onClose}
          >
            <Icon
              src={closeIcon}
              alt=""
            />
          </button>
        </header>

        {children}
      </div>
    </dialog>
  );
};

import { Button } from '@/components/atoms/Button';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
  <div
    className={styles.root}
    role="alert"
  >
    <p className={styles.text}>{message}</p>
    {onRetry && <Button onClick={onRetry}>Try again</Button>}
  </div>
);

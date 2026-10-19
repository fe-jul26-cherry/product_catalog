import styles from './ChatMessage.module.scss';

import type { ReactNode } from 'react';

type ChatMessageRole = 'user' | 'assistant' | 'action';

interface ChatMessageProps {
  role: ChatMessageRole;
  children: ReactNode;
}

export const ChatMessage = ({ role, children }: ChatMessageProps) => {
  const classes = [styles.root, styles[role]].join(' ');

  return (
    <div className={classes}>
      <p className={styles.text}>{children}</p>
    </div>
  );
};

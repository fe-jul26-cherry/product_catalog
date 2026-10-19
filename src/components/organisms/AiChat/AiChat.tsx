import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import closeIcon from '@/assets/icons/close.svg';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ChatMessage } from '@/components/molecules/ChatMessage';
import { useTranslation } from '@/hooks';
import { askAi } from '@/services/ai';
import { useAiChatStore } from '@/store';

import styles from './AiChat.module.scss';

import type { AiErrorReason } from '@/services/ai';
import type { FormEvent } from 'react';

interface AiChatProps {
  onClose: () => void;
}

interface ChatError {
  reason: AiErrorReason;
  text: string;
}

export const AiChat = ({ onClose }: AiChatProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const messages = useAiChatStore((state) => state.messages);
  const add = useAiChatStore((state) => state.add);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !document.querySelector('dialog[open]')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const list = listRef.current;

    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages, isLoading, error]);

  const request = async (text: string) => {
    setIsLoading(true);
    setError(null);

    const result = await askAi(text, navigate);

    setIsLoading(false);

    if (!result.ok) {
      setError({ reason: result.reason, text });

      return;
    }

    const answer = result.text.trim();

    if (result.actions.length === 0 && !answer) {
      setError({ reason: 'invalid', text });

      return;
    }

    result.actions.forEach((action) => add({ role: 'action', action }));

    if (answer) {
      add({ role: 'assistant', text: answer });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = value.trim();

    if (!text || isLoading) {
      return;
    }

    add({ role: 'user', text });
    setValue('');
    void request(text);
  };

  return (
    <aside
      className={styles.root}
      aria-label={t.assistant.title}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>{t.assistant.title}</h2>
        <button
          type="button"
          className={styles.close}
          aria-label={t.assistant.close}
          onClick={onClose}
        >
          <Icon
            src={closeIcon}
            alt=""
          />
        </button>
      </header>

      <div
        ref={listRef}
        className={styles.list}
        role="log"
        aria-label={t.assistant.messages}
      >
        {messages.length === 0 && (
          <ChatMessage variant="assistant">{t.assistant.greeting}</ChatMessage>
        )}

        {messages.map((message) =>
          message.role === 'action' ?
            <ChatMessage
              key={message.id}
              variant="action"
            >
              {t.assistant.actions[message.action] ?? message.action}
            </ChatMessage>
          : <ChatMessage
              key={message.id}
              variant={message.role}
            >
              {message.text}
            </ChatMessage>,
        )}

        {isLoading && (
          <ChatMessage variant="assistant">{t.assistant.thinking}</ChatMessage>
        )}

        {error && (
          <div
            className={styles.error}
            role="alert"
          >
            <p className={styles.errorText}>
              {t.assistant.errors[error.reason]}
            </p>
            {error.reason !== 'config' && (
              <Button
                className={styles.retry}
                onClick={() => void request(error.text)}
              >
                {t.status.retry}
              </Button>
            )}
          </div>
        )}
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          autoComplete="off"
          maxLength={500}
          aria-label={t.assistant.inputLabel}
          placeholder={t.assistant.placeholder}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button
          className={styles.send}
          type="submit"
          disabled={isLoading || !value.trim()}
        >
          {t.assistant.send}
        </Button>
      </form>
    </aside>
  );
};

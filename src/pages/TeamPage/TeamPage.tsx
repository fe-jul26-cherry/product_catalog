import { TEAM_MEMBERS } from '@/constants';
import { useTranslation } from '@/hooks';

import styles from './TeamPage.module.scss';

export const TeamPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>{t.team.title}</h1>
      <ul className={styles.list}>
        {TEAM_MEMBERS.map((member) => (
          <li key={member.id}>
            <a
              className={styles.card}
              href={member.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name}, ${t.team.roles[member.role]} — GitHub`}
            >
              <div
                className={styles.avatar}
                aria-hidden="true"
              >
                {member.photo && (
                  <img
                    className={styles.photo}
                    src={member.photo}
                    alt=""
                  />
                )}
              </div>
              <h2 className={styles.role}>{t.team.roles[member.role]}</h2>
              <p className={styles.name}>{member.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

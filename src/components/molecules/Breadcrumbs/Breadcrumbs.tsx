import { Link } from 'react-router-dom';

import chevronRightIcon from '@/assets/icons/chevron-right.svg';
import homeIcon from '@/assets/icons/home.svg';
import { Icon } from '@/components/atoms/Icon';
import { ROUTES } from '@/constants';

import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav
    className={styles.root}
    aria-label="Breadcrumbs"
  >
    <ol className={styles.list}>
      <li>
        <Link
          to={ROUTES.HOME}
          className={styles.homeLink}
        >
          <Icon
            src={homeIcon}
            alt="Home"
          />
        </Link>
      </li>

      {items.map((item) => (
        <li
          key={item.label}
          className={styles.item}
        >
          <Icon
            src={chevronRightIcon}
            alt=""
          />
          {item.path ?
            <Link
              to={item.path}
              className={styles.link}
            >
              {item.label}
            </Link>
          : <span
              aria-current="page"
              className={styles.current}
            >
              {item.label}
            </span>
          }
        </li>
      ))}
    </ol>
  </nav>
);

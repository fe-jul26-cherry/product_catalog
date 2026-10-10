import { Link } from 'react-router-dom';

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
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      {items.map((item) => (
        <li key={item.label}>
          {item.path ?
            <Link to={item.path}>{item.label}</Link>
          : <span aria-current="page">{item.label}</span>}
        </li>
      ))}
    </ol>
  </nav>
);

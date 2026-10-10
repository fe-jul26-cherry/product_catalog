import styles from './Icon.module.scss';

type Size = 'sm' | 'lg';

interface IconProps {
  src: string;
  alt?: string;
  size?: Size;
  className?: string;
}

export const Icon = ({ src, alt = '', size = 'sm', className }: IconProps) => {
  const classes = [styles.icon, styles[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <img
      className={classes}
      src={src}
      alt={alt}
    />
  );
};

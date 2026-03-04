import Link from 'next/link';
import styles from './Breadcrumb.module.css';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb} aria-label="パンくずリスト">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className={styles.item}>
              {!isLast ? (
                <>
                  <Link href={item.href} className={styles.link}>
                    {item.name}
                  </Link>
                  <span className={styles.separator} aria-hidden="true">›</span>
                </>
              ) : (
                <span className={styles.current} aria-current="page">{item.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

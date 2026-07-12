import { type LucideIcon } from 'lucide-preact';

import styles from './styles.module.css';

interface NutrientItemProps {
  label: string;
  level: 'low' | 'moderate' | 'high';
  Icon: LucideIcon;
}

const nutrientConfig = {
  low: {
    colorClass: 'color-green',
    bgClass: 'bg-green',
    pct: 18,
    label: 'Low',
    pillClass: 'off-nutrient-low',
  },
  moderate: {
    colorClass: 'color-orange',
    bgClass: 'bg-orange',
    pct: 50,
    label: 'Moderate',
    pillClass: 'off-nutrient-moderate',
  },
  high: {
    colorClass: 'color-red',
    bgClass: 'bg-red',
    pct: 85,
    label: 'High',
    pillClass: 'off-nutrient-high',
  },
} as const;

export default function NutrientItem({ label, level, Icon }: NutrientItemProps) {
  const cfg = nutrientConfig[level];

  return (
    <div className={styles['off-nutrient-item']}>
      {/* Row 1: Icon/Label and Level Pill */}
      <div className={styles['nutrient-header-row']}>
        <div className={styles['off-nutrient-info']}>
          <Icon size={14} className={styles[cfg.colorClass]} />
          <span className={styles['off-nutrient-label']}>{label}</span>
        </div>
        <span className={`${styles['off-nutrient-level-pill']} ${styles[cfg.pillClass]}`}>
          {cfg.label}
        </span>
      </div>

      {/* Row 2: Progress bar (full width) */}
      <div className={styles['nutrient-bar-bg']}>
        <div
          className={`${styles['nutrient-bar-fill']} ${styles[cfg.bgClass]}`}
          style={{ width: `${cfg.pct}%` }}
        />
      </div>
    </div>
  );
}

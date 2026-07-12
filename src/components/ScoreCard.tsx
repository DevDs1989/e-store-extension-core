import styles from './styles.module.css';

interface ScoreCardProps {
  title: string;
  imgSrc: string;
  altText: string;
  description: string;
}

export default function ScoreCard({ title, imgSrc, altText, description }: ScoreCardProps) {
  return (
    <div className={styles['off-score-card']}>
      <span className={styles['off-score-card-title']}>{title}</span>
      <img className={styles['off-score-card-img']} src={imgSrc} alt={altText} />
      <span className={styles['off-score-card-desc']}>{description}</span>
    </div>
  );
}

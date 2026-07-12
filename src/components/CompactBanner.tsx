import { useState } from 'preact/hooks';
import { browser, type PublicPath } from 'wxt/browser';

import ProductDetailModal from './ProductDetailModal';
import styles from './styles.module.css';

import { useProductData } from '@/src/hooks/useProductData';
import { type StoreProduct } from '@/src/types/Product';

export default function CompactBanner(storeProduct: StoreProduct) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, error, details } = useProductData(storeProduct);

  if (loading) {
    return (
      <div className={styles['off-compact-card']}>
        <div className={styles['off-card-header']}>
          <div className={`${styles['off-skeleton']} ${styles['off-skeleton-icon']}`} />
          <div className={`${styles['off-skeleton']} ${styles['off-skeleton-text']}`} />
        </div>
        <div className={styles['off-card-body']}>
          <div className={styles['off-card-scores-row']}>
            <div className={`${styles['off-skeleton']} ${styles['off-skeleton-score-wide']}`} />
            <div className={`${styles['off-skeleton']} ${styles['off-skeleton-score-square']}`} />
            <div className={`${styles['off-skeleton']} ${styles['off-skeleton-score-square']}`} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !details) {
    return null;
  }

  const handleBannerClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  };

  // Safely resolve the local extension asset paths for scores
  const nutriGrade = details.nutriScore.grade.toLowerCase();
  const ecoGrade = details.ecoScore.grade.toLowerCase();
  const novaVal = details.novaScore.score;

  const nutriImg = browser.runtime.getURL(
    `/score/nutriscore-${nutriGrade}-new-en.svg` as unknown as PublicPath
  );
  const ecoImg = browser.runtime.getURL(
    `/score/green-score-${ecoGrade}.svg` as unknown as PublicPath
  );
  const novaImg = browser.runtime.getURL(
    `/score/nova-group-${novaVal}.svg` as unknown as PublicPath
  );
  const iconImg = browser.runtime.getURL(`/logos/off-icon.svg` as unknown as PublicPath);

  return (
    <>
      <div
        className={styles['off-compact-card']}
        onClick={handleBannerClick}
        title="Click to view Open Food Facts details"
      >
        {/* Header with NutriLens logo icon */}
        <div className={styles['off-card-header']}>
          <img className={styles['off-card-logo-icon']} src={iconImg} alt="NutriLens icon" />
          <span className={styles['off-card-title']}>NutriLens</span>
        </div>

        {/* Score SVGs only */}
        <div className={styles['off-card-body']}>
          <div className={styles['off-card-scores-row']}>
            <img
              className={styles['off-card-score-img-wide']}
              src={nutriImg}
              alt={`Nutri-Score ${details.nutriScore.grade}`}
            />
            <img
              className={styles['off-card-score-img-square']}
              src={ecoImg}
              alt={`Eco-Score ${details.ecoScore.grade}`}
            />
            <img
              className={styles['off-card-score-img-square']}
              src={novaImg}
              alt={`NOVA Score ${details.novaScore.score}`}
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductDetailModal details={details} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

import { Droplet, Droplets, Cookie, Waves, X } from 'lucide-preact';
import { createPortal } from 'preact/compat';
import { browser, type PublicPath } from 'wxt/browser';

import NutrientItem from './NutrientItem';
import ProductHero from './ProductHero';
import ScoreCard from './ScoreCard';
import styles from './styles.module.css';

import type { ProductDetails } from './types';


interface ProductDetailModalProps {
  details: ProductDetails;
  onClose: () => void;
}

export default function ProductDetailModal({ details, onClose }: ProductDetailModalProps) {
  const { brand, name, size, barcode, imageUrl, nutriScore, novaScore, ecoScore, nutrients } =
    details;

  // Handle backdrop clicks to close
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Safely resolve the local extension asset paths for scores
  const nutriGrade = nutriScore.grade ? nutriScore.grade.toLowerCase() : 'unknown';
  const ecoGrade = ecoScore.grade ? ecoScore.grade.toLowerCase() : 'unknown';
  const novaVal = novaScore.score ? novaScore.score : 'unknown';

  const nutriImg = browser.runtime.getURL(
    `/score/nutriscore-${nutriGrade}-new-en.svg` as unknown as PublicPath
  );
  const ecoImg = browser.runtime.getURL(
    `/score/green-score-${ecoGrade}.svg` as unknown as PublicPath
  );
  const novaImg = browser.runtime.getURL(
    `/score/nova-group-${novaVal}.svg` as unknown as PublicPath
  );
  const logoImg = browser.runtime.getURL('/logos/off-logo-dark.svg');

  return createPortal(
    <div className={styles['off-modal-backdrop']} onClick={handleBackdropClick}>
      <div className={styles['off-modal']}>
        {/* Header */}
        <div className={styles['off-header']}>
          <div className={styles['off-logo-container']}>
            <img src={logoImg} alt="Open Food Facts Logo" className={styles['off-logo-img']} />
          </div>
          <button className={styles['off-close-btn']} onClick={onClose} aria-label="Close modal">
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles['off-modal-body-scroll']}>
          {/* Product Hero */}
          <ProductHero
            brand={brand}
            name={name}
            barcode={barcode}
            size={size}
            imageUrl={imageUrl}
          />

          {/* Score cards (Nutri, Nova, Eco) */}
          <div className={styles['off-score-grid']}>
            <ScoreCard
              title="Nutri-Score"
              imgSrc={nutriImg}
              altText={`Nutri-Score ${nutriScore.grade}`}
              description={nutriScore.description}
            />
            <ScoreCard
              title="NOVA Score"
              imgSrc={novaImg}
              altText={`NOVA Score ${novaScore.score}`}
              description={novaScore.description}
            />
            <ScoreCard
              title="Eco-Score"
              imgSrc={ecoImg}
              altText={`Eco-Score ${ecoScore.grade}`}
              description={ecoScore.description}
            />
          </div>

          {/* Nutrient Breakdown */}
          <div className={styles['off-nutrients-section']}>
            <NutrientItem label="Fat" level={nutrients.fat.level} Icon={Droplet} />
            <NutrientItem
              label="Saturated Fat"
              level={nutrients.saturatedFat.level}
              Icon={Droplets}
            />
            <NutrientItem label="Sugar" level={nutrients.sugar.level} Icon={Cookie} />
            <NutrientItem label="Salt" level={nutrients.salt.level} Icon={Waves} />
          </div>

          {/* Footer view link */}
          <a
            className={styles['off-footer-button']}
            href={`https://world.openfoodfacts.org/product/${barcode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Open Food Facts
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

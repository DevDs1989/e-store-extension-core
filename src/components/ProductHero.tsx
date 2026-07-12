import { Barcode, Weight } from 'lucide-preact';

import styles from './styles.module.css';

interface ProductHeroProps {
  brand: string;
  name: string;
  barcode: string;
  size: string;
  imageUrl: string;
}

export default function ProductHero({ brand, name, barcode, size, imageUrl }: ProductHeroProps) {
  return (
    <div className={styles['off-product-hero']}>
      <div className={styles['off-product-img-wrapper']}>
        <img
          src={imageUrl}
          alt={name}
          className={styles['off-product-img']}
          onError={(e) => {
            // Fallback standard milk jug SVG if image fails to load
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="1.5"><path d="M8 2h8v3H8zM6 7h12v2H6zM5 11v11h14V11H5zm6 4v4H9v-4h2zm4 0v4h-2v-4h2z"/></svg>';
          }}
        />
      </div>
      <div className={styles['off-product-details']}>
        <span className={styles['off-brand-tag']}>{brand}</span>
        <h2 className={styles['off-product-name']}>{name}</h2>
        <div className={styles['off-pills-row']}>
          <span className={styles['off-pill']}>
            <Barcode size={13} strokeWidth={2} />
            {barcode}
          </span>
          <span className={styles['off-pill']}>
            <Weight size={13} strokeWidth={2} />
            {size}
          </span>
        </div>
      </div>
    </div>
  );
}

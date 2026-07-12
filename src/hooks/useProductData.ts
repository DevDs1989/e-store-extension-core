import { useEffect, useState } from 'preact/hooks';
import { browser } from 'wxt/browser';

import { type ProductDetails } from '@/src/components/types';
import { type StoreProduct, type ProductResponse } from '@/src/types/Product';
import { mapToProductDetails } from '@/src/utils/productMapper';

export function useProductData(storeProduct: StoreProduct) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState<ProductDetails | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    browser.runtime
      .sendMessage<{ type: 'GET_PRODUCT_DATA'; payload: StoreProduct }, ProductResponse | null>({
        type: 'GET_PRODUCT_DATA',
        payload: storeProduct,
      })
      .then((res) => {
        if (cancelled) return;
        if (!res?.product) {
          setError(true);
          return;
        }
        setDetails(mapToProductDetails(storeProduct, res.product));
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [storeProduct]);

  return { loading, error, details };
}

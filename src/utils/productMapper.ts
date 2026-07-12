import { type ProductDetails } from '@/src/components/types';
import { type StoreProduct, type Product, type NutrientLevel } from '@/src/types/Product';

const mapNutrientLevel = (level?: NutrientLevel): 'low' | 'moderate' | 'high' => {
  if (level === 'low') return 'low';
  if (level === 'moderate') return 'moderate';
  if (level === 'high') return 'high';
  return 'low'; // fallback
};

export const mapToProductDetails = (
  storeProduct: StoreProduct,
  apiProduct: Product
): ProductDetails => {
  return {
    barcode: apiProduct.code ?? storeProduct.code ?? 'unknown',
    brand: apiProduct.brand ?? storeProduct.brand ?? 'Unknown',
    name: apiProduct.name ?? storeProduct.name ?? 'Unknown',
    size: String(apiProduct.quantity ?? storeProduct.quantity ?? 'Unknown'),
    imageUrl: apiProduct.imageUrl ?? '',
    searchConfidence: { label: 'Mapped match', percentage: 100 },
    preferenceMatch: { label: 'Mapped match', percentage: 100 },
    nutriScore: {
      grade: (apiProduct.nutriscoreGrade?.toUpperCase() ?? 'UNKNOWN') as
        | 'A'
        | 'B'
        | 'C'
        | 'D'
        | 'E'
        | 'UNKNOWN',
      description: 'Nutri-Score',
    },
    novaScore: {
      score: (typeof apiProduct.novaGroup === 'number' ? apiProduct.novaGroup : 0) as
        | 1
        | 2
        | 3
        | 4
        | 0,
      description: 'NOVA Score',
    },
    ecoScore: {
      grade: (apiProduct.ecoscoreGrade?.toUpperCase() ?? 'UNKNOWN') as
        | 'A'
        | 'B'
        | 'C'
        | 'D'
        | 'E'
        | 'UNKNOWN',
      description: 'Eco-Score',
    },
    nutrients: {
      fat: { level: mapNutrientLevel(apiProduct.nutrientLevels?.fat), value: 'unknown' },
      saturatedFat: {
        level: mapNutrientLevel(apiProduct.nutrientLevels?.saturatedFat),
        value: 'unknown',
      },
      sugar: { level: mapNutrientLevel(apiProduct.nutrientLevels?.sugars), value: 'unknown' },
      salt: { level: mapNutrientLevel(apiProduct.nutrientLevels?.salt), value: 'unknown' },
    },
  };
};

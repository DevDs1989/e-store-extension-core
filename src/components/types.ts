export interface NutrientInfo {
  level: 'low' | 'moderate' | 'high';
  value: string;
}

export interface ProductDetails {
  barcode: string;
  brand: string;
  name: string;
  size: string;
  imageUrl: string;
  searchConfidence: {
    label: string;
    percentage: number;
  };
  preferenceMatch: {
    label: string;
    percentage: number;
  };
  nutriScore: {
    grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'UNKNOWN';
    description: string;
  };
  novaScore: {
    score: 1 | 2 | 3 | 4 | 0;
    description: string;
  };
  ecoScore: {
    grade: 'A' | 'B' | 'C' | 'D' | 'E' | 'UNKNOWN';
    description: string;
  };
  nutrients: {
    fat: NutrientInfo;
    saturatedFat: NutrientInfo;
    sugar: NutrientInfo;
    salt: NutrientInfo;
  };
}

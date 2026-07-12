import { type JSX, render } from 'preact';
import { browser } from 'wxt/browser';

import type { StoreProduct, ProductResponse, Product } from '@/src/types/Product';

import CompactBanner from '@/src/components/CompactBanner';
import { ResponseStatus } from '@/src/types/Product';


/* ── Mock sendMessage for development ─────────────────────── */
// @ts-expect-error Mocking sendMessage for development
browser.runtime.sendMessage = async (message: unknown) => {
  const msg = message as { type: string; payload: StoreProduct };
  if (msg?.type === 'GET_PRODUCT_DATA') {
    const payload = msg.payload;
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const product: Product = {
      code: payload.code ?? 'unknown',
      name: payload.name ?? 'Mock Product',
      brand: payload.brand ?? 'Mock Brand',
      quantity: payload.quantity ?? '100g',
      quantityUnit: 'g',
      imageUrl: 'https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.652.400.jpg',
      nutriscoreGrade: 'e',
      novaGroup: 4,
      ecoscoreGrade: 'd',
      nutrientLevels: { fat: 'high', saturatedFat: 'high', sugars: 'high', salt: 'low' }
    };
    
    if (payload.code === '5449000000996') {
      product.nutriscoreGrade = 'e';
      product.ecoscoreGrade = 'c';
    } else if (payload.code === '7622210449283') {
      product.nutriscoreGrade = 'd';
      product.ecoscoreGrade = 'b';
    } else if (payload.code === '8076809513388') {
      product.nutriscoreGrade = 'a';
      product.novaGroup = 1;
      product.ecoscoreGrade = 'b';
    }

    const response: ProductResponse = { status: ResponseStatus.SUCCESS, message: 'Success', product };
    return response;
  }
  return null;
};

/* ── Mock product data ────────────────────────────────────── */
const mockProduct: StoreProduct = {
  code: '3017620422003',
  brand: 'Ferrero',
  name: 'Nutella',
  quantity: '400 g',
  category: null,
  searchQuery: null
};

const mockProduct2: StoreProduct = {
  code: '5449000000996',
  brand: 'The Coca-Cola Company',
  name: 'Coca-Cola',
  quantity: '330 ml',
  category: null,
  searchQuery: null
};

const mockProduct3: StoreProduct = {
  code: '7622210449283',
  brand: 'Milka',
  name: 'Alpine Milk Chocolate',
  quantity: '100 g',
  category: null,
  searchQuery: null
};

const mockProduct4: StoreProduct = {
  code: '8076809513388',
  brand: 'Barilla',
  name: 'Whole Wheat Penne Rigate',
  quantity: '500 g',
  category: null,
  searchQuery: null
};

/* ── Styles for the test page layout ─────────────────────── */
const pageStyle: Record<string, string> = {
  margin: '0',
  padding: '0',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 50%, #f8fafc 100%)',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const containerStyle: Record<string, string> = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '48px 24px',
};

const headerStyle: Record<string, string> = {
  textAlign: 'center',
  marginBottom: '48px',
};

const h1Style: Record<string, string> = {
  fontSize: '32px',
  fontWeight: '800',
  color: '#0f172a',
  margin: '0 0 8px 0',
  letterSpacing: '-0.5px',
};

const subtitleStyle: Record<string, string> = {
  fontSize: '15px',
  color: '#64748b',
  margin: '0',
  fontWeight: '500',
};

const badgeStyle: Record<string, string> = {
  display: 'inline-block',
  background: '#fef3c7',
  color: '#92400e',
  fontSize: '11px',
  fontWeight: '700',
  padding: '4px 10px',
  borderRadius: '9999px',
  marginTop: '12px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
};

const gridStyle: Record<string, string> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
  gap: '32px',
  justifyItems: 'center',
};

const cardWrapperStyle: Record<string, string> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
};

const labelStyle: Record<string, string> = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#94a3b8',
  letterSpacing: '1px',
  textTransform: 'uppercase',
};

const hintStyle: Record<string, string> = {
  textAlign: 'center',
  marginTop: '48px',
  fontSize: '13px',
  color: '#94a3b8',
  fontWeight: '500',
};

/* ── App ─────────────────────────────────────────────────── */
const TestPage = (): JSX.Element => {
  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={h1Style}>🧪 NutriLens Component Test</h1>
          <p style={subtitleStyle}>
            Click any compact banner below to open the full product detail modal.
          </p>
          <span style={badgeStyle}>Development Only</span>
        </div>

        <div style={gridStyle}>
          <div style={cardWrapperStyle}>
            <span style={labelStyle}>Nutella</span>
            <CompactBanner {...mockProduct} />
          </div>

          <div style={cardWrapperStyle}>
            <span style={labelStyle}>Coca-Cola</span>
            <CompactBanner {...mockProduct2} />
          </div>

          <div style={cardWrapperStyle}>
            <span style={labelStyle}>Milka Chocolate</span>
            <CompactBanner {...mockProduct3} />
          </div>

          <div style={cardWrapperStyle}>
            <span style={labelStyle}>Barilla Penne</span>
            <CompactBanner {...mockProduct4} />
          </div>
        </div>

        <p style={hintStyle}>
          💡 Click a card to open the <strong>ProductDetailModal</strong>. Click the
          backdrop or ✕ to close.
        </p>
      </div>
    </div>
  );
};

render(<TestPage />, document.getElementById('root')!);

interface BusinessPricing {
  [key: string]: { service: number; gov: number; total: number };
}

export const BUSINESS_PRICING: BusinessPricing = {
  LLC: { service: 100, gov: 250, total: 350 },
  Corporation: { service: 149, gov: 300, total: 449 },
  DBA: { service: 99, gov: 25, total: 124 },
  Nonprofit: { service: 149, gov: 300, total: 449 },
};

export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID';

export const PAYPAL_CURRENCY = 'USD';

export const PAYPAL_STYLE = {
  layout: 'vertical',
  color: 'blue',
  shape: 'rect',
  label: 'pay',
}; 
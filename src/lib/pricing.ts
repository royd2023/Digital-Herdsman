type PricingInput = {
  pricingMode: 'per_weight' | 'fixed'
  pricePerUnit: number
  weight: number | null
}

export function calculatePrice({ pricingMode, pricePerUnit, weight }: PricingInput): number {
  if (pricingMode === 'fixed') return pricePerUnit
  if (weight === null) throw new Error('Weight required for per_weight pricing')
  return Math.round(pricePerUnit * weight * 100) / 100
}

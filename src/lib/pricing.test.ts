import { calculatePrice } from './pricing'

describe('calculatePrice', () => {
  it('calculates per-weight price correctly', () => {
    expect(calculatePrice({ pricingMode: 'per_weight', pricePerUnit: 15.99, weight: 1.5 }))
      .toBe(23.99)
  })

  it('rounds to 2 decimal places', () => {
    expect(calculatePrice({ pricingMode: 'per_weight', pricePerUnit: 10, weight: 0.333 }))
      .toBe(3.33)
  })

  it('returns fixed price when pricing mode is fixed', () => {
    expect(calculatePrice({ pricingMode: 'fixed', pricePerUnit: 6.50, weight: null }))
      .toBe(6.50)
  })

  it('throws if per_weight is missing weight', () => {
    expect(() => calculatePrice({ pricingMode: 'per_weight', pricePerUnit: 10, weight: null }))
      .toThrow('Weight required for per_weight pricing')
  })
})

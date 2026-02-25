export type LabelData = {
  farmName: string
  productName: string
  weight: number | null
  unit: string
  price: number
  qrDataUrl: string
  itemId: string
}

export function formatLabelPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

export function formatLabelWeight(weight: number | null, unit: string): string | null {
  if (weight === null) return null
  return `${weight.toFixed(3)} ${unit}`
}

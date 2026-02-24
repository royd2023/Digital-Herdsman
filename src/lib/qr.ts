import QRCode from 'qrcode'

export async function generateQRDataUrl(itemId: string, baseUrl: string): Promise<string> {
  const url = `${baseUrl}/item/${itemId}`
  return QRCode.toDataURL(url, { width: 300, margin: 2 })
}

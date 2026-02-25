import { prisma } from '@/lib/db'
import { generateQRDataUrl } from '@/lib/qr'
import { notFound } from 'next/navigation'
import MarkSoldButton from './MarkSoldButton'

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = await prisma.inventoryItem.findUnique({
    where: { id },
    include: { productType: true, farm: true },
  })
  if (!item) notFound()

  const qrUrl = await generateQRDataUrl(item.id, process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')

  return (
    <main className="px-4 pt-6">
      <h1 className="text-xl font-bold text-stone-800 mb-1">{item.productType.name}</h1>
      <p className="text-stone-500 text-sm mb-6">{item.farm.name}</p>

      <div className="bg-white rounded-2xl p-6 shadow-sm text-center mb-4">
        <img src={qrUrl} alt="QR code" className="mx-auto w-40 h-40 mb-4" />
        <p className="text-2xl font-bold text-stone-800">${Number(item.price).toFixed(2)}</p>
        {item.weight && <p className="text-sm text-stone-500">{Number(item.weight).toFixed(3)} lbs</p>}
        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full font-medium ${
          item.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
        }`}>
          {item.status}
        </span>
      </div>

      {item.status === 'available' && <MarkSoldButton itemId={item.id} />}
    </main>
  )
}

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
    <main className="px-4 pt-8">
      <div className="mb-6">
        <p className="text-xs text-[#8a8470] uppercase tracking-widest mb-1">{item.farm.name}</p>
        <h1 className="font-serif text-3xl text-[#f0ead8] leading-tight">{item.productType.name}</h1>
        <div className="mt-2 h-px w-10 bg-[#c9a84c]" />
      </div>

      <div className="bg-[#1c1c17] border border-[#2e2e26] rounded-2xl p-6 text-center mb-3">
        <div className="inline-block p-3 bg-white rounded-xl mb-4">
          <img src={qrUrl} alt="QR code" className="w-36 h-36" />
        </div>
        <p className="font-serif text-4xl text-[#f0ead8]">${Number(item.price).toFixed(2)}</p>
        {item.weight && (
          <p className="text-sm text-[#8a8470] mt-1">{Number(item.weight).toFixed(3)} lbs</p>
        )}
        <span className={`inline-block mt-3 text-[10px] px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${
          item.status === 'available'
            ? 'bg-[#1e3a2a] text-[#7dbf94]'
            : 'bg-[#252520] text-[#8a8470]'
        }`}>
          {item.status}
        </span>
      </div>

      {item.status === 'available' && <MarkSoldButton itemId={item.id} />}
    </main>
  )
}

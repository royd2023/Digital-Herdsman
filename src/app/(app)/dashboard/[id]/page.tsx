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
    <main className="pb-6">
      {/* Header */}
      <div className="px-6 pt-10 pb-6 border-b border-[#1e1e1a]">
        <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-2">{item.farm.name}</p>
        <h1
          className="font-serif italic text-[#ede7d3] leading-[0.9] tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 11vw, 3.5rem)' }}
        >
          {item.productType.name}
        </h1>
        <span className="rule-amber mt-4 w-10" />
      </div>

      {/* Price — the hero */}
      <div className="px-6 pt-10 pb-8 border-b border-[#1e1e1a] text-center">
        <p className="text-[10px] tracking-[0.3em] text-[#7a7464] uppercase mb-3">Price</p>
        <p
          className="font-serif text-[#c9a84c] leading-none tracking-tight"
          style={{ fontSize: 'clamp(4.5rem, 22vw, 7rem)' }}
        >
          ${Number(item.price).toFixed(2)}
        </p>
        {item.weight && (
          <p className="text-[#7a7464] text-sm mt-3 tracking-wide">
            {Number(item.weight).toFixed(3)} lbs
          </p>
        )}
        <div className="mt-4">
          <span className={`inline-block text-[9px] px-3 py-1 font-bold uppercase tracking-[0.2em] ${
            item.status === 'available'
              ? 'text-[#6db88a] bg-[#182e20]'
              : 'text-[#4a4840] bg-[#1e1e1a]'
          }`}>
            {item.status}
          </span>
        </div>
      </div>

      {/* QR label — the artifact */}
      <div className="px-6 pt-8 pb-4">
        <p className="text-[10px] tracking-[0.3em] text-[#4a4840] uppercase mb-5 text-center">
          Scan label
        </p>
        <div className="flex justify-center">
          {/* White label card — QR must have white bg to scan */}
          <div className="bg-white p-5 relative">
            <img src={qrUrl} alt="QR code" className="w-40 h-40 block" />
            {/* Amber corner accent */}
            <div className="absolute top-0 left-0 w-3 h-3 bg-[#c9a84c]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#c9a84c]" />
          </div>
        </div>
      </div>

      {/* Actions */}
      {item.status === 'available' && (
        <div className="px-6 pt-6">
          <MarkSoldButton itemId={item.id} />
        </div>
      )}
    </main>
  )
}

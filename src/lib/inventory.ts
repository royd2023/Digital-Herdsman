import { prisma } from './db'
import { ItemStatus } from '../generated/prisma'

export async function getInventoryByFarm(farmId: string) {
  return prisma.inventoryItem.findMany({
    where: { farmId },
    include: { productType: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function updateItemStatus(itemId: string, status: ItemStatus) {
  return prisma.inventoryItem.update({
    where: { id: itemId },
    data: { status },
  })
}

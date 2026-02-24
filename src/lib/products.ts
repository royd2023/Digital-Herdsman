import { prisma } from './db'
import { Category, PricingMode } from '../generated/prisma'

export async function getProductsByFarm(farmId: string) {
  return prisma.productType.findMany({
    where: { farmId, archived: false },
    orderBy: { name: 'asc' },
  })
}

export async function createProduct(data: {
  farmId: string
  name: string
  category: Category
  pricingMode: PricingMode
  price: number
  unit: string
}) {
  return prisma.productType.create({ data })
}

export async function archiveProduct(id: string) {
  return prisma.productType.update({ where: { id }, data: { archived: true } })
}

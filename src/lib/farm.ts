import { prisma } from './db'

export async function getFarmByOwner(ownerId: string) {
  return prisma.farm.findFirst({ where: { ownerId } })
}

export async function createFarm(ownerId: string, name: string) {
  return prisma.farm.create({ data: { ownerId, name } })
}

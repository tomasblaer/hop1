import { Prisma, PrismaClient, sale, item, user, company, item_type } from "@prisma/client";

const prisma = new PrismaClient();

// Todo passa upp a öryggi a sumu af þessu,
// users eiga td ekki að geta eytt vörum hja öðrum

/* Companies */

export async function getCompany(id: number): Promise<company | null> {
  const company = await prisma.company.findUnique({
    where: { id: id }
  });
  return company ?? null;
}

export async function insertCompany(data: Prisma.companyCreateInput): Promise<company | null> {
  const company = await prisma.company.create({ data });
  return company ?? null;
}

export async function updateCompany(id: number, data: Prisma.companyUpdateInput): Promise<company | null> {
  const company = await prisma.company.update({
    where: { id: id },
    data
  });
  return company ?? null;
}

export async function deleteCompanyById(id: number): Promise<company | null> {
  const company = await prisma.company.delete({
    where: { id: id }
  });
  return company ?? null;
}

/* Sales */

export async function getSales(companyId: number): Promise<sale[] | null> {
  const sales = await prisma.sale.findMany({
    where: { companyId: companyId }
  });
  return sales ?? null;
}

export async function getSale(id: string): Promise<sale | null> {
  const sale = await prisma.sale.findUnique({
    where: { id: id }
  });
  return sale ?? null;
}

export async function createSale(companyId: number, items: number[]): Promise<sale | null> {
  const sale = prisma.sale.create({
    data: {
      companyId,
      items: {
        connect: items.map(item => ({ id: item }))
      }
    },
    include: {
      items: true,
    }
  });
  return sale ?? null;
}

export async function updateSale(id: string, data: Prisma.saleUpdateInput): Promise<sale | null> {
  const sale = await prisma.sale.update({
    where: { id: id },
    data
  });
  return sale ?? null;
}

export async function deleteSale(id: string): Promise<sale | null> {
  const sale = await prisma.sale.delete({
    where: { id: id }
  });
  return sale ?? null;
}

/* Item Types */

export async function getItemType(id: string): Promise<item_type | null> {
  const itemType = await prisma.item_type.findUnique({
    where: { id: id }
  });
  return itemType ?? null;
}

export async function getItemTypes(companyId: number): Promise<item_type[] | null> {
  const itemTypes = await prisma.item_type.findMany({
    where: { companyId: companyId }
  });
  return itemTypes ?? null;
}

export async function insertItemType(data: Prisma.item_typeUncheckedCreateInput): Promise<item_type | null> {
  const itemType = await prisma.item_type.create({ data });
  return itemType ?? null;
}

export async function updateItemType(id: string, data: Prisma.item_typeUncheckedUpdateInput): Promise<item_type | null> {
  const itemType = await prisma.item_type.update({
    where: { id: id },
    data
  });
  return itemType ?? null;
}

export async function deleteItemType(id: string): Promise<item_type | null> {
  const itemType = await prisma.item_type.delete({
    where: { id: id }
  });
  return itemType ?? null;
}

export async function setItemTypeImage(id: string, imageId: string): Promise<item_type | null> {
  const itemType = await prisma.item_type.update({
    where: { id: id },
    data: { imageId: imageId }
  });
  return itemType ?? null;
}

/* Items */

export async function getItem(id: number): Promise<item | null> {
  const item = await prisma.item.findUnique({
    where: { id: id }
  });
  return item ?? null;
}

export async function getItemsInType(itemTypeId: string): Promise<item[] | null> {
  const items = await prisma.item.findMany({
    where: { itemTypeId: itemTypeId }
  });
  return items ?? null;
}

export async function getItemsInSale(saleId: string): Promise<item[] | null> {
  const items = await prisma.item.findMany({
    relationLoadStrategy: 'join',
    where: { saleId: saleId },
    include: { itemType: true }
  });
  return items ?? null;
}

export async function getItemsInCompany(companyId: number): Promise<item[] | null> {
  const items = await prisma.item.findMany({
    where: { companyId: companyId }
  });
  return items ?? null;
}

export async function insertItem(data: Prisma.itemUncheckedCreateInput): Promise<item | null> {
  const item = await prisma.item.create({ data });
  return item ?? null;
}

export async function updateItem(id: number, data: Prisma.itemUncheckedUpdateInput): Promise<item | null> {
  const item = await prisma.item.update({
    where: { id: id },
    data
  });
  return item ?? null;
}

export async function deleteItem(id: number): Promise<item | null> {
  const item = await prisma.item.delete({
    where: { id: id }
  });
  return item ?? null;
}

/* Users */

export async function getUser(username: string): Promise<user | null> {
  const user = await prisma.user.findUnique({
    where: { username: username }
  });
  return user ?? null;
}

export async function getCompanyIdOfUser(id: number): Promise<number | null> {
  const user = await prisma.user.findUnique({
    where: { id: id }
  });
  const companyId: number | null = user?.companyId ?? null;
  return companyId;
}

export async function insertUser(data: Prisma.userUncheckedCreateInput): Promise<user | null> {
  const user = await prisma.user.create({ data });
  return user ?? null;
}

export async function updateUser(id: number, data: Prisma.userUpdateInput): Promise<user | null> {
  const user = await prisma.user.update({
    where: { id: id },
    data
  });
  return user ?? null;
}

export async function deleteUser(id: number): Promise<user | null> {
  const user = await prisma.user.delete({
    where: { id: id }
  });
  return user ?? null;
}

export async function setUserImage(id: number, imageId: string): Promise<user | null> {
  const user = await prisma.user.update({
    where: { id: id },
    data: { imageId: imageId }
  });
  return user ?? null;
}

import { Prisma, PrismaClient, Company, Sale, Item, User } from "@prisma/client";

const prisma = new PrismaClient();

// Todo passa upp a öryggi a sumu af þessu,
// users eiga td ekki að geta eytt vörum hja öðrum

/* Companies */

export async function getCompany(id: number): Promise<Company | null> {
  const company = await prisma.company.findUnique({
    where: { id: id }
  });
  return company ?? null;
}

export async function createCompany(data: Prisma.CompanyCreateInput): Promise<Company | null> {
  const company = await prisma.company.create({ data });
  return company ?? null;
};

export async function updateCompany(id: number, data: Prisma.CompanyUpdateInput): Promise<Company | null> {
  const company = await prisma.company.update({
    where: { id: id },
    data
  });
  return company ?? null;
};

export async function deleteCompany(id: number): Promise<Company | null> {
  const company = await prisma.company.delete({
    where: { id: id }
  });
  return company ?? null;
};

/* Sales */

export async function getSales(companyId: number): Promise<Sale[] | null> {
  const sales = await prisma.sale.findMany({
    where: { companyId: companyId }
  });
  return sales ?? null;
}

export async function createSale(data: Prisma.SaleCreateInput): Promise<Sale | null> {
  const sale = prisma.sale.create({ data });
  return sale ?? null;
};

export async function updateSale(id: string, data: Prisma.SaleUpdateInput): Promise<Sale | null> {
  const sale = await prisma.sale.update({
    where: { id: id },
    data
  });
  return sale ?? null;
};

export async function deleteSale(id: string): Promise<Sale | null> {
  const sale = await prisma.sale.delete({
    where: { id: id }
  });
  return sale ?? null;
};

/* Items */

export async function getItemsInSale(saleId: string): Promise<Item[] | null> {
  const items = await prisma.item.findMany({
    where: { saleId: saleId }
  });
  return items ?? null;
}

export async function getItemsInCompany(companyId: number): Promise<Item[] | null> {
  const items = await prisma.item.findMany({
    where: { companyId: companyId }
  });
  return items ?? null;
}

export async function createItem(data: Prisma.ItemCreateInput): Promise<Item | null> {
  const item = await prisma.item.create({ data });
  return item ?? null;
};

export async function updateItem(id: string, data: Prisma.ItemUpdateInput): Promise<Item | null> {
  const item = await prisma.item.update({
    where: { id: id },
    data
  });
  return item ?? null;
};

export async function deleteItem(id: string): Promise<Item | null> {
  const item = await prisma.item.delete({
    where: { id: id }
  });
  return item ?? null;
};

/* Users */

export async function getUser(id: number): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id: id }
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

export async function createUser(data: Prisma.UserCreateInput): Promise<User | null> {
  const user = await prisma.user.create({ data });
  return user ?? null;
};

export async function updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User | null> {
  const user = await prisma.user.update({
    where: { id: id },
    data
  });
  return user ?? null;
};

export async function deleteUser(id: number): Promise<User | null> {
  const user = await prisma.user.delete({
    where: { id: id }
  });
  return user ?? null;
};

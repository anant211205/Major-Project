"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Helper: Convert Prisma Decimal → number
const serializeData = (obj: any) => ({
  ...obj,
  balance: obj.balance ? Number(obj.balance) : 0,
  amount: obj.amount ? Number(obj.amount) : 0,
});

/**
 * Create a new user account
 */
export async function createAccount(data: any) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    const balance = parseFloat(data.balance);
    if (isNaN(balance)) throw new Error("Invalid balance");

    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault = existingAccounts.length === 0 || data.isDefault;

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        name: data.name,
        type: data.type,
        balance,
        isDefault: shouldBeDefault,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeData(account) };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Get user accounts
 */
export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const accounts = await db.account.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  return accounts.map(serializeData);
}

/**
 * Dashboard transactions only
 */
export async function getDashboardData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const transactions = await db.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: "desc" },
    take: 10,
  });

  return {
    transactions: transactions.map(serializeData),
  };
}

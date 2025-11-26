"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Decimal } from "@prisma/client/runtime/library";

type SerializedNumbers<T> = {
  [K in keyof T]: T[K] extends Decimal ? number : T[K];
};

function serializeDecimal<T extends Record<string, any>>(obj: T): T {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key] instanceof Decimal) {
      newObj[key] = (newObj[key] as Decimal).toNumber();
    }
  }
  return newObj;
}

// =============================
// 📌 Get account with transactions
// =============================
export async function getAccountWithTransactions(accountId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: { orderBy: { date: "desc" } },
      _count: { select: { transactions: true } },
    },
  });

  if (!account) return null;

  return {
    ...serializeDecimal(account),
    transactions: account.transactions.map((t) => serializeDecimal(t)),
  };
}

// =============================
// 📌 Bulk Delete Transactions
// =============================
export async function bulkDeleteTransactions(
  transactionIds: string[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    const balanceChanges: Record<string, number> = transactions.reduce(
      (acc, t) => {
        const change =
          t.type === "EXPENSE" ? t.amount.toNumber() : -t.amount.toNumber();
        acc[t.accountId] = (acc[t.accountId] || 0) + change;
        return acc;
      },
      {} as Record<string, number>
    );

    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany({
        where: { id: { in: transactionIds }, userId: user.id },
      });

      for (const [accountId, change] of Object.entries(balanceChanges)) {
        await tx.account.update({
          where: { id: accountId },
          data: { balance: { decrement: change } },
        });
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account/[id]");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// =============================
// 📌 Update Default Account
// =============================
export async function updateDefaultAccount(
  accountId: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    if (!user) throw new Error("User not found");

    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    const updatedAccount = await db.account.update({
      where: { id: accountId, userId: user.id },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");

    return { success: true, data: serializeDecimal(updatedAccount) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

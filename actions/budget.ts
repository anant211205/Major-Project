"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Decimal } from "@prisma/client/runtime/library";

// Convert Decimal values to number safely
const serializeDecimal = <T extends Record<string, any>>(obj: T): T => {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key] instanceof Decimal) {
      newObj[key] = (newObj[key] as Decimal).toNumber();
    }
  }
  return newObj;
};

export interface BudgetResponse {
  budget: {
    id: string;
    userId: string;
    accountId?: string | null;
    amount: number;
    createdAt?: Date;
    updatedAt?: Date;
  } | null;
  currentExpenses: number;
}

export async function getCurrentBudget(accountId: string): Promise<BudgetResponse> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const budget = await db.budget.findFirst({
      where: {
        userId: user.id,
      },
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const expenses = await db.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
        accountId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      budget: budget ? serializeDecimal(budget) : null,
      currentExpenses: expenses._sum.amount
        ? (expenses._sum.amount as Decimal).toNumber()
        : 0,
    };
  } catch (error: any) {
    console.error("Error fetching budget:", error);
    throw new Error(error.message);
  }
}

export async function updateBudget(amount: number): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const updatedBudget = await db.budget.upsert({
      where: { userId: user.id },
      update: { amount },
      create: { userId: user.id, amount },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: serializeDecimal(updatedBudget),
    };
  } catch (error: any) {
    console.error("Error updating budget:", error);
    return { success: false, error: error.message };
  }
}

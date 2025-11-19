"use server";

import { db } from "@/lib/prisma";
import { subDays } from "date-fns";

// ---- Types ---- //

type CategoryType = "INCOME" | "EXPENSE";

interface CategoryRange {
    name: string;
    range: [number, number];
}

interface TransactionSeed {
    id: string;
    type: CategoryType;
    amount: number;
    description: string;
    date: Date;
    category: string;
    status: "COMPLETED";
    userId: string;
    accountId: string;
    createdAt: Date;
    updatedAt: Date;
}

// ---- Constants ---- //

const ACCOUNT_ID: string = "account-id";
const USER_ID: string = "user-id";

const CATEGORIES: Record<CategoryType, CategoryRange[]> = {
    INCOME: [
        { name: "salary", range: [5000, 8000] },
        { name: "freelance", range: [1000, 3000] },
        { name: "investments", range: [500, 2000] },
        { name: "other-income", range: [100, 1000] },
    ],
    EXPENSE: [
        { name: "housing", range: [1000, 2000] },
        { name: "transportation", range: [100, 500] },
        { name: "groceries", range: [200, 600] },
        { name: "utilities", range: [100, 300] },
        { name: "entertainment", range: [50, 200] },
        { name: "food", range: [50, 150] },
        { name: "shopping", range: [100, 500] },
        { name: "healthcare", range: [100, 1000] },
        { name: "education", range: [200, 1000] },
        { name: "travel", range: [500, 2000] },
    ],
};

// ---- Helpers ---- //

function getRandomAmount(min: number, max: number): number {
    return Number((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomCategory(type: CategoryType): {
    category: string;
    amount: number;
} {
    const list = CATEGORIES[type];
    const category = list[Math.floor(Math.random() * list.length)];
    return {
        category: category.name,
        amount: getRandomAmount(category.range[0], category.range[1]),
    };
}

// ---- Main Seeder ---- //

export async function seedTransactions(): Promise<{
    success: boolean;
    message?: string;
    error?: string;
}> {
    try {
        const transactions: TransactionSeed[] = [];
        let totalBalance = 0;

        for (let i = 90; i >= 0; i--) {
            const date = subDays(new Date(), i);

            const count = Math.floor(Math.random() * 3) + 1;

            for (let j = 0; j < count; j++) {
                const type: CategoryType =
                    Math.random() < 0.4 ? "INCOME" : "EXPENSE";

                const { category, amount } = getRandomCategory(type);

                const t: TransactionSeed = {
                    id: crypto.randomUUID(),
                    type,
                    amount,
                    description: `${type === "INCOME" ? "Received" : "Paid for"} ${category}`,
                    date,
                    category,
                    status: "COMPLETED",
                    userId: USER_ID,
                    accountId: ACCOUNT_ID,
                    createdAt: date,
                    updatedAt: date,
                };

                totalBalance += type === "INCOME" ? amount : -amount;

                transactions.push(t);
            }
        }

        await db.$transaction(async (tx) => {
            await tx.transaction.deleteMany({
                where: { accountId: ACCOUNT_ID },
            });

            await tx.transaction.createMany({
                data: transactions,
            });

            await tx.account.update({
                where: { id: ACCOUNT_ID },
                data: { balance: totalBalance },
            });
        });

        return {
            success: true,
            message: `Created ${transactions.length} transactions`,
        };
    } catch (error: any) {
        console.error("Error seeding transactions:", error);
        return { success: false, error: error.message };
    }
}

import { z } from "zod";

// ----------------- Account Schema -----------------
export const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["CURRENT", "SAVINGS"], {
    required_error: "Account type is required",
  }),
  balance: z
    .string()
    .min(1, "Initial balance is required")
    .refine((val) => !isNaN(Number(val)), "Balance must be a number"),
  isDefault: z.boolean().default(false),
});

// Generate Type for Account Form
export type AccountFormValues = z.infer<typeof accountSchema>;

// ----------------- Transaction Schema -----------------
export const transactionSchema = z
  .object({
    type: z.enum(["INCOME", "EXPENSE"], {
      required_error: "Transaction type is required",
    }),
    amount: z
      .string()
      .min(1, "Amount is required")
      .refine((val) => !isNaN(Number(val)), "Amount must be a number"),
    description: z.string().optional(),
    date: z.union([z.date(), z.string()]).transform((val) => new Date(val)), // Supports input string date
    accountId: z.string().min(1, "Account is required"),
    category: z.string().min(1, "Category is required"),
    isRecurring: z.boolean().default(false),
    recurringInterval: z
      .enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isRecurring && !data.recurringInterval) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recurring interval is required for recurring transactions",
        path: ["recurringInterval"],
      });
    }
  });

// Generate Type for Transaction Form
export type TransactionFormValues = z.infer<typeof transactionSchema>;

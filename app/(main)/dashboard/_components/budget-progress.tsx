"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

interface BudgetProps {
  initialBudget?: {
    amount: number;
  } | null;
  currentExpenses: number;
}

export function BudgetProgress({ initialBudget, currentExpenses }: BudgetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() ?? ""
  );

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = initialBudget
    ? Math.min((currentExpenses / initialBudget.amount) * 100, 100)
    : 0;

  const handleUpdateBudget = async () => {
    const amount = Number(newBudget);

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() ?? "");
    setIsEditing(false);
  };

  useEffect(() => {
    if (updatedBudget?.success) {
      toast.success("Budget updated successfully");
      setIsEditing(false);
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message ?? "Failed to update budget");
    }
  }, [error]);

  const progressColor =
    percentUsed >= 90
      ? "bg-red-500"
      : percentUsed >= 75
        ? "bg-yellow-500"
        : "bg-green-500";

  return (
    <Card>
      <CardHeader className="flex justify-between pb-2">
        <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>

        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="h-6 w-6"
          >
            <Pencil className="h-3 w-3" />
          </Button>
        )}
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="w-32"
              disabled={isLoading}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUpdateBudget}
              disabled={isLoading}
            >
              <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ) : (
          <CardDescription>
            {initialBudget ? (
              `₹${currentExpenses.toFixed(2)} of ₹${initialBudget.amount.toFixed(2)} spent`
            ) : (
              "No budget set"
            )}
          </CardDescription>
        )}

        {initialBudget && (
          <div className="space-y-2 mt-4">
            <Progress
              value={percentUsed}
              className={`h-2 ${progressColor}`}
            />
            <p className="text-xs text-muted-foreground text-right">
              {percentUsed.toFixed(1)}% used
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import * as React from "react";
import {
  Select as RadixSelect,
  SelectTrigger as RadixSelectTrigger,
  SelectContent as RadixSelectContent,
  SelectItem as RadixSelectItem,
  SelectValue as RadixSelectValue,
} from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export const Select = RadixSelect;

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof RadixSelectTrigger>
>(({ className, ...props }, ref) => (
  <RadixSelectTrigger
    ref={ref}
    className={cn(
      "h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm",
      className
    )}
    {...props}
  />
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = RadixSelectContent;
export const SelectItem = RadixSelectItem;
export const SelectValue = RadixSelectValue;

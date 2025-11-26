"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 data-[state=checked]:bg-blue-600",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className="block h-5 w-5 rounded-full bg-white shadow transform transition-transform data-[state=checked]:translate-x-5 translate-x-1"
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = "Switch";

export { Switch };

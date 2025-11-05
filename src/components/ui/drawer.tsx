"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-40",
        "bg-black/40 dark:bg-black/60",
        "backdrop-blur-sm",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:duration-300 data-[state=open]:duration-300",
        className,
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "group/drawer-content fixed z-50 flex h-auto flex-col",
          // Glass-morphism background with gradient accent - ensuring visibility
          "bg-background/98 dark:bg-background/98",
          "backdrop-blur-xl backdrop-saturate-150",
          "border-t border-border/50",
          // Subtle gradient border at top for accent
          "before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:z-10",
          "before:bg-gradient-to-r before:from-transparent",
          "before:via-[var(--sl-blue)]/50 before:to-[var(--sl-purple)]/50",
          "before:dark:via-[var(--sl-blue)]/70 before:dark:to-[var(--sl-purple)]/70",
          // Shadow with gradient tint - Apple-style soft shadow
          "shadow-[0_-8px_32px_rgba(0,0,0,0.12)]",
          "dark:shadow-[0_-8px_32px_rgba(0,0,0,0.4)]",
          // Smooth animations - Apple-style easing
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:duration-300 data-[state=open]:duration-300",
          // Top drawer styles
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0",
          "data-[vaul-drawer-direction=top]:mb-24",
          "data-[vaul-drawer-direction=top]:max-h-[85vh]",
          "data-[vaul-drawer-direction=top]:rounded-b-2xl data-[vaul-drawer-direction=top]:rounded-t-none",
          "data-[vaul-drawer-direction=top]:border-b",
          // Bottom drawer styles (most common)
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0",
          "data-[vaul-drawer-direction=bottom]:mt-24",
          "data-[vaul-drawer-direction=bottom]:max-h-[85vh]",
          "data-[vaul-drawer-direction=bottom]:rounded-t-3xl data-[vaul-drawer-direction=bottom]:rounded-b-none",
          "data-[vaul-drawer-direction=bottom]:border-t",
          // Right drawer styles
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0",
          "data-[vaul-drawer-direction=right]:w-3/4",
          "data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=right]:rounded-l-2xl data-[vaul-drawer-direction=right]:rounded-r-none",
          "data-[vaul-drawer-direction=right]:border-l",
          // Left drawer styles
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0",
          "data-[vaul-drawer-direction=left]:w-3/4",
          "data-[vaul-drawer-direction=left]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:rounded-r-2xl data-[vaul-drawer-direction=left]:rounded-l-none",
          "data-[vaul-drawer-direction=left]:border-r",
          className,
        )}
        {...props}
      >
        {/* Apple-style gradient handle indicator for bottom drawer */}
        <div className="relative mx-auto mt-4 mb-1 hidden h-1 w-10 shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--sl-blue)]/40 via-[var(--sl-purple)]/60 to-[var(--sl-blue)]/40" />
          <div className="absolute inset-0 bg-muted/50 dark:bg-muted/40" />
        </div>
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-1 px-6 pt-6 pb-4",
        "group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center",
        "group-data-[vaul-drawer-direction=top]/drawer-content:text-center",
        "md:gap-2 md:text-left",
        className,
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col gap-2.5 px-6 pb-6 pt-4",
        "border-t border-border/50",
        "bg-gradient-to-t from-background/95 to-transparent",
        className,
      )}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "text-foreground font-semibold text-xl tracking-tight",
        "leading-tight",
        className,
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        "text-muted-foreground text-sm leading-relaxed",
        "text-foreground/60",
        className,
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

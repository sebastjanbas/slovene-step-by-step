"use client";

import {
  motion,
  AnimatePresence,
  MotionConfig,
  HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";

interface AccordionVariants {
  expanded?: Record<string, any>;
  collapsed?: Record<string, any>;
}

interface AccordionContextType {
  expandedValue: string | null;
  toggleItem: (value: string) => void;
  variants?: AccordionVariants;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an AccordionProvider");
  }
  return context;
}

interface AccordionProviderProps {
  children: ReactNode;
  variants?: AccordionVariants;
  expandedValue?: string | null;
  onValueChange?: (value: string | null) => void;
}

function AccordionProvider({
  children,
  variants,
  expandedValue: externalExpandedValue,
  onValueChange,
}: AccordionProviderProps) {
  const [internalExpandedValue, setInternalExpandedValue] = useState<
    string | null
  >(null);

  const expandedValue =
    externalExpandedValue !== undefined
      ? externalExpandedValue
      : internalExpandedValue;

  const toggleItem = (value: string) => {
    const newValue = expandedValue === value ? null : value;
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalExpandedValue(newValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ expandedValue, toggleItem, variants }}>
      {children}
    </AccordionContext.Provider>
  );
}

interface AccordionProps {
  children: ReactNode;
  className?: string;
  transition?: Record<string, any>;
  variants?: AccordionVariants;
  expandedValue?: string | null;
  onValueChange?: (value: string | null) => void;
}

function Accordion({
  children,
  className,
  transition,
  variants,
  expandedValue,
  onValueChange,
}: AccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={cn("relative", className)} aria-orientation="vertical">
        <AccordionProvider
          variants={variants}
          expandedValue={expandedValue}
          onValueChange={onValueChange}
        >
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  );
}

interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

function AccordionItem({ value, children, className }: AccordionItemProps) {
  const { expandedValue } = useAccordion();
  const isExpanded = value === expandedValue;

  return (
    <div
      className={cn("overflow-hidden", className)}
      {...(isExpanded ? { "data-expanded": "" } : { "data-closed": "" })}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElement);
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  value?: string;
}

function AccordionTrigger({
  children,
  className,
  value,
  ...props
}: AccordionTriggerProps) {
  const { toggleItem, expandedValue } = useAccordion();
  const isExpanded = value === expandedValue;

  return (
    <button
      onClick={() => toggleItem(value)}
      aria-expanded={isExpanded}
      type="button"
      className={cn("group", className)}
      {...(isExpanded ? { "data-expanded": "" } : { "data-closed": "" })}
      {...props}
    >
      {children}
    </button>
  );
}

interface AccordionContentProps extends HTMLMotionProps<"div"> {
  value?: string;
}

function AccordionContent({
  children,
  value,
  ...props
}: AccordionContentProps) {
  const { expandedValue, variants } = useAccordion();
  const isExpanded = value === expandedValue;

  const BASE_VARIANTS = {
    expanded: { height: "auto", opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
  };

  const combinedVariants = {
    expanded: { ...BASE_VARIANTS.expanded, ...variants?.expanded },
    collapsed: { ...BASE_VARIANTS.collapsed, ...variants?.collapsed },
  };

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={combinedVariants}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

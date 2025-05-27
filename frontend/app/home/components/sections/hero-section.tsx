"use client"

import { isValidElement } from "react";

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ComposedButtonProps extends React.ComponentProps<typeof Button> {}

export function ComposedButton({ children, ...props }: ComposedButtonProps) {
  // If the children is a valid react element and its type is a function (i.e. a component),
  // set the asChild prop to true.

  if (isValidElement(children) && typeof children.type === "function") {
    return (
      <Button asChild {...props}>
        {children}
      </Button>
    );
  }
  
  return (
    <Button {...props}>
      {children}
    </Button>
  );
}

interface HeroSectionProps {
  title: string;
  description: string;
  primaryAction?: React.ReactNode;   // Ini adalah tempatnya
  secondaryAction?: React.ReactNode; // Ini adalah tempatnya
  badge?: string;
  gradient?: string;
}

/**
 * Reusable hero section component
 * Used across different tab sections with customizable content and styling
 */
export function HeroSection({ title, description, primaryAction, secondaryAction, badge, gradient }: HeroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`overflow-hidden rounded-3xl ${gradient} p-8 text-white`}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-4">
          {badge && <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">{badge}</Badge>}
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="max-w-[600px] text-white/80">{description}</p>
          <div className="flex flex-wrap gap-3">
            <ComposedButton className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90">{primaryAction}</ComposedButton>
            {secondaryAction && (
              <ComposedButton
                className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90"
              >
                {secondaryAction}
              </ComposedButton>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="relative h-40 w-40"
          >
            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
            <div className="absolute inset-4 rounded-full bg-white/20" />
            <div className="absolute inset-8 rounded-full bg-white/30" />
            <div className="absolute inset-12 rounded-full bg-white/40" />
            <div className="absolute inset-16 rounded-full bg-white/50" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

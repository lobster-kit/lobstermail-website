"use client";

import { useRef, useEffect, useState, type ReactNode, type CSSProperties } from "react";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: FadeDirection;
  distance?: number;
  threshold?: number;
  once?: boolean;
  style?: CSSProperties;
}

const directionMap: Record<FadeDirection, (distance: number) => string> = {
  up: (d) => `translateY(${d}px)`,
  down: (d) => `translateY(${-d}px)`,
  left: (d) => `translateX(${d}px)`,
  right: (d) => `translateX(${-d}px)`,
  none: () => "none",
};

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  direction = "up",
  distance = 14,
  threshold = 0.1,
  once = true,
  style,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const initialTransform = directionMap[direction](distance);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0)" : initialTransform,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

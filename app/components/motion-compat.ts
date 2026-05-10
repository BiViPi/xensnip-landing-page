import type { ComponentType } from "react";
import { motion } from "framer-motion";

type UnsafeMotionComponent = ComponentType<{
  [key: string]: unknown;
}>;

export const MotionA = motion.a as unknown as UnsafeMotionComponent;
export const MotionArticle = motion.article as unknown as UnsafeMotionComponent;
export const MotionDiv = motion.div as unknown as UnsafeMotionComponent;
export const MotionH1 = motion.h1 as unknown as UnsafeMotionComponent;
export const MotionH2 = motion.h2 as unknown as UnsafeMotionComponent;
export const MotionLi = motion.li as unknown as UnsafeMotionComponent;
export const MotionNav = motion.nav as unknown as UnsafeMotionComponent;
export const MotionSection = motion.section as unknown as UnsafeMotionComponent;
export const MotionSpan = motion.span as unknown as UnsafeMotionComponent;

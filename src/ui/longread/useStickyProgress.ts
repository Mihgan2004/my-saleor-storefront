"use client";
import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

export function useStickyProgress<T extends HTMLElement = HTMLDivElement>(): {
	ref: React.RefObject<T>;
	progress: MotionValue<number>;
} {
	const ref = useRef<T>(null!);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	// clamp в [0..1]
	const progress = useTransform(scrollYProgress, (v) => (v < 0 ? 0 : v > 1 ? 1 : v));
	return { ref, progress };
}

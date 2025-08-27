// src/ui/longread/StickyChapterMobile.tsx
// Assuming this is a placeholder for sticky header/chapter title on mobile. Based on context, creating a simple version.
"use client";

import { motion, useTransform } from "framer-motion";
import { useStickyProgress } from "./useStickyProgress";

export function StickyChapterMobile({ title }: { title: string }) {
	const { progress } = useStickyProgress<HTMLDivElement>();

	const opacity = useTransform(progress, [0, 0.2], [0, 1]);

	return (
		<motion.div
			className="fixed left-1/2 top-[max(env(safe-area-inset-top),8px)] z-50 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm text-white"
			style={{ opacity }}
		>
			{title}
		</motion.div>
	);
}

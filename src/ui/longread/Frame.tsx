/// FILE: src/ui/longread/Frame.tsx
"use client";

import { forwardRef } from "react";
import { motion, type MotionValue } from "framer-motion";
import clsx from "clsx";

interface FrameProps {
	className?: string;
	children?: React.ReactNode;
	overlayClassName?: string;
	progress?: MotionValue<number>;
}

/**
 * Unified frame with clean edges and subtle border.
 * Always relative + overflow-hidden so that mosaics/slides and hotspots
 * are clipped by the same edges as the frame.
 */
export const Frame = forwardRef<HTMLDivElement, FrameProps>(function Frame(
	{ className, children, overlayClassName, progress },
	ref,
) {
	return (
		<div
			ref={ref}
			className={clsx(
				"relative h-full overflow-hidden rounded-2xl bg-black/15",
				"transform-gpu", // antialiasing on transforms
				className,
			)}
		>
			{/* Border */}
			<div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-white/10" />

			{/* Top gradient for readability */}
			<div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-black/40 to-transparent" />

			{/* Content */}
			<div className="relative h-full">{children}</div>

			{/* Bottom gradient for readability */}
			<div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-black/50 to-transparent" />

			{/* Optional overlay */}
			{overlayClassName && (
				<motion.div
					className={clsx("pointer-events-none absolute inset-0 z-30", overlayClassName)}
					style={progress ? { opacity: progress } : undefined}
				/>
			)}
		</div>
	);
});

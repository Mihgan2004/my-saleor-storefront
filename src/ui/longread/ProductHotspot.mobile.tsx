"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import clsx from "clsx";

type Side = "left" | "right" | "top" | "bottom";

export interface ProductHotspotMobileProps {
	x: number; // проценты (0..100)
	y: number; // проценты (0..100)
	label: string;
	href: string;
	side?: Side;
	progress?: MotionValue<number>; // 0..1
	appearAt?: number; // 0..1
}

export function ProductHotspotMobile({
	x,
	y,
	label,
	href,
	side = "right",
	progress,
	appearAt = 0,
}: ProductHotspotMobileProps) {
	const [open, setOpen] = useState(false);
	const fallback = useMotionValue(1);
	const src = progress ?? fallback;

	// появление по прогрессу
	const opacity = useTransform<number, number>(src, [appearAt, Math.min(1, appearAt + 0.12)], [0, 1]);

	const tooltipDirCls =
		side === "left" ? "right-12" : side === "top" ? "bottom-12" : side === "bottom" ? "top-12" : "left-12";

	return (
		<motion.div
			className="absolute z-30"
			style={{ left: `${x}%`, top: `${y}%`, translateX: "-50%", translateY: "-50%", opacity }}
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className={clsx(
					"relative grid h-10 w-10 place-items-center rounded-full bg-white/90 text-black shadow-lg ring-2 ring-black/40",
					"transition active:scale-95",
				)}
				aria-expanded={open}
				aria-label={label}
			>
				<svg width="14" height="14" viewBox="0 0 12 12" aria-hidden>
					<path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
				</svg>

				{/* большая hit-area */}
				<span className="absolute -inset-3 rounded-full" />
			</button>

			{/* тултип (тапом) */}
			<motion.div
				initial={false}
				animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
				className={clsx(
					"pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1.5",
					"text-xs font-medium text-black shadow-xl ring-1 ring-black/10 backdrop-blur-sm",
					tooltipDirCls,
				)}
			>
				<Link
					className="pointer-events-auto underline-offset-2 hover:underline"
					href={href}
					aria-label={`Перейти: ${label}`}
				>
					{label} →
				</Link>
			</motion.div>
		</motion.div>
	);
}

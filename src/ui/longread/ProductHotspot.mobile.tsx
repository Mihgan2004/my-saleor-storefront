// FILE: src/ui/longread/ProductHotspot.mobile.tsx
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

/** Минималистичный серебристый хотспот: компактный, но hit-area увеличена */
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

	// плавное появление по прогрессу
	const opacity = useTransform<number, number>(src, [appearAt, Math.min(1, appearAt + 0.12)], [0, 1]);

	const tooltipDirCls =
		side === "left"
			? "right-10"
			: side === "top"
				? "bottom-10 -translate-y-1/2"
				: side === "bottom"
					? "top-10 translate-y-1/2"
					: "left-10";

	return (
		<motion.div
			className="absolute z-30"
			style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", opacity }}
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className={clsx(
					// компактный корпус 26px, нейтральный серебристый
					"relative grid h-6 w-6 place-items-center rounded-full bg-white/90 text-black",
					"shadow-md ring-1 ring-black/20 transition focus:outline-none active:scale-95",
					"focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
				)}
				aria-expanded={open}
				aria-label={label}
			>
				{/* тонкий плюс 10x10, stroke 1.5 */}
				<svg width="10" height="10" viewBox="0 0 12 12" aria-hidden>
					<path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
				</svg>

				{/* расширенная зона тапа (не видна) */}
				<span className="absolute -inset-3 rounded-full" />
				{/* лёгкий внутренний отблеск */}
				<span
					className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/70"
					aria-hidden
				/>
			</button>

			{/* тултип-пилюля */}
			<motion.div
				initial={false}
				animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
				className={clsx(
					"pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap",
					"rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-black shadow-xl",
					"ring-1 ring-black/10 backdrop-blur-sm",
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

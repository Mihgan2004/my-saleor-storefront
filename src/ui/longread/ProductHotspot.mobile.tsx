"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import clsx from "clsx";

type Side = "left" | "right" | "top" | "bottom";

export interface ProductHotspotMobileProps {
	x: number; // 0..100
	y: number; // 0..100
	label: string;
	href: string;
	side?: Side;
	progress?: MotionValue<number>;
	appearAt?: number;
	visible?: boolean; // управляем появлением слайда напрямую
}

export function ProductHotspotMobile({
	x,
	y,
	label,
	href,
	side = "right",
	progress,
	appearAt = 0,
	visible,
}: ProductHotspotMobileProps) {
	const [open, setOpen] = useState(false);

	// ❗ хуки вызываем всегда (без условий)
	const fallback = useMotionValue(1);
	const src: MotionValue<number> = progress ?? fallback;
	const motionOpacity = useTransform(src, [appearAt, Math.min(1, appearAt + 0.12)], [0, 1]);

	const isControlled = typeof visible === "boolean";

	const tooltipDirCls =
		side === "left" ? "right-10" : side === "top" ? "bottom-10" : side === "bottom" ? "top-10" : "left-10";

	return (
		<motion.div
			className="absolute z-30"
			style={{
				left: `${x}%`,
				top: `${y}%`,
				transform: "translate(-50%, -50%)",
				opacity: isControlled ? undefined : motionOpacity,
			}}
			initial={false}
			animate={isControlled ? { opacity: visible ? 1 : 0 } : undefined}
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className={clsx(
					"relative grid h-8 w-8 place-items-center rounded-full bg-white/85 text-black shadow-md ring-1 ring-black/30",
					"transition active:scale-95",
				)}
				aria-expanded={open}
				aria-label={label}
			>
				<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
					<path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
				</svg>
				<span className="absolute -inset-3 rounded-full" />
			</button>

			<motion.div
				initial={false}
				animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
				className={clsx(
					"pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1",
					"text-[11px] font-medium text-black shadow-lg ring-1 ring-black/10 backdrop-blur-sm",
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

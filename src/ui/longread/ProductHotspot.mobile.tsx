"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import clsx from "clsx";

type Side = "left" | "right" | "top" | "bottom";

export interface ProductHotspotMobileProps {
	x: number; // 0..100 (проценты)
	y: number; // 0..100 (проценты)
	label: string;
	href: string;
	side?: Side;
	progress?: MotionValue<number>; // 0..1
	appearAt?: number; // 0..1
}

/** Сверхлёгкий хотспот для мобилки: компактный плюс, увеличенная hit-area, аккуратная пилюля */
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

	// ВАЖНО: хук вызываем всегда, а потом выбираем источник
	const fallback = useMotionValue<number>(1);
	const src: MotionValue<number> = progress ?? fallback;

	// появление по прогрессу
	const opacity = useTransform<number, number>(src, [appearAt, Math.min(1, appearAt + 0.12)], [0, 1]);

	const tooltipPos =
		side === "left"
			? "right-9"
			: side === "top"
				? "bottom-9 -translate-y-1/2"
				: side === "bottom"
					? "top-9 translate-y-1/2"
					: "left-9";

	return (
		<motion.div
			className="absolute z-30"
			style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", opacity }}
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className={clsx(
					"relative grid h-[22px] w-[22px] place-items-center rounded-full bg-white/90 text-black",
					"shadow ring-1 ring-black/15 transition focus:outline-none active:scale-95",
					"focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
				)}
				aria-expanded={open}
				aria-label={label}
			>
				{/* микро-плюс */}
				<svg width="8" height="8" viewBox="0 0 12 12" aria-hidden>
					<path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
				</svg>

				{/* увеличенная невидимая зона тапа */}
				<span className="absolute -inset-3 rounded-full" />
			</button>

			{/* пузырёк-ссылка */}
			<motion.div
				initial={false}
				animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
				className={clsx(
					"pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap",
					"rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-black shadow-xl",
					"ring-1 ring-black/10 backdrop-blur-sm",
					tooltipPos,
				)}
			>
				<Link className="pointer-events-auto underline-offset-2 hover:underline" href={href}>
					{label} →
				</Link>
			</motion.div>
		</motion.div>
	);
}

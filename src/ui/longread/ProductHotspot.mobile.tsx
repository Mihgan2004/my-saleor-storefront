"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import clsx from "clsx";
import { track } from "./analytics";

interface ProductHotspotMobileProps {
	/** Позиция в процентах относительно контейнера */
	x: number;
	y: number;

	/** Подпись рядом с точкой */
	label: string;

	/** Ссылка */
	href: string;

	/** Сторона подписи */
	side?: "left" | "right";

	/** Необязательный прогресс появления и порог */
	progress?: MotionValue<number>;
	appearAt?: number;

	/** Аналитика */
	chapter?: string;
	variant?: string;
}

export function ProductHotspotMobile({
	x,
	y,
	label,
	href,
	side = "right",
	progress,
	appearAt = 0,
	chapter = "unknown",
	variant,
}: ProductHotspotMobileProps) {
	// Если прогресс не передали — показываем сразу
	const fallback = useMotionValue(1);
	const source = progress ?? fallback;

	const opacity = useTransform<number, number>(source, [appearAt, Math.min(1, appearAt + 0.1)], [0, 1]);

	const handleClick = () => track("shop_the_look_click_mobile", { chapter, variant, label, href });

	return (
		<motion.div
			className="absolute z-50"
			style={{
				left: `${x}%`,
				top: `${y}%`,
				transform: "translate(-50%, -50%)",
				opacity,
			}}
		>
			<Link
				href={href}
				onClick={handleClick}
				className={clsx(
					"relative flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
					side === "right" ? "flex-row" : "flex-row-reverse",
				)}
				aria-label={`Go to ${label}`}
			>
				{/* Серебристая точка (мобильная) */}
				<span className="relative grid h-6 w-6 place-items-center rounded-full bg-white/80 shadow-md ring-2 ring-black/30">
					<svg width="10" height="10" viewBox="0 0 12 12" className="text-black" aria-hidden>
						<path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
					</svg>
					<span className="absolute -inset-1 rounded-full bg-white/50 blur-sm" />
				</span>

				{/* Подпись рядом с точкой */}
				<span className="rounded-full bg-white/95 px-2 py-1 text-xs font-medium text-black shadow ring-1 ring-black/10">
					{label}
				</span>
			</Link>
		</motion.div>
	);
}

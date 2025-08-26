"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import clsx from "clsx";
import { track } from "./analytics";

interface ProductHotspotProps {
	/** Позиция в процентах относительно контейнера */
	x: number;
	y: number;

	/** Подпись в тултипе */
	label: string;

	/** Ссылка на продукт/раздел */
	href: string;

	/** Сторона, куда раскрывать тултип */
	side?: "left" | "right";

	/** Прогресс появления (0..1). Если не передан — показываем сразу */
	progress?: MotionValue<number>;

	/** С какого значения progress показывать хотспот */
	appearAt?: number;

	/** Метки аналитики */
	chapter?: string;
	variant?: string;
}

export function ProductHotspotDesktop({
	x,
	y,
	label,
	href,
	side = "right",
	progress,
	appearAt = 0,
	chapter = "unknown",
	variant,
}: ProductHotspotProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	/** Если progress не передали — рисуем сразу ( =1 ) */
	const fallback = useMotionValue(1);
	const source = progress ?? fallback;

	/** Плавное появление по прогрессу */
	const opacity = useTransform<number, number>(source, [appearAt, Math.min(1, appearAt + 0.1)], [0, 1]);

	const shouldReduceMotion =
		typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

	const showTooltip = isHovered || isFocused;
	const tooltipId = `hotspot-${x}-${y}-tooltip`;

	const handleClick = () => track("shop_the_look_click", { chapter, variant, label, href });

	return (
		<motion.div
			className="absolute z-50 will-change-transform"
			style={{
				left: `${x}%`,
				top: `${y}%`,
				transform: "translate(-50%, -50%)",
				opacity,
				pointerEvents: "auto",
			}}
		>
			<Link
				href={href}
				onClick={handleClick}
				className="group relative block select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
				aria-label={`Go to ${label}`}
				aria-describedby={tooltipId}
				aria-expanded={showTooltip}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			>
				{/* Серебристая точка */}
				<motion.span
					className="relative grid h-8 w-8 place-items-center rounded-full bg-white/80 shadow-lg ring-2 ring-black/40 transition-all duration-150"
					animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1], y: [0, -2, 0] }}
					transition={{
						duration: shouldReduceMotion ? 0 : 2.2,
						repeat: shouldReduceMotion ? 0 : Infinity,
						ease: "easeInOut",
					}}
					whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
					whileFocus={shouldReduceMotion ? {} : { scale: 1.1 }}
				>
					<svg width="12" height="12" viewBox="0 0 12 12" className="text-black" aria-hidden>
						<path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
					</svg>

					{/* белый glow */}
					<span className="pointer-events-none absolute -inset-1 rounded-full bg-white/60 opacity-50 blur-[10px] transition-opacity duration-200 group-hover:opacity-80 group-focus-visible:opacity-80" />
				</motion.span>

				{/* Соединительная «полочка» к тултипу */}
				<motion.span
					className={clsx(
						"pointer-events-none absolute top-1/2 h-px -translate-y-1/2 bg-black/50 transition-all duration-200",
						side === "right" ? "left-8" : "right-8",
					)}
					initial={{ width: 0, opacity: 0 }}
					animate={{ width: showTooltip ? 24 : 0, opacity: showTooltip ? 1 : 0 }}
					transition={{ duration: 0.18 }}
					aria-hidden
				/>

				{/* Тултип: светлый/серебристый */}
				<motion.span
					id={tooltipId}
					role="tooltip"
					className={clsx(
						"pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-black shadow-xl ring-1 ring-black/10 backdrop-blur-sm transition-all duration-200",
						side === "right" ? "left-8 ml-6" : "right-8 mr-6",
					)}
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{
						opacity: showTooltip ? 1 : 0,
						scale: showTooltip ? 1 : 0.9,
					}}
					transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
				>
					{label} →
				</motion.span>
			</Link>
		</motion.div>
	);
}

"use client";

import Link from "next/link";
import { motion, useTransform, useMotionValue, type MotionValue } from "framer-motion";

type Props = {
	x: number; // % по ширине вьюпорта/контейнера
	y: number; // % по высоте
	label: string;
	href: string;
	side?: "left" | "right";
	/** Прогресс секции (0..1). Если не передан — пин сразу видим. */
	progress?: MotionValue<number>;
	/** С какого прогресса проявлять пин (если progress есть) */
	appearAt?: number; // 0..1
};

export function ProductHotspotDesktop({
	x,
	y,
	label,
	href,
	side = "right",
	progress,
	appearAt = 0, // ← сразу видны
}: Props) {
	// всегда один и тот же порядок хуков
	const fallback = useMotionValue(1);
	const source = progress ?? fallback;

	// мягкое появление ~10% прогресса
	const opacity = useTransform(source, [appearAt, Math.min(1, appearAt + 0.1)], [0, 1]);

	return (
		<motion.div
			className="absolute z-50 will-change-transform"
			style={{
				left: `${x}%`,
				top: `${y}%`,
				transform: "translate(-50%,-50%)",
				opacity,
				pointerEvents: "auto",
			}}
		>
			<Link href={href} aria-label={label} className="group relative block select-none outline-none">
				<motion.span
					className="relative grid h-7 w-7 place-items-center rounded-full bg-black/70 shadow ring-2 ring-white/70"
					animate={{ scale: [1, 1.05, 1], y: [0, -2, 0] }}
					transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
				>
					<svg width="10" height="10" viewBox="0 0 10 10" className="text-white">
						<path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
					</svg>
					<span className="pointer-events-none absolute -inset-1 rounded-full bg-white/25 opacity-50 blur-[10px] transition-opacity group-hover:opacity-80" />
				</motion.span>

				{/* линия и подпись */}
				<span
					className={[
						"pointer-events-none absolute top-1/2 h-px w-6 -translate-y-1/2 bg-white/70 opacity-0 transition-opacity duration-150",
						side === "right" ? "left-7" : "right-7",
						"group-hover:opacity-100",
					].join(" ")}
				/>
				<span
					className={[
						"pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-black/85 px-2 py-1 text-[11px] text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-150",
						side === "right" ? "left-[calc(7px+24px)]" : "right-[calc(7px+24px)]",
						"group-hover:opacity-100",
					].join(" ")}
				>
					{label} →
				</span>
			</Link>
		</motion.div>
	);
}

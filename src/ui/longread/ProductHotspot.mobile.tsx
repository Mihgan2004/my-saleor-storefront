"use client";

import Link from "next/link";
import { motion, type MotionValue } from "framer-motion";

export type ProductHotspotMobileProps = {
	x: number; // %
	y: number; // %
	label: string;
	href: string;
	progress?: MotionValue<number>; // 0..1
};

export function ProductHotspotMobile({ x, y, label, href, progress }: ProductHotspotMobileProps) {
	return (
		<motion.div
			className="absolute select-none"
			style={{
				left: `${x}%`,
				top: `${y}%`,
				translateX: "-50%",
				translateY: "-50%",
				opacity: progress ?? 1,
				scale: progress ?? 1,
			}}
		>
			<Link href={href} className="group relative flex items-center gap-2" aria-label={label}>
				<motion.span
					className="relative grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-lg ring-2 ring-black/30"
					animate={{ scale: [1, 1.06, 1], y: [0, -1, 0] }}
					transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
				>
					<svg width="12" height="12" viewBox="0 0 12 12" className="text-black" aria-hidden>
						<path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
					</svg>
					<span className="pointer-events-none absolute -inset-1 rounded-full bg-white/70 blur-[10px]" />
				</motion.span>
				<span className="rounded-full bg-white/85 px-3 py-1 text-[13px] font-semibold text-black shadow-lg ring-1 ring-black/10">
					{label}
				</span>
			</Link>
		</motion.div>
	);
}

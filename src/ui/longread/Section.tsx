/// FILE: src/ui/longread/Section.tsx
"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useInView, useTransform, useMotionValue, type MotionValue } from "framer-motion";
import { ProductHotspotDesktop } from "./ProductHotspot.desktop";
import { track } from "./analytics";

interface Hotspot {
	x: number;
	y: number;
	label: string;
	href: string;
	side?: "left" | "right";
}

interface SectionProps {
	id: string;
	image: string;
	imageAlt: string;
	title: string;
	subtitle?: string;
	hotspots?: Hotspot[];
	height?: string;
	progress?: MotionValue<number>;
}

export function Section({
	id,
	image,
	imageAlt,
	title,
	subtitle,
	hotspots = [],
	height = "420vh",
	progress,
}: SectionProps) {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { amount: 0.35, once: false });
	const viewTracked = useRef(false);

	const shouldReduceMotion =
		typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

	// Локальный прогресс на случай, если снаружи не передали
	const local = useMotionValue(0);
	const source = progress ?? local;

	const bgY = useTransform<number, string>(source, [0, 1], ["-3%", "3%"]);

	useEffect(() => {
		if (inView && !viewTracked.current) {
			track("chapter_view", { id, timestamp: Date.now() });
			viewTracked.current = true;
		}
	}, [inView, id]);

	return (
		<section
			id={id}
			ref={ref}
			className="relative isolate w-full overflow-hidden bg-black text-white"
			style={{ height, contain: "layout paint style" }}
		>
			<div className="sticky top-0 h-screen overflow-hidden">
				<motion.div
					className="absolute inset-0 will-change-transform"
					style={{ y: shouldReduceMotion ? 0 : bgY }}
				>
					<Image
						src={image}
						alt={imageAlt}
						fill
						priority={id === "hero"}
						sizes="100vw"
						className="object-cover"
					/>
				</motion.div>

				<div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/60 to-transparent" />
				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-52 bg-gradient-to-t from-black/70 to-transparent" />

				<div className="absolute inset-0 z-20">
					{hotspots.map((h, i) => (
						<ProductHotspotDesktop key={`${id}-hotspot-${i}`} {...h} progress={source} chapter={id} />
					))}

					<div className="absolute inset-x-0 bottom-0">
						<div className="mx-auto max-w-7xl px-6 pb-20">
							<motion.h2
								className="mb-2 text-5xl font-black leading-tight"
								initial={{ opacity: 0, y: 14 }}
								animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 10 }}
								transition={{ type: "spring", stiffness: 120, damping: 15 }}
							>
								{title}
							</motion.h2>
							{subtitle ? (
								<motion.p
									className="max-w-xl text-white/85"
									initial={{ opacity: 0, y: 8 }}
									animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 6 }}
									transition={{ delay: 0.06, duration: 0.18 }}
								>
									{subtitle}
								</motion.p>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

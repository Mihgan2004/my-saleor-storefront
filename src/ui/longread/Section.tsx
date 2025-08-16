"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProductHotspotDesktop } from "./ProductHotspot.desktop";

type Hotspot = { x: number; y: number; label: string; href: string; side?: "left" | "right" };

type Props = {
	id: string;
	image: string;
	imageAlt: string;
	title: string;
	subtitle?: string;
	hotspots?: Hotspot[];
};

/**
 * Секция на всю высоту экрана.
 * Хот-споты позиционируются в процентах относительно этой секции.
 */
export function Section({ id, image, imageAlt, title, subtitle, hotspots = [] }: Props) {
	const ref = useRef<HTMLElement>(null);
	const inView = useInView(ref, { amount: 0.35, once: false });

	return (
		<section
			id={id}
			ref={ref}
			className="relative isolate min-h-[100svh] w-full overflow-hidden bg-black text-white"
		>
			{/* фон */}
			<Image
				src={image}
				alt={imageAlt}
				fill
				priority={id === "hero"}
				sizes="100vw"
				className="object-cover"
			/>

			{/* мягкие градиенты для читабельности */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/70 to-transparent" />

			{/* сетка содержания */}
			<div className="absolute inset-0">
				{/* Хот-споты */}
				{hotspots.map((h, i) => (
					<ProductHotspotDesktop key={i} {...h} />
				))}

				{/* Текст — стабильно у нижнего левого края сетки */}
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
								transition={{ delay: 0.06 }}
							>
								{subtitle}
							</motion.p>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
}

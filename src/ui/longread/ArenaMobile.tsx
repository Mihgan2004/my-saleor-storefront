// src/ui/longread/ArenaMobile.tsx
"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";
import { FuseRail } from "./FuseRail";

type Slide = {
	src: string;
	alt: string;
	lead: string;
	bullets: string[];
	hotspots: Array<{ x: number; y: number; label: string; href: string; side?: "left" | "right" }>;
};

const slides: Slide[] = [
	/* как у тебя сейчас */
];

function Beat({ s, i, seg, progress }: { s: Slide; i: number; seg: number; progress: MotionValue<number> }) {
	const start = i * seg;
	const mid = start + seg / 2;
	const end = (i + 1) * seg;

	const imgOpacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
	const imgScale = useTransform(progress, [start, mid, end], [1.02, 1, 1.02]);
	const textOp = useTransform(progress, [start + seg * 0.15, mid], [0, 1]);
	const textY = useTransform(progress, [start + seg * 0.15, mid], [8, 0]);

	return (
		<div className="relative">
			<Frame className="gpu relative aspect-[4/5] w-full">
				<motion.figure className="absolute inset-0" style={{ opacity: imgOpacity, scale: imgScale }}>
					<Image
						src={s.src}
						alt={s.alt}
						fill
						sizes="100vw"
						className="object-cover object-center"
						priority={i === 0}
					/>
				</motion.figure>

				{/* хотспоты появляются вместе с кадром */}
				{s.hotspots.map((h, idx) => (
					<ProductHotspotMobile
						key={idx}
						x={h.x}
						y={h.y}
						label={h.label}
						href={h.href}
						side={h.side}
						progress={imgOpacity}
						appearAt={0.55}
					/>
				))}
			</Frame>

			{/* текстовый блок */}
			<motion.div className="mt-3" style={{ opacity: textOp, y: textY }}>
				<p className="text-white/85">{s.lead}</p>
				<ul className="mt-3 space-y-2 text-white/80">
					{s.bullets.map((b) => (
						<li key={b}>• {b}</li>
					))}
				</ul>
			</motion.div>
		</div>
	);
}

export function ArenaMobile() {
	const { ref, progress } = useChapterProgressMobile<HTMLElement>();
	const seg = 1 / slides.length;

	return (
		<section
			id="arena"
			ref={ref}
			className="snap-start bg-black text-white"
			style={{ contain: "layout paint style" }}
		>
			<div className="relative mx-auto max-w-7xl px-4 py-12">
				<h2 className="text-3xl font-black leading-tight">MOVEMENT = LIFE</h2>

				{/* Fuse rail слева — общий язык секций */}
				<FuseRail progress={progress} />

				<div className="mt-4 space-y-10">
					{slides.map((s, i) => (
						<Beat key={s.src} s={s} i={i} seg={seg} progress={progress} />
					))}
				</div>
			</div>
		</section>
	);
}

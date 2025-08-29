// FILE: src/ui/longread/UndergroundMobile.tsx
"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";

type Beat = {
	src: string;
	alt: string;
	title: string;
	copy: string;
	hotspots: Array<{ x: number; y: number; label: string; href: string; side?: "left" | "right" }>;
};

const beats: Beat[] = [
	{
		src: "/images/longread/underground-1.avif",
		alt: "Silhouette by neon portal",
		title: "NOT FOR EVERYONE",
		copy: "Noise of asphalt, silence of rules. We choose our own path.",
		hotspots: [{ x: 28, y: 36, label: "Reflective accents", href: "/products/reflect" }],
	},
	{
		src: "/images/longread/underground-2.avif",
		alt: "Neon clothing details",
		title: "NEON // TRACE",
		copy: "Contrast details, water protection, night visibility.",
		hotspots: [{ x: 66, y: 58, label: "Waterproof", href: "/products/waterproof" }],
	},
];

function UGImage({
	beat,
	i,
	seg,
	progress,
	priority,
}: {
	beat: Beat;
	i: number;
	seg: number;
	progress: MotionValue<number>;
	priority?: boolean;
}) {
	const start = i * seg,
		mid = start + seg / 2,
		end = (i + 1) * seg;
	const op = useTransform(progress, [start, mid, end], [0, 1, 0]);
	const sc = useTransform(progress, [start, mid, end], [1.02, 1, 1.02]);

	return (
		<>
			<motion.figure className="absolute inset-0" style={{ opacity: op, scale: sc }}>
				<Image
					src={beat.src}
					alt={beat.alt}
					fill
					sizes="100vw"
					className="object-cover object-center"
					priority={priority}
				/>
				{/* неоновый «скан» */}
				<motion.div
					className="pointer-events-none absolute inset-0"
					style={{ opacity: useTransform(op, [0, 1], [0, 0.35]) }}
				>
					<div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_10%_90%,rgba(43,183,169,0.10),transparent),linear-gradient(to_bottom,rgba(0,0,0,0.2),transparent_30%,transparent_70%,rgba(0,0,0,0.35))]" />
				</motion.div>
			</motion.figure>

			{beat.hotspots.map((h, idx) => (
				<ProductHotspotMobile
					key={idx}
					x={h.x}
					y={h.y}
					label={h.label}
					href={h.href}
					side={h.side}
					progress={op}
					appearAt={0.38}
				/>
			))}
		</>
	);
}

function UGCopy({
	beat,
	i,
	seg,
	progress,
}: {
	beat: Beat;
	i: number;
	seg: number;
	progress: MotionValue<number>;
}) {
	const start = i * seg,
		mid = start + seg / 2;
	const op = useTransform(progress, [start + seg * 0.12, mid], [0, 1]);
	const y = useTransform(progress, [start + seg * 0.12, mid], [8, 0]);
	const jitter = useTransform(progress, [start, mid], [0, 0.6]); // микро-glitch по X

	return (
		<motion.div className="absolute inset-0" style={{ opacity: op, y }}>
			<motion.h3 className="text-3xl font-black leading-tight" style={{ x: jitter }}>
				{beat.title}
			</motion.h3>
			<p className="mt-2 text-white/80">{beat.copy}</p>
		</motion.div>
	);
}

export function UndergroundMobile() {
	const { ref, progress } = useChapterProgressMobile<HTMLElement>();
	const seg = 1 / beats.length;

	return (
		<section
			id="underground"
			ref={ref}
			className="snap-start bg-black text-white"
			style={{ contain: "layout paint style" }}
		>
			<div className="relative mx-auto max-w-7xl px-4 py-12">
				<div className="relative min-h-[92px]">
					{beats.map((b, i) => (
						<UGCopy key={`c-${i}`} beat={b} i={i} seg={seg} progress={progress} />
					))}
				</div>

				<div className="mt-6">
					<Frame className="gpu relative aspect-[4/5] w-full">
						{beats.map((b, i) => (
							<UGImage key={`i-${i}`} beat={b} i={i} seg={seg} progress={progress} priority={i === 0} />
						))}
					</Frame>
				</div>
			</div>
		</section>
	);
}

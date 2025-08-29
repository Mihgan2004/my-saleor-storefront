// FILE: src/ui/longread/UndergroundMobile.tsx
"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";
import { FuseRail } from "./FuseRail";

type Beat = {
	src: string;
	alt: string;
	copyTitle: string;
	copyText: string;
	hotspots: Array<{ x: number; y: number; label: string; href: string; side?: "left" | "right" }>;
};

const beats: Beat[] = [
	{
		src: "/images/longread/underground-1.avif",
		alt: "Silhouette by neon portal",
		copyTitle: "NOT FOR EVERYONE",
		copyText: "Noise of asphalt, silence of rules. We choose our own path.",
		hotspots: [{ x: 28, y: 36, label: "Светоотражающие акценты", href: "/products/reflect" }],
	},
	{
		src: "/images/longread/underground-2.avif",
		alt: "Neon clothing details",
		copyTitle: "NEON // DETAILS",
		copyText: "Контрастные акценты, светоотражение, защита от дождя.",
		hotspots: [{ x: 66, y: 58, label: "Влагозащита", href: "/products/waterproof" }],
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
	const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
	const scale = useTransform(progress, [start, mid, end], [1.02, 1, 1.02]);

	return (
		<>
			<motion.figure className="absolute inset-0" style={{ opacity, scale }}>
				<Image
					src={beat.src}
					alt={beat.alt}
					fill
					sizes="100vw"
					className="object-cover object-center"
					priority={priority}
				/>
			</motion.figure>
			{beat.hotspots.map((h, idx) => (
				<ProductHotspotMobile
					key={`${beat.src}-hs-${idx}`}
					x={h.x}
					y={h.y}
					label={h.label}
					href={h.href}
					side={h.side}
					progress={opacity}
					appearAt={0.35}
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
	const start = i * seg;
	const mid = start + seg / 2;

	const opacity = useTransform(progress, [start + seg * 0.12, mid], [0, 1]);
	const y = useTransform(progress, [start + seg * 0.12, mid], [8, 0]);

	return (
		<motion.div className="absolute inset-0" style={{ opacity, y }}>
			<h3 className="text-3xl font-black leading-tight">{beat.copyTitle}</h3>
			<p className="mt-2 text-white/80">{beat.copyText}</p>
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
				<FuseRail progress={progress} />

				{/* копи-область с посменной подстановкой */}
				<div className="relative min-h-[86px]">
					{beats.map((b, i) => (
						<UGCopy key={`copy-${i}`} beat={b} i={i} seg={seg} progress={progress} />
					))}
				</div>

				<div className="mt-6">
					<Frame className="gpu relative aspect-[4/5] w-full">
						{beats.map((b, i) => (
							<UGImage key={`img-${i}`} beat={b} i={i} seg={seg} progress={progress} priority={i === 0} />
						))}
					</Frame>
				</div>
			</div>
		</section>
	);
}

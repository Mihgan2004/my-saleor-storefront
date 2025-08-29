// FILE: src/ui/longread/ArenaMobile.tsx
"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";

type Slide = {
	src: string;
	alt: string;
	lead: string;
	bullets: string[];
	hotspots: Array<{ x: number; y: number; label: string; href: string; side?: "left" | "right" }>;
};

const slides: Slide[] = [
	{
		src: "/images/longread/arena-1.avif",
		alt: "Run in city",
		lead: "Скорость — в основе ДНК коллекции.",
		bullets: ["эргономичный крой", "лёгкие ткани", "отвод влаги"],
		hotspots: [
			{ x: 72, y: 34, label: "Дышащие панели", href: "/products/breathable-panels" },
			{ x: 26, y: 66, label: "Усиленные зоны", href: "/products/reinforced", side: "left" },
		],
	},
	{
		src: "/images/longread/arena-2.avif",
		alt: "Training zone",
		lead: "Контроль движения в каждом стежке.",
		bullets: ["эластичные зоны", "усиления по точкам", "строгие линии"],
		hotspots: [
			{ x: 65, y: 40, label: "Световозврат", href: "/products/reflective-stitch" },
			{ x: 42, y: 75, label: "Эластичный пояс", href: "/products/elastic-waist", side: "left" },
		],
	},
	{
		src: "/images/longread/arena-3.avif",
		alt: "Speed burst",
		lead: "Создано для города и спорта.",
		bullets: ["незаметные карманы", "световозврат", "минимальная палитра"],
		hotspots: [
			{ x: 54, y: 28, label: "DWR-пропитка", href: "/products/dwr" },
			{ x: 78, y: 70, label: "Молния YKK", href: "/products/ykk-zip" },
		],
	},
];

function BeatFigure({
	s,
	i,
	seg,
	progress,
	priority,
}: {
	s: Slide;
	i: number;
	seg: number;
	progress: MotionValue<number>;
	priority?: boolean;
}) {
	const start = i * seg,
		mid = start + seg / 2,
		end = (i + 1) * seg;
	const op = useTransform(progress, [start, mid, end], [0, 1, 0]);
	const sc = useTransform(progress, [start, mid, end], [1.04, 1, 1.02]);
	const sk = useTransform(progress, [start, mid, end], ["-1.2deg", "0deg", "0.6deg"]);

	return (
		<motion.figure className="absolute inset-0" style={{ opacity: op, scale: sc, rotate: sk }}>
			<Image
				src={s.src}
				alt={s.alt}
				fill
				sizes="100vw"
				className="object-cover object-center"
				priority={priority}
			/>
			{s.hotspots.map((h, k) => (
				<ProductHotspotMobile
					key={k}
					x={h.x}
					y={h.y}
					label={h.label}
					href={h.href}
					side={h.side}
					progress={op}
					appearAt={0.55}
				/>
			))}
		</motion.figure>
	);
}

function BeatText({
	s,
	i,
	seg,
	progress,
}: {
	s: Slide;
	i: number;
	seg: number;
	progress: MotionValue<number>;
}) {
	const start = i * seg,
		mid = start + seg / 2;
	const op = useTransform(progress, [start + seg * 0.12, mid], [0, 1]);
	const y = useTransform(progress, [start + seg * 0.12, mid], [10, 0]);
	return (
		<motion.div className="absolute inset-0" style={{ opacity: op, y }}>
			<div className="inline-block">
				<h3 className="text-3xl font-black leading-tight">MOVEMENT = LIFE</h3>
				<div className="mt-1 h-[3px] w-[72px] bg-white/90" />
			</div>
			<p className="mt-3 text-white/85">{s.lead}</p>
			<ul className="mt-3 space-y-2 text-white/80">
				{s.bullets.map((b) => (
					<li key={b}>• {b}</li>
				))}
			</ul>
		</motion.div>
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
				<div className="relative aspect-[4/5]">
					<Frame className="gpu relative aspect-[4/5] w-full">
						{slides.map((s, i) => (
							<BeatFigure key={`f-${s.src}`} s={s} i={i} seg={seg} progress={progress} priority={i === 0} />
						))}
					</Frame>
				</div>

				<div className="relative mt-5 min-h-[170px]">
					{slides.map((s, i) => (
						<BeatText key={`t-${s.src}`} s={s} i={i} seg={seg} progress={progress} />
					))}
				</div>
			</div>
		</section>
	);
}

// FILE: src/ui/longread/ArenaMobile.tsx
"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";

type Hotspot = { x: number; y: number; label: string; href: string; side?: "left" | "right" };
type Slide = {
	src: string;
	alt: string;
	lead: string;
	bullets: string[];
	hotspots: Hotspot[];
};

const slides: Slide[] = [
	{
		src: "/images/longread/arena-1.avif",
		alt: "Динамика: бег в городе",
		lead: "Скорость — в основе ДНК коллекции.",
		bullets: [
			"эргономичный крой без лишних складок",
			"лёгкие износостойкие ткани",
			"продуваемость и отвод влаги",
		],
		hotspots: [
			{ x: 72, y: 34, label: "Дышащие панели", href: "/products/breathable-panels" },
			{ x: 26, y: 66, label: "Усиленные зоны", href: "/products/reinforced", side: "left" },
		],
	},
	{
		src: "/images/longread/arena-2.avif",
		alt: "Силуэт: тренировочная зона",
		lead: "Контроль движения в каждом стежке.",
		bullets: ["мягкие эластичные зоны", "усиления там, где нужно", "строгие линии без визуального шума"],
		hotspots: [
			{ x: 65, y: 40, label: "Световозврат", href: "/products/reflective-stitch" },
			{ x: 42, y: 75, label: "Эластичный пояс", href: "/products/elastic-waist", side: "left" },
		],
	},
	{
		src: "/images/longread/arena-3.avif",
		alt: "Контраст: взрыв скорости",
		lead: "Создано для города и спорта.",
		bullets: ["незаметные карманы", "световозврат для безопасности", "минимальная палитра для фокуса"],
		hotspots: [
			{ x: 54, y: 28, label: "DWR-пропитка", href: "/products/dwr" },
			{ x: 78, y: 70, label: "Молния YKK", href: "/products/ykk-zip" },
		],
	},
];

/** Изображение-слайд: хуки только здесь (не в .map) */
function SlideFigure({
	slide,
	progress,
	start,
	mid,
	end,
	priority,
}: {
	slide: Slide;
	progress: MotionValue<number>;
	start: number;
	mid: number;
	end: number;
	priority?: boolean;
}) {
	const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
	const scale = useTransform(progress, [start, mid, end], [1.02, 1, 1.02]);

	return (
		<motion.figure className="absolute inset-0" style={{ opacity, scale }}>
			<Image
				src={slide.src}
				alt={slide.alt}
				fill
				sizes="100vw"
				className="object-cover object-center"
				priority={priority}
			/>
			{slide.hotspots.map((h, i) => (
				<ProductHotspotMobile
					key={`${slide.src}-hs-${i}`}
					x={h.x}
					y={h.y}
					label={h.label}
					href={h.href}
					side={h.side}
					progress={opacity}
					appearAt={0.55}
				/>
			))}
		</motion.figure>
	);
}

/** Текст-слайд: хуки только здесь (не в .map) */
function SlideText({
	slide,
	progress,
	start,
	mid,
	end,
}: {
	slide: Slide;
	progress: MotionValue<number>;
	start: number;
	mid: number;
	end: number;
}) {
	const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
	const y = useTransform(progress, [start, mid, end], [8, 0, -8]);

	return (
		<motion.div className="absolute inset-0" style={{ opacity, y }}>
			<p className="text-white/85">{slide.lead}</p>
			<ul className="mt-4 space-y-2 text-white/80">
				{slide.bullets.map((b) => (
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
			<div className="mx-auto max-w-7xl px-4 py-12">
				<h2 className="text-3xl font-black leading-tight">MOVEMENT = LIFE</h2>

				<div className="relative mt-4">
					{/* Кадры */}
					<Frame className="relative aspect-[4/5] w-full">
						{slides.map((slide, i) => {
							const start = Math.max(0, i * seg - 0.06);
							const mid = i * seg + seg / 2;
							const end = Math.min(1, (i + 1) * seg + 0.06);
							return (
								<SlideFigure
									key={`fig-${slide.src}`}
									slide={slide}
									progress={progress}
									start={start}
									mid={mid}
									end={end}
									priority={i === 0}
								/>
							);
						})}
					</Frame>

					{/* Текстовые состояния */}
					<div className="relative mt-5 min-h-[150px]">
						{slides.map((slide, i) => {
							const start = Math.max(0, i * seg - 0.04);
							const mid = i * seg + seg / 2;
							const end = Math.min(1, (i + 1) * seg + 0.04);
							return (
								<SlideText
									key={`txt-${slide.src}`}
									slide={slide}
									progress={progress}
									start={start}
									mid={mid}
									end={end}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

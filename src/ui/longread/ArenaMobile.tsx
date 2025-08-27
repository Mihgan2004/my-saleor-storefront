// src/ui/longread/ArenaMobile.tsx
"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { Frame } from "./Frame";
import { useStickyProgress } from "./useStickyProgress";

interface Photo {
	src: string;
	alt: string;
	hotspots: Array<{ x: number; y: number; label: string; href: string; side?: "left" | "right" }>;
}
interface TextContent {
	lead: string;
	bullets: string[];
}

const photos: Photo[] = [
	{
		src: "/images/longread/arena-1.avif",
		alt: "Динамика: бег в городе",
		hotspots: [
			{ x: 72, y: 34, label: "Дышащие панели", href: "/products/breathable-panels" },
			{ x: 26, y: 62, label: "Усиленные колени", href: "/products/knee-reinforce", side: "left" },
		],
	},
	{
		src: "/images/longread/arena-2.avif",
		alt: "Силуэт: тренировочная зона",
		hotspots: [
			{ x: 65, y: 40, label: "Светоотражающие швы", href: "/products/reflective-stitch" },
			{ x: 42, y: 75, label: "Эластичный пояс", href: "/products/elastic-waist", side: "left" },
		],
	},
	{
		src: "/images/longread/arena-3.avif",
		alt: "Контраст: взрыв скорости",
		hotspots: [
			{ x: 54, y: 28, label: "Водоотталкивающая пропитка", href: "/products/dwr" },
			{ x: 78, y: 70, label: "Молния YKK", href: "/products/ykk-zip" },
		],
	},
];

const textContent: TextContent[] = [
	{
		lead: "Скорость — в основе ДНК коллекции.",
		bullets: [
			"эргономичный крой без лишних складок",
			"лёгкие износостойкие ткани",
			"продуваемость и отвод влаги",
		],
	},
	{
		lead: "Контроль движения в каждом стежке.",
		bullets: ["мягкие эластичные зоны", "усиления там, где нужно", "строгие линии без визуального шума"],
	},
	{
		lead: "Создано для города и спорта.",
		bullets: ["незаметные карманы", "световозврат для безопасности", "минимальная палитра для фокуса"],
	},
];

interface ArenaSlideProps {
	photo: Photo;
	index: number;
	seg: number;
	progress: MotionValue<number>;
}

function ArenaSlide({ photo, index, seg, progress }: ArenaSlideProps) {
	const start = Math.max(0, index * seg - 0.06);
	const mid = index * seg + seg / 2;
	const end = Math.min(1, (index + 1) * seg + 0.06);

	const imgOpacity = useTransform<number, number>(progress, [start, mid, end], [0, 1, 0]);
	const imgScale = useTransform<number, number>(progress, [start, mid, end], [1.02, 1, 1.02]);

	const shouldReduceMotion =
		typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

	return (
		<motion.div className="absolute inset-0" style={{ opacity: imgOpacity }}>
			<motion.div
				className="absolute inset-0 will-change-transform"
				style={{ scale: shouldReduceMotion ? 1 : imgScale }}
			>
				<Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-cover" priority />
			</motion.div>

			{photo.hotspots.map((h, i) => (
				<ProductHotspotMobile
					key={`${photo.src}-${i}`}
					x={h.x}
					y={h.y}
					label={h.label}
					href={h.href}
					side={h.side}
					progress={imgOpacity}
					appearAt={0.55}
					chapter="arena"
					variant={`frame-${index + 1}`}
				/>
			))}
		</motion.div>
	);
}

interface TextSlideProps {
	content: TextContent;
	index: number;
	seg: number;
	progress: MotionValue<number>;
}

function TextSlide({ content, index, seg, progress }: TextSlideProps) {
	const start = Math.max(0, index * seg - 0.04);
	const mid = index * seg + seg / 2;
	const end = Math.min(1, (index + 1) * seg + 0.04);

	const opacity = useTransform<number, number>(progress, [start, mid, end], [0, 1, 0]);
	const x = useTransform<number, string>(progress, [start, mid, end], ["-24px", "0px", "24px"]);

	const shouldReduceMotion =
		typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

	return (
		<motion.div className="absolute inset-0" style={{ opacity, x: shouldReduceMotion ? 0 : x }}>
			<p className="max-w-md text-white/85">{content.lead}</p>
			<ul className="mt-6 space-y-2 text-white/80">
				{content.bullets.map((bullet, i) => (
					<li key={i}>• {bullet}</li>
				))}
			</ul>
		</motion.div>
	);
}

export function ArenaMobile() {
	const { ref, progress } = useStickyProgress<HTMLDivElement>();
	const shouldReduceMotion =
		typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

	const titleX = useTransform<number, string>(progress, [0.08, 0.2], ["-16px", "0px"]);
	const titleOpacity = useTransform<number, number>(progress, [0.08, 0.2], [0, 1]);

	const segPhotos = photos.length > 0 ? 1 / photos.length : 1;
	const segText = textContent.length > 0 ? 1 / textContent.length : 1;

	return (
		<section
			id="arena"
			ref={ref}
			className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-[100vw] bg-black text-white"
			style={{ height: "420vh", contain: "layout paint style" }}
		>
			<div className="sticky top-0 h-[100svh] overflow-hidden">
				<div className="absolute inset-x-0 top-0 z-10 h-[18vh] bg-gradient-to-b from-black to-transparent" />

				<div className="relative z-20 mx-auto flex h-full items-center px-4">
					<div className="grid h-[80vh] w-full grid-cols-1 gap-6">
						<div className="flex flex-col">
							<div className="self-center">
								<motion.h2
									className="mb-3 text-4xl font-black leading-tight"
									style={{ x: shouldReduceMotion ? 0 : titleX, opacity: titleOpacity }}
								>
									MOVEMENT = LIFE
								</motion.h2>

								<div className="relative mt-1 min-h-[210px]">
									{textContent.length > 0 ? (
										textContent.map((content, i) => (
											<TextSlide key={i} content={content} index={i} seg={segText} progress={progress} />
										))
									) : (
										<p className="text-white/70">Нет контента для карточек.</p>
									)}
								</div>
							</div>
						</div>

						<Frame
							className="relative"
							overlayClassName="bg-sky-500/5"
							progress={useTransform<number, number>(progress, [0.5, 1], [0, 1])}
						>
							<div className="absolute inset-0">
								{photos.length > 0 ? (
									photos.map((photo, i) => (
										<ArenaSlide key={photo.src} photo={photo} index={i} seg={segPhotos} progress={progress} />
									))
								) : (
									<div className="grid h-full place-items-center text-white/50">Нет фото</div>
								)}
							</div>
						</Frame>
					</div>
				</div>

				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-black/70 to-transparent" />
			</div>
		</section>
	);
}

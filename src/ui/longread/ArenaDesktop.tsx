"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ProductHotspotDesktop } from "./ProductHotspot.desktop";
import { Frame } from "./Frame";

/* Данные */
type Photo = {
	src: string;
	alt: string;
	hotspots: Array<{ x: number; y: number; label: string; href: string; side?: "left" | "right" }>;
};

const photos: Photo[] = [
	{
		src: "/images/longread/arena-1.avif",
		alt: "Спринт: футболка и шорты",
		hotspots: [
			{ x: 62, y: 40, label: "Футболка GC-Base", href: "/products/gc-base-tee" },
			{ x: 58, y: 65, label: "Шорты Pace", href: "/products/pace-shorts" },
		],
	},
	{
		src: "/images/longread/arena-2.avif",
		alt: "Скакалка: лонгслив и кроссовки",
		hotspots: [
			{ x: 56, y: 38, label: "Лонгслив Aero", href: "/products/aero-long" },
			{ x: 59, y: 86, label: "Кроссы Urban Grip", href: "/products/urban-grip" },
		],
	},
	{
		src: "/images/longread/arena-3.avif",
		alt: "Recovery: лонгслив и брюки",
		hotspots: [
			{ x: 44, y: 37, label: "Бэйс-топ Layer-0", href: "/products/layer0-top" },
			{ x: 62, y: 66, label: "Брюки Flex", href: "/products/flex-pants", side: "left" },
		],
	},
];

/* Слайды (кросс-фейд) */
function ArenaSlide({
	photo,
	index,
	seg,
	progress,
}: {
	photo: Photo;
	index: number;
	seg: number;
	progress: MotionValue<number>;
}) {
	const start = Math.max(0, index * seg - 0.06);
	const mid = index * seg + seg / 2;
	const end = Math.min(1, (index + 1) * seg + 0.06);

	const imgOpacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
	const imgScale = useTransform(progress, [start, mid, end], [1.02, 1, 1.02]);

	return (
		<motion.div className="absolute inset-0" style={{ opacity: imgOpacity }}>
			<motion.div className="absolute inset-0 transform-gpu" style={{ scale: imgScale }}>
				{/* Внутри Frame НЕ задаём скругления — их даёт Frame */}
				<Image
					src={photo.src}
					alt={photo.alt}
					fill
					sizes="50vw"
					className="object-cover"
					priority={index === 0}
				/>
			</motion.div>

			{photo.hotspots.map((h, i) => (
				<ProductHotspotDesktop
					key={`${photo.src}-${i}`}
					x={h.x}
					y={h.y}
					label={h.label}
					href={h.href}
					side={h.side}
					progress={imgOpacity}
					appearAt={0.55}
				/>
			))}
		</motion.div>
	);
}

function TextSlide({
	lead,
	bullets,
	index,
	seg,
	progress,
}: {
	lead: string;
	bullets: string[];
	index: number;
	seg: number;
	progress: MotionValue<number>;
}) {
	const start = Math.max(0, index * seg - 0.04);
	const mid = index * seg + seg / 2;
	const end = Math.min(1, (index + 1) * seg + 0.04);

	const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
	const x = useTransform(progress, [start, mid, end], ["-24px", "0px", "24px"]);

	return (
		<motion.div className="absolute inset-0" style={{ opacity, x }}>
			<p className="max-w-md text-white/85">{lead}</p>
			<ul className="mt-6 space-y-2 text-white/80">
				{bullets.map((b, i) => (
					<li key={i}>• {b}</li>
				))}
			</ul>
		</motion.div>
	);
}

/* Секция */
export function ArenaDesktop() {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

	const titleX = useTransform(scrollYProgress, [0.08, 0.2], ["-16px", "0px"]);
	const titleOpacity = useTransform(scrollYProgress, [0.08, 0.2], [0, 1]);

	const copy = [
		{
			lead: "Наш код — дисциплина, выносливость, уважение к делу.",
			bullets: ["функциональные ткани под нагрузкой", "чистые формы без шума", "база вне сезонов"],
		},
		{
			lead: "Город — наш зал. Мы тренируемся там, где живём.",
			bullets: ["свобода шага и вентиляция", "карманы, что не мешают", "лёгкость, держит темп"],
		},
		{
			lead: "Андерграунд, спорт, милитари — одна философия: полезность и стойкость.",
			bullets: ["устойчивые материалы", "модульность слоёв", "тёмная палитра"],
		},
	];

	const segPhotos = 1 / photos.length;
	const segCopy = 1 / copy.length;

	return (
		<section id="arena" ref={ref} className="relative h-[420vh] bg-black text-white">
			<div className="sticky top-0 h-screen overflow-hidden">
				<div className="absolute inset-x-0 top-0 z-10 h-[18vh] bg-gradient-to-b from-black to-transparent" />

				<div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6">
					<div className="grid h-[80vh] w-full grid-cols-12 gap-6">
						{/* LEFT */}
						<div className="col-span-5 flex">
							<div className="self-center">
								<motion.h2
									className="mb-3 text-5xl font-black leading-tight"
									style={{ x: titleX, opacity: titleOpacity }}
								>
									ДВИЖЕНИЕ = ЖИЗНЬ
								</motion.h2>

								<div className="relative mt-1 min-h-[210px]">
									{copy.map((s, i) => (
										<TextSlide
											key={i}
											lead={s.lead}
											bullets={s.bullets}
											index={i}
											seg={segCopy}
											progress={scrollYProgress}
										/>
									))}
								</div>
							</div>
						</div>

						{/* RIGHT: ровный кадр со слайдами */}
						<Frame className="col-span-7">
							<div className="absolute inset-0">
								{photos.map((p, i) => (
									<ArenaSlide key={p.src} photo={p} index={i} seg={segPhotos} progress={scrollYProgress} />
								))}
							</div>
						</Frame>
					</div>
				</div>

				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-black/70 to-transparent" />
			</div>
		</section>
	);
}

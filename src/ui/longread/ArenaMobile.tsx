"use client";

import Image from "next/image";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";

const slides = [
	{
		src: "/images/longread/arena-1.avif",
		alt: "Спринт: футболка и шорты",
		copy: {
			lead: "Наш код — дисциплина, выносливость, уважение к делу.",
			bullets: ["функциональные ткани под нагрузкой", "чистые формы без шума", "база вне сезонов"],
		},
		pins: [
			{ x: 62, y: 40, label: "Футболка GC-Base", href: "/products/gc-base-tee" },
			{ x: 58, y: 65, label: "Шорты Pace", href: "/products/pace-shorts" },
		],
	},
	{
		src: "/images/longread/arena-2.avif",
		alt: "Скакалка: лонгслив и кроссовки",
		copy: {
			lead: "Город — наш зал. Мы тренируемся там, где живём.",
			bullets: ["свобода шага и вентиляция", "карманы, что не мешают", "лёгкость, держит темп"],
		},
		pins: [
			{ x: 56, y: 38, label: "Лонгслив Aero", href: "/products/aero-long" },
			{ x: 59, y: 86, label: "Кроссы Urban Grip", href: "/products/urban-grip" },
		],
	},
	{
		src: "/images/longread/arena-3.avif",
		alt: "Recovery: лонгслив и брюки",
		copy: {
			lead: "Андерграунд, спорт, милитари — одна философия: полезность и стойкость.",
			bullets: ["устойчивые материалы", "модульность слоёв", "тёмная палитра"],
		},
		pins: [
			{ x: 44, y: 37, label: "Бэйс-топ Layer-0", href: "/products/layer0-top" },
			{ x: 62, y: 66, label: "Брюки Flex", href: "/products/flex-pants" },
		],
	},
];

export function ArenaMobile() {
	return (
		<section id="arena" className="relative snap-y snap-mandatory">
			{slides.map((s, i) => (
				<article key={i} className="relative min-h-[100svh] snap-start overflow-hidden bg-black text-white">
					<Image src={s.src} alt={s.alt} fill sizes="100vw" priority={i === 0} className="object-cover" />
					<div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/65 to-transparent" />
					<div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/75 to-transparent" />

					{s.pins.map((p, j) => (
						<ProductHotspotMobile
							key={j}
							x={p.x}
							y={p.y}
							label={p.label}
							href={p.href}
							side={j % 2 ? "left" : "right"}
						/>
					))}

					<div className="absolute inset-x-0 bottom-0 px-5 pb-16">
						<h2 className="text-3xl font-black leading-tight">ДВИЖЕНИЕ = ЖИЗНЬ</h2>
						<p className="mt-2 max-w-prose text-white/85">{s.copy.lead}</p>
						<ul className="mt-4 space-y-1 text-white/80">
							{s.copy.bullets.map((b, k) => (
								<li key={k}>• {b}</li>
							))}
						</ul>
					</div>
				</article>
			))}
		</section>
	);
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";

const slides = [
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
			{ x: 26, y: 66, label: "Усиленные зоны", href: "/products/reinforced", side: "left" as const },
		],
	},
	{
		src: "/images/longread/arena-2.avif",
		alt: "Силуэт: тренировочная зона",
		lead: "Контроль движения в каждом стежке.",
		bullets: ["мягкие эластичные зоны", "усиления там, где нужно", "строгие линии без визуального шума"],
		hotspots: [
			{ x: 65, y: 40, label: "Световозврат", href: "/products/reflective-stitch" },
			{ x: 42, y: 75, label: "Эластичный пояс", href: "/products/elastic-waist", side: "left" as const },
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

export function ArenaMobile() {
	return (
		<section id="arena" className="bg-black text-white" style={{ contain: "layout paint style" }}>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<h2 className="text-3xl font-black leading-tight">MOVEMENT = LIFE</h2>

				<div className="mt-4 space-y-10">
					{slides.map((s, idx) => (
						<article key={s.src} className="grid gap-4">
							{/* кадр */}
							<Frame className="relative aspect-[4/5] w-full">
								<motion.figure
									initial={{ opacity: 0, scale: 1.02 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, amount: 0.35 }}
									transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
									className="absolute inset-0"
								>
									<Image
										src={s.src}
										alt={s.alt}
										fill
										sizes="100vw"
										className="object-cover object-center"
										priority={idx === 0}
									/>
								</motion.figure>

								{/* хотспоты (появляются вместе с кадром) */}
								{s.hotspots.map((h, i) => (
									<ProductHotspotMobile key={i} x={h.x} y={h.y} label={h.label} href={h.href} side={h.side} />
								))}
							</Frame>

							{/* текст */}
							<div className="px-0">
								<motion.p
									className="text-white/85"
									initial={{ opacity: 0, y: 8 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{ duration: 0.25 }}
								>
									{s.lead}
								</motion.p>
								<motion.ul
									className="mt-4 space-y-2 text-white/80"
									initial={{ opacity: 0, y: 6 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.4 }}
									transition={{ duration: 0.25, delay: 0.05 }}
								>
									{s.bullets.map((b) => (
										<li key={b}>• {b}</li>
									))}
								</motion.ul>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

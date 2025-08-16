"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProductHotspotDesktop } from "./ProductHotspot.desktop";
import { Frame } from "./Frame";

const IMG_W = 1920;
const IMG_H = 1080;

// Хот-споты в системе исходного фото (0..1) — подогнано по худи
const HOTSPOTS_IMG = [
	{ ix: 0.515, iy: 0.285, label: "Капюшон / ворот", href: "/products/hood-detail" },
	{ ix: 0.507, iy: 0.56, label: "Грудь / логотип", href: "/products/chest-detail", side: "left" as const },
];

function useViewportSize() {
	const [size, setSize] = useState({ w: 0, h: 0 });
	useEffect(() => {
		const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
		fn();
		window.addEventListener("resize", fn, { passive: true });
		return () => window.removeEventListener("resize", fn);
	}, []);
	return size;
}

function mapCoverToViewport(ix: number, iy: number, W: number, H: number) {
	const scale = Math.max(W / IMG_W, H / IMG_H);
	const dispW = IMG_W * scale;
	const dispH = IMG_H * scale;
	const dx = (W - dispW) / 2;
	const dy = (H - dispH) / 2;
	const xPx = dx + ix * dispW;
	const yPx = dy + iy * dispH;
	return { x: (xPx / W) * 100, y: (yPx / H) * 100 };
}

export function UndergroundDesktop() {
	const { w: W, h: H } = useViewportSize();

	const ref = useRef<HTMLElement | null>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

	// фон
	const y = useTransform(scrollYProgress, [0, 1], ["8%", "0%"]);
	const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
	const bgOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.92]);

	// текст
	const titleX = useTransform(scrollYProgress, [0.08, 0.22], ["-24px", "0px"]);
	const titleOpacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1]);
	const copyOpacity = useTransform(scrollYProgress, [0.14, 0.3], [0, 1]);

	const hotspots = useMemo(() => {
		if (!W || !H)
			return [] as { x: number; y: number; label: string; href: string; side?: "left" | "right" }[];
		return HOTSPOTS_IMG.map(({ ix, iy, ...rest }) => ({ ...mapCoverToViewport(ix, iy, W, H), ...rest }));
	}, [W, H]);

	return (
		<section id="underground" ref={ref} className="relative h-[420vh] bg-black text-white">
			<div className="sticky top-0 h-screen overflow-hidden">
				{/* градиенты НЕ ловят клики */}
				<div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[18vh] bg-gradient-to-b from-black to-transparent" />
				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[30vh] bg-gradient-to-t from-black/75 to-transparent" />

				{/* Фон + пины (один transform-контекст) */}
				<motion.div
					className="absolute inset-0 z-20 will-change-transform"
					style={{ y, scale, opacity: bgOpacity }}
				>
					<Image
						src="/images/longread/underground-1.avif"
						alt="Силуэт у неонового портала"
						fill
						priority
						sizes="100vw"
						className="object-cover"
					/>
					<div className="absolute inset-0">
						{hotspots.map((h, i) => (
							<ProductHotspotDesktop
								key={i}
								x={h.x}
								y={h.y}
								label={h.label}
								href={h.href}
								side={h.side}
								appearAt={0} // сразу видны/кликабельны
							/>
						))}
					</div>
				</motion.div>

				{/* Контентная сетка — НЕ блокирует клики по правой стороне */}
				<div className="pointer-events-none relative z-40 mx-auto grid h-full max-w-7xl grid-cols-12 gap-6 px-6">
					<motion.div
						className="pointer-events-auto col-span-6 self-end pb-20"
						style={{ x: titleX, opacity: titleOpacity }}
					>
						<h2 className="mb-2 text-5xl font-black leading-tight">НЕ ДЛЯ ВСЕХ</h2>
						<motion.p className="max-w-xl text-white/85" style={{ opacity: copyOpacity }}>
							Шум асфальта, тишина правил. Мы выбираем своё.
						</motion.p>
					</motion.div>

					{/* Декоративный кадр справа — клики сквозь него */}
					<Frame className="pointer-events-none col-span-6" />
				</div>
			</div>
		</section>
	);
}

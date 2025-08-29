"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile, type ProductHotspotMobileProps } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";

type Tone = "cyan" | "blue" | "olive";

type Slide = {
	src: string;
	alt: string;
	hotspots?: Array<Omit<ProductHotspotMobileProps, "progress">>;
};

interface ChapterMobileProps {
	id: string;
	tone: Tone;
	kicker: string;
	title: string;
	lead?: string;
	bullets?: string[];
	slides: Slide[];
}

const TONE_RING: Record<Tone, string> = {
	cyan: "ring-cyan-300/30",
	blue: "ring-sky-300/25",
	olive: "ring-lime-300/20",
};
const TONE_OVERLAY: Record<Tone, string> = {
	cyan: "bg-cyan-500/5",
	blue: "bg-sky-500/5",
	olive: "bg-lime-500/5",
};

export function ChapterMobile({ id, tone, kicker, title, lead, bullets, slides }: ChapterMobileProps) {
	const { ref, progress } = useChapterProgressMobile<HTMLElement>();

	return (
		<section
			id={id}
			ref={ref}
			className="snap-start bg-black text-white"
			style={{ contain: "layout paint style" }}
		>
			{/* Sticky заголовок главы */}
			<header className="sticky top-0 z-30 bg-gradient-to-b from-black/90 to-black/0 px-4 py-3 backdrop-blur">
				<div className="mx-auto max-w-7xl">
					<div className="mb-1 flex items-center gap-2 text-[11px] tracking-widest text-white/60">
						<span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
						{kicker}
					</div>
					<h2 className="text-3xl font-black leading-tight">{title}</h2>
					{lead && <p className="mt-1 text-sm text-white/75">{lead}</p>}
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4 pb-10 pt-4">
				{/* Слайды */}
				<div className="mt-2 space-y-8">
					{slides.map((s, idx) => (
						<article key={s.src} className="grid gap-3">
							<Frame className={`relative aspect-[4/5] w-full`} overlayClassName={TONE_OVERLAY[tone]}>
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

								{/* Хотспоты — кушают прогресс, чтобы появляться ближе к прокрутке вниз */}
								{(s.hotspots ?? []).map((h, i) => (
									<ProductHotspotMobile
										key={i}
										{...h}
										progress={progress}
										appearAt={Math.min(0.55 + i * 0.05, 0.8)}
									/>
								))}
							</Frame>
						</article>
					))}
				</div>

				{/* Буллеты ближе к низу секции (подкрепление смысла) */}
				{bullets?.length ? (
					<motion.ul
						className="mt-6 space-y-2 text-white/80"
						initial={{ opacity: 0, y: 6 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.25 }}
					>
						{bullets.map((b) => (
							<li key={b}>• {b}</li>
						))}
					</motion.ul>
				) : null}
			</div>

			{/* Тонкая тон-рамка для кадра первого слайда (визуальный акцент раздела) */}
			<style jsx>{`
				#${id} .${TONE_RING[tone]} {
				}
			`}</style>
		</section>
	);
}

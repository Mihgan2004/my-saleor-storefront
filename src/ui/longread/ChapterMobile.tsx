"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile, type ProductHotspotMobileProps } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";

type Tone = "cyan" | "blue" | "olive";

type ImageSlide = {
	type: "image";
	src: string;
	alt: string;
	hotspots?: Array<Omit<ProductHotspotMobileProps, "progress">>;
};

type BgSlide = {
	type: "bg";
	/** Tailwind/utility классы для фона (градиент/текстура) */
	bgClass: string;
	hotspots?: Array<Omit<ProductHotspotMobileProps, "progress">>;
};

type Slide = ImageSlide | BgSlide;

interface ChapterMobileProps {
	id: string;
	tone: Tone;
	kicker: string;
	title: string;
	/** Без длинных текстов: держим лонгрид «визуальным». */
	slides: Slide[];
}

const TONE_OVERLAY: Record<Tone, string> = {
	cyan: "bg-cyan-500/5",
	blue: "bg-sky-500/5",
	olive: "bg-lime-500/5",
};

export function ChapterMobile({ id, tone, kicker, title, slides }: ChapterMobileProps) {
	const { ref, progress } = useChapterProgressMobile<HTMLElement>();

	return (
		<section
			id={id}
			ref={ref}
			className="snap-start bg-black pb-28 text-white" // запас под нижнюю навигацию
			style={{ contain: "layout paint style" }}
		>
			{/* Sticky-заголовок главы, без длинного текста */}
			<header className="longread-sticky sticky z-30 bg-gradient-to-b from-black/90 to-black/0 px-4 py-3 backdrop-blur">
				<div className="mx-auto max-w-7xl">
					<div className="mb-1 flex items-center gap-2 text-[11px] tracking-widest text-white/60">
						<span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
						{kicker}
					</div>
					<h2 className="text-3xl font-black leading-tight">{title}</h2>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4 pt-3">
				<div className="space-y-8">
					{slides.map((s, idx) => (
						<article key={idx} className="grid gap-3">
							<Frame className="relative aspect-[4/5] w-full" overlayClassName={TONE_OVERLAY[tone]}>
								<motion.figure
									initial={{ opacity: 0, scale: 1.02 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true, amount: 0.35 }}
									transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
									className={clsx("absolute inset-0 overflow-hidden rounded-[22px]")}
								>
									{s.type === "image" ? (
										<Image
											src={s.src}
											alt={s.alt}
											fill
											sizes="100vw"
											className="object-cover object-center"
											priority={idx === 0}
										/>
									) : (
										<div className={clsx("absolute inset-0", s.bgClass)} />
									)}
								</motion.figure>

								{(s.hotspots ?? []).map((h, i) => (
									<ProductHotspotMobile
										key={i}
										{...h}
										progress={progress}
										appearAt={Math.min(0.55 + i * 0.06, 0.85)}
									/>
								))}
							</Frame>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

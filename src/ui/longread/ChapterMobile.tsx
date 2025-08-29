"use client";

import Image from "next/image";
import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
	bgClass: string;
	hotspots?: Array<Omit<ProductHotspotMobileProps, "progress">>;
};

type Slide = ImageSlide | BgSlide;

interface ChapterMobileProps {
	id: string;
	tone: Tone;
	kicker: string;
	title: string;
	slides: Slide[];
}

const TONE_OVERLAY: Record<Tone, string> = {
	cyan: "bg-cyan-500/5",
	blue: "bg-sky-500/5",
	olive: "bg-lime-500/5",
};

function SlideCard({ slide, tone, first }: { slide: Slide; tone: Tone; first?: boolean }) {
	const ref = useRef<HTMLDivElement | null>(null); // ✔️ корректный тип вместо any
	const inView = useInView(ref, { amount: 0.45, margin: "0px 0px -10% 0px" });

	return (
		<article ref={ref} className="grid gap-3">
			<Frame className="relative aspect-[4/5] w-full" overlayClassName={TONE_OVERLAY[tone]}>
				<motion.figure
					initial={{ opacity: 0, scale: 1.02 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true, amount: 0.35 }}
					transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
					className={clsx("absolute inset-0 overflow-hidden rounded-[22px]")}
				>
					{slide.type === "image" ? (
						<Image
							src={slide.src}
							alt={slide.alt}
							fill
							sizes="100vw"
							className="object-cover object-center"
							priority={!!first}
						/>
					) : (
						<div className={clsx("absolute inset-0", slide.bgClass)} />
					)}
				</motion.figure>

				{(slide.hotspots ?? []).map((h, i) => (
					<ProductHotspotMobile key={i} {...h} visible={inView} />
				))}
			</Frame>
		</article>
	);
}

export function ChapterMobile({ id, tone, kicker, title, slides }: ChapterMobileProps) {
	const { ref } = useChapterProgressMobile<HTMLElement>();

	return (
		<section
			id={id}
			ref={ref}
			className="snap-start bg-black pb-28 text-white"
			style={{ contain: "layout paint style" }}
		>
			<header className="longread-sticky sticky z-40 bg-gradient-to-b from-black/90 to-black/0 px-4 py-3 backdrop-blur">
				<div className="mx-auto max-w-7xl">
					<div className="mb-1 flex items-center gap-2 text-[11px] tracking-widest text-white/60">
						<span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
						{kicker}
					</div>
					<h2 className="text-3xl font-black leading-tight">{title}</h2>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4 pt-6">
				<div className="space-y-8">
					{slides.map((s, idx) => (
						<SlideCard key={idx} slide={s} tone={tone} first={idx === 0} />
					))}
				</div>
			</div>
		</section>
	);
}

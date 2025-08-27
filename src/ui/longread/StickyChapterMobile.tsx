"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";

export type ChapterFrame = { src: string; alt?: string };
export type ChapterHotspot = {
	forFrame: number;
	x: number;
	y: number;
	label: string;
	href: string;
	appearAt?: number;
};
export type ChapterCTA = {
	primary: { label: string; href: string };
	secondary?: { label: string; href: string };
};
export type StickyChapterMobileProps = {
	id: string;
	title: string;
	kicker?: string;
	description?: ReactNode;
	bullets?: string[];
	frames: ChapterFrame[];
	hotspots?: ChapterHotspot[];
	cta?: ChapterCTA;
	heightVh?: number;
	withBottomGradient?: boolean;
};

export function StickyChapterMobile({
	id,
	title,
	kicker,
	description,
	bullets,
	frames,
	hotspots = [],
	cta,
	heightVh = 360,
	withBottomGradient = true,
}: StickyChapterMobileProps) {
	const sectionRef = useRef<HTMLElement | null>(null);
	const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
	const reduceMotion = !!useReducedMotion(); // boolean

	const count = Math.max(frames.length, 1);
	const seg = 1 / count;

	const textOpacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
	const textY = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [16, 0, -16]);

	return (
		<section
			id={id}
			ref={sectionRef}
			style={{ height: `${heightVh}vh` }}
			className="relative bg-black text-white"
			aria-label={title}
			data-section={id}
		>
			<div className="sticky top-0 h-[100svh] overflow-hidden">
				{frames.map((f, idx) => (
					<FrameLayer
						key={f.src + idx}
						index={idx}
						seg={seg}
						scrollYProgress={scrollYProgress}
						src={f.src}
						alt={f.alt}
						withBottomGradient={withBottomGradient}
						reduceMotion={reduceMotion}
					/>
				))}

				{hotspots.map((h, i) => (
					<HotspotLayer key={`${h.label}-${i}`} hotspot={h} seg={seg} scrollYProgress={scrollYProgress} />
				))}

				<motion.div
					className="absolute inset-x-0 bottom-0 px-5 pb-20 sm:pb-24"
					style={{ opacity: textOpacity, y: textY }}
				>
					{kicker && (
						<div className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
							{kicker}
						</div>
					)}
					<h2 className="mb-3 text-[28px] font-black leading-tight sm:text-[32px]">{title}</h2>
					{typeof description === "string" ? (
						<p className="mb-3 text-base text-white/85">{description}</p>
					) : (
						description
					)}
					{!!bullets?.length && (
						<ul className="mb-4 space-y-1.5">
							{bullets.map((b, i) => (
								<li key={i} className="flex items-start gap-2 text-white/90">
									<span className="mt-[7px] inline-block h-[5px] w-[5px] rounded-full bg-white/80" />
									<span className="text-base">{b}</span>
								</li>
							))}
						</ul>
					)}
					{cta?.primary && (
						<div className="pointer-events-auto flex gap-2">
							<Link
								href={cta.primary.href}
								className="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-black shadow-lg ring-1 ring-white/15 active:scale-[0.99]"
							>
								{cta.primary.label}
							</Link>
							{cta.secondary && (
								<Link
									href={cta.secondary.href}
									className="inline-flex h-11 items-center justify-center rounded-2xl bg-white/10 px-4 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur active:scale-[0.99]"
								>
									{cta.secondary.label}
								</Link>
							)}
						</div>
					)}
				</motion.div>
			</div>
		</section>
	);
}

function FrameLayer({
	index,
	seg,
	scrollYProgress,
	src,
	alt,
	withBottomGradient,
	reduceMotion,
}: {
	index: number;
	seg: number;
	scrollYProgress: MotionValue<number>;
	src: string;
	alt?: string;
	withBottomGradient: boolean;
	reduceMotion: boolean;
}) {
	const i = index + 1;
	const opacity = useTransform(scrollYProgress, [seg * (i - 2), seg * (i - 1), seg * i], [0, 1, 0]);
	const scaleMV = useTransform(scrollYProgress, [seg * (i - 2), seg * (i - 1), seg * i], [1.02, 1, 1.02]);

	return (
		<motion.div
			className="absolute inset-0"
			style={{ opacity, scale: reduceMotion ? 1 : scaleMV }}
			aria-hidden={index !== 0}
		>
			<Image src={src} alt={alt ?? ""} fill sizes="100vw" priority={index === 0} className="object-cover" />
			{withBottomGradient && (
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
			)}
		</motion.div>
	);
}

function HotspotLayer({
	hotspot,
	seg,
	scrollYProgress,
}: {
	hotspot: ChapterHotspot;
	seg: number;
	scrollYProgress: MotionValue<number>;
}) {
	const { forFrame, x, y, label, href, appearAt = 0.55 } = hotspot;
	const frameStart = seg * (forFrame - 1);
	const frameMid = frameStart + seg * appearAt;
	const frameShow = frameMid + seg * 0.2;

	const local = useTransform(scrollYProgress, [frameStart, frameMid, frameShow], [0, 0, 1]);

	return (
		<div className="absolute inset-0">
			<ProductHotspotMobile x={x} y={y} label={label} href={href} progress={local} />
		</div>
	);
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, type ReactNode } from "react";
import {
	motion,
	useScroll,
	useTransform,
	useReducedMotion,
	type MotionValue,
	AnimatePresence,
} from "framer-motion";
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
	title: ReactNode; // <-- было string
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
	const reduceMotion = !!useReducedMotion();
	const [currentFrame, setCurrentFrame] = useState(0);

	const count = Math.max(frames.length, 1);

	// Enhanced text animations with more dynamic movement
	const textOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0, 1, 1, 0]);
	const textY = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [40, 0, 0, -40]);
	const textScale = useTransform(scrollYProgress, [0.15, 0.35, 0.65, 0.85], [0.9, 1, 1, 0.9]);

	// Background parallax effect
	const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
	const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

	// Track current frame for smoother transitions
	useEffect(() => {
		const unsubscribe = scrollYProgress.onChange((progress) => {
			const frameIndex = Math.min(Math.floor(progress * count), count - 1);
			if (frameIndex !== currentFrame) {
				setCurrentFrame(frameIndex);
			}
		});
		return unsubscribe;
	}, [scrollYProgress, count, currentFrame]);

	const ariaLabel = typeof title === "string" ? title : undefined;

	return (
		<section
			id={id}
			ref={sectionRef}
			className="relative overflow-hidden bg-black text-white"
			// full-bleed: выходим из родительского max-width и занимаем весь viewport
			style={{
				height: `${heightVh}vh`,
				width: "100vw",
				marginLeft: "calc(50% - 50vw)",
				marginRight: "calc(50% - 50vw)",
			}}
			aria-label={ariaLabel}
			data-section={id}
		>
			<div className="sticky top-0 h-[100svh] overflow-hidden">
				{/* Enhanced background with parallax */}
				<motion.div
					className="absolute inset-0 -z-10"
					style={{
						y: reduceMotion ? 0 : bgY,
						scale: reduceMotion ? 1 : bgScale,
					}}
				>
					<div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-800/80" />
				</motion.div>

				{/* Animated particles background */}
				{!reduceMotion && (
					<div className="pointer-events-none absolute inset-0 overflow-hidden">
						{Array.from({ length: 15 }).map((_, i) => (
							<motion.div
								key={i}
								className="absolute h-1 w-1 rounded-full bg-white/10"
								style={{
									left: `${Math.random() * 100}%`,
									top: `${Math.random() * 100}%`,
								}}
								animate={{
									y: [-20, -120],
									opacity: [0, 0.5, 0],
									scale: [0.5, 1, 0.5],
								}}
								transition={{
									duration: Math.random() * 4 + 3,
									repeat: Infinity,
									delay: Math.random() * 3,
									ease: "easeInOut",
								}}
							/>
						))}
					</div>
				)}

				{/* Enhanced frame transitions */}
				<AnimatePresence mode="wait">
					<FrameLayer
						key={`frame-${currentFrame}`}
						index={currentFrame}
						scrollYProgress={scrollYProgress}
						src={frames[currentFrame]?.src || frames[0]?.src}
						alt={frames[currentFrame]?.alt || frames[0]?.alt}
						withBottomGradient={withBottomGradient}
						reduceMotion={reduceMotion}
					/>
				</AnimatePresence>

				{/* Enhanced hotspots with better timing */}
				<AnimatePresence>
					{hotspots
						.filter((h) => h.forFrame === currentFrame + 1)
						.map((h, i) => (
							<motion.div
								key={`${h.label}-${currentFrame}-${i}`}
								className="absolute inset-0"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0 }}
								transition={{
									duration: 0.5,
									delay: i * 0.15,
									ease: "backOut",
								}}
							>
								<ProductHotspotMobile x={h.x} y={h.y} label={h.label} href={h.href} />
							</motion.div>
						))}
				</AnimatePresence>

				{/* Enhanced content overlay */}
				<motion.div
					className="absolute inset-x-0 bottom-0 px-5 pb-16 sm:pb-20"
					style={{
						opacity: textOpacity,
						y: textY,
						scale: reduceMotion ? 1 : textScale,
					}}
				>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
						viewport={{ once: true }}
					>
						{kicker && (
							<motion.div
								className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-white/70"
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.1 }}
							>
								{kicker}
							</motion.div>
						)}

						<motion.h2
							className="mb-4 text-[32px] font-black leading-[0.9] tracking-tight sm:text-[38px]"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							{title}
						</motion.h2>

						{typeof description === "string" ? (
							<motion.p
								className="mb-5 max-w-sm text-base leading-relaxed text-white/90 sm:text-lg"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.3 }}
							>
								{description}
							</motion.p>
						) : (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.3 }}
							>
								{description}
							</motion.div>
						)}

						{!!bullets?.length && (
							<motion.ul
								className="mb-6 space-y-2"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								{bullets.map((b, i) => (
									<motion.li
										key={i}
										className="flex items-start gap-3 text-white/85"
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.5,
											delay: 0.5 + i * 0.1,
											ease: "easeOut",
										}}
									>
										<motion.span
											className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/80"
											animate={{
												scale: [1, 1.2, 1],
												opacity: [0.8, 1, 0.8],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												delay: i * 0.3,
											}}
										/>
										<span className="text-base leading-relaxed sm:text-[17px]">{b}</span>
									</motion.li>
								))}
							</motion.ul>
						)}

						{cta?.primary && (
							<motion.div
								className="pointer-events-auto flex flex-wrap gap-3"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}
							>
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									transition={{ type: "spring", stiffness: 400, damping: 17 }}
								>
									<Link
										href={cta.primary.href}
										className="sm:h-13 inline-flex h-12 items-center justify-center rounded-2xl bg-white px-6 text-sm font-semibold text-black shadow-xl ring-1 ring-white/20 transition-colors duration-200 hover:bg-white/95 sm:text-base"
									>
										{cta.primary.label}
									</Link>
								</motion.div>

								{cta.secondary && (
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										transition={{ type: "spring", stiffness: 400, damping: 17 }}
									>
										<Link
											href={cta.secondary.href}
											className="sm:h-13 inline-flex h-12 items-center justify-center rounded-2xl bg-white/5 px-6 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-md transition-all duration-200 hover:bg-white/10 hover:ring-white/40 sm:text-base"
										>
											{cta.secondary.label}
										</Link>
									</motion.div>
								)}
							</motion.div>
						)}
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

function FrameLayer({
	index,
	scrollYProgress,
	src,
	alt,
	withBottomGradient,
	reduceMotion,
}: {
	index: number;
	scrollYProgress: MotionValue<number>;
	src: string;
	alt?: string;
	withBottomGradient: boolean;
	reduceMotion: boolean;
}) {
	// Enhanced scale animation for more dramatic effect
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
	const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);

	return (
		<motion.div
			className="absolute inset-0"
			style={{
				scale: reduceMotion ? 1 : scale,
				opacity: opacity,
			}}
			initial={{ opacity: 0, scale: 1.1 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.8, ease: "easeOut" }}
			aria-hidden={true}
		>
			<Image src={src} alt={alt ?? ""} fill sizes="100vw" priority={index === 0} className="object-cover" />
			{withBottomGradient && (
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 via-black/50 to-transparent sm:h-64" />
			)}

			{/* Additional overlay for better text readability */}
			<div className="pointer-events-none absolute inset-0 bg-black/20" />
		</motion.div>
	);
}

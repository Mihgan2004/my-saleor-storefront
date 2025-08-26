"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag, ArrowDown } from "lucide-react";

type HeroBlockProps = {
	videoMp4: string;
	videoWebm?: string;
	poster?: string;
	title: string;
	kicker?: string;
	subline?: string;
	onScrollTo?: string;
	align?: "left" | "center";
	vAlign?: "bottom" | "center";
	overlayClassName?: string;
	catalogHref?: string;
};

export function HeroBlock({
	videoMp4,
	videoWebm,
	poster,
	title,
	kicker = "TACTICAL • UNDERGROUND • SPORT",
	subline,
	onScrollTo = "#chapter-1",
	align = "center",
	vAlign = "center",
	overlayClassName = "",
	catalogHref = "/collections",
}: HeroBlockProps) {
	const prefersReduced = useReducedMotion();
	const baseDelay = 0.1;
	const ease = [0.22, 0.61, 0.36, 1] as const;

	const containerAlign = [
		"mx-auto w-full max-w-7xl px-6",
		align === "center" ? "text-center" : "",
		vAlign === "bottom" ? "pb-16" : "",
	].join(" ");

	return (
		<section
			aria-label="Главный блок — Спорт · Улица · Тактика"
			className="relative min-h-[100svh] w-full overflow-hidden"
		>
			{/* Медиа-слой */}
			<div
				className="absolute inset-0"
				style={{
					maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
					WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
				}}
				aria-hidden
			>
				{prefersReduced ? (
					<img
						src={poster || "/hero-poster.jpg"}
						alt=""
						className="absolute inset-0 h-full w-full object-cover"
					/>
				) : (
					<video
						className="absolute inset-0 h-full w-full object-cover"
						autoPlay
						muted
						loop
						playsInline
						preload="metadata"
						poster={poster}
					>
						{videoWebm && <source src={videoWebm} type="video/webm" />}
						<source src={videoMp4} type="video/mp4" />
					</video>
				)}
			</div>

			{/* Контрастный градиент (улучшает читаемость текста) */}
			<div
				className={[
					"absolute inset-0",
					// сверху легкий, снизу плотнее для контраста с текстом
					"bg-[linear-gradient(to_bottom,rgba(0,0,0,.35)_0%,rgba(0,0,0,.5)_35%,rgba(0,0,0,.65)_100%)]",
					overlayClassName,
				].join(" ")}
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-[26vh] bg-gradient-to-b from-transparent to-black/80"
				aria-hidden
			/>

			{/* Контент */}
			<div
				className={["absolute inset-0 flex", vAlign === "center" ? "items-center" : "items-end"].join(" ")}
			>
				<div className={containerAlign}>
					{kicker && (
						<motion.p
							initial={prefersReduced ? false : { opacity: 0, y: 8 }}
							animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
							transition={{ delay: baseDelay, duration: 0.24, ease }}
							className="mb-3 text-xs tracking-[0.22em] text-text-muted"
						>
							{kicker}
						</motion.p>
					)}

					<motion.h1
						initial={prefersReduced ? false : { opacity: 0, y: 12 }}
						animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
						transition={{ delay: baseDelay + 0.2, duration: 0.28, ease }}
						className="font-display font-extrabold leading-[0.95] text-text"
						style={{ fontSize: "clamp(36px, 6.2vw, 86px)" }}
					>
						{title}
					</motion.h1>

					{subline && (
						<motion.p
							initial={prefersReduced ? false : { opacity: 0, y: 8 }}
							animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
							transition={{ delay: baseDelay + 0.4, duration: 0.24, ease }}
							className={["mt-4 max-w-2xl text-text/85", align === "center" ? "mx-auto" : ""].join(" ")}
						>
							{subline}
						</motion.p>
					)}

					<motion.div
						initial={prefersReduced ? false : { opacity: 0, y: 8 }}
						animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
						transition={{ delay: baseDelay + 0.6, duration: 0.22, ease }}
						className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
					>
						<Link
							href={catalogHref}
							aria-label="Перейти в каталог"
							className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-white backdrop-blur-md transition-[background,border,transform] duration-base ease-motion-out hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
						>
							<ShoppingBag size={16} className="opacity-90 group-active:opacity-100" />
							<span className="text-sm font-medium tracking-wide">В каталог</span>
						</Link>

						<button
							type="button"
							aria-label="Прокрутить вниз"
							onClick={() =>
								document
									.querySelector(onScrollTo || "")
									?.scrollIntoView({ behavior: "smooth", block: "start" })
							}
							className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 text-white backdrop-blur-md transition-[background,border,transform] duration-base ease-motion-out hover:-translate-y-0.5 hover:border-white/30 hover:bg-black/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
						>
							<ArrowDown size={16} className="opacity-90 group-active:opacity-100" />
							<span className="text-sm font-medium tracking-wide">Подробнее</span>
						</button>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

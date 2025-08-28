"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useMotionValue, useTransform, type MotionValue } from "framer-motion";

interface SectionProps {
	id: string;
	image: string;
	imageAlt: string;
	title: string;
	subtitle?: string;
	/** Высота сцены (используется только ≥ lg, где sticky) */
	height?: string;
	/** Внешний прогресс анимации (0..1). Если не передан — считаем локально. */
	progress?: MotionValue<number>;
	/** Слот для оверлея поверх изображения (хотспоты и т.д.) */
	overlay?: React.ReactNode;
}

export function Section({
	id,
	image,
	imageAlt,
	title,
	subtitle,
	height = "420vh",
	progress,
	overlay,
}: SectionProps) {
	const ref = useRef<HTMLElement>(null);

	// локальный прогресс, если не передан снаружи
	const local = useMotionValue(0);
	const source = progress ?? local;

	// лёгкий параллакс фона
	const bgY = useTransform<number, string>(source, [0, 1], ["-3%", "3%"]);

	// обновляем локальный прогресс по скроллу
	useEffect(() => {
		if (progress) return;
		const el = ref.current;
		if (!el) return;

		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const rect = el.getBoundingClientRect();
				const vh = window.innerHeight || 1;
				const total = Math.max(rect.height + vh, 1);
				const passed = Math.min(Math.max(vh - rect.top, 0), total);
				local.set(passed / total);
			});
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [progress, local]);

	return (
		<section
			id={id}
			ref={ref}
			className="relative isolate w-full overflow-hidden bg-black text-white"
			style={{ ["--scene-h" as any]: height, contain: "layout paint style" }}
		>
			<div className="relative min-h-[100svh] overflow-hidden lg:sticky lg:top-0 lg:h-screen">
				{/* фон */}
				<div
					className="absolute inset-0 will-change-transform"
					style={{ transform: `translateY(${bgY.get()})` }}
					aria-hidden
				>
					<Image
						src={image}
						alt={imageAlt}
						fill
						priority
						sizes="100vw"
						className="object-cover object-center"
					/>
				</div>

				{/* оверлей (инжектится родителем) */}
				{overlay ? <div className="absolute inset-0">{overlay}</div> : null}

				{/* текст внизу */}
				<div className="absolute inset-x-0 bottom-0 z-20">
					<div className="mx-auto max-w-7xl px-6 pb-20">
						<h2 className="mb-2 text-5xl font-black leading-tight">{title}</h2>
						{subtitle && <p className="max-w-xl text-white/85">{subtitle}</p>}
					</div>
				</div>
			</div>

			{/* высота сцены — только на десктопе */}
			<style jsx>{`
				@media (min-width: 1024px) {
					#${id} {
						height: var(--scene-h);
					}
				}
			`}</style>
		</section>
	);
}

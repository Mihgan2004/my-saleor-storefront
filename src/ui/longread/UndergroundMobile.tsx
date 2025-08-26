"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";

export function UndergroundMobile() {
	const ref = useRef<HTMLElement | null>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

	// лёгкий параллакс (меньше, чем на десктопе)
	const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 1, 0.98, 0.95]);

	return (
		<section
			id="underground"
			ref={ref}
			className="relative min-h-[100svh] snap-start overflow-hidden bg-black text-white"
			aria-label="Underground — ночной город, неон, тени"
		>
			<motion.div className="absolute inset-0" style={{ y, opacity }}>
				<Image
					src="/images/longread/underground-1.avif"
					alt="Силуэт у неонового портала"
					fill
					sizes="100vw"
					priority
					className="object-cover"
				/>
			</motion.div>

			{/* градиенты для читабельности */}
			<div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

			{/* хот-споты: координаты подобраны под object-cover (могут потребовать тонкой подгонки) */}
			<ProductHotspotMobile x={52} y={28} label="Капюшон / ворот" href="/products/hood-detail" />
			<ProductHotspotMobile x={49} y={55} label="Грудь / логотип" href="/products/chest-detail" side="left" />

			{/* текст у нижней кромки (как на десктопе) */}
			<div className="absolute inset-x-0 bottom-0 px-5 pb-16">
				<h2 className="text-4xl font-black leading-tight">НЕ ДЛЯ ВСЕХ</h2>
				<p className="mt-2 max-w-prose text-white/85">Шум асфальта, тишина правил. Мы выбираем своё.</p>
			</div>
		</section>
	);
}

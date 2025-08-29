// FILE: src/ui/longread/UndergroundMobile.tsx
"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";

export function UndergroundMobile() {
	const { ref, progress } = useChapterProgressMobile<HTMLElement>();

	// 0..1: A -> B
	const fadeA = useTransform(progress, [0.0, 0.35, 0.55], [1, 1, 0]);
	const fadeB = useTransform(progress, [0.35, 0.55, 1.0], [0, 1, 1]);

	// этапный текст
	const leadAOpacity = useTransform(progress, [0.02, 0.18], [0, 1]);
	const leadBOpacity = useTransform(progress, [0.58, 0.8], [0, 1]);

	return (
		<section
			id="underground"
			ref={ref}
			className="snap-start bg-black text-white"
			style={{ contain: "layout paint style" }}
		>
			<div className="mx-auto max-w-7xl px-4 py-12">
				{/* тексты — меняются в такт кадрам */}
				<div className="min-h-[76px]">
					<motion.h2 className="text-3xl font-black leading-tight" style={{ opacity: leadAOpacity }}>
						NOT FOR EVERYONE
					</motion.h2>

					<motion.p className="mt-2 text-white/80" style={{ opacity: leadAOpacity }}>
						Noise of asphalt, silence of rules. We choose our own path.
					</motion.p>

					<motion.h3 className="mt-1 text-2xl font-black leading-tight" style={{ opacity: leadBOpacity }}>
						NEON // DETAILS
					</motion.h3>
					<motion.p className="mt-2 text-white/80" style={{ opacity: leadBOpacity }}>
						Контрастные акценты, светоотражение, защита от дождя.
					</motion.p>
				</div>

				<div className="mt-6">
					<Frame className="relative aspect-[4/5] w-full">
						{/* Кадр A */}
						<motion.figure className="absolute inset-0" style={{ opacity: fadeA }}>
							<Image
								src="/images/longread/underground-1.avif"
								alt="Silhouette by neon portal"
								fill
								sizes="100vw"
								className="object-cover object-center"
								priority
							/>
						</motion.figure>

						{/* Кадр B */}
						<motion.figure className="absolute inset-0" style={{ opacity: fadeB }}>
							<Image
								src="/images/longread/underground-2.avif"
								alt="Neon clothing details"
								fill
								sizes="100vw"
								className="object-cover object-center"
							/>
						</motion.figure>

						{/* хотспоты завязаны на прогресс каждого кадра */}
						<ProductHotspotMobile
							x={28}
							y={36}
							label="Светоотражающие акценты"
							href="/products/reflect"
							progress={fadeA}
							appearAt={0.18}
						/>
						<ProductHotspotMobile
							x={66}
							y={58}
							label="Влагозащита"
							href="/products/waterproof"
							progress={fadeB}
							appearAt={0.2}
						/>
					</Frame>
				</div>
			</div>
		</section>
	);
}

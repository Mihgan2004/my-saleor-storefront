"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";

export function UndergroundMobile() {
	const { ref, progress } = useChapterProgressMobile<HTMLElement>();

	// мягкий cross-fade между двумя кадрами
	const fadeA = useTransform(progress, [0, 0.4, 1], [1, 1, 0]);
	const fadeB = useTransform(progress, [0, 0.4, 1], [0, 0, 1]);

	return (
		<section
			id="underground"
			ref={ref}
			className="bg-black text-white"
			style={{ contain: "layout paint style" }}
		>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<h2 className="text-3xl font-black leading-tight">NOT FOR EVERYONE</h2>
				<p className="mt-2 text-white/80">Noise of asphalt, silence of rules. We choose our own path.</p>

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

						{/* Примеры хотспотов (замени на свои координаты при желании) */}
						<ProductHotspotMobile
							x={28}
							y={36}
							label="Светоотражающие акценты"
							href="/products/reflect"
							progress={fadeA}
							appearAt={0.2}
						/>
						<ProductHotspotMobile
							x={66}
							y={58}
							label="Влагозащита"
							href="/products/waterproof"
							progress={fadeB}
							appearAt={0.5}
						/>
					</Frame>
				</div>
			</div>
		</section>
	);
}

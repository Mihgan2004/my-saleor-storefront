// FILE: src/ui/longread/RangeMobile.tsx
"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";

const intro = ["защита от износа и погоды", "модульность и крепления", "тёмная палитра ради фокуса"];
const specs = ["армированные зоны нагрузки", "водоотталкивающая обработка", "YKK-фурнитура"];

export function RangeMobile() {
	const { ref, progress } = useChapterProgressMobile<HTMLElement>();

	// параллакс
	const ySlow = useTransform(progress, [0, 1], ["-2%", "2%"]);
	const yMid = useTransform(progress, [0, 1], ["-3%", "3%"]);
	const yFast = useTransform(progress, [0, 1], ["-4%", "4%"]);

	// тексты
	const op1 = useTransform(progress, [0.06, 0.2], [0, 1]);
	const op2 = useTransform(progress, [0.4, 0.65], [0, 1]);

	return (
		<section
			id="range"
			ref={ref}
			className="snap-start bg-black text-white"
			style={{ contain: "layout paint style" }}
		>
			<div className="relative mx-auto max-w-7xl px-4 py-12">
				{/* такт 1 */}
				<motion.h2 className="text-3xl font-black leading-tight" style={{ opacity: op1 }}>
					ГОТОВ К ПОЛЮ
				</motion.h2>
				<motion.p className="mt-2 max-w-prose text-white/85" style={{ opacity: op1 }}>
					Функция первична. Материалы — выносливые, посадка — рабочая, эстетика — строгая.
				</motion.p>

				{/* мозаика */}
				<div className="mt-6">
					<Frame className="gpu relative aspect-[4/5] w-full" overlayClassName="bg-[rgba(107,126,78,0.08)]">
						<div className="grid h-full grid-cols-6 grid-rows-6 gap-2 sm:gap-3">
							<motion.figure className="relative col-span-6 row-span-3" style={{ y: ySlow }}>
								<Image
									src="/images/longread/range-1.avif"
									alt="Панель под патч"
									fill
									sizes="100vw"
									className="object-cover object-center"
									priority
								/>
							</motion.figure>

							<motion.figure className="relative col-span-3 row-span-3" style={{ y: yMid }}>
								<Image
									src="/images/longread/range-2.avif"
									alt="Ламинированный шов"
									fill
									sizes="50vw"
									className="object-cover object-center"
								/>
							</motion.figure>

							<motion.figure className="relative col-span-3 row-span-3" style={{ y: yFast }}>
								<Image
									src="/images/longread/range-3.avif"
									alt="Усиленный бар-так"
									fill
									sizes="50vw"
									className="object-cover object-center"
								/>
							</motion.figure>
						</div>

						{/* хотспоты в нижней трети пути */}
						<ProductHotspotMobile
							x={30}
							y={42}
							label="Loop panel"
							href="/products/loop-panel"
							progress={progress}
							appearAt={0.55}
						/>
						<ProductHotspotMobile
							x={70}
							y={30}
							label="Sealed zip"
							href="/products/sealed-zip"
							progress={progress}
							appearAt={0.6}
						/>
						<ProductHotspotMobile
							x={72}
							y={78}
							label="Reinforced bartack"
							href="/products/bartack-detail"
							side="left"
							progress={progress}
							appearAt={0.66}
						/>
					</Frame>
				</div>

				{/* такт 2 — спеки */}
				<motion.div className="mt-5" style={{ opacity: op2 }}>
					<h3 className="text-xl font-semibold">DETAILS // CORE</h3>
					<ul className="mt-2 space-y-2 text-white/80">
						{specs.map((b) => (
							<li key={b}>• {b}</li>
						))}
					</ul>
				</motion.div>

				{/* базовые буллеты под кадром, оставляем приглушённо */}
				<motion.ul className="mt-4 space-y-2 text-white/70" style={{ opacity: op1 }}>
					{intro.map((b) => (
						<li key={b}>• {b}</li>
					))}
				</motion.ul>
			</div>
		</section>
	);
}

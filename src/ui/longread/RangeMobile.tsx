"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";

export function RangeMobile() {
	const ref = useRef<HTMLElement | null>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

	const y1 = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
	const y2 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
	const y3 = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);

	return (
		<section id="range" ref={ref} className="relative snap-y snap-mandatory">
			{/* кадр 1 */}
			<article className="relative min-h-[100svh] snap-start overflow-hidden bg-black text-white">
				<motion.div className="absolute inset-0" style={{ y: y1 }}>
					<Image
						src="/images/longread/range-1.avif"
						alt="Петлевая панель"
						fill
						sizes="100vw"
						className="object-cover"
						priority
					/>
				</motion.div>
				<ProductHotspotMobile x={30} y={40} label="Панель под съёмный ярлык" href="/products/loop-panel" />
				<div className="absolute inset-x-0 bottom-0 px-5 pb-16">
					<h2 className="text-3xl font-black leading-tight">ГОТОВ К ПОЛЮ</h2>
					<p className="mt-2 max-w-prose text-white/85">
						Функция первична. Материалы — выносливые, посадка — рабочая, эстетика — строгая.
					</p>
					<ul className="mt-3 space-y-1 text-white/80">
						<li>• защита от износа и погоды</li>
						<li>• модульность и крепления</li>
						<li>• тёмная палитра ради фокуса</li>
					</ul>
				</div>
			</article>

			{/* кадр 2 */}
			<article className="relative min-h-[100svh] snap-start overflow-hidden bg-black text-white">
				<motion.div className="absolute inset-0" style={{ y: y2 }}>
					<Image
						src="/images/longread/range-2.avif"
						alt="Ламинированный шов"
						fill
						sizes="100vw"
						className="object-cover"
					/>
				</motion.div>
				<ProductHotspotMobile x={75} y={28} label="Влагозащитная молния" href="/products/sealed-zip" />
			</article>

			{/* кадр 3 */}
			<article className="relative min-h-[100svh] snap-start overflow-hidden bg-black text-white">
				<motion.div className="absolute inset-0" style={{ y: y3 }}>
					<Image
						src="/images/longread/range-3.avif"
						alt="Усиленный бар-так"
						fill
						sizes="100vw"
						className="object-cover"
					/>
				</motion.div>
				<ProductHotspotMobile
					x={74}
					y={72}
					label="Бар-так усиленный"
					href="/products/bartack-detail"
					side="left"
				/>
			</article>
		</section>
	);
}

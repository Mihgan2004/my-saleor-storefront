"use client";

import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { Frame } from "./Frame";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { useChapterProgressMobile } from "./StickyChapterMobile";

export function RangeMobile() {
	const { ref, progress } = useChapterProgressMobile<HTMLElement>();

	const ySlow = useTransform(progress, [0, 1], ["-2%", "2%"]);
	const yMid = useTransform(progress, [0, 1], ["-3%", "3%"]);
	const yFast = useTransform(progress, [0, 1], ["-4%", "4%"]);

	return (
		<section id="range" ref={ref} className="bg-black text-white" style={{ contain: "layout paint style" }}>
			<div className="mx-auto max-w-7xl px-4 py-12">
				<h2 className="text-3xl font-black leading-tight">ГОТОВ К ПОЛЮ</h2>
				<p className="mt-2 max-w-prose text-white/85">
					Функция первична. Материалы — выносливые, посадка — рабочая, эстетика — строгая.
				</p>
				<ul className="mt-4 space-y-2 text-white/80">
					<li>• защита от износа и погоды</li>
					<li>• модульность и крепления</li>
					<li>• тёмная палитра ради фокуса</li>
				</ul>

				<div className="mt-6">
					<Frame className="relative aspect-[4/5] w-full" overlayClassName="bg-lime-500/5">
						<div className="grid h-full grid-cols-6 grid-rows-6 gap-2 sm:gap-3">
							<motion.figure className="relative col-span-6 row-span-3" style={{ y: ySlow }}>
								<Image
									src="/images/longread/range-1.avif"
									alt="Петлевая панель"
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

						{/* хотспоты – появляются ближе к низу секции */}
						<ProductHotspotMobile
							x={30}
							y={42}
							label="Панель под ярлык"
							href="/products/loop-panel"
							progress={progress}
							appearAt={0.55}
						/>
						<ProductHotspotMobile
							x={70}
							y={30}
							label="Влагозащитная молния"
							href="/products/sealed-zip"
							progress={progress}
							appearAt={0.6}
						/>
						<ProductHotspotMobile
							x={72}
							y={78}
							label="Усиленный бар-так"
							href="/products/bartack-detail"
							side="left"
							progress={progress}
							appearAt={0.65}
						/>
					</Frame>
				</div>
			</div>
		</section>
	);
}

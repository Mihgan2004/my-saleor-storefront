"use client";

import { motion } from "framer-motion";
import { StickyChapterMobile } from "./StickyChapterMobile";

export function RangeMobile() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.2, ease: "easeOut" }}
			viewport={{ once: true, amount: 0.2 }}
		>
			<StickyChapterMobile
				id="range"
				kicker="Tactical • Utility"
				title={
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						ГОТОВ К ПОЛЮ
					</motion.span>
				}
				description={
					<motion.span
						className="block max-w-sm text-base leading-relaxed text-white/90 sm:text-lg"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						Функция первична. Материалы — выносливые, посадка — рабочая, эстетика — строгая.
					</motion.span>
				}
				bullets={["защита от износа и погоды", "модульность и крепления", "тёмная палитра ради фокуса"]}
				frames={[
					{ src: "/images/longread/range-1.avif", alt: "Тактические детали 1" },
					{ src: "/images/longread/range-2.avif", alt: "Тактические детали 2" },
				]}
				hotspots={[
					{
						forFrame: 1,
						x: 26,
						y: 38,
						label: "Панель под съёмный ярлык",
						href: "/products/patch-panel",
						appearAt: 0.55,
					},
					{
						forFrame: 2,
						x: 65,
						y: 45,
						label: "Тактические карманы",
						href: "/products/tactical-pockets",
						appearAt: 0.6,
					},
				]}
				cta={{
					primary: { label: "Тактическая линейка", href: "/collections/tactical" },
					secondary: { label: "Материалы", href: "/materials" },
				}}
				heightVh={340}
				withBottomGradient={true}
			/>
		</motion.div>
	);
}

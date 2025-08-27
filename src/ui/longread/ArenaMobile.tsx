"use client";
import { motion } from "framer-motion";
import { StickyChapterMobile } from "./StickyChapterMobile";

export function ArenaMobile() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.2, ease: "easeOut" }}
			viewport={{ once: true, amount: 0.2 }}
		>
			<StickyChapterMobile
				id="arena"
				kicker="Sport • Function"
				title={
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						ДВИЖЕНИЕ = ЖИЗНЬ
					</motion.span>
				}
				description={
					<motion.span
						className="block max-w-sm text-base leading-relaxed text-white/90 sm:text-lg"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						Андеграунд, спорт, милитари — одна философия: полезность и стойкость.
					</motion.span>
				}
				bullets={["устойчивые материалы", "модульность слоёв", "тёмная палитра"]}
				frames={[
					{ src: "/images/longread/arena-1.avif", alt: "Бейс-топ Layer-0" },
					{ src: "/images/longread/arena-2.avif", alt: "Лонгслив Аэро" },
					{ src: "/images/longread/arena-3.avif", alt: "Футболка GC-Base" },
				]}
				hotspots={[
					{ forFrame: 1, x: 24, y: 40, label: "Бейс-топ Layer-0", href: "/products/layer-0", appearAt: 0.55 },
					{ forFrame: 1, x: 78, y: 76, label: "Брюки Flex", href: "/products/flex-pants", appearAt: 0.7 },
					{ forFrame: 2, x: 36, y: 42, label: "Лонгслив Аэро", href: "/products/aero-ls", appearAt: 0.55 },
					{
						forFrame: 2,
						x: 76,
						y: 70,
						label: "Кроссы Urban Grip",
						href: "/products/urban-grip",
						appearAt: 0.7,
					},
					{
						forFrame: 3,
						x: 56,
						y: 36,
						label: "Футболка GC-Base",
						href: "/products/gc-base-tee",
						appearAt: 0.55,
					},
					{ forFrame: 3, x: 74, y: 73, label: "Шорты Race", href: "/products/race-shorts", appearAt: 0.7 },
				]}
				cta={{
					primary: { label: "В каталог", href: "/collections/all" },
					secondary: { label: "Собрать лук", href: "/look" },
				}}
				heightVh={380}
				withBottomGradient={true}
			/>
		</motion.div>
	);
}

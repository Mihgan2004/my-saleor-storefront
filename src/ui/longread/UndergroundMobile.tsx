"use client";
import { motion } from "framer-motion";
import { StickyChapterMobile } from "./StickyChapterMobile";

export function UndergroundMobile() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1.2, ease: "easeOut" }}
			viewport={{ once: true, amount: 0.2 }}
		>
			<StickyChapterMobile
				id="underground"
				kicker="Underground • Code"
				title={
					<motion.span
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						НЕ ДЛЯ ВСЕХ
					</motion.span>
				}
				description={
					<motion.span
						className="block max-w-sm text-base leading-relaxed text-white/90 sm:text-lg"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						Шум асфальта, тишина правил. Мы выбираем своё.
					</motion.span>
				}
				bullets={["чистые формы без шума", "защита от погоды", "база вне сезонов"]}
				frames={[
					{ src: "/images/longread/underground-1.avif", alt: "Силуэт в неоне" },
					{ src: "/images/longread/underground-2.avif", alt: "Тёмный коридор" },
					{ src: "/images/longread/underground-3.avif", alt: "Город ночью" },
				]}
				hotspots={[
					{ forFrame: 1, x: 46, y: 36, label: "Капюшон / ворот", href: "/products/hood", appearAt: 0.55 },
					{ forFrame: 1, x: 60, y: 62, label: "Грудь / логотип", href: "/products/logo", appearAt: 0.7 },
					{ forFrame: 2, x: 35, y: 45, label: "Текстуры ткани", href: "/products/texture", appearAt: 0.6 },
					{ forFrame: 3, x: 70, y: 40, label: "Городской стиль", href: "/products/urban", appearAt: 0.65 },
				]}
				cta={{
					primary: { label: "Смотреть дроп", href: "/collections/underground" },
					secondary: { label: "История бренда", href: "/brand" },
				}}
				heightVh={380}
				withBottomGradient={true}
			/>
		</motion.div>
	);
}

"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

type Item = { side: "left" | "right"; title: string; text: string };

export function BenefitsMobile() {
	const ref = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
	const items: Item[] = [
		{ side: "left", title: "Материалы PRO", text: "Ткани и фурнитура. Держат нагрузку и погоду." },
		{ side: "right", title: "Инженерная посадка", text: "Свобода шага, вентиляция и удобство без лишнего." },
		{ side: "left", title: "Сделано здесь", text: "Производство и контроль на каждом шаге." },
		{ side: "right", title: "Быстрая логистика", text: "По РФ/СНГ: со склада до двери." },
		{ side: "left", title: "Честные обмены", text: "Меняем быстро и без драмы." },
		{ side: "right", title: "Саппорт 24/7", text: "Отвечаем быстро. По делу." },
	];

	return (
		<section id="why" className="bg-black py-16 text-white" aria-label="Почему GRAYCARDINAL">
			<div className="mx-auto max-w-screen-sm px-5">
				<h2 className="mb-2 text-center text-[28px] font-black leading-tight sm:text-[32px]">
					ПОЧЕМУ
					<br />
					GRAYCARDINAL
				</h2>
				<p className="mx-auto mb-8 max-w-prose text-center text-white/85">
					Мы делаем вещи, которые работают в городе: прочные, продуманные, честные.
				</p>

				<div ref={ref} className="relative">
					<div className="absolute left-1/2 top-0 -translate-x-1/2">
						<div className="h-full w-[3px] bg-white/15" />
						<motion.div
							className="absolute left-0 top-0 h-full w-[3px] origin-top bg-white"
							style={{ scaleY: scrollYProgress }}
						/>
					</div>

					<ul className="space-y-8">
						{items.map((it, idx) => (
							<motion.li
								key={idx}
								initial={{ opacity: 0, x: it.side === "left" ? -24 : 24 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, amount: 0.4 }}
								transition={{ duration: 0.5, delay: 0.05 * idx }}
								className={`flex ${it.side === "left" ? "justify-start" : "justify-end"}`}
							>
								<div className="max-w-[80%] rounded-3xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur sm:px-5 sm:py-4">
									<div className="text-[17px] font-bold">{it.title}</div>
									<div className="mt-1 text-[15px] text-white/85">{it.text}</div>
								</div>
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

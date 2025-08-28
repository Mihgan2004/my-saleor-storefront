"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const items = [
	{ title: "Материалы PRO", desc: "Износостойкие ткани и фурнитура. Держат нагрузку и погоду." },
	{ title: "Инженерная посадка", desc: "Свобода шага, вентиляция, карманы по делу — без лишнего шума." },
	{ title: "Сделано здесь", desc: "Локальное производство и контроль качества на каждом шаге." },
	{ title: "Быстрая доставка", desc: "По РФ/СНГ. Полное отслеживание от склада до двери." },
	{ title: "14 дней на обмен", desc: "Если не село — обменяем быстро и без драмы." },
	{ title: "Саппорт 24/7", desc: "Отвечаем быстро и по делу в любом канале." },
];

export function BenefitsMobile() {
	const ref = useRef<HTMLElement>(null);
	const progress = useMotionValue(0);

	// «Искра» идёт сверху вниз, пока секция в зоне видимости
	// внутри BenefitsMobile.tsx
	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		let started = false;
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting && !started) {
						started = true;
						const controls = animate(progress, 1, { duration: 3.2, ease: [0.22, 1, 0.36, 1] });
						// важно: остановить на размонтировании
						cleanup = () => controls.stop();
					}
				});
			},
			{ threshold: 0.25 },
		);

		let cleanup = () => {};
		io.observe(el);
		return () => {
			cleanup();
			io.disconnect();
		};
	}, [progress]);

	const sparkTop = useTransform(progress, [0, 1], ["0%", "100%"]);
	const fillH = useTransform(progress, [0, 1], ["0%", "100%"]);

	return (
		<section id="why" ref={ref} className="bg-black text-white" style={{ contain: "layout paint style" }}>
			<div className="mx-auto max-w-7xl px-4 py-14">
				<h2 className="text-center text-3xl font-black leading-tight">ПОЧЕМУ GRAYCARDINAL</h2>
				<p className="mx-auto mt-2 max-w-prose text-center text-white/70">
					Мы делаем вещи, которые работают в городе: прочные, продуманные, честные.
				</p>

				<div className="relative mx-auto mt-10 max-w-md">
					{/* линия */}
					<div className="absolute left-4 top-0 z-10 h-full w-[2px] bg-white/12" />
					<motion.div className="absolute left-4 top-0 z-20 w-[2px] bg-white" style={{ height: fillH }} />

					{/* искра */}
					<motion.div className="absolute left-4 z-30 -translate-x-1/2" style={{ top: sparkTop }}>
						<div className="relative h-3.5 w-3.5 -translate-y-1/2">
							<span className="absolute inset-0 rounded-full bg-white" />
							<span className="absolute -inset-2 rounded-full bg-white/60 blur-sm" />
						</div>
					</motion.div>

					<ul className="space-y-5 pl-10">
						{items.map((it, i) => (
							<motion.li
								key={it.title}
								initial={{ opacity: 0, x: 10 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, amount: 0.4 }}
								transition={{ duration: 0.28, delay: i * 0.05 }}
								className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
							>
								<h3 className="text-base font-semibold">{it.title}</h3>
								<p className="mt-1 text-sm text-white/75">{it.desc}</p>
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

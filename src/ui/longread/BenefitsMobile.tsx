// src/ui/longread/BenefitsMobile.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, type MotionValue } from "framer-motion";

type Item = { title: string; desc: string; side: "left" | "right" };

const items: Omit<Item, "side">[] = [
	{ title: "Материалы PRO", desc: "Износостойкие ткани и фурнитура. Держат нагрузку и погоду." },
	{ title: "Инженерная посадка", desc: "Свобода шага, вентиляция, карманы по делу — без лишнего шума." },
	{ title: "Сделано здесь", desc: "Локальное производство и контроль качества на каждом шаге." },
	{ title: "Быстрая доставка", desc: "По РФ/СНГ. Полное отслеживание от склада до двери." },
	{ title: "14 дней на обмен", desc: "Если не село — обменяем быстро и без драмы." },
	{ title: "Саппорт 24/7", desc: "Отвечаем быстро и по делу в любом канале." },
];

function NodeDot({ progress, t }: { progress: MotionValue<number>; t: number }) {
	const opacity = useTransform(progress, [t - 0.02, t], [0.4, 1]);
	return (
		<motion.span
			className="absolute left-1/2 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
			style={{ top: `${t * 100}%`, opacity }}
			aria-hidden
		/>
	);
}

function Feature({
	item,
	threshold,
	progress,
}: {
	item: Item;
	threshold: number;
	progress: MotionValue<number>;
}) {
	const appearStart = Math.max(0, threshold - 0.1);
	const opacity = useTransform(progress, [appearStart, threshold], [0, 1]);
	const x = useTransform(progress, [appearStart, threshold], item.side === "left" ? [-24, 0] : [24, 0]);

	const baseSideCls =
		item.side === "left"
			? "right-[calc(50%+48px)] items-end text-right"
			: "left-[calc(50%+48px)] items-start text-left";

	return (
		<motion.div
			className={`absolute z-20 flex w-[34ch] gap-2 ${baseSideCls}`}
			style={{ top: `${threshold * 100}%`, translateY: "-50%", opacity, x }}
		>
			<div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
				<h3 className="text-lg font-semibold text-white">{item.title}</h3>
				<p className="mt-1 text-sm text-white/70">{item.desc}</p>
			</div>
		</motion.div>
	);
}

export function BenefitsMobile() {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { amount: 0.35, once: true });

	const FUSE_DURATION = 3.6;
	const progress = useMotionValue(0);

	useEffect(() => {
		if (inView) {
			const controls = animate(progress, 1, {
				duration: FUSE_DURATION,
				ease: [0.22, 1, 0.36, 1],
			});
			return () => controls.stop();
		}
	}, [inView, progress]);

	const itemsWithSide: Item[] = useMemo(
		() => items.map((it, i) => ({ ...it, side: i % 2 === 0 ? "left" : "right" })),
		[],
	);
	const thresholds = useMemo(() => {
		const n = itemsWithSide.length;
		return itemsWithSide.map((_, i) => (i + 1) / (n + 1));
	}, [itemsWithSide]);

	const fillH = useTransform(progress, [0, 1], ["0%", "100%"]);
	const sparkTop = useTransform(progress, [0, 1], ["0%", "100%"]);

	return (
		<section
			id="benefits"
			className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-[100vw] bg-black text-white"
		>
			<div className="absolute inset-x-0 -top-1 h-24 bg-gradient-to-b from-black to-transparent" />
			<div className="mx-auto max-w-6xl px-4 py-28">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-black leading-tight">ПОЧЕМУ GRAYCARDINAL</h2>
					<p className="mx-auto mt-2 max-w-2xl text-white/70">
						Мы делаем вещи, которые работают в городе: прочные, продуманные, честные.
					</p>
				</div>

				<div ref={ref} className="relative mx-auto h-[72vh] max-h-[900px] min-h-[520px]">
					<div className="absolute left-1/2 top-0 z-10 h-full w-[2px] -translate-x-1/2 bg-white/10" />

					<motion.div
						className="absolute left-1/2 top-0 z-20 w-[2px] -translate-x-1/2 bg-white"
						style={{ height: fillH }}
					/>

					<motion.div
						aria-hidden
						className="absolute left-1/2 z-30 -translate-x-1/2"
						style={{ top: sparkTop }}
					>
						<div className="relative h-4 w-4 -translate-y-1/2">
							<span className="absolute inset-0 rounded-full bg-white" />
							<span className="absolute -inset-2 rounded-full bg-white/60 blur-sm" />
							<span className="absolute -inset-6 rounded-full bg-cyan-400/20 blur-lg" />
						</div>
					</motion.div>

					{thresholds.map((t, i) => (
						<NodeDot key={`dot-${i}`} progress={progress} t={t} />
					))}

					{itemsWithSide.map((it, i) => (
						<Feature key={it.title} item={it} threshold={thresholds[i]} progress={progress} />
					))}
				</div>
			</div>
			<div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
		</section>
	);
}

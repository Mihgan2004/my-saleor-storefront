"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Item = { side: "left" | "right"; title: string; text: string; icon: string };

export function BenefitsMobile() {
	const ref = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

	// Enhanced scroll-based animations
	const progressBarScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
	const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
	const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

	const items: Item[] = [
		{
			side: "left",
			icon: "🏭",
			title: "Материалы PRO",
			text: "Ткани и фурнитура. Держат нагрузку и погоду.",
		},
		{
			side: "right",
			icon: "⚙️",
			title: "Инженерная посадка",
			text: "Свобода шага, вентиляция и удобство без лишнего.",
		},
		{
			side: "left",
			icon: "🇷🇺",
			title: "Сделано здесь",
			text: "Производство и контроль на каждом шаге.",
		},
		{
			side: "right",
			icon: "🚀",
			title: "Быстрая логистика",
			text: "По РФ/СНГ: со склада до двери.",
		},
		{
			side: "left",
			icon: "🔄",
			title: "Честные обмены",
			text: "Меняем быстро и без драмы.",
		},
		{
			side: "right",
			icon: "💬",
			title: "Саппорт 24/7",
			text: "Отвечаем быстро. По делу.",
		},
	];

	return (
		<section
			id="why"
			className="overflow-hidden bg-black py-20 text-white sm:py-24"
			aria-label="Почему GRAYCARDINAL"
		>
			<div className="mx-auto max-w-screen-sm px-5">
				{/* Enhanced header with scroll animations */}
				<motion.div className="mb-16 text-center" style={{ y: headerY, opacity: headerOpacity }}>
					<motion.h2
						className="mb-4 text-center text-[32px] font-black leading-tight tracking-tight sm:text-[40px]"
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, ease: "backOut" }}
						viewport={{ once: true }}
					>
						ПОЧЕМУ
						<br />
						<motion.span
							className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
							animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
							transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
						>
							GRAYCARDINAL
						</motion.span>
					</motion.h2>

					<motion.p
						className="mx-auto max-w-prose text-center text-base leading-relaxed text-white/85 sm:text-lg"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						Мы делаем вещи, которые работают в городе: прочные, продуманные, честные.
					</motion.p>
				</motion.div>

				<div ref={ref} className="relative">
					{/* Enhanced progress line with glow effect */}
					<div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
						<div className="h-full w-[2px] rounded-full bg-white/10" />
						<motion.div
							className="absolute left-0 top-0 w-[2px] origin-top rounded-full bg-gradient-to-b from-white via-gray-300 to-white shadow-lg shadow-white/20"
							style={{ scaleY: progressBarScale }}
						/>

						{/* Animated dot at the progress end */}
						<motion.div
							className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-lg shadow-white/30"
							style={{
								top: `${scrollYProgress.get() * 100}%`,
								scale: progressBarScale,
							}}
							animate={{
								boxShadow: [
									"0 0 10px rgba(255,255,255,0.3)",
									"0 0 20px rgba(255,255,255,0.6)",
									"0 0 10px rgba(255,255,255,0.3)",
								],
							}}
							transition={{ duration: 2, repeat: Infinity }}
						/>
					</div>

					<ul className="relative z-20 space-y-10 sm:space-y-12">
						{items.map((it, idx) => (
							<motion.li
								key={idx}
								initial={{
									opacity: 0,
									x: it.side === "left" ? -50 : 50,
									scale: 0.9,
								}}
								whileInView={{
									opacity: 1,
									x: 0,
									scale: 1,
								}}
								viewport={{ once: true, amount: 0.3 }}
								transition={{
									duration: 0.7,
									delay: 0.1 * idx,
									ease: "backOut",
								}}
								className={`flex ${it.side === "left" ? "justify-start" : "justify-end"}`}
							>
								<motion.div
									className="group relative max-w-[85%] sm:max-w-[80%]"
									whileHover={{ scale: 1.02, y: -2 }}
									transition={{ type: "spring", stiffness: 300, damping: 20 }}
								>
									{/* Enhanced card with glassmorphism */}
									<motion.div
										className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-xl backdrop-blur-md sm:px-6 sm:py-5"
										whileHover={{
											backgroundColor: "rgba(255,255,255,0.08)",
											borderColor: "rgba(255,255,255,0.2)",
										}}
										transition={{ duration: 0.3 }}
									>
										{/* Animated background gradient */}
										<motion.div
											className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100"
											transition={{ duration: 0.5 }}
										/>

										{/* Content */}
										<div className="relative z-10">
											<motion.div
												className="mb-2 flex items-center gap-4"
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												transition={{ duration: 0.6, delay: 0.2 }}
											>
												<motion.span
													className="text-2xl sm:text-3xl"
													whileHover={{ scale: 1.2, rotate: 10 }}
													transition={{ type: "spring", stiffness: 400, damping: 15 }}
												>
													{it.icon}
												</motion.span>
												<motion.h3
													className="text-[18px] font-bold tracking-tight sm:text-[20px]"
													initial={{ opacity: 0, x: -10 }}
													whileInView={{ opacity: 1, x: 0 }}
													transition={{ duration: 0.6, delay: 0.3 }}
												>
													{it.title}
												</motion.h3>
											</motion.div>

											<motion.p
												className="text-[15px] leading-relaxed text-white/85 sm:text-[16px]"
												initial={{ opacity: 0, y: 10 }}
												whileInView={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.6, delay: 0.4 }}
											>
												{it.text}
											</motion.p>
										</div>
									</motion.div>
								</motion.div>
							</motion.li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

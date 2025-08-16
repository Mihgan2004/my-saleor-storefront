"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants, type Transition } from "framer-motion";
import { russo } from "@/ui/shared/fonts";

type Card = {
	href: string;
	kicker: string;
	title: string;
	img: string;
	tone: "cyan" | "blue" | "olive";
};

const cards: Card[] = [
	{
		href: "/collections/underground",
		kicker: "UNDERGROUND",
		title: "Ночной город. Неон. Тени.",
		img: "/images/longread/choose-underground.avif",
		tone: "cyan",
	},
	{
		href: "/collections/arena",
		kicker: "SPORT",
		title: "Ритм. Выносливость. Контроль.",
		img: "/images/longread/choose-arena.avif",
		tone: "blue",
	},
	{
		href: "/collections/range",
		kicker: "MILITARY",
		title: "Польза. Стойкость. Функция.",
		img: "/images/longread/choose-range.avif",
		tone: "olive",
	},
];

/* Анимации: строгая типизация */
const EASE: Transition["ease"] = [0.22, 1, 0.36, 1]; // или "easeOut"

const gridVariants: Variants = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.1, delayChildren: 0.04 },
	},
};

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 22, scale: 0.99 },
	show: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.5, ease: EASE },
	},
};

export function ChoosePath() {
	return (
		<section id="choose-path" className={`relative bg-black text-white ${russo.variable}`}>
			{/* стыковка секций */}
			<div className="pointer-events-none absolute inset-x-0 -top-1 h-10 bg-gradient-to-b from-black to-transparent" />

			<div className="mx-auto max-w-7xl px-6">
				{/* Заголовок */}
				<div className="pb-2 pt-12 text-center sm:pt-14">
					<h2
						className="mx-auto max-w-4xl text-4xl font-black leading-[1.05] sm:text-5xl"
						style={{ fontFamily: "var(--font-russo)" }}
					>
						ВЫБЕРИ СВОЁ НАПРАВЛЕНИЕ
					</h2>
					<p className="mx-auto mt-2 max-w-2xl text-base text-white/70">
						Три среды — один код. Выбери старт и продолжай движение.
					</p>
				</div>

				{/* Карточки */}
				<motion.div
					className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:mt-32 lg:grid-cols-3"
					variants={gridVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.35 }}
				>
					{cards.map((c, idx) => (
						<motion.div key={c.kicker} variants={cardVariants}>
							<Link href={c.href} className="group relative block overflow-hidden rounded-2xl">
								<div className="relative aspect-[4/3]">
									<Image
										src={c.img}
										alt={c.kicker}
										fill
										sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
										className="object-cover transition duration-500 group-hover:scale-[1.03]"
										style={{
											objectPosition:
												c.kicker === "UNDERGROUND" ? "35% 50%" : c.kicker === "SPORT" ? "60% 50%" : "40% 50%",
										}}
										priority={idx === 0}
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/5" />
									{c.tone === "cyan" && (
										<div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-cyan-300/30 transition group-hover:ring-cyan-300/60" />
									)}
									{c.tone === "blue" && (
										<div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-sky-300/25 transition group-hover:ring-sky-300/50" />
									)}
									{c.tone === "olive" && (
										<div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-lime-300/20 transition group-hover:ring-lime-300/40" />
									)}
								</div>

								{/* Текст карточки */}
								<div className="absolute inset-0 p-5">
									<div className="flex h-full flex-col justify-end">
										<span className="mb-1 text-[11px] tracking-widest text-white/70">{c.kicker}</span>
										<h3 className="text-lg font-semibold leading-tight sm:text-xl">{c.title}</h3>
										<motion.span
											className="mt-3 inline-flex items-center gap-2 text-sm text-white/80"
											whileHover={{ x: 2 }}
										>
											Смотреть коллекцию
											<svg
												width="18"
												height="18"
												viewBox="0 0 24 24"
												className="opacity-80"
												aria-hidden="true"
											>
												<path
													d="M7 12h10M13 6l6 6-6 6"
													stroke="currentColor"
													strokeWidth="1.6"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</motion.span>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>

			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black to-transparent" />
		</section>
	);
}

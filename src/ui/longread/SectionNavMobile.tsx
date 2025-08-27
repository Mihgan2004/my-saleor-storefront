"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SectionNavItem = { id: string; label: string };

export function SectionNavMobile({ items }: { items: SectionNavItem[] }) {
	const [active, setActive] = useState(items[0]?.id ?? "");
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const idSet = useMemo(() => new Set(items.map((i) => i.id)), [items]);

	useEffect(() => {
		const onScroll = () => {
			const currentScrollY = window.scrollY;

			// Auto-hide/show logic
			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
			setLastScrollY(currentScrollY);

			// Active section detection
			const midY = window.scrollY + window.innerHeight / 2;
			let current = active;

			items.forEach((it) => {
				const el = document.querySelector<HTMLElement>(`section[data-section="${it.id}"]`);
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const absTop = window.scrollY + rect.top;
				const absBottom = absTop + rect.height;
				if (midY >= absTop && midY < absBottom) current = it.id;
			});

			if (current !== active && idSet.has(current)) setActive(current);
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [items, active, idSet, lastScrollY]);

	const activeIndex = Math.max(
		0,
		items.findIndex((x) => x.id === active),
	);
	const prog = items.length <= 1 ? 1 : activeIndex / (items.length - 1);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className="pointer-events-none fixed bottom-4 left-0 right-0 z-50 mx-auto w-full max-w-sm px-5"
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 30,
						opacity: { duration: 0.2 },
					}}
				>
					{/* Enhanced navigation container */}
					<motion.div
						className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl"
						whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.5)" }}
						transition={{ duration: 0.2 }}
					>
						{/* Animated background gradient */}
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
							animate={{ x: ["-100%", "100%"] }}
							transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
						/>

						<div className="relative flex items-center justify-between gap-4 p-3">
							{/* Enhanced dot navigation */}
							<div className="pointer-events-auto flex flex-1 items-center justify-center gap-4">
								{items.map((it) => {
									const isActive = it.id === active;
									return (
										<motion.a
											key={it.id}
											href={`#${it.id}`}
											className="group relative block"
											aria-label={it.label}
											whileHover={{ scale: 1.2 }}
											whileTap={{ scale: 0.9 }}
											transition={{ type: "spring", stiffness: 400, damping: 20 }}
										>
											{/* Background ring */}
											<motion.div
												className="h-4 w-4 rounded-full bg-white/20 ring-1 ring-white/15"
												whileHover={{ backgroundColor: "rgba(255,255,255,0.3)" }}
											/>

											{/* Active indicator */}
											<AnimatePresence>
												{isActive && (
													<motion.div
														className="absolute inset-0 rounded-full bg-white shadow-lg shadow-white/30"
														initial={{ scale: 0, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														exit={{ scale: 0, opacity: 0 }}
														transition={{
															type: "spring",
															stiffness: 500,
															damping: 25,
														}}
													/>
												)}
											</AnimatePresence>

											{/* Hover glow effect */}
											<motion.div
												className="absolute inset-0 rounded-full bg-white/50 opacity-0 blur-sm group-hover:opacity-100"
												transition={{ duration: 0.2 }}
											/>
										</motion.a>
									);
								})}
							</div>

							{/* Enhanced section label */}
							<AnimatePresence mode="wait">
								<motion.div
									key={activeIndex}
									className="hidden min-w-[100px] items-center justify-end pr-2 text-right sm:flex"
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.3 }}
									aria-live="polite"
								>
									<span className="text-[13px] font-semibold tracking-wide text-white/90">
										{items[activeIndex]?.label ?? ""}
									</span>
								</motion.div>
							</AnimatePresence>
						</div>
					</motion.div>

					{/* Enhanced progress bar */}
					<motion.div
						className="mx-auto mt-3 h-1 w-32 overflow-hidden rounded-full bg-white/10 backdrop-blur"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.5, duration: 0.5 }}
					>
						<motion.div
							className="h-full rounded-full bg-gradient-to-r from-white via-gray-200 to-white shadow-lg shadow-white/20"
							style={{
								width: `${prog * 100}%`,
								transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1)",
							}}
							animate={{
								backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "linear",
							}}
						/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

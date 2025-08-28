/* eslint-disable import/no-default-export */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { Command, Heart, Menu, Search, ShoppingBag, User as UserIcon, X } from "lucide-react";
import { Logo } from "@/ui/components/Logo";
export type HeaderProps = { channel: string };

type CartItem = { lineId?: string; variantId?: string; qty?: number; price?: number };
interface Cart {
	items: CartItem[];
	count: number;
}
const mockCart: Cart = { items: [], count: 0 };

/* ========== SEARCH OVERLAY ========== */
const SearchOverlay: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
	const [q, setQ] = useState("");
	const hints = ["Assault", "Outer", "Utility", "Night Ops"];

	useEffect(() => {
		const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		if (isOpen) {
			document.addEventListener("keydown", onEsc);
			return () => document.removeEventListener("keydown", onEsc);
		}
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
			onClick={onClose}
		>
			<motion.div
				initial={{ y: -18, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -18, opacity: 0 }}
				className="m-4 mx-auto mt-24 max-w-2xl rounded-2xl border border-zinc/30 bg-charcoal/95 p-6 shadow-[0_16px_40px_rgba(0,0,0,.45)] backdrop-blur-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="mb-5 flex items-center gap-3">
					<Search className="h-5 w-5 text-silver/60" />
					<input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						autoFocus
						placeholder="Поиск товаров..."
						className="flex-1 bg-transparent text-lg text-white placeholder-silver/50 outline-none"
					/>
					<div className="flex items-center gap-1 font-mono text-xs text-silver/60">
						<Command className="h-3 w-3" />
						<span>K</span>
					</div>
				</div>

				<div>
					<h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-silver/70">
						Быстрый поиск
					</h3>
					<div className="flex flex-wrap gap-2">
						{hints.map((t) => (
							<button
								key={t}
								className="rounded-full border border-zinc/20 bg-zinc/10 px-3 py-1 text-sm text-silver transition hover:border-olive/30 hover:bg-zinc/20 focus:outline-none focus:ring-2 focus:ring-olive/40"
								onClick={() => setQ(t)}
							>
								{t}
							</button>
						))}
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

/* ========== CART DRAWER ========== */
const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
	useEffect(() => {
		const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		if (isOpen) {
			document.addEventListener("keydown", onEsc);
			return () => document.removeEventListener("keydown", onEsc);
		}
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/70"
						onClick={onClose}
					/>
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 26, stiffness: 220 }}
						className="fixed right-0 top-0 z-50 flex h-full w-[400px] flex-col border-l border-zinc/20 bg-charcoal/95 shadow-[0_16px_40px_rgba(0,0,0,.45)] backdrop-blur-xl"
					>
						<div className="flex items-center justify-between border-b border-zinc/20 p-6">
							<h2 className="text-sm font-bold uppercase tracking-[0.25em] text-silver">Корзина</h2>
							<button
								onClick={onClose}
								className="rounded-lg p-2 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40"
							>
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="flex flex-1 items-center justify-center p-8">
							<div className="text-center">
								<ShoppingBag className="mx-auto mb-4 h-14 w-14 text-steel/60" />
								<h3 className="mb-2 text-lg font-semibold text-white">Корзина пуста</h3>
								<p className="mb-6 text-silver/70">Добавьте товары для продолжения</p>
								<button className="rounded-lg bg-olive px-6 py-3 font-medium text-white shadow-[0_0_20px_hsl(var(--olive)_/_0.35)] transition hover:bg-olive/90 focus:outline-none focus:ring-2 focus:ring-olive/40">
									Перейти к покупкам
								</button>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

/* ========== MOBILE MENU ========== */
const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 bg-obsidian text-white md:hidden"
				>
					<div className="flex h-full flex-col">
						<div className="flex items-center justify-between border-b border-zinc/20 p-4">
							<span className="text-sm font-bold uppercase tracking-[0.25em] text-silver">Меню</span>
							<button
								onClick={onClose}
								className="rounded-lg p-2 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40"
							>
								<X className="h-6 w-6" />
							</button>
						</div>

						<div className="flex-1 overflow-auto p-4">
							<div className="relative mb-6">
								<Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-silver/60" />
								<input
									placeholder="Поиск..."
									className="w-full rounded-lg border border-zinc/20 bg-zinc/10 py-3 pl-10 pr-4 text-white placeholder-silver/60 outline-none focus:ring-2 focus:ring-olive/40"
								/>
							</div>

							{/* На мобиле показываем пункты меню: */}
							<nav className="flex flex-col gap-6 md:hidden">
								<button className="text-left font-tactical text-[16px] uppercase tracking-[0.08em] text-silver transition hover:text-white">
									КАТАЛОГ
								</button>
								<button className="text-сilver text-left font-tactical text-[16px] uppercase tracking-[0.08ем] transition hover:text-white">
									О НАС
								</button>
								<button className="font-тactical text-сilver text-left text-[16px] uppercase tracking-[0.08em] transition hover:text-white">
									КОНТАКТЫ
								</button>
							</nav>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

/* ========== HEADER (glass plaque) ========== */
const Header: React.FC<HeaderProps> = ({ channel }) => {
	const pathname = usePathname();
	const [isScrolled, setIsScrolled] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { scrollY } = useScroll();
	const headerHeight = useTransform(scrollY, [0, 24], [84, 66]);
	const yFloat = useTransform(scrollY, [0, 200], [-6, 0]);
	const headerOpacity = useTransform(scrollY, [0, 50], [0.95, 1]);

	useEffect(() => {
		const unsub = scrollY.onChange((y) => setIsScrolled(y > 24));
		return unsub;
	}, [scrollY]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			const t = e.target as HTMLElement | null;
			const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
			if (typing) return;

			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setIsSearchOpen(true);
			}
			if (e.key === "/") {
				e.preventDefault();
				setIsSearchOpen(true);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, []);

	const nav = useMemo(
		() => [
			{ label: "Каталог", href: "/catalog" },
			{ label: "О нас", href: "/about" },
			{ label: "Контакты", href: "/contacts" },
		],
		[],
	);
	void channel;

	/* --- флаг: отключаем подчёркивание у активного пункта --- */
	const SHOW_ACTIVE_UNDERLINE = false;

	return (
		<>
			{/* Увеличенный отступ сверху для опускания шапки */}
			<motion.header
				className={`pointer-events-none fixed left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ${
					isScrolled ? "bg-transparent backdrop-blur-sm" : "bg-transparent"
				}`}
				style={{
					top: "max(env(safe-area-inset-top), 20px)", // Увеличено с 8px до 20px
					height: headerHeight,
					opacity: headerOpacity,
				}}
			>
				<motion.div
					className="header-plaque plaque-float group pointer-events-auto flex h-12 items-center justify-between gap-2 rounded-[28px] px-3 sm:h-14 md:h-16 md:px-5"
					// Улучшенная адаптивность для мобильных
					style={{
						width: "min(calc(100vw - 12px), 1180px)", // Уменьшены отступы для мобильных
						y: yFloat,
					}}
					whileHover={{
						scale: 1.02,
						transition: { duration: 0.2 },
					}}
					animate={{
						boxShadow: isScrolled
							? "0 20px 50px rgba(0, 0, 0, 0.6), 0 5px 15px rgba(0, 0, 0, 0.4)"
							: "0 16px 40px rgba(0, 0, 0, 0.45), 0 3px 10px rgba(0, 0, 0, 0.35)",
					}}
				>
					{/* Left: logo + nav */}
					<div className="flex min-w-0 items-center gap-2 sm:gap-3 md:gap-6">
						<button
							className="-ml-1 flex items-center md:-ml-2"
							aria-label="На главную"
							onClick={(e) => e.preventDefault()}
						>
							<motion.div
								className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc/25 bg-gradient-to-b from-graphite to-charcoal shadow-inner transition group-hover:ring-2 group-hover:ring-olive/25 sm:h-9 sm:w-9 md:h-10 md:w-10"
								whileHover={{
									rotate: [0, -5, 5, 0],
									transition: { duration: 0.3 },
								}}
								whileTap={{ scale: 0.95 }}
							>
								<Logo size={22} showWordmark={false} />
							</motion.div>
						</button>

						<nav className="hidden items-center gap-2 sm:gap-3 md:flex">
							{nav.map((item, index) => {
								const active = pathname === item.href;
								return (
									<motion.a
										key={item.href}
										href={item.href}
										aria-current={active ? "page" : undefined}
										className={`relative font-tactical text-[13px] uppercase tracking-[0.08em] sm:text-[14px] md:text-[15px] ${
											active ? "text-white" : "text-silver hover:text-white"
										} transition-colors`}
										onClick={(e) => e.preventDefault()}
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
										whileHover={{
											y: -2,
											transition: { duration: 0.2 },
										}}
									>
										<span className="relative">
											{item.label}
											{SHOW_ACTIVE_UNDERLINE && active && (
												<motion.span
													className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-olive to-transparent"
													initial={{ scaleX: 0 }}
													animate={{ scaleX: 1 }}
													transition={{ duration: 0.3 }}
												/>
											)}
										</span>
									</motion.a>
								);
							})}
						</nav>
					</div>

					{/* Right: search + icons */}
					<div className="flex items-center gap-1 sm:gap-1.5 md:gap-2.5">
						<motion.button
							onClick={() => setIsSearchOpen(true)}
							className="hidden h-8 items-center gap-2 rounded-full border border-zinc/20 bg-zinc/10 px-2 text-silver transition hover:border-olive/30 hover:bg-zinc/15 focus:outline-none focus:ring-2 focus:ring-olive/40 sm:flex md:h-9 md:px-3"
							aria-label="Открыть поиск"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Search className="h-3 w-3 md:h-4 md:w-4" />
							<span className="hidden text-[13px] md:inline">Поиск</span>
							<span className="hidden font-mono text-[11px] text-silver/60 md:inline">/</span>
						</motion.button>

						{/* Поиск для мобильных */}
						<motion.button
							onClick={() => setIsSearchOpen(true)}
							className="rounded-lg p-1.5 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40 sm:hidden"
							aria-label="Поиск"
							whileTap={{ scale: 0.9 }}
						>
							<Search className="h-4 w-4" />
						</motion.button>

						<motion.button
							className="rounded-lg p-1.5 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40 md:p-2"
							aria-label="Избранное"
							whileHover={{
								scale: 1.1,
								rotate: [0, -5, 5, 0],
							}}
							whileTap={{ scale: 0.9 }}
						>
							<Heart className="h-4 w-4 md:h-[18px] md:w-[18px]" />
						</motion.button>

						<motion.button
							className="rounded-lg p-1.5 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40 md:p-2"
							aria-label="Профиль"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<UserIcon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
						</motion.button>

						<motion.button
							onClick={() => setIsCartOpen(true)}
							className="relative rounded-lg p-1.5 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40 md:p-2"
							aria-label="Корзина"
							whileHover={{
								scale: 1.1,
								rotate: [0, -3, 3, 0],
							}}
							whileTap={{ scale: 0.9 }}
						>
							<ShoppingBag className="h-4 w-4 md:h-[18px] md:w-[18px]" />
							{mockCart.count > 0 && (
								<motion.span
									className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-olive text-[9px] font-bold text-white shadow-[0_0_20px_hsl(var(--olive)_/_0.35)] md:h-[18px] md:w-[18px] md:text-[10px]"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: "spring", stiffness: 500 }}
								>
									{mockCart.count > 99 ? "99+" : mockCart.count}
								</motion.span>
							)}
						</motion.button>

						<motion.button
							onClick={() => setIsMobileMenuOpen(true)}
							className="rounded-lg p-1.5 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40 md:hidden"
							aria-label="Открыть меню"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<Menu className="h-5 w-5" />
						</motion.button>
					</div>
				</motion.div>
			</motion.header>

			<SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
			<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
			<MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

			{/* Плашка и эффекты */}
			<style jsx global>{`
				.header-plaque {
					position: relative;

					/* Усиленный GLASS: больше blur, светлее "молочная" заливка */
					background: linear-gradient(
						135deg,
						hsla(0, 0%, 100%, 0.22) 0%,
						hsla(0, 0%, 100%, 0.1) 30%,
						hsla(0, 0%, 100%, 0.15) 60%,
						hsla(0, 0%, 100%, 0.18) 100%
					);
					backdrop-filter: saturate(220%) blur(36px) contrast(118%); /* было blur(30px) */
					-webkit-backdrop-filter: saturate(220%) blur(36px) contrast(118%);

					/* Менее яркая обводка */
					border: 1.5px solid hsla(0, 0%, 100%, 0.14); /* было 0.25 */

					box-shadow:
						0 8px 32px rgba(0, 0, 0, 0.7),
						0 16px 70px rgba(0, 0, 0, 0.5),
						0 4px 16px rgba(0, 0, 0, 0.3),
						inset 0 2px 0 hsla(0, 0%, 100%, 0.25),
						inset 0 -1px 0 hsla(0, 0%, 0%, 0.15),
						inset 1px 0 0 hsla(0, 0%, 100%, 0.1),
						inset -1px 0 0 hsla(0, 0%, 100%, 0.1);
					transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
					isolation: isolate;
				}

				/* Призматический кант: общую яркость приглушили */
				.header-plaque::before {
					content: "";
					position: absolute;
					inset: -2px;
					padding: 2px;
					border-radius: 30px;
					background: linear-gradient(
						135deg,
						hsla(0, 0%, 100%, 0.45) 0%,
						hsl(var(--olive) / 0.55) 15%,
						hsla(0, 0%, 100%, 0.32) 30%,
						hsl(var(--olive) / 0.45) 45%,
						hsla(0, 0%, 100%, 0.38) 60%,
						hsl(var(--olive) / 0.5) 75%,
						hsla(0, 0%, 100%, 0.45) 90%,
						hsla(0, 0%, 100%, 0.6) 100%
					);
					-webkit-mask:
						linear-gradient(#000 0 0) content-box,
						linear-gradient(#000 0 0);
					-webkit-mask-composite: xor;
					mask-composite: exclude;
					pointer-events: none;

					/* ↓ приглушение общего свечения канта */
					opacity: 0.18;
					animation: prismaticRim 6s ease-in-out infinite;
					filter: blur(0.4px);
				}

				@keyframes prismaticRim {
					0%,
					100% {
						opacity: 0.7;
						filter: hue-rotate(0deg) brightness(1) blur(0.5px);
					}
					20% {
						opacity: 0.9;
						filter: hue-rotate(15deg) brightness(1.2) blur(0.3px);
					}
					40% {
						opacity: 1;
						filter: hue-rotate(30deg) brightness(1.4) blur(0.2px);
					}
					60% {
						opacity: 0.95;
						filter: hue-rotate(20deg) brightness(1.3) blur(0.4px);
					}
					80% {
						opacity: 0.85;
						filter: hue-rotate(10deg) brightness(1.1) blur(0.6px);
					}
				}

				.header-plaque::after {
					content: "";
					position: absolute;
					inset: 0;
					border-radius: 28px;
					pointer-events: none;
					opacity: 0.2;
					background: radial-gradient(ellipse 70% 90% at 5% 15%, hsla(0, 0%, 100%, 0.6), transparent 65%),
						radial-gradient(ellipse 60% 80% at 95% 85%, hsl(var(--olive) / 0.4), transparent 70%),
						radial-gradient(circle at 20% 40%, hsla(0, 0%, 100%, 0.3), transparent 45%),
						radial-gradient(circle at 80% 60%, hsl(var(--olive) / 0.25), transparent 50%),
						radial-gradient(ellipse 40% 60% at 60% 20%, hsla(0, 0%, 100%, 0.2), transparent 60%),
						radial-gradient(ellipse 50% 40% at 30% 80%, hsl(var(--olive) / 0.15), transparent 55%),
						linear-gradient(
							135deg,
							hsla(0, 0%, 100%, 0.15) 0%,
							transparent 25%,
							hsl(var(--olive) / 0.1) 45%,
							transparent 65%,
							hsla(0, 0%, 100%, 0.08) 85%,
							transparent 100%
						),
						linear-gradient(
							45deg,
							transparent 0%,
							hsla(0, 0%, 100%, 0.05) 20%,
							transparent 40%,
							hsl(var(--olive) / 0.06) 60%,
							transparent 80%,
							hsla(0, 0%, 100%, 0.04) 100%
						);
					animation: complexReflection 8s ease-in-out infinite;
				}

				@keyframes complexReflection {
					0%,
					100% {
						opacity: 0.2;
						transform: translateX(0%) rotate(0deg);
					}
					15% {
						opacity: 0.28;
						transform: translateX(0.5%) rotate(0.2deg);
					}
					30% {
						opacity: 0.35;
						transform: translateX(-0.3%) rotate(-0.1deg);
					}
					45% {
						opacity: 0.32;
						transform: translateX(0.8%) rotate(0.3deg);
					}
					60% {
						opacity: 0.25;
						transform: translateX(-0.6%) rotate(-0.2deg);
					}
					75% {
						opacity: 0.3;
						transform: translateX(0.2%) rotate(0.1deg);
					}
					90% {
						opacity: 0.22;
						transform: translateX(-0.1%) rotate(-0.05deg);
					}
				}

				.plaque-float::after {
					content: "";
					position: absolute;
					left: 15%;
					right: 15%;
					bottom: -20px;
					height: 32px;
					background: radial-gradient(closest-side, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0));
					filter: blur(12px);
					opacity: 0.6;
					z-index: -1;
					pointer-events: none;
					animation: shadowPulse 3s ease-in-out infinite;
				}

				@keyframes shadowPulse {
					0%,
					100% {
						opacity: 0.6;
						transform: scaleX(1);
					}
					50% {
						opacity: 0.8;
						transform: scaleX(1.1);
					}
				}

				.header-plaque:hover {
					transform: translateY(-4px);
					background: linear-gradient(
						135deg,
						hsla(0, 0%, 100%, 0.22) 0%,
						hsla(0, 0%, 100%, 0.1) 30%,
						hsla(0, 0%, 100%, 0.16) 60%,
						hsla(0, 0%, 100%, 0.2) 100%
					);
					backdrop-filter: saturate(250%) blur(38px) contrast(125%);

					/* рамка и наводка приглушены */
					border-color: hsla(0, 0%, 100%, 0.22); /* было 0.35 */

					box-shadow:
						0 16px 64px rgba(0, 0, 0, 0.8),
						0 24px 120px rgba(0, 0, 0, 0.6),
						0 8px 32px rgba(0, 0, 0, 0.4),
						0 0 0 2px hsla(0, 0%, 100%, 0.22),
						0 0 60px hsl(var(--olive) / 0.35),
						0 0 120px hsl(var(--olive) / 0.18),
						inset 0 3px 0 hsla(0, 0%, 100%, 0.28),
						inset 0 -2px 0 hsla(0, 0%, 0%, 0.1),
						inset 2px 0 0 hsla(0, 0%, 100%, 0.15),
						inset -2px 0 0 hsla(0, 0%, 100%, 0.15);
				}

				/* Мобильная адаптация - тщательно проверено */
				@media (max-width: 768px) {
					.header-plaque {
						background: linear-gradient(
							135deg,
							hsla(0, 0%, 100%, 0.18) 0%,
							hsla(0, 0%, 100%, 0.08) 30%,
							hsla(0, 0%, 100%, 0.12) 60%,
							hsla(0, 0%, 100%, 0.14) 100%
						);
						backdrop-filter: saturate(190%) blur(28px) contrast(112%);
						border: 1px solid hsla(0, 0%, 100%, 0.12);
						box-shadow:
							0 6px 24px rgba(0, 0, 0, 0.6),
							0 12px 50px rgba(0, 0, 0, 0.4),
							inset 0 1px 0 hsla(0, 0%, 100%, 0.2),
							inset 0 -1px 0 hsla(0, 0%, 0%, 0.1);
					}

					.header-plaque::before {
						inset: -1px;
						padding: 1px;
						opacity: 0.12; /* ↓ слабее кант на мобиле */
						background: linear-gradient(
							135deg,
							hsla(0, 0%, 100%, 0.4) 0%,
							hsl(var(--olive) / 0.5) 25%,
							hsla(0, 0%, 100%, 0.25) 50%,
							hsl(var(--olive) / 0.4) 75%,
							hsla(0, 0%, 100%, 0.32) 100%
						);
						animation-duration: 4s;
						filter: blur(0.3px);
					}

					.header-plaque::after {
						opacity: 0.15;
						background: radial-gradient(ellipse 60% 80% at 10% 20%, hsla(0, 0%, 100%, 0.5), transparent 65%),
							radial-gradient(ellipse 50% 60% at 90% 80%, hsl(var(--olive) / 0.3), transparent 60%),
							radial-gradient(circle at 30% 50%, hsla(0, 0%, 100%, 0.25), transparent 50%),
							linear-gradient(
								135deg,
								hsla(0, 0%, 100%, 0.12) 0%,
								transparent 30%,
								hsl(var(--olive) / 0.08) 60%,
								transparent 100%
							);
						animation-duration: 6s;
					}

					.header-plaque:hover {
						transform: translateY(-2px);
						background: linear-gradient(
							135deg,
							hsla(0, 0%, 100%, 0.2) 0%,
							hsla(0, 0%, 100%, 0.08) 30%,
							hsla(0, 0%, 100%, 0.12) 60%,
							hsla(0, 0%, 100%, 0.15) 100%
						);
						backdrop-filter: saturate(200%) blur(30px) contrast(115%);
						box-shadow:
							0 10px 40px rgba(0, 0, 0, 0.7),
							0 16px 70px rgba(0, 0, 0, 0.5),
							0 0 40px hsl(var(--olive) / 0.3),
							inset 0 2px 0 hsla(0, 0%, 100%, 0.22);
					}
				}

				@media (max-width: 640px) {
					.header-plaque {
						width: calc(100vw - 8px) !important;
						background: linear-gradient(
							135deg,
							hsla(0, 0%, 100%, 0.16) 0%,
							hsla(0, 0%, 100%, 0.06) 30%,
							hsla(0, 0%, 100%, 0.1) 60%,
							hsla(0, 0%, 100%, 0.12) 100%
						);
						backdrop-filter: saturate(170%) blur(24px) contrast(108%);
						border: 0.5px solid hsla(0, 0%, 100%, 0.11);
						box-shadow:
							0 4px 16px rgba(0, 0, 0, 0.5),
							0 8px 32px rgba(0, 0, 0, 0.3),
							inset 0 1px 0 hsla(0, 0%, 100%, 0.15);
					}

					.plaque-float::after {
						bottom: -12px;
						height: 20px;
						left: 25%;
						right: 25%;
					}
				}

				@media (max-width: 480px) {
					.header-plaque {
						width: calc(100vw - 4px) !important;
						padding: 0 12px !important;
						height: 44px !important;
					}
				}

				/* На случай, если где-то в проекте ещё встречается font-nav — подстраховка */
				.font-nav {
					font-family: var(--font-display), var(--font-sans), system-ui, sans-serif;
				}

				.tactical-scrollbar::-webkit-scrollbar {
					width: 6px;
				}
				.tactical-scrollbar::-webkit-scrollbar-track {
					background: hsl(220 15% 7%);
				}
				.tactical-scrollbar::-webkit-scrollbar-thumb {
					background: hsl(220 10% 17%);
					border-radius: 3px;
				}
				.tactical-scrollbar::-webkit-scrollbar-thumb:hover {
					background: hsl(var(--olive));
					box-shadow: 0 0 6px hsl(var(--olive) / 0.3);
				}
			`}</style>
		</>
	);
};

export default Header; // <- ОБЯЗАТЕЛЬНО

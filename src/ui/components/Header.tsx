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
							<nav className="flex items-center gap-6 md:hidden">
								<button className="font-tactical text-[14px] uppercase tracking-[0.08em] text-silver transition hover:text-white">
									КАТАЛОГ
								</button>
								<button className="font-tactical text-[14px] uppercase tracking-[0.08em] text-silver transition hover:text-white">
									О НАС
								</button>
								<button className="font-tactical text-[14px] uppercase tracking-[0.08em] text-silver transition hover:text-white">
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

	return (
		<>
			<motion.header
				className={`fixed left-0 right-0 top-2 z-40 transition-all duration-200 md:top-4 ${
					isScrolled ? "bg-transparent backdrop-blur-sm" : "bg-transparent"
				}`}
				style={{ height: headerHeight }}
			>
				<div className="mx-auto flex h-full w-full max-w-[96rem] items-center justify-center px-2 md:px-4">
					<motion.div
						className="header-plaque plaque-float group flex h-12 items-center justify-between gap-2 rounded-[28px] px-3 md:h-16 md:px-5"
						style={{ width: "clamp(340px, 90vw, 1180px)", y: yFloat }}
					>
						{/* Left: logo + nav */}
						<div className="flex min-w-0 items-center gap-4 md:gap-6">
							<button
								className="-ml-1 flex items-center md:-ml-2"
								aria-label="На главную"
								onClick={(e) => e.preventDefault()}
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc/25 bg-gradient-to-b from-graphite to-charcoal shadow-inner transition group-hover:ring-2 group-hover:ring-olive/25">
									<Logo size={22} showWordmark={false} />
								</div>
							</button>

							<nav className="hidden items-center gap-3 md:flex">
								{nav.map((item) => {
									const active = pathname === item.href;
									return (
										<a
											key={item.href}
											href={item.href}
											aria-current={active ? "page" : undefined}
											className={`relative font-tactical text-[14px] uppercase tracking-[0.08em] md:text-[15px] ${
												active ? "text-white" : "text-silver hover:text-white"
											} transition-colors`}
											onClick={(e) => e.preventDefault()}
										>
											<span className="relative">
												{item.label}
												{active && (
													<span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-olive/40 via-olive to-olive/40" />
												)}
											</span>
										</a>
									);
								})}
							</nav>
						</div>

						{/* Right: search + icons */}
						<div className="flex items-center gap-1.5 md:gap-2.5">
							<button
								onClick={() => setIsSearchOpen(true)}
								className="hidden h-9 items-center gap-2 rounded-full border border-zinc/20 bg-zinc/10 px-3 text-silver transition hover:border-olive/30 hover:bg-zinc/15 focus:outline-none focus:ring-2 focus:ring-olive/40 md:flex"
								aria-label="Открыть поиск"
							>
								<Search className="h-4 w-4" />
								<span className="text-[13px]">Поиск</span>
								<span className="font-mono text-[11px] text-silver/60">/</span>
							</button>

							<button
								className="rounded-lg p-2 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40"
								aria-label="Избранное"
							>
								<Heart className="h-[18px] w-[18px]" />
							</button>
							<button
								className="rounded-lg p-2 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40"
								aria-label="Профиль"
							>
								<UserIcon className="h-[18px] w-[18px]" />
							</button>

							<button
								onClick={() => setIsCartOpen(true)}
								className="relative rounded-lg p-2 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40"
								aria-label="Корзина"
							>
								<ShoppingBag className="h-[18px] w-[18px]" />
								{mockCart.count > 0 && (
									<span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-olive text-[10px] font-bold text-white shadow-[0_0_20px_hsl(var(--olive)_/_0.35)]">
										{mockCart.count > 99 ? "99+" : mockCart.count}
									</span>
								)}
							</button>

							<button
								onClick={() => setIsMobileMenuOpen(true)}
								className="rounded-lg p-2 text-silver transition hover:bg-zinc/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-olive/40 md:hidden"
								aria-label="Открыть меню"
							>
								<Menu className="h-6 w-6" />
							</button>
						</div>
					</motion.div>
				</div>
			</motion.header>

			<SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
			<CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
			<MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

			{/* Плашка и эффекты */}
			<style jsx global>{`
				.header-plaque {
					position: relative;
					background: hsla(0, 0%, 100%, 0.04);
					backdrop-filter: saturate(150%) blur(12px);
					border: 1px solid hsl(220 12% 20% / 0.35);
					box-shadow:
						0 16px 40px rgba(0, 0, 0, 0.45),
						0 3px 10px rgba(0, 0, 0, 0.35),
						inset 0 1px 0 rgba(255, 255, 255, 0.06);
					transition: transform 0.2s ease;
					isolation: isolate;
				}
				.header-plaque::before {
					content: "";
					position: absolute;
					inset: -1px;
					padding: 1px;
					border-radius: 28px;
					background: linear-gradient(135deg, hsl(var(--olive) / 0.35), rgba(255, 255, 255, 0.06));
					-webkit-mask:
						linear-gradient(#000 0 0) content-box,
						linear-gradient(#000 0 0);
					-webkit-mask-composite: xor;
					mask-composite: exclude;
					pointer-events: none;
				}
				.header-plaque::after {
					content: "";
					position: absolute;
					inset: 0;
					pointer-events: none;
					opacity: 0.06;
					background: radial-gradient(50% 60% at 20% 0%, rgba(255, 255, 255, 0.25), transparent 60%),
						radial-gradient(50% 60% at 80% 100%, hsl(var(--olive) / 0.25), transparent 65%);
				}
				.plaque-float::after {
					content: "";
					position: absolute;
					left: 10%;
					right: 10%;
					bottom: -18px;
					height: 28px;
					background: radial-gradient(closest-side, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0));
					filter: blur(10px);
					opacity: 0.55;
					z-index: -1;
					pointer-events: none;
				}
				.header-plaque:hover {
					transform: translateY(-2px);
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

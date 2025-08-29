"use client";

import Link from "next/link";
import { useState } from "react";
import { Send, Globe } from "lucide-react";
import { SiTelegram, SiVk } from "react-icons/si";
export type FooterProps = { channel: string }; // можно пока не использовать

interface FooterLink {
	href: string;
	label: string;
}
interface FooterSection {
	title: string;
	links: FooterLink[];
}

const SECTIONS: FooterSection[] = [
	{
		title: "ДОКТРИНА",
		links: [
			{ href: "/doctrine/breach", label: "Протокол Breach" },
			{ href: "/doctrine/core", label: "Fortress Core" },
			{ href: "/doctrine/shell", label: "Shadow Shell" },
			{ href: "/doctrine/kit", label: "Arsenal Kit" },
			{ href: "/doctrine/ops", label: "Legend Ops" },
		],
	},
	{
		title: "ПОДДЕРЖКА",
		links: [
			{ href: "/support/deploy", label: "Руководство по запуску" },
			{ href: "/support/maintain", label: "Обслуживание" },
			{ href: "/support/warranty", label: "Гарантия" },
			{ href: "/support/sizing", label: "Размерная сетка" },
			{ href: "/support/contact", label: "Контакты" },
		],
	},
	{
		title: "ЛЕГЕНДА",
		links: [
			{ href: "/legend/origin", label: "Происхождение" },
			{ href: "/legend/manifesto", label: "Манифест" },
			{ href: "/legend/technology", label: "Технологии" },
			{ href: "/legend/partners", label: "Партнёры" },
		],
	},
];

const LEGAL = [
	{ href: "/legal/privacy", label: "Конфиденциальность" },
	{ href: "/legal/terms", label: "Условия" },
	{ href: "/legal/cookies", label: "Файлы cookie" },
];

export function Footer({ channel }: FooterProps) {
	const [email, setEmail] = useState("");
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState<"idle" | "ok" | "fail">("idle");
	const year = new Date().getFullYear();

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;
		setBusy(true);
		try {
			// подключи свой реальный endpoint, например /api/newsletter
			await new Promise((r) => setTimeout(r, 800));
			setStatus("ok");
			setEmail("");
		} catch {
			setStatus("fail");
		} finally {
			setBusy(false);
			setTimeout(() => setStatus("idle"), 2500);
		}
	};

	return (
		<footer data-channel={channel} className="border-t border-white/10 bg-neutral-950 text-neutral-300">
			<div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
					{/* 4/12: бренд + рассылка */}
					<div className="space-y-6 md:col-span-4 md:space-y-8">
						<div className="space-y-3">
							<Link
								href="/"
								aria-label="На главную GRAYCARDINAL"
								className="inline-block font-black tracking-[0.18em] text-neutral-100 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
							>
								GRAYCARDINAL
							</Link>
							<p className="max-w-md text-xs leading-relaxed text-neutral-400 md:text-sm">
								Без компромиссов. Контроль и выносливость.{" "}
								<span className="font-medium text-neutral-200">Для несокрушимых.</span>
							</p>
						</div>

						{/* Канал связи (подписка) */}
						<div className="space-y-2">
							<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-300 md:text-[11px]">
								<span className="h-2 w-2 rounded-full bg-neutral-200" />
								Канал связи
							</div>

							<form onSubmit={submit} className="space-y-2" noValidate>
								<div className="flex max-w-sm flex-col gap-2 md:flex-row">
									<label htmlFor="relay" className="sr-only">
										Эл. почта
									</label>
									<input
										id="relay"
										type="email"
										autoComplete="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="email@домен"
										className="flex-1 rounded-xl border border-white/10 bg-neutral-900/70 px-3 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-500 focus:border-neutral-300 focus:ring-1 focus:ring-neutral-300"
										disabled={busy}
									/>
									<button
										type="submit"
										disabled={busy || !email}
										className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-100 transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:opacity-60"
									>
										{busy ? "Отправка…" : "Подписаться"}
										<Send className="h-3.5 w-3.5" aria-hidden="true" />
									</button>
								</div>
								<p className="min-h-5 text-xs" aria-live="polite" role="status">
									{status === "ok" && <span className="text-neutral-300">✓ Подключено к каналу связи</span>}
									{status === "fail" && (
										<span className="text-neutral-400">✗ Ошибка передачи. Повторите.</span>
									)}
								</p>
							</form>
						</div>
					</div>

					{/* 2/12 × 4: секции */}
					{SECTIONS.map((s) => (
						<div key={s.title} className="md:col-span-2">
							<div className="border-b border-white/10 pb-3 md:border-0 md:pb-0">
								<span className="block text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
									{s.title}
								</span>
							</div>
							<nav className="pt-4 md:pt-6">
								<ul className="space-y-2 md:space-y-3">
									{s.links.map((l) => (
										<li key={l.href}>
											<Link
												href={l.href}
												className="text-xs text-neutral-400 transition hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 md:text-sm"
											>
												{l.label}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</div>
					))}
				</div>

				{/* Нижняя полоса */}
				<div className="mt-10 border-t border-white/10 pt-4 md:mt-14 md:pt-6">
					<div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-6">
						{/* Юридическое меню слева */}
						<nav aria-label="Юридическая информация" className="order-2 w-full md:order-1 md:w-auto">
							<ul className="flex flex-col items-center gap-y-2 md:flex-row md:gap-x-6 md:gap-y-0">
								{LEGAL.map((l) => (
									<li key={l.href}>
										<Link
											href={l.href}
											className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-neutral-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 md:text-[11px]"
										>
											{l.label}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						{/* Соцсети по центру */}
						<div className="order-1 flex items-center justify-center gap-4 md:order-2 md:flex-1">
							<Link
								href="https://t.me/your_channel"
								prefetch={false}
								aria-label="Telegram"
								className="rounded-lg p-1.5 text-neutral-400 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
							>
								<SiTelegram className="h-4 w-4 md:h-5 md:w-5" />
							</Link>
							<Link
								href="https://vk.com/your_group"
								prefetch={false}
								aria-label="VK"
								className="rounded-lg p-1.5 text-neutral-400 hover:text-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
							>
								<SiVk className="h-4 w-4 md:h-5 md:w-5" />
							</Link>

							<span className="mx-2 h-4 w-px bg-white/10" aria-hidden="true" />

							{/* Плейсхолдер для каналов/валюты Saleor */}
							<button
								type="button"
								className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
								aria-label="Язык и валюта"
							>
								<Globe className="h-4 w-4" />
								RU / RUB
							</button>
						</div>

						{/* Копирайт справа */}
						<p className="order-3 text-[10px] uppercase tracking-[0.18em] text-neutral-500 md:order-3 md:text-[11px]">
							© {year} GRAYCARDINAL — Unyielding.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

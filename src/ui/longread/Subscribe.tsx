"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function isEmail(v: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function Subscribe() {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!isEmail(email)) {
			setStatus("error");
			return;
		}
		setStatus("loading");
		try {
			const res = await fetch("/api/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			if (!res.ok) throw new Error("failed");
			setStatus("ok");
		} catch {
			setStatus("error");
		}
	}

	return (
		<section className="relative bg-black text-white">
			<div className="mx-auto max-w-7xl px-6 py-24">
				<div className="mb-6 text-center">
					<h2 className="text-3xl font-black leading-tight" style={{ fontFamily: "var(--font-russo)" }}>
						РАННИЕ ДРОПЫ БЕЗ ШУМА
					</h2>
					<p className="mx-auto mt-2 max-w-2xl text-white/70">
						Никакого спама. Только релизы и закрытые предзаказы.
					</p>
				</div>

				<form onSubmit={onSubmit} className="mx-auto flex max-w-2xl flex-col items-center gap-3 sm:flex-row">
					<label className="sr-only" htmlFor="sub-email">
						E-mail
					</label>
					<input
						id="sub-email"
						type="email"
						placeholder="your@email.com"
						autoComplete="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-white/40 focus:border-white/30"
					/>
					<motion.button
						type="submit"
						whileTap={{ scale: 0.98 }}
						disabled={status === "loading" || status === "ok"}
						className="min-w-[11rem] rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-white/90 disabled:cursor-default disabled:opacity-70"
					>
						{status === "ok" ? "Готово ✓" : "Подписаться"}
					</motion.button>
				</form>

				{/* подсказки/статусы */}
				<div className="mt-3 text-center text-sm">
					{status === "error" && <span className="text-red-400/80">Проверь e-mail и попробуй ещё раз.</span>}
					{status === "ok" && (
						<span className="text-green-400/80">Спасибо! Подтверди подписку в письме.</span>
					)}
				</div>

				{/* политика */}
				<p className="mt-6 text-center text-xs text-white/50">
					Нажимая «Подписаться», ты соглашаешься с обработкой персональных данных и политикой
					конфиденциальности.
				</p>
			</div>

			{/* аккуратный «шум» на фоне */}
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,.04),transparent_60%)]" />
		</section>
	);
}

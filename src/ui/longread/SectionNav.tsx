/* FILE: src/ui/longread/SectionNav.tsx */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

/** ИДшники секций по умолчанию (если не найдём секции в DOM) */
const FALLBACK_IDS = ["underground", "arena", "range", "why"] as const;

type Chapter = { id: string; label: string };

function findChapters(): Chapter[] {
	if (typeof document === "undefined") return FALLBACK_IDS.map((id) => ({ id, label: id }));
	const nodes = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
	const ids = nodes.map((n) => n.id).filter((id) => FALLBACK_IDS.includes(id as any));
	const uniq = Array.from(new Set(ids));
	const base = uniq.length ? uniq : [...FALLBACK_IDS];
	return base.map((id) => ({
		id,
		label:
			id === "underground"
				? "Underground"
				: id === "arena"
					? "Arena"
					: id === "range"
						? "Tactical"
						: id === "why"
							? "Почему"
							: id,
	}));
}

export function SectionNav() {
	const chapters = useMemo(findChapters, []);
	const [active, setActive] = useState(0);

	// ref вместо зависимости useEffect на active — снимаем warning "missing dependency"
	const activeRef = useRef(active);
	useEffect(() => {
		activeRef.current = active;
	}, [active]);

	// IntersectionObserver для подсветки активной секции
	useEffect(() => {
		if (typeof window === "undefined") return;

		const opts: IntersectionObserverInit = {
			root: null,
			rootMargin: "-35% 0% -50% 0%",
			threshold: [0, 0.15, 0.35, 0.6, 1],
		};

		const handler: IntersectionObserverCallback = (entries) => {
			let maxRatio = -1;
			let currentIndex = activeRef.current; // используем ref, а не переменную из замыкания

			for (const e of entries) {
				const id = (e.target as HTMLElement).id;
				const idx = chapters.findIndex((c) => c.id === id);
				if (idx !== -1 && e.intersectionRatio > maxRatio) {
					maxRatio = e.intersectionRatio;
					currentIndex = idx;
				}
			}
			if (currentIndex !== activeRef.current) setActive(currentIndex);
		};

		const io = new IntersectionObserver(handler, opts);
		chapters.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) io.observe(el);
		});

		return () => io.disconnect();
	}, [chapters]);

	const jump = (idx: number) => {
		if (typeof window === "undefined") return;
		const id = chapters[idx]?.id;
		const el = id ? document.getElementById(id) : null;
		if (!el) return;

		const headerOffset = 72; // при необходимости подстрой
		const rect = el.getBoundingClientRect();
		const y = window.scrollY + rect.top - headerOffset;

		window.scrollTo({ top: y, behavior: "smooth" });
	};

	const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
			e.preventDefault();
			jump(Math.max(0, activeRef.current - 1));
		}
		if (e.key === "ArrowDown" || e.key === "ArrowRight") {
			e.preventDefault();
			jump(Math.min(chapters.length - 1, activeRef.current + 1));
		}
	};

	return (
		<div
			role="navigation"
			aria-label="Навигация по разделам"
			tabIndex={0}
			onKeyDown={onKey}
			className="
        /* на                   мобиле не рендерим */ /* убрал
        right-4, чтобы не конфликтовало
        со значением ниже */ pointer-events-none fixed top-1/2 z-30 hidden -translate-y-1/2
        [right:calc(env(safe-area-inset-right,0px)+16px)]
        lg:flex
      "
			style={{
				// drop-shadow вместо массивного box-shadow — не создаёт горизонтального скролла/«выступа»
				filter: "drop-shadow(0 6px 20px rgba(0,0,0,.35))",
			}}
		>
			<motion.div
				className="
          pointer-events-auto
          flex flex-col items-center gap-2
          rounded-[24px]
          border border-white/12
          bg-[rgba(20,20,22,0.45)] px-2
          py-3
          backdrop-blur-xl
        "
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
			>
				{chapters.map((c, idx) => {
					const isActive = idx === active;
					return (
						<button
							key={c.id}
							onClick={() => jump(idx)}
							aria-label={c.label}
							aria-current={isActive ? "true" : undefined}
							className="
                group relative
                grid h-6
                w-6
                place-items-center rounded-full
                transition-transform
                focus:outline-none focus-visible:ring-2 focus-visible:ring-olive/40
              "
						>
							<span
								className={`
                  block h-2.5 w-2.5 rounded-full
                  ${isActive ? "bg-white" : "bg-white/45 group-hover:bg-white/80"}
                  transition-colors
                `}
							/>
							{isActive && (
								<span className="absolute inset-0 animate-pulse rounded-full ring-2 ring-white/30" />
							)}

							<span
								className="
                  pointer-events-none absolute right-full top-1/2
                  mr-2 -translate-y-1/2
                  whitespace-nowrap
                  rounded-md border border-white/10
                  bg-[rgba(17,17,18,0.9)] px-2 py-1
                  text-[12px] leading-none text-white/90
                  opacity-0 shadow-lg backdrop-blur
                  transition-opacity
                  group-hover:opacity-100
                "
							>
								{c.label}
							</span>
						</button>
					);
				})}
			</motion.div>
		</div>
	);
}

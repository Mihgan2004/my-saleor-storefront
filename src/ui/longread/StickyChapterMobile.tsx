"use client";

import { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";

/**
 * Лёгкий прогресс-хук специально для мобилки.
 * Возвращает motionValue 0..1, насколько секция прокручена в пределах своей высоты.
 * Без sticky, без тяжелых вычислений. Внутри — rAF + passive scroll.
 */
export function useChapterProgressMobile<T extends HTMLElement>() {
	const ref = useRef<T | null>(null);
	const progress = useMotionValue(0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const rect = el.getBoundingClientRect();
				const vh = window.innerHeight || 1;
				// 0 — секция ещё выше экрана, 1 — секция полностью пройдена
				const total = rect.height + vh;
				const passed = Math.min(Math.max(vh - rect.top, 0), total);
				progress.set(total ? passed / total : 0);
			});
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [progress]);

	return { ref, progress };
}

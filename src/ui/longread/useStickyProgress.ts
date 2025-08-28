// src/ui/longread/useStickyProgress.ts
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useMotionValue } from "framer-motion";

function useMediaQuery(query: string, ssrFallback = false) {
	const mql = useMemo(() => (typeof window !== "undefined" ? window.matchMedia(query) : null), [query]);
	const ref = useRef<boolean>(ssrFallback);
	useEffect(() => {
		if (!mql) return;
		const on = () => (ref.current = mql.matches);
		on();
		mql.addEventListener?.("change", on);
		return () => mql.removeEventListener?.("change", on);
	}, [mql]);
	return mql ? mql.matches : ref.current;
}

export type UseStickyProgressOptions = {
	desktopQuery?: string; // min-width переключения sticky
	desktopSceneVh?: number; // высота sticky-сцены на десктопе (vh)
};

/**
 * Адаптивный прогресс 0..1:
 *  - >=lg: sticky-сцена высотой desktopSceneVh с "прилипающим" stage (top-0, h-100svh)
 *  - <lg: обычный скролл без sticky (минимум лагов)
 *
 * Совместимость: возвращаем `ref` (как в старой версии), а также containerRef/stageRef и props.
 */
export function useStickyProgress<TContainer extends HTMLElement, TStage extends HTMLElement = TContainer>(
	opts: UseStickyProgressOptions = {},
) {
	const { desktopQuery = "(min-width:1024px)", desktopSceneVh = 420 } = opts;

	const isDesktop = useMediaQuery(desktopQuery, false);
	const containerRef = useRef<TContainer | null>(null);
	const stageRef = useRef<TStage | null>(null);
	const progress = useMotionValue(0);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const rect = el.getBoundingClientRect();
				const vh = window.innerHeight || 1;

				if (isDesktop) {
					const total = Math.max(el.offsetHeight - vh, 1);
					const passed = Math.min(Math.max(-rect.top, 0), total);
					progress.set(passed / total);
				} else {
					const total = Math.max(rect.height + vh, 1);
					const passed = Math.min(Math.max(vh - rect.top, 0), total);
					progress.set(passed / total);
				}
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
	}, [isDesktop, progress]);

	const containerProps = isDesktop
		? {
				style: { height: `${desktopSceneVh}vh`, contain: "layout paint style" as const },
				className: "relative",
			}
		: { style: { contain: "layout paint style" as const }, className: "relative" };

	const stageProps = isDesktop ? { className: "sticky top-0 h-[100svh]" } : { className: "" };

	// Сохранение совместимости со старым API (ref == containerRef)
	const ref = containerRef;

	return { isDesktop, progress, ref, containerRef, stageRef, containerProps, stageProps };
}

export default useStickyProgress;

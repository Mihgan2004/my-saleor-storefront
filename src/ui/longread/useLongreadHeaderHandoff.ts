"use client";
import { useEffect, useRef } from "react";

export function useLongreadHeaderHandoff() {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const root = document.documentElement;
		const el = ref.current;
		if (!el) return;

		const io = new IntersectionObserver(
			([e]) => {
				if (e.isIntersecting) root.setAttribute("data-longread-active", "true");
				else root.removeAttribute("data-longread-active");
			},
			{ threshold: 0.15 },
		);

		io.observe(el);
		return () => {
			io.disconnect();
			root.removeAttribute("data-longread-active");
		};
	}, []);

	return { ref };
}

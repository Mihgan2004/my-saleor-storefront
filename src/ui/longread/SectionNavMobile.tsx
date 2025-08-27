"use client";

import { useEffect, useMemo, useState } from "react";

export type SectionNavItem = { id: string; label: string };

export function SectionNavMobile({ items }: { items: SectionNavItem[] }) {
	const [active, setActive] = useState(items[0]?.id ?? "");
	const idSet = useMemo(() => new Set(items.map((i) => i.id)), [items]);

	useEffect(() => {
		const onScroll = () => {
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
	}, [items, active, idSet]);

	const activeIndex = Math.max(
		0,
		items.findIndex((x) => x.id === active),
	);
	const prog = items.length <= 1 ? 1 : activeIndex / (items.length - 1);

	return (
		<div className="pointer-events-none fixed bottom-3 left-0 right-0 z-40 mx-auto w-full max-w-sm px-5">
			<div className="flex items-center justify-between gap-3 rounded-full bg-black/35 p-2 ring-1 ring-white/10 backdrop-blur-md">
				<div className="pointer-events-auto flex flex-1 items-center justify-center gap-3">
					{items.map((it) => {
						const is = it.id === active;
						return (
							<a
								key={it.id}
								href={`#${it.id}`}
								className="group relative block h-3 w-3 rounded-full bg-white/25 ring-1 ring-white/20"
								aria-label={it.label}
							>
								{is && <span className="absolute inset-0 rounded-full bg-white transition-all" />}
							</a>
						);
					})}
				</div>
				<div
					className="hidden min-w-[120px] items-center justify-end pr-1 text-right text-[12px] font-semibold text-white/80 sm:flex"
					aria-live="polite"
				>
					{items[activeIndex]?.label ?? ""}
				</div>
			</div>
			<div className="mx-auto mt-2 h-0.5 w-40 overflow-hidden rounded-full bg-white/15">
				<div
					className="h-full bg-white"
					style={{ width: `${prog * 100}%`, transition: "width 250ms ease" }}
				/>
			</div>
		</div>
	);
}

"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export function SectionNavMobile({ items }: { items: Item[] }) {
	const [active, setActive] = useState<string>(items[0]?.id);

	useEffect(() => {
		const observers: IntersectionObserver[] = [];
		items.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (!el) return;
			const io = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) setActive(id);
				},
				{ rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
			);
			io.observe(el);
			observers.push(io);
		});
		return () => observers.forEach((o) => o.disconnect());
	}, [items]);

	return (
		<nav
			className="
        full-bleed fixed inset-x-0 bottom-0 z-50
        px-3 pb-[max(10px,env(safe-area-inset-bottom))]
      "
			aria-label="Разделы"
		>
			<div
				className="
          bg-white/8 mx-3 flex items-center justify-between gap-2
          rounded-2xl
          border border-white/10 p-2 shadow-[0_10px_30px_0_rgba(0,0,0,0.35)]
          backdrop-blur
        "
			>
				{items.map((it) => {
					const isActive = it.id === active;
					return (
						<a
							key={it.id}
							href={`#${it.id}`}
							className={`
                flex-1 rounded-xl py-2 text-center text-[13px]
                transition
                ${isActive ? "bg-white/15 font-semibold" : "opacity-80 hover:opacity-100"}
              `}
						>
							{it.label}
						</a>
					);
				})}
			</div>
		</nav>
	);
}

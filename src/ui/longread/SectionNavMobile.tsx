"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type SectionNavMobileItem = { id: string; label: string };

export function SectionNavMobile({ items }: { items: SectionNavMobileItem[] }) {
	const [active, setActive] = useState(items[0]?.id ?? "");

	useEffect(() => {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
			},
			{ rootMargin: "-55% 0px -35% 0px", threshold: 0.01 },
		);

		items.forEach((it) => {
			const el = document.getElementById(it.id);
			if (el) io.observe(el);
		});

		return () => io.disconnect();
	}, [items]);

	const go = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<nav className="fixed bottom-3 right-3 z-50">
			<ul className="flex items-center gap-2 rounded-full bg-black/40 px-2 py-2 backdrop-blur">
				{items.map((it) => {
					const isActive = it.id === active;
					return (
						<li key={it.id}>
							<motion.button
								onClick={() => go(it.id)}
								aria-label={it.label}
								aria-current={isActive}
								className={`h-3.5 w-3.5 rounded-full ring-1 ring-white/40 ${
									isActive ? "bg-white" : "bg-white/50"
								}`}
								whileTap={{ scale: 0.9 }}
								whileHover={{ scale: 1.1 }}
								transition={{ duration: 0.16 }}
							/>
						</li>
					);
				})}
			</ul>
			<div className="mt-1 text-center text-[10px] text-white/60">
				{items.length > 0 ? "1–" + items.length : ""}
			</div>
		</nav>
	);
}

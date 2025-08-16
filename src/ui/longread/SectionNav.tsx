"use client";
import { useEffect, useState } from "react";

const items = [
	{ id: "hero", label: "Hero", key: "1" },
	{ id: "underground", label: "Underground", key: "2" },
	{ id: "arena", label: "Arena", key: "3" },
	{ id: "range", label: "Range", key: "4" },
];

export function SectionNav() {
	const [active, setActive] = useState("hero");

	useEffect(() => {
		const io = new IntersectionObserver(
			(entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
			{ rootMargin: "-45% 0px -45% 0px", threshold: 0.01 },
		);
		items.forEach((i) => {
			const el = document.getElementById(i.id);
			if (el) io.observe(el);
		});
		return () => io.disconnect();
	}, []);

	// горячие клавиши 1..4
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			const idx = Number(e.key) - 1;
			if (idx >= 0 && idx < items.length) {
				document.getElementById(items[idx].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	return (
		<nav className="fixed right-5 top-1/2 z-[60] -translate-y-1/2">
			<ul className="flex flex-col items-center gap-3 rounded-full bg-black/35 px-2 py-3 backdrop-blur">
				{items.map((it) => (
					<li key={it.id}>
						<button
							aria-label={it.label}
							onClick={() =>
								document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
							}
							className={[
								"grid h-3.5 w-3.5 place-items-center rounded-full ring-1 ring-white/40 transition-all",
								active === it.id ? "scale-125 bg-white" : "bg-white/45 hover:bg-white/80",
							].join(" ")}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}

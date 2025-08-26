"use client";

import { useEffect, useState } from "react";

const items = [
	{ id: "underground", label: "Underground" },
	{ id: "arena", label: "Arena" },
	{ id: "range", label: "Range" },
];

export function SectionNavMobile() {
	const [active, setActive] = useState(items[0].id);

	useEffect(() => {
		const io = new IntersectionObserver(
			(entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
			{ rootMargin: "-40% 0px -40% 0px", threshold: 0.01 },
		);
		items.forEach((i) => {
			const el = document.getElementById(i.id);
			if (el) io.observe(el);
		});
		return () => io.disconnect();
	}, []);

	return (
		<nav className="fixed inset-x-0 bottom-5 z-50 mx-auto w-full max-w-md px-5 lg:hidden">
			<ul className="flex items-center justify-center gap-3 rounded-full bg-black/50 p-2 backdrop-blur">
				{items.map((it) => (
					<li key={it.id}>
						<button
							aria-label={it.label}
							onClick={() =>
								document.getElementById(it.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
							}
							className={[
								"grid h-3.5 w-3.5 place-items-center rounded-full ring-1 ring-white/40 transition-all",
								active === it.id ? "scale-125 bg-white" : "bg-white/45",
							].join(" ")}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}

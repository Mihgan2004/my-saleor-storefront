/// FILE: src/ui/longread/SectionNav.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface NavItem {
	id: string;
	label: string;
	key: string;
}

const items: NavItem[] = [
	{ id: "hero", label: "Hero", key: "1" },
	{ id: "underground", label: "Underground", key: "2" },
	{ id: "arena", label: "Arena", key: "3" },
	{ id: "range", label: "Range", key: "4" },
];

export function SectionNav() {
	const [active, setActive] = useState("hero");

	// IntersectionObserver for tracking active section
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActive(entry.target.id);
					}
				});
			},
			{
				rootMargin: "-40% 0px -40% 0px",
				threshold: 0.01,
			},
		);

		items.forEach((item) => {
			const element = document.getElementById(item.id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	}, []);

	// Hotkeys 1..4
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const index = Number(e.key) - 1;
			if (index >= 0 && index < items.length) {
				const targetId = items[index].id;
				const element = document.getElementById(targetId);
				if (element) {
					element.scrollIntoView({
						behavior: "smooth",
						block: "start",
					});
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const handleNavClick = (targetId: string) => {
		const element = document.getElementById(targetId);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	// Check reduced motion
	const shouldReduceMotion =
		typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

	return (
		<nav
			className="fixed right-5 top-1/2 z-[60] -translate-y-1/2"
			role="navigation"
			aria-label="Section navigation"
		>
			<ul className="flex flex-col items-center gap-3 rounded-full bg-black/35 px-2 py-3 backdrop-blur">
				{items.map((item) => {
					const isActive = active === item.id;

					return (
						<li key={item.id}>
							<motion.button
								onClick={() => handleNavClick(item.id)}
								aria-label={`Go to ${item.label} section`}
								aria-current={isActive ? "true" : "false"}
								className={[
									"grid h-3.5 w-3.5 place-items-center rounded-full ring-1 ring-white/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/50",
									isActive ? "bg-white" : "bg-white/45 hover:bg-white/80",
								].join(" ")}
								whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
								whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
								animate={
									shouldReduceMotion
										? {}
										: {
												scale: isActive ? 1.25 : 1,
											}
								}
								transition={{
									duration: shouldReduceMotion ? 0 : 0.18,
									ease: [0.22, 0.61, 0.36, 1],
								}}
							>
								{/* Visual indication for screen readers only */}
								<span className="sr-only">
									{item.label} {isActive ? "(current section)" : ""}
								</span>
							</motion.button>
						</li>
					);
				})}
			</ul>

			{/* Hotkey hint */}
			<div className="mt-2 text-center">
				<span className="text-[10px] text-white/50">1-4</span>
			</div>
		</nav>
	);
}

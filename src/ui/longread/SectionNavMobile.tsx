"use client";

import { motion } from "framer-motion";
import React from "react";

export interface NavItem {
	id: string;
	label: string;
}

interface SectionNavMobileProps {
	items: NavItem[];
}

export function SectionNavMobile({ items }: SectionNavMobileProps) {
	return (
		<motion.div
			className="pointer-events-none fixed left-0 right-0 z-50 mx-auto w-full max-w-sm px-5"
			style={{ bottom: "max(env(safe-area-inset-bottom), 16px)" }}
			initial={{ y: 100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 100, opacity: 0 }}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 30,
				opacity: { duration: 0.2 },
			}}
		>
			<div className="flex items-center justify-center gap-2 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md">
				{items.map((item) => (
					<button
						key={item.id}
						className="h-2 w-2 rounded-full bg-white/40 transition hover:bg-white"
						aria-label={item.label}
						onClick={() => {
							const section = document.querySelector(`[data-section='${item.id}']`);
							section?.scrollIntoView({ behavior: "smooth" });
						}}
					/>
				))}
			</div>
		</motion.div>
	);
}

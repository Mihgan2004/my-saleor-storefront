"use client";

import { forwardRef } from "react";
import clsx from "clsx";

type Props = {
	className?: string;
	children?: React.ReactNode;
};

/**
 * Унифицированный «кадр» с ровными углами и тонкой рамкой.
 * Внутри всегда relative + overflow-hidden, чтобы мозаика/слайды и хот-споты
 * резались по тем же углам, что и рамка.
 */
export const Frame = forwardRef<HTMLDivElement, Props>(function Frame({ className, children }, ref) {
	return (
		<div
			ref={ref}
			className={clsx(
				"relative h-full overflow-hidden rounded-2xl bg-black/15",
				"transform-gpu", // антиалиасинг на трансформациях
				className,
			)}
		>
			{/* Рамка */}
			<div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
			{children}
		</div>
	);
});

/* src/ui/components/Logo.tsx */
"use client";
import * as React from "react";

type LogoProps = {
	size?: number; // высота иконки в px (ширина авто)
	showWordmark?: boolean; // показывать ли подпись GREYCARDINAL
	className?: string;
};

export function Logo({ size = 44, showWordmark = true, className }: LogoProps) {
	return (
		<div className={`flex items-center gap-3 ${className ?? ""}`}>
			{/* Monogram Shield */}
			<svg width={size} height={size} viewBox="0 0 120 120" aria-hidden className="shrink-0">
				{/* Shield outline */}
				<path
					d="M60 6l44 18v36c0 24-16 44-44 56C32 104 16 84 16 60V24L60 6z"
					fill="hsl(var(--charcoal))"
					stroke="hsl(var(--silver))"
					strokeWidth="4"
					strokeLinejoin="round"
				/>
				{/* Left 'G' block (light) */}
				<path d="M30 92V28h28v20H46v16l12 12v20L30 92z" fill="hsl(var(--white))" />
				{/* Right 'C' block (dark) */}
				<path d="M90 92V40H66v44h10c8 0 14 3 14 8z" fill="hsl(var(--slate))" />
				{/* Diagonal 2113 (stencil-like) */}
				<g transform="translate(60,66) rotate(-36)">
					<text
						x="-8"
						y="0"
						fontFamily="var(--font-display), system-ui, sans-serif"
						fontWeight="700"
						fontSize="22"
						letterSpacing="1"
						fill="hsl(var(--silver))"
						opacity="0.85"
					>
						2113
					</text>
				</g>
				{/* Accent hairline */}
				<path d="M24 104h72" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.6" />
			</svg>

			{/* Wordmark */}
			{showWordmark && (
				<div className="leading-none">
					<span className="font-tactical text-[18px] uppercase tracking-[0.12em]">
						<span className="text-[hsl(var(--silver))]">GREY</span>
						<span className="pl-1 text-white">CARDINAL</span>
					</span>
				</div>
			)}
		</div>
	);
}

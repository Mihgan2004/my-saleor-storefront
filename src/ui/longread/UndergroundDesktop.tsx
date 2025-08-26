/// FILE: src/ui/longread/UndergroundDesktop.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useTransform } from "framer-motion";
import { ProductHotspotDesktop } from "./ProductHotspot.desktop";
import { Frame } from "./Frame";
import { useStickyProgress } from "./useStickyProgress";

const IMG_W = 1920;
const IMG_H = 1080;

interface Hotspot {
	ix: number;
	iy: number;
	label: string;
	href: string;
	side?: "left" | "right";
}

const HOTSPOTS_FRAME_A: Hotspot[] = [
	/* … без изменений … */
];
const HOTSPOTS_FRAME_B: Hotspot[] = [
	/* … без изменений … */
];

function useViewportSize() {
	const [size, setSize] = useState({ w: 0, h: 0 });
	useEffect(() => {
		const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
		fn();
		window.addEventListener("resize", fn, { passive: true });
		return () => window.removeEventListener("resize", fn);
	}, []);
	return size;
}

function mapCoverToViewport(ix: number, iy: number, W: number, H: number) {
	const scale = Math.max(W / IMG_W, H / IMG_H);
	const dispW = IMG_W * scale;
	const dispH = IMG_H * scale;
	const dx = (W - dispW) / 2;
	const dy = (H - dispH) / 2;
	const xPx = dx + ix * dispW;
	const yPx = dy + iy * dispH;
	return { x: (xPx / W) * 100, y: (yPx / H) * 100 };
}

export function UndergroundDesktop() {
	const { w: W, h: H } = useViewportSize();
	const { ref, progress } = useStickyProgress<HTMLDivElement>();

	const shouldReduceMotion =
		typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

	const fadeA = useTransform<number, number>(progress, [0, 0.5, 1], [1, 0, 0]);
	const fadeB = useTransform<number, number>(progress, [0, 0.5, 1], [0, 1, 0]);
	const bgY = useTransform<number, string>(progress, [0, 1], ["4%", "-2%"]);
	const bgScale = useTransform<number, number>(progress, [0, 1], [1.03, 1]);
	const titleY = useTransform<number, string>(progress, [0.08, 0.22], ["0px", "-6%"]);
	const titleOp = useTransform<number, number>(progress, [0.08, 0.22], [0, 1]);
	const copyOp = useTransform<number, number>(progress, [0.14, 0.3], [0, 1]);

	const hotspotsA = useMemo(
		() =>
			!W || !H
				? []
				: HOTSPOTS_FRAME_A.map(({ ix, iy, ...rest }) => ({ ...mapCoverToViewport(ix, iy, W, H), ...rest })),
		[W, H],
	);
	const hotspotsB = useMemo(
		() =>
			!W || !H
				? []
				: HOTSPOTS_FRAME_B.map(({ ix, iy, ...rest }) => ({ ...mapCoverToViewport(ix, iy, W, H), ...rest })),
		[W, H],
	);

	return (
		<section
			id="underground"
			ref={ref}
			className="relative bg-black text-white"
			style={{ height: "420vh", contain: "layout paint style" }}
		>
			<div className="sticky top-0 h-screen overflow-hidden">
				<div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[18vh] bg-gradient-to-b from-black to-transparent" />
				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[30vh] bg-gradient-to-t from-black/75 to-transparent" />

				<div className="absolute inset-0 z-20">
					{/* Frame A */}
					<motion.div
						className="absolute inset-0 will-change-transform"
						style={{
							opacity: fadeA,
							y: shouldReduceMotion ? 0 : bgY,
							scale: shouldReduceMotion ? 1 : bgScale,
						}}
					>
						<Image
							src="/images/longread/underground-1.avif"
							alt="Silhouette by neon portal"
							fill
							priority
							sizes="100vw"
							className="object-cover"
						/>
						<div className="absolute inset-0">
							{hotspotsA.map((h, i) => (
								<ProductHotspotDesktop
									key={`frame-a-${i}`}
									x={h.x}
									y={h.y}
									label={h.label}
									href={h.href}
									side={h.side}
									progress={fadeA}
									appearAt={0.2}
									chapter="underground"
									variant="frame-a"
								/>
							))}
						</div>
					</motion.div>

					{/* Frame B */}
					<motion.div
						className="absolute inset-0 will-change-transform"
						style={{
							opacity: fadeB,
							y: shouldReduceMotion ? 0 : bgY,
							scale: shouldReduceMotion ? 1 : bgScale,
						}}
					>
						<Image
							src="/images/longread/underground-2.avif"
							alt="Neon clothing details"
							fill
							sizes="100vw"
							className="object-cover"
						/>
						<div className="absolute inset-0">
							{hotspotsB.map((h, i) => (
								<ProductHotspotDesktop
									key={`frame-b-${i}`}
									x={h.x}
									y={h.y}
									label={h.label}
									href={h.href}
									side={h.side}
									progress={fadeB}
									appearAt={0.3}
									chapter="underground"
									variant="frame-b"
								/>
							))}
						</div>
					</motion.div>
				</div>

				<div className="pointer-events-none relative z-40 mx-auto grid h-full max-w-7xl grid-cols-12 gap-6 px-6">
					<motion.div
						className="pointer-events-auto col-span-6 self-end pb-20"
						style={{ y: shouldReduceMotion ? 0 : titleY, opacity: titleOp }}
					>
						<h2 className="mb-2 text-5xl font-black leading-tight">NOT FOR EVERYONE</h2>
						<motion.p className="max-w-xl text-white/85" style={{ opacity: copyOp }}>
							Noise of asphalt, silence of rules. We choose our own path.
						</motion.p>
					</motion.div>

					<Frame
						className="pointer-events-none col-span-6"
						overlayClassName="bg-cyan-500/5"
						progress={fadeB}
					/>
				</div>
			</div>
		</section>
	);
}

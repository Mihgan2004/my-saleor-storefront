// src/ui/longread/RangeMobile.tsx
"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ProductHotspotMobile } from "./ProductHotspot.mobile";
import { Frame } from "./Frame";
import { useStickyProgress } from "./useStickyProgress";

function Tile({
	src,
	alt,
	y,
	className,
	pos = "50% 50%",
	priority = false,
}: {
	src: string;
	alt: string;
	y?: MotionValue<string>;
	className: string;
	pos?: string;
	priority?: boolean;
}) {
	return (
		<motion.figure className={className} style={{ y }}>
			<Image
				src={src}
				alt={alt}
				fill
				sizes="100vw"
				className="object-cover"
				style={{ objectPosition: pos }}
				priority={priority}
			/>
			<figcaption className="sr-only">{alt}</figcaption>
		</motion.figure>
	);
}

export function RangeMobile() {
	const { ref, progress } = useStickyProgress<HTMLDivElement>();

	const shouldReduceMotion =
		typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;

	const ySlow = useTransform<number, string>(progress, [0, 1], ["-3%", "3%"]);
	const yMid = useTransform<number, string>(progress, [0, 1], ["-5%", "5%"]);
	const yFast = useTransform<number, string>(progress, [0, 1], ["-6%", "6%"]);

	const ySlowStyle = shouldReduceMotion ? undefined : ySlow;
	const yMidStyle = shouldReduceMotion ? undefined : yMid;
	const yFastStyle = shouldReduceMotion ? undefined : yFast;

	const titleX = useTransform<number, string>(progress, [0.06, 0.18], ["-16px", "0px"]);
	const titleOpacity = useTransform<number, number>(progress, [0.06, 0.18], [0, 1]);
	const copyOpacity = useTransform<number, number>(progress, [0.12, 0.28], [0, 1]);

	return (
		<section
			id="range"
			ref={ref}
			className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-[100vw] bg-black text-white"
			style={{ height: "420vh", contain: "layout paint style" }}
		>
			<div className="sticky top-0 h-[100svh] overflow-hidden">
				<div className="absolute inset-x-0 top-0 z-10 h-[18vh] bg-gradient-to-b from-black to-transparent" />

				<div className="relative z-20 mx-auto flex h-full items-center px-4">
					<div className="grid h-[80vh] w-full grid-cols-1 gap-6">
						<div className="flex flex-col">
							<div className="self-center">
								<motion.h2
									className="mb-3 text-4xl font-black leading-tight"
									style={{ x: shouldReduceMotion ? undefined : titleX, opacity: titleOpacity }}
								>
									ГОТОВ К ПОЛЮ
								</motion.h2>
								<motion.p className="max-w-md text-white/85" style={{ opacity: copyOpacity }}>
									Функция первична. Материалы — выносливые, посадка — рабочая, эстетика — строгая.
								</motion.p>
								<motion.ul className="mt-6 space-y-2 text-white/80" style={{ opacity: copyOpacity }}>
									<li>• защита от износа и погоды</li>
									<li>• модульность и крепления</li>
									<li>• тёмная палитра ради фокуса</li>
								</motion.ul>
							</div>
						</div>

						<Frame
							className="relative"
							overlayClassName="bg-lime-500/5"
							progress={useTransform<number, number>(progress, [0.6, 1], [0, 1])}
						>
							<div className="grid h-full grid-cols-1 gap-4 bg-black/10">
								<Tile
									src="/images/longread/range-1.avif"
									alt="Петлевая панель"
									y={ySlowStyle}
									className="relative row-span-6"
									pos="55% 40%"
									priority
								/>
								<Tile
									src="/images/longread/range-2.avif"
									alt="Ламинированный шов"
									y={yMidStyle}
									className="relative row-span-3"
									pos="60% 50%"
								/>
								<Tile
									src="/images/longread/range-3.avif"
									alt="Усиленный бар-так"
									y={yFastStyle}
									className="relative row-span-3"
									pos="58% 58%"
								/>
							</div>

							<ProductHotspotMobile
								x={30}
								y={40}
								label="Панель под съёмный ярлык"
								href="/products/loop-panel"
								progress={progress}
								appearAt={0.6}
								chapter="range"
								variant="loop-panel"
							/>
							<ProductHotspotMobile
								x={75}
								y={28}
								label="Влагозащитная молния"
								href="/products/sealed-zip"
								progress={progress}
								appearAt={0.65}
								chapter="range"
								variant="sealed-zip"
							/>
							<ProductHotspotMobile
								x={74}
								y={72}
								label="Бар-так усиленный"
								href="/products/bartack-detail"
								side="left"
								progress={progress}
								appearAt={0.7}
								chapter="range"
								variant="bartack"
							/>
						</Frame>
					</div>
				</div>

				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-gradient-to-t from-black/70 to-transparent" />
			</div>
		</section>
	);
}

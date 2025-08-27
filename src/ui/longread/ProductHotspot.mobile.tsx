"use client";

import Link from "next/link";
import { motion, type MotionValue } from "framer-motion";

export type ProductHotspotMobileProps = {
	x: number; // %
	y: number; // %
	label: string;
	href: string;
	progress?: MotionValue<number>; // 0..1
};

export function ProductHotspotMobile({ x, y, label, href, progress }: ProductHotspotMobileProps) {
	return (
		<motion.div
			className="pointer-events-auto absolute select-none"
			style={{
				left: `${x}%`,
				top: `${y}%`,
				x: "-50%",
				y: "-50%",
				opacity: progress ?? 1,
				scale: progress ?? 1,
			}}
			initial={{ scale: 0, opacity: 0, rotate: -180 }}
			animate={{ scale: 1, opacity: 1, rotate: 0 }}
			exit={{ scale: 0, opacity: 0, rotate: 180 }}
			transition={{
				type: "spring",
				stiffness: 200,
				damping: 20,
				opacity: { duration: 0.3 },
			}}
		>
			<Link href={href} className="group relative flex items-center gap-3" aria-label={label}>
				{/* Enhanced hotspot button with multiple animations */}
				<motion.div
					className="relative"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					transition={{ type: "spring", stiffness: 400, damping: 15 }}
				>
					{/* Pulsing ring effect */}
					<motion.div
						className="absolute inset-0 rounded-full bg-white/20 blur-sm"
						animate={{
							scale: [1, 1.5, 1],
							opacity: [0.5, 0, 0.5],
						}}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>

					{/* Secondary pulse ring */}
					<motion.div
						className="absolute inset-0 rounded-full bg-white/30 blur-[2px]"
						animate={{
							scale: [1, 1.3, 1],
							opacity: [0.3, 0, 0.3],
						}}
						transition={{
							duration: 2.5,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 0.5,
						}}
					/>

					{/* Main hotspot button */}
					<motion.div
						className="relative grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-xl ring-2 ring-black/20 backdrop-blur-sm sm:h-11 sm:w-11"
						animate={{
							y: [0, -2, 0],
							boxShadow: [
								"0 10px 20px rgba(0,0,0,0.3)",
								"0 15px 30px rgba(0,0,0,0.4)",
								"0 10px 20px rgba(0,0,0,0.3)",
							],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					>
						{/* Plus icon with rotation animation */}
						<motion.svg
							width="14"
							height="14"
							viewBox="0 0 14 14"
							className="text-black"
							aria-hidden
							animate={{ rotate: [0, 90, 0] }}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
						</motion.svg>

						{/* Glowing effect */}
						<motion.div
							className="absolute inset-0 rounded-full bg-white/60 blur-md"
							animate={{
								opacity: [0.3, 0.7, 0.3],
								scale: [0.8, 1.2, 0.8],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					</motion.div>
				</motion.div>

				{/* Enhanced label with better styling */}
				<motion.div
					className="relative"
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					whileHover={{ scale: 1.02 }}
				>
					<motion.div
						className="relative rounded-full bg-white/95 px-4 py-2 shadow-xl ring-1 ring-black/10 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:shadow-2xl"
						whileHover={{
							y: -1,
							boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
						}}
					>
						<span className="whitespace-nowrap text-[13px] font-semibold text-black sm:text-[14px]">
							{label}
						</span>

						{/* Subtle shine effect */}
						<motion.div
							className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
							initial={{ x: "-100%" }}
							whileHover={{ x: "100%" }}
							transition={{ duration: 0.6 }}
						/>
					</motion.div>
				</motion.div>

				{/* Connection line with animation */}
				<motion.div
					className="absolute left-5 top-1/2 h-px w-3 bg-white/60"
					initial={{ scaleX: 0, opacity: 0 }}
					animate={{ scaleX: 1, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					style={{ transformOrigin: "left" }}
				/>
			</Link>
		</motion.div>
	);
}

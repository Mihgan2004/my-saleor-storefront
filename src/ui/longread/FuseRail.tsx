// FILE: src/ui/longread/FuseRail.tsx
"use client";
import { motion, type MotionValue, useTransform } from "framer-motion";

export function FuseRail({ progress }: { progress: MotionValue<number> }) {
	const fillH = useTransform(progress, [0, 1], ["0%", "100%"]);
	const sparkTop = useTransform(progress, [0, 1], ["0%", "100%"]);

	return (
		<div className="absolute inset-y-0 left-3 z-20 w-[2px]">
			<div className="absolute inset-y-0 left-0 w-[2px] bg-white/12" />
			<motion.div className="absolute left-0 top-0 w-[2px] bg-white" style={{ height: fillH }} />
			<motion.div className="absolute left-0 -translate-x-1/2" style={{ top: sparkTop }}>
				<div className="relative h-3.5 w-3.5 -translate-y-1/2">
					<span className="absolute inset-0 rounded-full bg-white" />
					<span className="absolute -inset-2 rounded-full bg-white/60 blur-sm" />
				</div>
			</motion.div>
		</div>
	);
}

"use client";
import { ChapterMobile } from "./ChapterMobile";

export function UndergroundMobile() {
	return (
		<ChapterMobile
			id="underground"
			tone="cyan"
			kicker="UNDERGROUND"
			title="NOT FOR EVERYONE"
			slides={[
				{
					type: "bg",
					bgClass:
						// киберпанк: мягкий неоновый градиент без картинок
						"rounded-[22px] bg-[radial-gradient(80%_80%_at_50%_0%,rgba(34,211,238,0.18),transparent_60%),radial-gradient(80%_80%_at_50%_100%,rgba(34,211,238,0.10),transparent_55%)]",
					hotspots: [
						{ x: 28, y: 36, label: "Светоотражающие акценты", href: "/products/reflect" },
						{ x: 66, y: 58, label: "Влагозащита", href: "/products/waterproof", side: "left" as const },
					],
				},
			]}
		/>
	);
}

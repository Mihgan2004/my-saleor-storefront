"use client";
import { ChapterMobile } from "./ChapterMobile";

export function UndergroundMobile() {
	return (
		<ChapterMobile
			id="underground"
			tone="cyan"
			kicker="UNDERGROUND"
			title="NOT FOR EVERYONE"
			lead="Noise of asphalt, silence of rules. We choose our own path."
			slides={[
				{
					src: "/images/longread/underground-1.avif",
					alt: "Silhouette by neon portal",
					hotspots: [{ x: 28, y: 36, label: "Светоотражающие акценты", href: "/products/reflect" }],
				},
				{
					src: "/images/longread/underground-2.avif",
					alt: "Neon clothing details",
					hotspots: [
						{ x: 66, y: 58, label: "Влагозащита", href: "/products/waterproof", side: "left" as const },
					],
				},
			]}
		/>
	);
}

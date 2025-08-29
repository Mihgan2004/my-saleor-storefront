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
					type: "image",
					src: "/images/longread/underground-2.avif", // ← замени на свой файл при желании
					alt: "Urban silhouette, low light",
					hotspots: [
						{ x: 28, y: 36, label: "Светоотражающие акценты", href: "/products/reflect" },
						{ x: 66, y: 58, label: "Влагозащита", href: "/products/waterproof", side: "left" as const },
					],
				},
			]}
		/>
	);
}

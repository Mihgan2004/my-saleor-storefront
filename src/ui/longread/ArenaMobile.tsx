"use client";
import { ChapterMobile } from "./ChapterMobile";

export function ArenaMobile() {
	return (
		<ChapterMobile
			id="arena"
			tone="blue"
			kicker="SPORT"
			title="MOVEMENT = LIFE"
			slides={[
				{
					type: "image",
					src: "/images/longread/arena-1.avif",
					alt: "Динамика: бег в городе",
					hotspots: [
						{ x: 72, y: 34, label: "Дышащие панели", href: "/products/breathable-panels" },
						{ x: 26, y: 66, label: "Усиленные зоны", href: "/products/reinforced", side: "left" as const },
					],
				},
				{
					type: "image",
					src: "/images/longread/arena-2.avif",
					alt: "Силуэт: тренировочная зона",
					hotspots: [
						{ x: 65, y: 40, label: "Световозврат", href: "/products/reflective-stitch" },
						{
							x: 42,
							y: 75,
							label: "Эластичный пояс",
							href: "/products/elastic-waist",
							side: "left" as const,
						},
					],
				},
			]}
		/>
	);
}

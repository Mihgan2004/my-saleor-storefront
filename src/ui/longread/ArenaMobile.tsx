"use client";
import { ChapterMobile } from "./ChapterMobile";

export function ArenaMobile() {
	return (
		<ChapterMobile
			id="arena"
			tone="blue"
			kicker="SPORT"
			title="MOVEMENT = LIFE"
			lead="Скорость — в основе ДНК коллекции."
			bullets={[
				"эргономичный крой без лишних складок",
				"лёгкие износостойкие ткани",
				"продуваемость и отвод влаги",
			]}
			slides={[
				{
					src: "/images/longread/arena-1.avif",
					alt: "Динамика: бег в городе",
					hotspots: [
						{ x: 72, y: 34, label: "Дышащие панели", href: "/products/breathable-panels" },
						{ x: 26, y: 66, label: "Усиленные зоны", href: "/products/reinforced", side: "left" as const },
					],
				},
				{
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
				{
					src: "/images/longread/arena-3.avif",
					alt: "Контраст: взрыв скорости",
					hotspots: [
						{ x: 54, y: 28, label: "DWR-пропитка", href: "/products/dwr" },
						{ x: 78, y: 70, label: "Молния YKK", href: "/products/ykk-zip" },
					],
				},
			]}
		/>
	);
}

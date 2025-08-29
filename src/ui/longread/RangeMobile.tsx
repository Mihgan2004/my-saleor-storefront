"use client";
import { ChapterMobile } from "./ChapterMobile";

export function RangeMobile() {
	return (
		<ChapterMobile
			id="range"
			tone="olive"
			kicker="MILITARY"
			title="ГОТОВ К ПОЛЮ"
			lead="Функция первична. Материалы — выносливые, посадка — рабочая, эстетика — строгая."
			bullets={["защита от износа и погоды", "модульность и крепления", "тёмная палитра ради фокуса"]}
			slides={[
				{
					src: "/images/longread/range-1.avif",
					alt: "Петлевая панель",
					hotspots: [{ x: 30, y: 42, label: "Панель под ярлык", href: "/products/loop-panel" }],
				},
				{
					src: "/images/longread/range-2.avif",
					alt: "Ламинированный шов",
					hotspots: [{ x: 70, y: 30, label: "Влагозащитная молния", href: "/products/sealed-zip" }],
				},
				{
					src: "/images/longread/range-3.avif",
					alt: "Усиленный бар-так",
					hotspots: [
						{
							x: 72,
							y: 78,
							label: "Усиленный бар-так",
							href: "/products/bartack-detail",
							side: "left" as const,
						},
					],
				},
			]}
		/>
	);
}

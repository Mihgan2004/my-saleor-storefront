"use client";
import { ChapterMobile } from "./ChapterMobile";

export function RangeMobile() {
	return (
		<ChapterMobile
			id="range"
			tone="olive"
			kicker="MILITARY"
			title="ГОТОВ К ПОЛЮ"
			slides={[
				{
					type: "image",
					src: "/images/longread/range-2.avif",
					alt: "Ламинированный шов",
					hotspots: [{ x: 70, y: 30, label: "Влагозащитная молния", href: "/products/sealed-zip" }],
				},
				{
					type: "image",
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

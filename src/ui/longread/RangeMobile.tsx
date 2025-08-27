"use client";

import { StickyChapterMobile } from "./StickyChapterMobile";

export function RangeMobile() {
	return (
		<StickyChapterMobile
			id="range"
			kicker="Tactical • Utility"
			title="ГОТОВ К ПОЛЮ"
			description="Функция первична. Материалы — выносливые, посадка — рабочая, эстетика — строгая."
			bullets={["защита от износа и погоды", "модульность и крепления", "тёмная палитра ради фокуса"]}
			frames={[
				{ src: "/images/longread/range-1.avif", alt: "Тактические детали 1" },
				{ src: "/images/longread/range-2.avif", alt: "Тактические детали 2" },
			]}
			hotspots={[
				{
					forFrame: 1,
					x: 26,
					y: 38,
					label: "Панель под съёмный ярлык",
					href: "/products/patch-panel",
					appearAt: 0.55,
				},
			]}
			cta={{
				primary: { label: "Тактическая линейка", href: "/collections/tactical" },
				secondary: { label: "Материалы", href: "/materials" },
			}}
			heightVh={320}
		/>
	);
}

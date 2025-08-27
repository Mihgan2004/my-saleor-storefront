"use client";
import { StickyChapterMobile } from "./StickyChapterMobile";

export function ArenaMobile() {
	return (
		<StickyChapterMobile
			id="arena"
			kicker="Sport • Function"
			title="ДВИЖЕНИЕ = ЖИЗНЬ"
			description="Андеграунд, спорт, милитари — одна философия: полезность и стойкость."
			bullets={["устойчивые материалы", "модульность слоёв", "тёмная палитра"]}
			frames={[
				{ src: "/images/longread/arena-1.avif", alt: "Бейс-топ Layer-0" },
				{ src: "/images/longread/arena-2.avif", alt: "Лонгслив Аэро" },
				{ src: "/images/longread/arena-3.avif", alt: "Футболка GC-Base" },
			]}
			hotspots={[
				{ forFrame: 1, x: 24, y: 40, label: "Бейс-топ Layer-0", href: "/products/layer-0", appearAt: 0.55 },
				{ forFrame: 1, x: 78, y: 76, label: "Брюки Flex", href: "/products/flex-pants", appearAt: 0.7 },
				{ forFrame: 2, x: 36, y: 42, label: "Лонгслив Аэро", href: "/products/aero-ls", appearAt: 0.55 },
				{
					forFrame: 2,
					x: 76,
					y: 70,
					label: "Кроссы Urban Grip",
					href: "/products/urban-grip",
					appearAt: 0.7,
				},
				{
					forFrame: 3,
					x: 56,
					y: 36,
					label: "Футболка GC-Base",
					href: "/products/gc-base-tee",
					appearAt: 0.55,
				},
				{ forFrame: 3, x: 74, y: 73, label: "Шорты Race", href: "/products/race-shorts", appearAt: 0.7 },
			]}
			cta={{
				primary: { label: "В каталог", href: "/collections/all" },
				secondary: { label: "Собрать лук", href: "/look" },
			}}
			heightVh={360}
		/>
	);
}

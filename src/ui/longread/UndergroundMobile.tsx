"use client";
import { StickyChapterMobile } from "./StickyChapterMobile";

export function UndergroundMobile() {
	return (
		<StickyChapterMobile
			id="underground"
			kicker="Underground • Code"
			title="НЕ ДЛЯ ВСЕХ"
			description="Шум асфальта, тишина правил. Мы выбираем своё."
			bullets={["чистые формы без шума", "защита от погоды", "база вне сезонов"]}
			frames={[
				{ src: "/images/longread/underground-1.avif", alt: "Силуэт в неоне" },
				{ src: "/images/longread/underground-2.avif", alt: "Тёмный коридор" },
				{ src: "/images/longread/underground-3.avif", alt: "Город ночью" },
			]}
			hotspots={[
				{ forFrame: 1, x: 46, y: 36, label: "Капюшон / ворот", href: "/products/hood", appearAt: 0.55 },
				{ forFrame: 1, x: 60, y: 62, label: "Грудь / логотип", href: "/products/logo", appearAt: 0.7 },
			]}
			cta={{
				primary: { label: "Смотреть дроп", href: "/collections/underground" },
				secondary: { label: "История бренда", href: "/brand" },
			}}
			heightVh={360}
		/>
	);
}

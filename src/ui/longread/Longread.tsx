"use client";

import { useEffect, useState } from "react";
import { SectionNav } from "./SectionNav"; // навигация для десктопа
import { UndergroundDesktop } from "./UndergroundDesktop";
import { ArenaDesktop } from "./ArenaDesktop";
import { RangeDesktop } from "./RangeDesktop";
import { BenefitsDesktop } from "./BenefitsDesktop";

// мобильные версии секций
import { UndergroundMobile } from "./UndergroundMobile";
import { ArenaMobile } from "./ArenaMobile";
import { RangeMobile } from "./RangeMobile";
import { BenefitsMobile } from "./BenefitsMobile";

export function Longread() {
	const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const onChange = () => setIsDesktop(mq.matches);
		onChange(); // начальное состояние
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	// первый рендер (SSR) — ничего не выводим
	if (isDesktop === null) return null;

	// мобильные и планшеты: отображаем мобильные секции
	if (!isDesktop) {
		return (
			<>
				<UndergroundMobile />
				<ArenaMobile />
				<RangeMobile />
				{/* мобильный блок с преимуществами */}
				<BenefitsMobile />
			</>
		);
	}

	// десктоп: показываем навигацию и sticky‑сцены
	return (
		<>
			<SectionNav />
			<UndergroundDesktop />
			<ArenaDesktop />
			<RangeDesktop />
			<BenefitsDesktop />
		</>
	);
}

// FILE: src/ui/longread/Longread.tsx
"use client";

import { useEffect, useState } from "react";
import { SectionNav } from "./SectionNav"; // desktop
import { UndergroundDesktop } from "./UndergroundDesktop";
import { ArenaDesktop } from "./ArenaDesktop";
import { RangeDesktop } from "./RangeDesktop";

export function Longread() {
	const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const onChange = () => setIsDesktop(mq.matches);
		onChange(); // первичная установка
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	// SSR и первый клиентский тик — ничего не рендерим, чтобы избежать рассинхрона
	if (isDesktop === null) return null;

	// Мобильные/планшеты < 1024px — лонгрид полностью выключен
	if (!isDesktop) return null;

	// Десктоп — как было
	return (
		<>
			<SectionNav />
			<UndergroundDesktop />
			<ArenaDesktop />
			<RangeDesktop />
		</>
	);
}

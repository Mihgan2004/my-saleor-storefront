"use client";

import { SectionNav } from "./SectionNav"; // как у тебя было
import { UndergroundDesktop } from "./UndergroundDesktop";
import { ArenaDesktop } from "./ArenaDesktop";
import { RangeDesktop } from "./RangeDesktop";

import { UndergroundMobile } from "./UndergroundMobile";
import { ArenaMobile } from "./ArenaMobile";
import { RangeMobile } from "./RangeMobile";
import { BenefitsMobile } from "./BenefitsMobile";
import { SectionNavMobile } from "./SectionNavMobile";

export function Longread() {
	// Секции мобильного лонгрида для навигации
	const mobileNavItems = [
		{ id: "underground", label: "Underground" },
		{ id: "arena", label: "Arena" },
		{ id: "range", label: "Tactical" },
		{ id: "why", label: "Почему" }, // если используешь BenefitsMobile
	];

	return (
		<>
			{/* DESKTOP (≥ lg) */}
			<div className="hidden lg:block">
				<SectionNav />
				<UndergroundDesktop />
				<ArenaDesktop />
				<RangeDesktop />
			</div>

			{/* MOBILE (< lg) */}
			<div className="lg:hidden">
				<UndergroundMobile />
				<ArenaMobile />
				<RangeMobile />
				<BenefitsMobile />

				{/* ⬇️ здесь была ошибка — теперь передаём items */}
				<SectionNavMobile items={mobileNavItems} />
			</div>
		</>
	);
}

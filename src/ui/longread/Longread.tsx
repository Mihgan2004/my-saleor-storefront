"use client";

import { SectionNav } from "./SectionNav"; // desktop
import { UndergroundDesktop } from "./UndergroundDesktop";
import { ArenaDesktop } from "./ArenaDesktop";
import { RangeDesktop } from "./RangeDesktop";

import { UndergroundMobile } from "./UndergroundMobile";
import { ArenaMobile } from "./ArenaMobile";
import { RangeMobile } from "./RangeMobile";
import { BenefitsMobile } from "./BenefitsMobile";
// import { SectionNavMobile } from "./SectionNavMobile"; // ← навбар для мобилки убран

export function Longread() {
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
				{/* Мобильный навбар отключён */}
				{/* <SectionNavMobile items={mobileNavItems} /> */}
			</div>
		</>
	);
}

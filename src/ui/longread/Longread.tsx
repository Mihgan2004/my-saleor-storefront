// FILE: src/ui/longread/Longread.tsx
"use client";

import { SectionNav } from "./SectionNav"; // desktop
import { UndergroundDesktop } from "./UndergroundDesktop";
import { ArenaDesktop } from "./ArenaDesktop";
import { RangeDesktop } from "./RangeDesktop";

import { UndergroundMobile } from "./UndergroundMobile";
import { ArenaMobile } from "./ArenaMobile";
import { RangeMobile } from "./RangeMobile";
import { BenefitsMobile } from "./BenefitsMobile";
import { SectionNavMobile } from "./SectionNavMobile"; // ⬅️ включили

const mobileNavItems = [
	{ id: "underground", label: "Underground" },
	{ id: "arena", label: "Arena" },
	{ id: "range", label: "Tactical" },
	{ id: "why", label: "Почему" },
];

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
				<SectionNavMobile items={mobileNavItems} /> {/* ⬅️ вернули */}
			</div>
		</>
	);
}

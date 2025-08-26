"use client";

import { UndergroundDesktop } from "./UndergroundDesktop";
import { ArenaDesktop } from "./ArenaDesktop";
import { RangeDesktop } from "./RangeDesktop";

import { UndergroundMobile } from "./UndergroundMobile";
import { ArenaMobile } from "./ArenaMobile";
import { RangeMobile } from "./RangeMobile";

import { SectionNav } from "./SectionNav";
import { SectionNavMobile } from "./SectionNavMobile";

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
			<div className="snap-y snap-mandatory lg:hidden">
				<UndergroundMobile />
				<ArenaMobile />
				<RangeMobile />
				<SectionNavMobile />
			</div>
		</>
	);
}

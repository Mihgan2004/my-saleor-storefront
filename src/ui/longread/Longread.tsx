"use client";

import { useEffect, useState } from "react";
import { SectionNav } from "./SectionNav"; // десктоп
import { UndergroundDesktop } from "./UndergroundDesktop";
import { ArenaDesktop } from "./ArenaDesktop";
import { RangeDesktop } from "./RangeDesktop";
import { BenefitsDesktop } from "./BenefitsDesktop";

import { UndergroundMobile } from "./UndergroundMobile";
import { ArenaMobile } from "./ArenaMobile";
import { RangeMobile } from "./RangeMobile";
import { BenefitsMobile } from "./BenefitsMobile";
import { SectionNavMobile } from "./SectionNavMobile";

export function Longread() {
	const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

	useEffect(() => {
		const mq = window.matchMedia("(min-width: 1024px)");
		const onChange = () => setIsDesktop(mq.matches);
		onChange();
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	if (isDesktop === null) return null;

	if (!isDesktop) {
		const items = [
			{ id: "underground", label: "Underground" },
			{ id: "arena", label: "Arena" },
			{ id: "range", label: "Tactical" },
			{ id: "why", label: "Почему" },
		];
		return (
			<div className="snap-y">
				<UndergroundMobile />
				<ArenaMobile />
				<RangeMobile />
				<BenefitsMobile />
				<SectionNavMobile items={items} />
			</div>
		);
	}

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

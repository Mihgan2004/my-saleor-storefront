"use client";

import { useEffect, useState } from "react";
import { SectionNav } from "./SectionNav";
import { UndergroundDesktop } from "./UndergroundDesktop";
import { ArenaDesktop } from "./ArenaDesktop";
import { RangeDesktop } from "./RangeDesktop";
import { BenefitsDesktop } from "./BenefitsDesktop";

import { UndergroundMobile } from "./UndergroundMobile";
import { ArenaMobile } from "./ArenaMobile";
import { RangeMobile } from "./RangeMobile";
import { BenefitsMobile } from "./BenefitsMobile";
import { SectionNavMobile } from "./SectionNavMobile";
import { useLongreadHeaderHandoff } from "./useLongreadHeaderHandoff";

export function Longread() {
	const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
	const { ref: longreadRef } = useLongreadHeaderHandoff();

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
			<div ref={longreadRef} className="snap-y snap-proximity">
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

/* eslint-disable import/no-default-export */
import { HeroBlock } from "@/ui/components/HeroBlock";
import { Longread } from "@/ui/longread/Longread";
import { SectionNav } from "@/ui/longread/SectionNav"; // ← навигация по секциям
import { ChoosePath } from "@/ui/longread/ChoosePath";
import { Subscribe } from "@/ui/longread/Subscribe";
import { BenefitsDesktop } from "@/ui/longread/BenefitsDesktop";

export default function HomePage() {
	return (
		<>
			{/* Hero должен иметь стабильный якорь */}
			<section id="hero">
				<HeroBlock
					videoMp4="/videos/hero.mp4"
					videoWebm="/videos/hero.webm"
					poster="/videos/hero-poster.jpg"
					title="GRAYCARDINAL"
					kicker="TACTICAL • UNDERGROUND • SPORT"
					subline="Городской тактикульный кэжуал: сила, функция, легенда."
					align="center"
					vAlign="center"
					onScrollTo="#underground" // ← было #route
				/>
			</section>

			{/* Лонгрид секции — у компонентов уже заданы id: underground / arena / range */}
			<Longread />
			<BenefitsDesktop />
			<SectionNav />
			<ChoosePath />
			<Subscribe />
		</>
	);
}

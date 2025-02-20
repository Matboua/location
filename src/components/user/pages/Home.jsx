import Slider from "../features/Slider";
import CarsCarousel from "../features/CarsCarousel";
import HowItsWork from "../features/HowItsWork";
import WhyChooseUs from "../features/WhyChooseUs";
import FAQs from "../features/Faqs/Faqs";

export default function Home() {
	return (
		<div className="flex flex-col items-center gap-10 w-full">
			<div className="flex flex-col items-center gap-10 w-10/12">
				<Slider />
				<HowItsWork />
				<CarsCarousel />
				<WhyChooseUs />
				<FAQs />
			</div>
		</div>
	);
}

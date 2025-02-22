import HowItsWork from "../features/HowItsWork";
import WhyChooseUs from "../features/WhyChooseUs";
import Questions from "../features/FAQuestions/Questions";
import AboutHero from "../features/AboutHero";
export default function About() {
	return (
		<section className="flex flex-col items-center gap-10 w-full">
			<div className="flex flex-col items-center gap-10 w-10/12">
				<h1 className="text-center font-medium text-3xl my-3 pt-8 dark:text-gray-200 text-gray-900">
					About Us
				</h1>
				<AboutHero />
				<div className="bg-gray-1-90 dark:bg-gray-900 rounded-2xl py-10">
					<HowItsWork />
				</div>
				<div className="py-10">
					<WhyChooseUs />
				</div>
				<Questions />
			</div>
		</section>
	);
}

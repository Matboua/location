import Slider from "../features/Slider";
import CarsCarousel from "../features/CarsCarousel";
import HowItsWork from "../features/HowItsWork";
import WhyChooseUs from "../features/WhyChooseUs";
import Questions from "../features/FAQuestions/Questions";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div className="flex flex-col items-center gap-10 w-full">
			<div className="flex flex-col items-center gap-10 w-10/12">
				<Slider />
				<HowItsWork />
				<CarsCarousel />
				<WhyChooseUs />
				<Questions />

				{/* Admin Login Link */}
				<div className="text-center mb-8">
					<p className="text-gray-500 dark:text-gray-400 mb-2">
						Are you an administrator?
					</p>
					<Link
						to="/admin-login"
						className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
					>
						Admin Login
					</Link>
				</div>
			</div>
		</div>
	);
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Titles from "./Titles";
import {
	faCarOn,
	faMapLocationDot,
	faPenNib,
} from "@fortawesome/free-solid-svg-icons";

export default function HowItsWork() {
	return (
		<section className="pb-10 w-full flex flex-col items-center gap-7">
			<Titles
				title="How It Works"
				description="Experience hassle-free car rentals with CarVoy, making travel across Morocco easy and convenient"
			/>
			<div className="grid gap-3 grid-cols-1 lg:grid-cols-3">
				<div className="flex flex-col items-center gap-2">
					<div className="border-2 border-blue-600 p-3 rounded-full border-dashed mb-5">
						<FontAwesomeIcon
							icon={faPenNib}
							size="2x"
							className="text-white p-5 bg-blue-600 rounded-full"
						/>
					</div>
					<h3 className="font-medium text-xl">1. Choose Locations</h3>
					<p className="text-center px-5">
						Select your preferred pick-up and drop-off locations across Morocco.
						With CarVoy, you have the flexibility to start your journey from any
						major city.
					</p>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="border-2 border-orange-400 p-3 rounded-full border-dashed mb-5">
						<FontAwesomeIcon
							icon={faMapLocationDot}
							size="2x"
							className="text-white p-5 bg-orange-400 rounded-full"
						/>
					</div>
					<h3 className="font-medium text-xl">1. Choose Locations</h3>
					<p className="text-center px-5">
						Easily collect your car at the chosen location. Our team ensures the
						vehicle is ready and waiting for a smooth, hassle-free start to your
						rental experience.
					</p>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="border-2 border-gray-900 p-3 rounded-full border-dashed mb-5">
						<FontAwesomeIcon
							icon={faCarOn}
							size="2x"
							className="text-white p-5 bg-gray-900 rounded-full"
						/>
					</div>
					<h3 className="font-medium text-xl">1. Choose Locations</h3>
					<p className="text-center px-5">
						Browse our range of family-friendly and economy cars, and book the
						ideal vehicle for your trip. With CarVoy, enjoy a simple booking
						process and drive away with peace of mind.
					</p>
				</div>
			</div>
		</section>
	);
}

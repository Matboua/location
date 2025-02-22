import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Titles from "./Titles";
import {
	faObjectGroup,
	faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarespace } from "@fortawesome/free-brands-svg-icons";

export default function WhyChooseUs() {
	return (
		<section className="pb-18 w-full flex flex-col items-center gap-7">
			<Titles
				title="Why Choose Us"
				description="CarVoy: Your top choice for exceptional service, convenience, and reliability"
			/>
			<div>
				<div className="grid gap-3 grid-cols-1 lg:grid-cols-3 overflow-hidden">
					<div className="flex flex-col gap-3 items-center p-5 bg-white hover:bg-gray-900 hover:text-gray-100 hover:dark:bg-gray-100 dark:bg-gray-900 hover:dark:text-gray-950 transition-all duration-300 group rounded-2xl">
						<FontAwesomeIcon
							icon={faObjectGroup}
							size="2x"
							className="w-full py-3 bg-blue-600 text-white dark:bg-gray-800 dark:text-blue-600 rounded-xl group-hover:dark:bg-blue-600 group-hover:dark:text-white group-hover:bg-white group-hover:text-blue-600"
						/>
						<h3 className="font-medium text-2xl">Easy & Fast Booking</h3>
						<p className="text-center w-5/6">
							Completely carinate e business testing process whereas fully
							researched customer service. Globally extensive content with
							quality.
						</p>
					</div>
					<div className="flex flex-col gap-3 items-center p-5 dark:bg-gray-900 bg-white hover:bg-gray-900 hover:dark:bg-gray-100 hover:text-gray-100 hover:dark:text-gray-950 transition-all duration-100 group rounded-2xl">
						<FontAwesomeIcon
							icon={faSquarespace}
							size="2x"
							className="w-full py-3 bg-blue-600 text-white dark:bg-gray-800 dark:text-blue-600 rounded-xl group-hover:dark:bg-blue-600 group-hover:dark:text-white group-hover:bg-white group-hover:text-blue-600"
						/>
						<h3 className="font-medium text-2xl">Many Pickup Location</h3>
						<p className="text-center w-5/6">
							Enthusiastically magnetic initiatives with cross-platform sources.
							Dynamically target testing procedures through effective.
						</p>
					</div>
					<div className="flex flex-col gap-3 items-center p-5 dark:bg-gray-900 bg-white hover:bg-gray-900 hover:dark:bg-gray-100 hover:text-gray-100 hover:dark:text-gray-950 transition-all duration-100 group rounded-2xl">
						<FontAwesomeIcon
							icon={faUsersViewfinder}
							size="2x"
							className="w-full py-3 bg-blue-600 text-white dark:bg-gray-800 dark:text-blue-600 rounded-xl group-hover:dark:bg-blue-600 group-hover:dark:text-white group-hover:bg-white group-hover:text-blue-600"
						/>
						<h3 className="font-medium text-2xl">Customer Satisfaction</h3>
						<p className="text-center w-5/6">
							Globally user centric method interactive. Seamlessly revolutionize
							unique portals corporate collaboration.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

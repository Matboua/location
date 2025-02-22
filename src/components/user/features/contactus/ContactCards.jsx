import {
	faClock,
	faEnvelope,
	faLocation,
	faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";

export default function ContactCards() {
	return (
		<section className="pb-5 rounded-2xl dark:text-gray-300 text-gray-900">
			<h1 className="text-center font-medium text-3xl my-3 mb-7 p-10">
				Contact Us
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
				<Card
					icon={faPhoneVolume}
					title="Phone Number"
					value="(+212) 605-776855"
				/>
				<Card
					icon={faEnvelope}
					title="Email Address"
					value="matbouaoussama@gmail.com"
				/>
				<Card
					icon={faLocation}
					title="Location"
					value="Hay Mohammadi - Agadir"
				/>
				<Card
					icon={faClock}
					title="Opening Hours"
					value="Daily (08.30AM - 08.30PM)"
				/>
			</div>
		</section>
	);
}

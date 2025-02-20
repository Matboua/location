import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cars from "../pages/cars/Cars";
import Articles from "../pages/Articles";
import About from "../pages/About";
import Contact from "../pages/Contact";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import FAQs from "../features/Faqs/Faqs";
import Question from "../features/faqs/َQuestion";
export default function Main() {
	return (
		<main className="dark:text-gray-100 text-gray-900 dark:bg-gray-800 bg-gray-50 flex flex-col items-center flex-grow p-5">
			{/* Cars */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cars" element={<Cars />} />
				<Route path="/articles" element={<Articles />} />
				<Route path="/about-us" element={<About />} />
				<Route path="/contact-us" element={<Contact />} />
				<Route path="/privacy-policy" element={<PrivacyPolicy />} />
				<Route path="/terms-and-conditions" element={<TermsConditions />} />
				<Route path="/x" element={<FAQs />} />
				<Route path="/xx" element={<Question />} />
			</Routes>
		</main>
	);
}

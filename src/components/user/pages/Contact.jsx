import ContactCards from "../features/contactus/ContactCards";
import ContactForm from "../features/contactus/ContactForm";

export default function Contact() {
	return (
		<section className="flex flex-col items-center gap-10 w-full">
			<div className="flex flex-col items-center gap-10 w-10/12">
				<ContactCards />
				<ContactForm />
			</div>
		</section>
	);
}

import CarFormImage from "@assets/car-form.jpg";

export default function ContactForm() {
	return (
		<section className="w-full rounded-2xl dark:bg-gray-900 bg-gray-1-90 p-10">
			<h2 className="font-medium text-3xl text-center pb-5">Get in touch!</h2>
			<div className="container flex gap-4 flex-col justify-center px-6 pb-8 pt-0 mx-auto lg:flex-row">
				<div className="relative flex items-center justify-center py-6 mt-8 lg:mt-0 w-5/10">
					<span className="absolute -left-10 rounded-2xl w-5/10 h-full bg-orange-400"></span>
					<img
						src={CarFormImage}
						alt="Slider Car"
						className="z-10 rounded-xl object-contain h-64 sm:h-72 lg:h-80 xl:h-96"
					/>
				</div>
				<form className="flex flex-col gap-4 justify-center py-6 text-center rounded-sm lg:text-left w-5/10">
					<div>
						<p className="text-blue-600 font-medium">Carvoy - Car Rental</p>
						{/* <h2 className="font-medium text-3xl">Get in touch!</h2> */}
					</div>
					<input
						placeholder="Full Name"
						className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-0 focus:border-blue-600"
						id="first_name"
						name="first_name"
						type="text"
					/>
					<input
						placeholder="Email Address"
						className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-0 focus:border-blue-600"
						id="first_name"
						name="first_name"
						type="text"
					/>
					<input
						placeholder="Phone number"
						className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-0 focus:border-blue-600"
						id="first_name"
						name="first_name"
						type="text"
					/>
					<textarea
						placeholder="Comments..."
						className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-0 focus:border-blue-600 min-h-24"
						id="first_name"
						name="first_name"
						type="text"
					></textarea>
					<button
						className=" cursor-pointer w-full bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
						type="submit"
					>
						Send Enquiry
					</button>
				</form>
			</div>
		</section>
	);
}

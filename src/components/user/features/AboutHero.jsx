export default function AboutHero() {
	return (
		<section className=" dark:text-gray-100 w-full rounded-2xl">
			<div className="container flex gap-4 flex-col justify-center px-6 pb-8 pt-0 mx-auto lg:flex-row">
				<div className="relative flex items-center justify-center py-6 mt-8 lg:mt-0 w-5/10">
					<span className="absolute -left-10 rounded-2xl w-5/10 h-full bg-orange-400"></span>
					<img
						src="/slider-car-about.png"
						alt="Slider Car"
						className="z-10 rounded-xl object-contain h-64 sm:h-72 lg:h-80 xl:h-96"
					/>
				</div>
				<div className="flex flex-col gap-4 justify-center py-6 text-center rounded-sm lg:text-left w-5/10">
					<div>
						<p className="text-blue-600 font-medium">ABOUT OUR COMPANY</p>
						<h2 className="font-medium text-2xl">
							Carvoy - Your Premier Car Rental Service in Morocco!
						</h2>
					</div>
					<p>
						At Carvoy, we pride ourselves on offering top-notch car rental
						services tailored to meet your needs. Located in the heart of
						Agadir, we provide seamless pick-up services across all of Morocco.
						Whether you&apos;re visiting for business or pleasure, Carvoy
						ensures a smooth and enjoyable travel experience.
					</p>
					<p>
						Carvoy stands out with our extensive fleet of vehicles, ensuring you
						find the perfect car for your journey. Our commitment to excellent
						customer service means we are always here to assist you, making your
						rental experience hassle-free. With competitive rates, you can enjoy
						the best of Morocco without breaking the bank. Experience
						convenience and quality with Carvoy, your trusted car rental
						partner.
					</p>
				</div>
			</div>
		</section>
	);
}

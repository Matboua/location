import { Link } from "react-router-dom";

export default function Slider() {
	return (
		<section className="bg-gray-1-90 dark:bg-gray-900 dark:text-gray-100 w-full rounded-2xl">
			<div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
				<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
					<h1 className="text-4xl font-bold leading-none sm:text-5xl">
						Car Rental Company
						<span className="text-blue-600 block">Carvoy Cars</span>Morocco
					</h1>
					<p className="mt-6 mb-8 text-base sm:mb-12">
						Dictum aliquam porta in condimentum ac integer
						<br className="hidden md:inline lg:hidden" />
						turpis pulvinar, est scelerisque ligula sem
					</p>
					<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
						<Link
							to="/cars"
							rel="noopener noreferrer"
							href="#"
							className="px-6 py-2 text-base font-semibold rounded bg-blue-600 text-gray-50"
						>
							Cars & Vehicles
						</Link>
						<Link
							to="/about"
							rel="noopener noreferrer"
							href="#"
							className="px-6 py-2 text-base font-semibold border rounded dark:border-gray-800"
						>
							About
						</Link>
					</div>
				</div>
				<div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-64 sm:h-72 lg:h-80 xl:h-96 2xl:h-112">
					<img
						src="/slider-car.png"
						alt="Slider Car"
						className="dark:opacity-90 object-contain h-64 sm:h-72 lg:h-80 xl:h-96 2xl:h-112"
					/>
				</div>
			</div>
		</section>
	);
}

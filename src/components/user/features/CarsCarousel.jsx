import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Titles from "./Titles";

export default function CarsCarousel() {
	const [cars, setCars] = useState([]);
	axios
		.get("https://json-server-api-q84y.onrender.com/cars")
		.then((res) => setCars(res.data));

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
	};

	return (
		<section className="bg-gray-200 dark:bg-gray-900 rounded-2xl py-10 slider-container w-full flex flex-col items-center">
			{/* <h1 className="text-center font-medium text-3xl my-3 mb-7 p-10 dark:text-gray-200 text-gray-900">
				Explore Most Popular Cars
			</h1> */}
			<Titles
				title="Explore Most Popular Cars"
				description="Discover our top-rated cars, perfect for your travels across Morocco. Choose comfort, reliability, and style with CarVoy"
			/>
			<Slider
				className="flex text-center justify-center w-full pb-14"
				{...settings}
			>
				{cars &&
					cars.map(
						(item, key) =>
							item.available && (
								<div
									key={key}
									className="relative flex max-w-[280px] flex-col overflow-hidden rounded-lg dark:border-gray-800 dark:border-2 dark:bg-gray-900 bg-white shadow-md"
								>
									<a
										className="relative mx-3 mt-3 flex h-48 overflow-hidden rounded-xl"
										href="#"
									>
										<img
											className="object-cover"
											src={item.image}
											alt="product image"
										/>
										<span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">
											39% OFF
										</span>
									</a>
									<div className="mt-3 px-4 pb-4">
										<a href="#">
											<h5 className="text-lg tracking-tight text-gray-900 dark:text-gray-100">
												{item.name}
											</h5>
										</a>
										<div className="mt-2 mb-4 flex justify-between">
											<p className="flex flex-col gap-1">
												<span className="text-2xl font-bold text-blue-600">
													${item.price_now}
												</span>
												<span className="text-sm text-gray-900 dark:text-gray-300 line-through">
													${item.price_before}
												</span>
											</p>
											<div className="flex items-center">
												{Array(5)
													.fill(null)
													.map((_, i) => (
														<svg
															key={i}
															aria-hidden="true"
															className="h-4.5 w-4.5 text-yellow-300"
															fill="currentColor"
															viewBox="0 0 20 20"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
														</svg>
													))}
												<span className="ml-2 rounded text-gray-100 dark:text-gray-900 bg-yellow-200 px-2 py-0.5 text-xs font-semibold">
													5.0
												</span>
											</div>
										</div>
										<a
											href="#"
											className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-gray-100 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="mr-2 h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth="2"
											>
												<FontAwesomeIcon icon={faCar} />
											</svg>
											Book now
										</a>
									</div>
								</div>
							)
					)}
			</Slider>
		</section>
	);
}

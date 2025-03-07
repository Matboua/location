import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookCar from "./BookCar";
import { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";

export default function DetailCar() {
	const { user } = useContext(AppContext);
	const { carid } = useParams();
	const car = useSelector((state) => state.cars.find((car) => car.id == carid));
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center flex-wrap -mx-4">
				<div className="w-full md:w-1/2 px-4">
					<img
						src={car.image}
						alt="Product"
						className="w-full h-auto rounded-lg shadow-md"
					/>
				</div>
				<div className="w-full md:w-1/2 px-4 text-gray-800 dark:text-gray-200 flex flex-col justify-center">
					<h2 className="text-3xl font-bold mb-2">{car.name}</h2>
					<div className="mb-4">
						<span className="text-2xl font-bold mr-2">${car.price_now}</span>
						<span className="text-gray-500 line-through">
							${car.price_before}
						</span>
					</div>
					<p className=" text-gray-800 dark:text-gray-200 mb-3">
						<span className="font-medium">Description:</span> {car.description}
					</p>
					<ul className="list-disc list-inside text-gray-200 dark:text-gray-300 mb-3">
						<li className=" text-gray-800 dark:text-gray-200">
							<span className="font-medium">Brand:</span> {car.marc}
						</li>
						<li className=" text-gray-800 dark:text-gray-200">
							<span className="font-medium">Model:</span> {car.model}
						</li>
						<li className=" text-gray-800 dark:text-gray-200">
							<span className="font-medium">Feul:</span> {car.type}
						</li>
					</ul>
					<h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
						Key Features:
					</h3>
					<ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
						<li>Industry-leading noise cancellation</li>
						<li>30-hour battery life</li>
						<li>Touch sensor controls</li>
						<li>Speak-to-chat technology</li>
					</ul>
					{/* Book now */}
					<BookCar
						carid={car.id}
						carname={car.name}
						carimage={car.image}
						carprice={car.price_now}
						userid={user.id}
					/>
				</div>
			</div>
		</div>
	);
}

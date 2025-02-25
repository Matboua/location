import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editCar } from "../../redux/cars/carsReducer";

export default function EditCar() {
	// Get Id
	const { carid } = useParams();
	// Get Car
	const car = useSelector((state) => state.cars.find((car) => car.id == carid));
	// Update Car Data
	const [image, setImage] = useState(car.image);
	const [name, setName] = useState(car.name);
	const [description, setDescription] = useState(car.description);
	const [price_now, setPrice_now] = useState(car.price_now);
	const [price_before, setPrice_before] = useState(car.price_before);
	const [marc, setMarc] = useState(car.marc);
	const [model, setModel] = useState(car.model);
	const [type, setType] = useState(car.type);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// handle available:
	const [b_available, setB_available] = useState(
		car.available ? "Available" : "Unavailable"
	);
	const [available, setAvailable] = useState(car.available);
	const handleAvailable = (e) => {
		setB_available(e.target.value);
		if (e.target.value == "Available") setAvailable(true);
		else setAvailable(false);
	};
	// PUT Car (handleSubmit)
	const handleSubmit = (e) => {
		e.preventDefault();
		const carData = {
			id: carid,
			image,
			name: name.at(0).toUpperCase() + name.slice(1),
			description,
			price_now: parseFloat(price_now).toFixed(2),
			price_before: parseFloat(price_before).toFixed(2),
			marc: marc.at(0).toUpperCase() + marc.slice(1),
			model: model.at(0).toUpperCase() + model.slice(1),
			type: type.at(0).toUpperCase() + type.slice(1),
			available,
		};
		dispatch(editCar(carData));
		navigate("/admin/cars");
	};
	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
				<div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow dark:border-gray-700 border-gray-300 border md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<p className="text-xl font-bold leading-tight tracking-tight dark:text-gray-100 text-gray-900 md:text-2xl">
							Edit Car
						</p>
						<div>
							<label
								htmlFor="id"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Id
							</label>
							<input
								placeholder="10"
								className="dark:bg-gray-700 bg-gray-200 dark:border-gray-700  border border-gray-300 dark:text-green-500 font-medium text-green-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="id"
								name="id"
								type="text"
								value={carid}
								disabled
							/>
						</div>
						<div>
							<label
								htmlFor="name"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Name
							</label>
							<input
								placeholder="Kia Picanto S20"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="name"
								name="name"
								type="text"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="description"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Description
							</label>
							<textarea
								placeholder="description car..."
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="description"
								name="description"
								type="text"
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
							></textarea>
						</div>
						<div>
							<label
								htmlFor="image"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Image URL
							</label>
							<input
								placeholder="https://www.image.com/..."
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="image"
								name="image"
								type="text"
								value={image}
								onChange={(e) => {
									setImage(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="price_now"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Price Now ($)
							</label>
							<input
								placeholder="150.00"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="price_now"
								name="price_now"
								type="text"
								value={price_now}
								onChange={(e) => {
									setPrice_now(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="price_before"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Price Before ($)
							</label>
							<input
								placeholder="280.99"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="price_before"
								name="price_before"
								type="text"
								value={price_before}
								onChange={(e) => {
									setPrice_before(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="marc"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Marc
							</label>
							<input
								placeholder="Kia"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="marc"
								name="marc"
								type="text"
								value={marc}
								onChange={(e) => {
									setMarc(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="model"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Model
							</label>
							<input
								placeholder="2025"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="model"
								name="model"
								type="text"
								value={model}
								onChange={(e) => {
									setModel(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="type"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Type
							</label>
							<input
								placeholder="Diesel"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="type"
								name="type"
								type="text"
								value={type}
								onChange={(e) => {
									setType(e.target.value);
								}}
							/>
						</div>
						<div>
							<label
								htmlFor="available"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Available
							</label>
							<select
								placeholder="Diesel"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="available"
								name="available"
								value={b_available}
								onChange={(e) => {
									handleAvailable(e);
								}}
							>
								<option>Please Select Car Status</option>
								<option>Available</option>
								<option>Unavailable</option>
							</select>
						</div>
						<button
							className=" cursor-pointer w-full bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
							type="submit"
						>
							Edit Car
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

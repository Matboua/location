"use client";

import { differenceInDays } from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addContractAsync } from "../../../../redux/contracts/contractsReducer";

export default function CreateContract() {
	// Get Next Id
	const contracts = useSelector((state) => state.contracts);
	const nextId =
		contracts.length > 0
			? Math.max(...contracts.map((contract) => Number(contract.id))) + 1
			: 1;

	// To POST contract on submit
	// useState
	const [car_name, setCar_name] = useState("");
	const [image, setImage] = useState("");
	const [car_id, setCar_id] = useState("");
	const [client_id, setClient_id] = useState("");
	const [start_date, setStart_date] = useState("");
	const [end_date, setEnd_date] = useState("");
	const [amount, setAmount] = useState("0");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// function
	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate required fields
		if (!car_id || !client_id || !start_date || !end_date) {
			alert("Please fill in all required fields");
			return;
		}

		// Validate amount is a valid number and greater than 0
		if (isNaN(amount) || Number.parseFloat(amount) <= 0) {
			alert("Please choose valid dates to calculate the amount");
			return;
		}

		const contractData = {
			id: String(nextId),
			car_name,
			image,
			car_id,
			client_id,
			start_date,
			end_date,
			amount: Number.parseFloat(amount).toFixed(2),
		};
		dispatch(addContractAsync(contractData));
		navigate("/admin/contracts");
	};
	// Get cars
	const cars = useSelector((state) => state.cars);
	// Get clients
	const clients = useSelector((state) => state.clients);
	// Start Date and Amount Calc
	const handleStartDate = (e) => {
		setStart_date(e.target.value);

		// Calculate amount only if both dates are valid and end_date is after start_date
		if (
			car_price &&
			end_date &&
			new Date(end_date) > new Date(e.target.value)
		) {
			const days = differenceInDays(
				new Date(end_date),
				new Date(e.target.value)
			);
			setAmount(days > 0 ? (car_price * days).toString() : "0");
		} else {
			setAmount("0");
		}
	};
	// End Date and Amount Calc
	const handleEndDate = (e) => {
		setEnd_date(e.target.value);

		// Calculate amount only if both dates are valid and end_date is after start_date
		if (
			car_price &&
			start_date &&
			new Date(e.target.value) > new Date(start_date)
		) {
			const days = differenceInDays(
				new Date(e.target.value),
				new Date(start_date)
			);
			setAmount(days > 0 ? (car_price * days).toString() : "0");
		} else {
			setAmount("0");
		}
	};
	// Car Info and Amount Calc
	// useState
	const [car_price, setCar_price] = useState("");
	// Function
	const handleCar = (e) => {
		setCar_id(e.target.value);
		const selectedCar = cars.find((car) => car.id === e.target.value);
		setCar_price(selectedCar.price_now);
		setImage(selectedCar.image);
		setCar_name(selectedCar.name);
		setAmount(
			start_date && end_date
				? selectedCar.price_now *
						differenceInDays(new Date(end_date), new Date(start_date))
				: "0"
		);
	};
	// Client Info
	const handleClient = (e) => {
		setClient_id(e.target.value);
	};
	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
				<div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow dark:border-gray-700 border-gray-300 border md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<p className="text-xl font-bold leading-tight tracking-tight dark:text-gray-100 text-gray-900 md:text-2xl">
							Add new Contract
						</p>
						{/* Contract Id */}
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
								value={nextId}
								disabled
							/>
						</div>
						{/* Client CIN */}
						<div>
							<label htmlFor="cin">Client Name</label>
							<select
								name="cin"
								id="cin"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								onChange={(e) => handleClient(e)}
							>
								<option value="">Please Select a Client</option>
								{clients.map((client, key) => (
									<option key={key} value={client.id}>
										{client.cin.toUpperCase()} | {client.first_name}{" "}
										{client.last_name}
									</option>
								))}
							</select>
						</div>
						{/* Car Name */}
						<div>
							<label htmlFor="car_name">Car Name</label>
							<select
								name="car_name"
								id="car_name"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								onChange={(e) => handleCar(e)}
							>
								<option value="">Please Select a Car</option>
								{cars.map((car, key) => (
									<option key={key} value={car.id}>
										{car.name}
									</option>
								))}
							</select>
						</div>
						{/* Start Date */}
						<div>
							<label
								htmlFor="start_date"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Start Date
							</label>
							<input
								placeholder="10"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 cursor-pointer"
								id="start_date"
								name="start_date"
								type="date"
								onClick={(e) => e.target.showPicker()}
								value={start_date}
								onChange={(e) => handleStartDate(e)}
							/>
						</div>
						{/* End Date */}
						<div>
							<label
								htmlFor="end_date"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								End Date
							</label>
							<input
								placeholder="10"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 cursor-pointer"
								id="end_date"
								name="end_date"
								type="date"
								onClick={(e) => e.target.showPicker()}
								value={end_date}
								onChange={(e) => handleEndDate(e)}
							/>
						</div>
						{/* Amount */}
						<div>
							<label
								htmlFor="amount"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Amount ($)
							</label>
							<input
								placeholder="Auto Calc"
								className="dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="amount"
								name="amount"
								type="text"
								value={amount > 0 ? amount : "Please choose valid dates"}
								disabled
							/>
						</div>
						<button
							className=" cursor-pointer w-full bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
							type="submit"
						>
							Add Contract
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

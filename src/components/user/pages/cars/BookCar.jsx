"use client";

import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { addContractAsync } from "../../../../redux/contracts/contractsReducer";
import { differenceInDays } from "date-fns";

export default function BookCar({
	carid,
	carname,
	carimage,
	carprice,
	userid,
}) {
	// Get Client
	const { user } = useContext(AppContext);
	// Get Next Id
	const contracts = useSelector((state) => state.contracts);
	const nextId =
		contracts.reduce((max, contract) => Math.max(max, contract.id), 0) + 1;

	// To POST contract on submit
	// useState
	const [start_date, setStart_date] = useState("");
	const [end_date, setEnd_date] = useState("");
	const [amount, setAmount] = useState("0");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// function
	const handleSubmit = (e) => {
		e.preventDefault();

		// Validate required fields
		if (!start_date || !end_date) {
			alert("Please select both pickup and return dates");
			return;
		}

		// Validate amount is a valid number and greater than 0
		if (isNaN(amount) || Number.parseFloat(amount) <= 0) {
			alert("Please choose valid dates to calculate the amount");
			return;
		}

		const contractData = {
			id: nextId.toString(),
			car_name: carname,
			image: carimage,
			car_id: carid,
			client_id: userid,
			start_date,
			end_date,
			amount: Number.parseFloat(amount).toFixed(2),
		};

		// Change from addContract to addContractAsync to persist data
		dispatch(addContractAsync(contractData));
		navigate("/dashboard/bookings");
	};
	// Start Date and Amount Calc
	const handleStartDate = (e) => {
		setStart_date(e.target.value);

		// Calculate amount only if both dates are valid and end_date is after start_date
		if (carprice && end_date && new Date(end_date) > new Date(e.target.value)) {
			const days = differenceInDays(
				new Date(end_date),
				new Date(e.target.value)
			);
			setAmount(days > 0 ? (carprice * days).toString() : "0");
		} else {
			setAmount("0");
		}
	};
	// End Date and Amount Calc
	const handleEndDate = (e) => {
		setEnd_date(e.target.value);

		// Calculate amount only if both dates are valid and end_date is after start_date
		if (
			carprice &&
			start_date &&
			new Date(e.target.value) > new Date(start_date)
		) {
			const days = differenceInDays(
				new Date(e.target.value),
				new Date(start_date)
			);
			setAmount(days > 0 ? (carprice * days).toString() : "0");
		} else {
			setAmount("0");
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="grid grid-cols-3 gap-5 mt-5">
				{/* Start Date */}
				<div>
					<label
						htmlFor="start_date"
						className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
					>
						Pickup Date
					</label>
					<input
						placeholder="10"
						className="dark:bg-gray-900 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 cursor-pointer"
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
						Return Date
					</label>
					<input
						placeholder="10"
						className="dark:bg-gray-900 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 cursor-pointer"
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
						className="dark:bg-gray-900 dark:border-gray-700 bg-gray-50 border border-gray-300 dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
						id="amount"
						name="amount"
						type="text"
						value={amount > 0 ? amount : "Add Pickup and Return Date "}
						disabled
					/>
				</div>
				<div className="mx-auto col-span-3 w-7/10 ">
					<button
						className="cursor-pointer w-full flex items-center justify-center rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-medium text-gray-100 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
						type="submit"
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
					</button>
				</div>
			</div>
		</form>
	);
}

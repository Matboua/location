"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClientAsync } from "../../../../redux/clients/clientsReducer";

export default function CreateClient() {
	// Form data state
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		cin: "",
		city: "",
		email: "",
		phone: "",
		password: "",
		password_confirmation: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Get next ID for JSON server
	const clients = useSelector((state) => state.clients);
	const nextId =
		clients.length > 0
			? Math.max(...clients.map((client) => Number(client.id))) + 1
			: 1;

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Form validation
	const validateForm = () => {
		const newErrors = {};

		// Required fields
		if (!formData.first_name.trim())
			newErrors.first_name = "First name is required";
		if (!formData.last_name.trim())
			newErrors.last_name = "Last name is required";
		if (!formData.cin.trim()) newErrors.cin = "CIN is required";
		if (!formData.city.trim()) newErrors.city = "City is required";
		if (!formData.phone.trim()) newErrors.phone = "Phone number is required";

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		// Password confirmation
		if (formData.password !== formData.password_confirmation) {
			newErrors.password_confirmation = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Post New Client
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate form
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setErrors({});

		try {
			const clientData = {
				id: String(nextId),
				cin: formData.cin.toLowerCase(),
				first_name: formData.first_name.toLowerCase(),
				last_name: formData.last_name.toLowerCase(),
				phone: formData.phone,
				email: formData.email.toLowerCase(),
				city: formData.city.toLowerCase(),
				password: formData.password,
				password_confirmation: formData.password_confirmation,
			};

			// Add to JSON server via Redux
			const resultAction = await dispatch(addClientAsync(clientData));

			if (addClientAsync.fulfilled.match(resultAction)) {
				navigate("/admin/clients");
			} else if (addClientAsync.rejected.match(resultAction)) {
				// Handle API errors
				if (resultAction.payload) {
					// If we have a structured error response
					if (typeof resultAction.payload === "object") {
						setErrors(resultAction.payload);
					} else {
						setErrors({ general: resultAction.payload });
					}
				} else {
					setErrors({
						general: resultAction.error.message || "Failed to create client",
					});
				}
			}
		} catch (err) {
			console.error("Error in form submission:", err);
			setErrors({ general: "An unexpected error occurred. Please try again." });
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
				<div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow dark:border-gray-700 border-gray-300 border md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<p className="text-xl font-bold leading-tight tracking-tight dark:text-gray-100 text-gray-900 md:text-2xl">
							Add new client
						</p>

						{/* General error message */}
						{errors.general && (
							<div
								className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
								role="alert"
							>
								{errors.general}
							</div>
						)}

						<div>
							<label
								htmlFor="id"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Id
							</label>
							<input
								placeholder="10"
								className="dark:bg-gray-700 bg-gray-200 dark:border-gray-700 border border-gray-300 dark:text-green-500 font-medium text-green-900 sm:text-sm rounded-lg block w-full p-2.5"
								id="id"
								name="id"
								type="text"
								value={nextId}
								disabled
							/>
						</div>

						<div>
							<label
								htmlFor="cin"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								CIN
							</label>
							<input
								placeholder="JB520335"
								className={`dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border ${
									errors.cin
										? "border-red-500 dark:border-red-500"
										: "border-gray-300"
								} dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
								id="cin"
								name="cin"
								type="text"
								value={formData.cin}
								onChange={handleChange}
								required
							/>
							{errors.cin && (
								<p className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors.cin}
								</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="first_name"
									className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
								>
									First Name
								</label>
								<input
									placeholder="Oussama"
									className={`dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border ${
										errors.first_name
											? "border-red-500 dark:border-red-500"
											: "border-gray-300"
									} dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
									id="first_name"
									name="first_name"
									type="text"
									value={formData.first_name}
									onChange={handleChange}
									required
								/>
								{errors.first_name && (
									<p className="mt-1 text-sm text-red-600 dark:text-red-400">
										{errors.first_name}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="last_name"
									className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
								>
									Last Name
								</label>
								<input
									placeholder="Matboua"
									className={`dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border ${
										errors.last_name
											? "border-red-500 dark:border-red-500"
											: "border-gray-300"
									} dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
									id="last_name"
									name="last_name"
									type="text"
									value={formData.last_name}
									onChange={handleChange}
									required
								/>
								{errors.last_name && (
									<p className="mt-1 text-sm text-red-600 dark:text-red-400">
										{errors.last_name}
									</p>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="phone"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Phone
							</label>
							<input
								placeholder="0605776855"
								className={`dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border ${
									errors.phone
										? "border-red-500 dark:border-red-500"
										: "border-gray-300"
								} dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
								id="phone"
								name="phone"
								type="text"
								value={formData.phone}
								onChange={handleChange}
								required
							/>
							{errors.phone && (
								<p className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors.phone}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Email
							</label>
							<input
								placeholder="matbouaoussama@gmail.com"
								className={`dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border ${
									errors.email
										? "border-red-500 dark:border-red-500"
										: "border-gray-300"
								} dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors.email}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="city"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								City
							</label>
							<input
								placeholder="Inezgane"
								className={`dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border ${
									errors.city
										? "border-red-500 dark:border-red-500"
										: "border-gray-300"
								} dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
								id="city"
								name="city"
								type="text"
								value={formData.city}
								onChange={handleChange}
								required
							/>
							{errors.city && (
								<p className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors.city}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Password
							</label>
							<input
								placeholder="••••••••"
								className={`dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border ${
									errors.password
										? "border-red-500 dark:border-red-500"
										: "border-gray-300"
								} dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
								id="password"
								name="password"
								type="password"
								value={formData.password}
								onChange={handleChange}
								required
							/>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors.password}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="password_confirmation"
								className="block mb-2 text-sm font-medium dark:text-gray-100 text-gray-900"
							>
								Confirm Password
							</label>
							<input
								placeholder="••••••••"
								className={`dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border ${
									errors.password_confirmation
										? "border-red-500 dark:border-red-500"
										: "border-gray-300"
								} dark:text-gray-100 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5`}
								id="password_confirmation"
								name="password_confirmation"
								type="password"
								value={formData.password_confirmation}
								onChange={handleChange}
								required
							/>
							{errors.password_confirmation && (
								<p className="mt-1 text-sm text-red-600 dark:text-red-400">
									{errors.password_confirmation}
								</p>
							)}
						</div>

						<button
							className="cursor-pointer w-full bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Adding Client..." : "Add Client"}
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

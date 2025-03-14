"use client";

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../../redux/clients/clientsReducer";

export default function Register() {
	const { setToken, user } = useContext(AppContext);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);

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
	const [errors, setErrors] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Get next ID for JSON server
	const clients = useSelector((state) => state.clients);
	const nextId =
		clients.length > 0
			? Math.max(...clients.map((client) => Number(client.id))) + 1
			: 1;

	async function handleRegister(e) {
		e.preventDefault();
		setIsSubmitting(true);
		setErrors("");

		try {
			// Register with Laravel backend
			const res = await fetch("/api/register", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (data.errors || !res.ok) {
				setErrors(data.errors || { general: ["Registration failed"] });
				setIsSubmitting(false);
				return;
			}

			// If registration successful, store token and login user
			localStorage.setItem("token", data.token);
			setToken(data.token);

			// Add user to JSON server (Redux store)
			const clientData = {
				id: String(nextId),
				cin: formData.cin.toLowerCase(),
				first_name: formData.first_name.toLowerCase(),
				last_name: formData.last_name.toLowerCase(),
				phone: formData.phone,
				email: formData.email.toLowerCase(),
				city: formData.city.toLowerCase(),
			};

			// Add to JSON server via Redux
			dispatch(addClient(clientData));

			// Also add to JSON server directly to ensure persistence
			await fetch("http://localhost:3001/clients", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(clientData),
			});

			// Navigate to home page
			navigate("/");
		} catch (error) {
			console.error("Registration error:", error);
			setErrors({
				general: ["An unexpected error occurred. Please try again."],
			});
		} finally {
			setIsSubmitting(false);
		}
	}

	if (user) {
		return null;
	}

	return (
		<section
			className="flex flex-col items-center w-full justify-center"
			style={{ minHeight: "calc(100vh - 113px)" }}
		>
			<div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 dark:border-0 border border-gray-200">
				<h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
				{(errors.first_name ||
					errors.last_name ||
					errors.cin ||
					errors.city ||
					errors.email ||
					errors.phone ||
					errors.password ||
					errors.general) && (
					<ul className="dark:bg-red-800/10 bg-red-100 py-3 px-4 text-red-600 border-2 border-red-600 rounded-2xl mb-8 list-disc list-inside">
						{errors.first_name && <li>{errors.first_name[0]}</li>}
						{errors.last_name && <li>{errors.last_name[0]}</li>}
						{errors.cin && <li>{errors.cin[0]}</li>}
						{errors.city && <li>{errors.city[0]}</li>}
						{errors.email && <li>{errors.email[0]}</li>}
						{errors.phone && <li>{errors.phone[0]}</li>}
						{errors.password && <li>{errors.password[0]}</li>}
						{errors.general &&
							errors.general.map((err, index) => <li key={index}>{err}</li>)}
					</ul>
				)}
				<form
					onSubmit={handleRegister}
					className="space-y-4 grid grid-cols-2 gap-x-5"
				>
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							First Name
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="Amine..."
							value={formData.first_name}
							onChange={(e) => {
								setFormData({ ...formData, first_name: e.target.value });
							}}
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Last Name
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="Alami..."
							value={formData.last_name}
							onChange={(e) => {
								setFormData({ ...formData, last_name: e.target.value });
							}}
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							CIN
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="JB520110..."
							value={formData.cin}
							onChange={(e) => {
								setFormData({ ...formData, cin: e.target.value });
							}}
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							City
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="Casablanca..."
							value={formData.city}
							onChange={(e) => {
								setFormData({ ...formData, city: e.target.value });
							}}
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Email
						</label>
						<input
							type="email"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="your@email.com..."
							value={formData.email}
							onChange={(e) => {
								setFormData({ ...formData, email: e.target.value });
							}}
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Phone
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="(+212) 605-776855..."
							value={formData.phone}
							onChange={(e) => {
								setFormData({ ...formData, phone: e.target.value });
							}}
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Password
						</label>
						<input
							type="password"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="••••••••"
							value={formData.password}
							onChange={(e) => {
								setFormData({ ...formData, password: e.target.value });
							}}
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Confirm Password
						</label>
						<input
							type="password"
							className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="••••••••"
							value={formData.password_confirmation}
							onChange={(e) => {
								setFormData({
									...formData,
									password_confirmation: e.target.value,
								});
							}}
							required
						/>
					</div>

					<button
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer col-span-2 justify-self-center disabled:opacity-50 disabled:cursor-not-allowed"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Creating Account..." : "Sign Up"}
					</button>
				</form>

				<div className="mt-6 text-center text-sm dark:text-gray-400 text-gray-500">
					Already have an account?
					<Link
						to="/login"
						className="text-blue-600 hover:text-blue-500 font-medium ml-1"
					>
						Sign in
					</Link>
				</div>
			</div>
		</section>
	);
}

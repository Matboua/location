"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function Login() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { adminLogin, isAdminLoggedIn } = useAdminAuth();

	// If already logged in, redirect to admin dashboard
	if (isAdminLoggedIn) {
		navigate("/admin/home");
		return null;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		const { username, password } = formData;

		if (!username || !password) {
			setError("Please enter both username and password");
			setIsLoading(false);
			return;
		}

		const success = adminLogin(username, password);

		if (success) {
			navigate("/admin/home");
		} else {
			setError("Invalid username or password");
		}

		setIsLoading(false);
	};

	return (
		<section
			className="flex flex-col items-center w-full bg-gray-800 h-screen justify-center"
			style={{ minHeight: "calc(100vh - 113px)" }}
		>
			<div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 dark:border-0 border border-gray-200">
				<h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

				{error && (
					<div
						className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
						role="alert"
					>
						{error}
					</div>
				)}

				<form className="space-y-4 pb-6" onSubmit={handleSubmit}>
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Username
						</label>
						<input
							type="text"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
							placeholder="admin"
							value={formData.username}
							onChange={(e) =>
								setFormData({ ...formData, username: e.target.value })
							}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Password
						</label>
						<input
							type="password"
							className="w-full px-4 mb-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
							placeholder="••••••••"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
						/>
					</div>

					<button
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
						type="submit"
						disabled={isLoading}
					>
						{isLoading ? "Signing In..." : "Sign In"}
					</button>
				</form>
			</div>
		</section>
	);
}

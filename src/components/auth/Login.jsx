import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Login() {
	const { setToken, user } = useContext(AppContext);
	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState("");
	async function handleLogin(e) {
		e.preventDefault();
		const res = await fetch("/api/login", {
			method: "post",
			body: JSON.stringify(formData),
		});
		const data = await res.json();
		if (data.errors) {
			setErrors(data.errors || !res.ok);
		} else {
			localStorage.setItem("token", data.token);
			setToken(data.token);
			navigate("/");
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
			<div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 dark:border-0 border border-gray-200">
				<h2 className="text-2xl font-bold mb-6 text-center">Client Login</h2>
				{(errors.email || errors.password) && (
					<ul className="bg-gray-800 py-3 px-4 text-red-600 border-2 border-red-600 rounded-2xl mb-8 list-disc list-inside">
						{errors.first_name && <li>{errors.first_name[0]}</li>}
						{errors.last_name && <li>{errors.last_name[0]}</li>}
						{errors.cin && <li>{errors.cin[0]}</li>}
						{errors.city && <li>{errors.city[0]}</li>}
						{errors.email && <li>{errors.email[0]}</li>}
						{errors.phone && <li>{errors.phone[0]}</li>}
						{errors.password && <li>{errors.password[0]}</li>}
					</ul>
				)}
				<form className="space-y-4" onSubmit={handleLogin}>
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Email
						</label>
						<input
							type="email"
							className="w-full px-4 py-2 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="your@email.com"
							value={formData.email}
							onChange={(e) => {
								setFormData({ ...formData, email: e.target.value });
							}}
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
						/>
					</div>

					<div className="flex items-center justify-between">
						<label className="flex items-center">
							<input
								type="checkbox"
								className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span className="ml-2 text-sm dark:text-gray-400 text-gray-500">
								Remember me
							</span>
						</label>
						<a href="#" className="text-sm text-blue-600 hover:text-blue-500">
							Forgot password?
						</a>
					</div>

					<button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer">
						Sign In
					</button>
				</form>

				<div className="mt-6 text-center text-sm dark:text-gray-400 text-gray-500">
					Do not have an account?
					<Link
						to="/register"
						className="text-blue-600 hover:text-blue-500 font-medium ml-1"
					>
						Sign up
					</Link>
				</div>
			</div>
		</section>
	);
}

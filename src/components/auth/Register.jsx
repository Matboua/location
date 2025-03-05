import { Link } from "react-router-dom";

export default function Register() {
	return (
		<section
			className="flex flex-col items-center w-full justify-center"
			style={{ minHeight: "calc(100vh - 113px)" }}
		>
			<div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 dark:border-0 border border-gray-200">
				<h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Name
						</label>
						<input
							type="name"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="Amine Alami"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Email
						</label>
						<input
							type="email"
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="your@email.com"
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
						/>
					</div>

					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Confirm Password
						</label>
						<input
							type="password_confirmation"
							className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
							placeholder="••••••••"
						/>
					</div>

					<button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer">
						Sign Up
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

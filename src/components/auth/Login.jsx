import { Link } from "react-router-dom";

export default function Login() {
	return (
		<section
			className="flex flex-col items-center w-full justify-center"
			style={{ minHeight: "calc(100vh - 113px)" }}
		>
			<div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 dark:border-0 border border-gray-200">
				<h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium dark:text-gray-400 text-gray-500 mb-1">
							Email
						</label>
						<input
							type="email"
							className="w-full px-4 py-2 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:placeholder:text-gray-400 placeholder:text-gray-500"
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

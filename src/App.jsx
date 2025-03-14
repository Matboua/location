import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";
import User from "./components/user/User";
import DetailContract from "./components/admin/pages/contracts/DetailContract";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminLogin from "./components/admin/auth/Login";

function App() {
	return (
		<>
			<BrowserRouter>
				<AdminAuthProvider>
					<Routes>
						{/* Admin Login */}
						<Route path="/admin-login" element={<AdminLogin />} />

						{/* Protected Admin Routes */}
						<Route element={<ProtectedAdminRoute />}>
							<Route path="/admin/*" element={<Admin />} />
							<Route
								path="/DetailContract/:contractid"
								element={<DetailContract />}
							/>
						</Route>

						{/* User Routes */}
						<Route path="/*" element={<User />} />
					</Routes>
				</AdminAuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;

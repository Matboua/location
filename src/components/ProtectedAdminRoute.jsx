import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function ProtectedAdminRoute() {
	const { isAdminLoggedIn } = useAdminAuth();

	// If not logged in as admin, redirect to admin login
	if (!isAdminLoggedIn) {
		return <Navigate to="/admin-login" replace />;
	}

	// If logged in, render the child routes
	return <Outlet />;
}

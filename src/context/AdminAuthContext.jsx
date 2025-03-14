"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create a context for admin authentication
export const AdminAuthContext = createContext();

// Custom hook to use the admin auth context
export const useAdminAuth = () => useContext(AdminAuthContext);

// Admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

export function AdminAuthProvider({ children }) {
	const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
	const navigate = useNavigate();

	// Check if admin is logged in on component mount
	useEffect(() => {
		const adminToken = localStorage.getItem("adminToken");
		if (adminToken) {
			setIsAdminLoggedIn(true);
		}
	}, []);

	// Admin login function
	const adminLogin = (username, password) => {
		if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
			// Set a simple token in localStorage
			localStorage.setItem("adminToken", "admin-auth-token");
			setIsAdminLoggedIn(true);
			return true;
		}
		return false;
	};

	// Admin logout function
	const adminLogout = () => {
		localStorage.removeItem("adminToken");
		setIsAdminLoggedIn(false);
		// Use window.location to ensure a full page reload and proper redirect
		window.location.href = "/";
	};

	return (
		<AdminAuthContext.Provider
			value={{ isAdminLoggedIn, adminLogin, adminLogout }}
		>
			{children}
		</AdminAuthContext.Provider>
	);
}

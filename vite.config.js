import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@assets": path.resolve(__dirname, "src/assets"),
			"@redux": path.resolve(__dirname, "src/redux"),
		},
	},
	// For Backend Laravel
	server: {
		proxy: {
			"/api": {
				target: "http://127.0.0.1:8000",
				changeOrigin: true,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			},
		},
	},
});

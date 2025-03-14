import { configureStore } from "@reduxjs/toolkit";
import carsReducer, { fetchCars } from "./cars/carsReducer";
import clientsReducer, { fetchClients } from "./clients/clientsReducer";
import contractsReducer, { fetchContracts } from "./contracts/contractsReducer";

// Create the store with empty initial states
const store = configureStore({
	reducer: {
		cars: carsReducer,
		clients: clientsReducer,
		contracts: contractsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// Function to load data from json-server and sync with Laravel
export const loadInitialData = async () => {
	// Load data from JSON server
	await store.dispatch(fetchCars());
	await store.dispatch(fetchClients());
	await store.dispatch(fetchContracts());

	// Optional: Sync existing JSON server clients with Laravel
	// This could be enabled once to perform an initial sync
	// syncExistingClientsWithLaravel(store.getState().clients)
};

// Function to sync existing clients with Laravel (run once if needed)
const syncExistingClientsWithLaravel = async (clients) => {
	console.log("Starting sync of existing clients with Laravel...");

	for (const client of clients) {
		try {
			// Check if client exists in Laravel
			const checkResponse = await fetch(
				`/api/admin/clients/check/${client.id}`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
					},
				}
			);

			const exists = await checkResponse.json();

			if (!exists.exists) {
				// Client doesn't exist in Laravel, create it
				const createResponse = await fetch("/api/admin/clients", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify({
						...client,
						password: "default123",
						password_confirmation: "default123",
					}),
				});

				if (!createResponse.ok) {
					console.error(
						`Failed to sync client ${client.id} to Laravel:`,
						await createResponse.text()
					);
				} else {
					console.log(`Successfully synced client ${client.id} to Laravel`);
				}
			} else {
				console.log(`Client ${client.id} already exists in Laravel, skipping`);
			}
		} catch (error) {
			console.error(`Error syncing client ${client.id} to Laravel:`, error);
		}
	}

	console.log("Finished sync of existing clients with Laravel");
};

// Load the initial data when the app starts
loadInitialData();

export default store;

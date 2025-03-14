import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, createItem, updateItem, deleteItem } from "../api";

// Async thunks for API operations
export const fetchClients = createAsyncThunk(
	"clients/fetchClients",
	async () => {
		return await fetchData("clients");
	}
);

// Modified to write to both JSON server and Laravel backend
export const addClientAsync = createAsyncThunk(
	"clients/addClient",
	async (clientData, { rejectWithValue }) => {
		try {
			// Extract password fields for Laravel but don't store them in JSON server
			const { password, password_confirmation, ...jsonServerData } = clientData;

			// First, add to JSON server (without password)
			const jsonServerResponse = await createItem("clients", jsonServerData);

			// Then, add to Laravel database (with password)
			try {
				const laravelResponse = await fetch("/api/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify({
						...clientData,
						// Include the password fields from the form
						password,
						password_confirmation,
					}),
				});

				if (!laravelResponse.ok) {
					const errorData = await laravelResponse.json();
					console.error("Failed to add client to Laravel database:", errorData);

					// If Laravel sync fails, delete from JSON server to maintain consistency
					try {
						await deleteItem("clients", jsonServerResponse.id);
					} catch (deleteError) {
						console.error(
							"Error deleting client from JSON server after Laravel sync failure:",
							deleteError
						);
					}

					return rejectWithValue(
						errorData.message || "Failed to register client in database"
					);
				}
			} catch (error) {
				console.error("Error syncing client to Laravel:", error);

				// If Laravel sync fails, delete from JSON server to maintain consistency
				try {
					await deleteItem("clients", jsonServerResponse.id);
				} catch (deleteError) {
					console.error(
						"Error deleting client from JSON server after Laravel sync failure:",
						deleteError
					);
				}

				return rejectWithValue(
					"Network error: Could not connect to authentication service"
				);
			}

			return jsonServerResponse;
		} catch (error) {
			console.error("Error in client creation:", error);
			return rejectWithValue("Failed to create client. Please try again.");
		}
	}
);

// Modified to update in both systems
export const editClientAsync = createAsyncThunk(
	"clients/editClient",
	async (clientData) => {
		try {
			// First, update in JSON server
			const jsonServerResponse = await updateItem(
				"clients",
				clientData.id,
				clientData
			);

			// Then, update in Laravel database
			const laravelResponse = await fetch(
				`/api/admin/clients/${clientData.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
					body: JSON.stringify(clientData),
				}
			);

			if (!laravelResponse.ok) {
				const errorData = await laravelResponse.json();
				console.error(
					"Failed to update client in Laravel database:",
					errorData
				);
				throw new Error(
					errorData.message || "Failed to update client in database"
				);
			}

			return jsonServerResponse;
		} catch (error) {
			console.error("Error during client update:", error);
			throw error;
		}
	}
);

// Modified to delete from both systems
export const deleteClientAsync = createAsyncThunk(
	"clients/deleteClient",
	async (id) => {
		try {
			// First, delete from JSON server
			await deleteItem("clients", id);

			// Then, delete from Laravel database
			const laravelResponse = await fetch(`/api/admin/clients/${id}`, {
				method: "DELETE",
				headers: {
					Accept: "application/json",
				},
			});

			if (!laravelResponse.ok) {
				// If Laravel API is not available or returns an error, just log it
				// but still return the id to remove from Redux store
				console.warn(
					"Could not delete from Laravel database:",
					await laravelResponse.text()
				);
			}

			return id;
		} catch (error) {
			console.error("Error during client deletion:", error);
			// Still return the id to remove from Redux store even if there's an error
			// This ensures the UI stays in sync
			return id;
		}
	}
);

const clientsSlice = createSlice({
	name: "clients",
	initialState: [],
	reducers: {
		// Keep local reducers for optimistic updates
		addClient: (state, action) => {
			state.push(action.payload);
		},
		editClient: (state, action) => {
			const { id, first_name, last_name, phone, email, city, cin } =
				action.payload;
			const client = state.find((client) => client.id == id);
			if (client) {
				client.first_name = first_name;
				client.last_name = last_name;
				client.phone = phone;
				client.email = email;
				client.city = city;
				if (cin) client.cin = cin;
			}
		},
		deleteClient: (state, action) => {
			return state.filter((client) => client.id != action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchClients.fulfilled, (state, action) => {
				return action.payload;
			})
			.addCase(addClientAsync.fulfilled, (state, action) => {
				state.push(action.payload);
			})
			.addCase(editClientAsync.fulfilled, (state, action) => {
				const index = state.findIndex(
					(client) => client.id == action.payload.id
				);
				if (index !== -1) {
					state[index] = action.payload;
				}
			})
			.addCase(deleteClientAsync.fulfilled, (state, action) => {
				return state.filter((client) => client.id != action.payload);
			});
	},
});

export const { addClient, editClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { db } from "/db.jsx";
const clientsSlice = createSlice({
	name: "clients",
	initialState: db.clients,
	reducers: {
		addClient: (state, action) => {
			state.push(action.payload);
		},
		editClient: (state, action) => {
			// Get Client Updated Data
			const { id, first_name, last_name, phone, email, city } = action.payload;
			// Get Client
			const client = state.find((client) => client.id == id);
			// Update Client
			if (client) {
				client.first_name = first_name;
				client.last_name = last_name;
				client.phone = phone;
				client.email = email;
				client.city = city;
			}
		},
		deleteClient: (state, action) => {
			// Get Client Id
			const { id } = action.payload;
			// Get Client
			const client = state.find((client) => client.id == id);
			// Delete Client
			if (client) return state.filter((client) => client.id != id);
		},
	},
});
export const { addClient, editClient, deleteClient } = clientsSlice.actions;
export default clientsSlice.reducer;

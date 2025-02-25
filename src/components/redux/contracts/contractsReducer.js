import { createSlice } from "@reduxjs/toolkit";
import { db } from "/db.jsx";
const contractsSlice = createSlice({
	name: "contracts",
	initialState: db.contracts,
	reducers: {
		addContract: (state, action) => {
			state.push(action.payload);
		},
		editContract: (state, action) => {
			// Get Updated Data
			const {
				id,
				car_name,
				image,
				car_id,
				client_id,
				start_date,
				end_date,
				amount,
			} = action.payload;
			// Get Contract
			const contract = state.find((contract) => contract.id == id);
			// Update Contract
			if (contract) {
				contract.car_name = car_name;
				contract.image = image;
				contract.car_id = car_id;
				contract.client_id = client_id;
				contract.start_date = start_date;
				contract.end_date = end_date;
				contract.amount = amount;
			}
		},
		deleteContract: (state, action) => {
			// Get Id
			const { id } = action.payload;
			// Get Contract
			const contract = state.find((contract) => contract.id == id);
			// Delete Contract
			if (contract) return state.filter((contract) => contract.id != id);
		},
	},
});
export const { addContract, editContract, deleteContract } =
	contractsSlice.actions;
export default contractsSlice.reducer;

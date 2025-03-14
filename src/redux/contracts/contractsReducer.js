import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, createItem, updateItem, deleteItem } from "../api";

// Async thunks for API operations
export const fetchContracts = createAsyncThunk(
	"contracts/fetchContracts",
	async () => {
		return await fetchData("contracts");
	}
);

export const addContractAsync = createAsyncThunk(
	"contracts/addContract",
	async (contractData) => {
		return await createItem("contracts", contractData);
	}
);

export const editContractAsync = createAsyncThunk(
	"contracts/editContract",
	async (contractData) => {
		return await updateItem("contracts", contractData.id, contractData);
	}
);

export const deleteContractAsync = createAsyncThunk(
	"contracts/deleteContract",
	async (id) => {
		await deleteItem("contracts", id);
		return id;
	}
);

const contractsSlice = createSlice({
	name: "contracts",
	initialState: [],
	reducers: {
		// Keep local reducers for optimistic updates
		addContract: (state, action) => {
			state.push(action.payload);
		},
		editContract: (state, action) => {
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
			const contract = state.find((contract) => contract.id == id);
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
			return state.filter((contract) => contract.id != action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContracts.fulfilled, (state, action) => {
				return action.payload;
			})
			.addCase(addContractAsync.fulfilled, (state, action) => {
				state.push(action.payload);
			})
			.addCase(editContractAsync.fulfilled, (state, action) => {
				const index = state.findIndex(
					(contract) => contract.id == action.payload.id
				);
				if (index !== -1) {
					state[index] = action.payload;
				}
			})
			.addCase(deleteContractAsync.fulfilled, (state, action) => {
				return state.filter((contract) => contract.id != action.payload);
			});
	},
});

export const { addContract, editContract, deleteContract } =
	contractsSlice.actions;
export default contractsSlice.reducer;

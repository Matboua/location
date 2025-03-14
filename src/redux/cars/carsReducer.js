import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, createItem, updateItem, deleteItem } from "../api";

// Async thunks for API operations
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
	return await fetchData("cars");
});

export const addCarAsync = createAsyncThunk("cars/addCar", async (carData) => {
	return await createItem("cars", carData);
});

export const editCarAsync = createAsyncThunk(
	"cars/editCar",
	async (carData) => {
		return await updateItem("cars", carData.id, carData);
	}
);

export const deleteCarAsync = createAsyncThunk("cars/deleteCar", async (id) => {
	await deleteItem("cars", id);
	return id;
});

const carsSlice = createSlice({
	name: "cars",
	initialState: [],
	reducers: {
		// Keep local reducers for optimistic updates
		addCar: (state, action) => {
			state.push(action.payload);
		},
		editCar: (state, action) => {
			const {
				id,
				name,
				description,
				image,
				price_now,
				price_before,
				marc,
				model,
				type,
				available,
			} = action.payload;
			const car = state.find((car) => car.id == id);
			if (car) {
				car.name = name;
				car.description = description;
				car.image = image;
				car.price_now = price_now;
				car.price_before = price_before;
				car.marc = marc;
				car.model = model;
				car.available = available;
				car.type = type;
			}
		},
		deleteCar: (state, action) => {
			return state.filter((car) => car.id != action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCars.fulfilled, (state, action) => {
				return action.payload;
			})
			.addCase(addCarAsync.fulfilled, (state, action) => {
				state.push(action.payload);
			})
			.addCase(editCarAsync.fulfilled, (state, action) => {
				const index = state.findIndex((car) => car.id == action.payload.id);
				if (index !== -1) {
					state[index] = action.payload;
				}
			})
			.addCase(deleteCarAsync.fulfilled, (state, action) => {
				return state.filter((car) => car.id != action.payload);
			});
	},
});

export const { addCar, editCar, deleteCar } = carsSlice.actions;
export default carsSlice.reducer;

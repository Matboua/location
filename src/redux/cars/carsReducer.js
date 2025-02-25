import { createSlice } from "@reduxjs/toolkit";
import { db } from "/db.jsx";
const carsSlice = createSlice({
	name: "cars",
	initialState: db.cars,
	reducers: {
		addCar: (state, action) => {
			state.push(action.payload);
		},
		editCar: (state, action) => {
			// Get Updated Car Data
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
			// Get Car
			const car = state.find((car) => car.id == id);
			// Update Car
			if (car) {
				(car.name = name),
					(car.description = description),
					(car.image = image),
					(car.price_now = price_now),
					(car.price_before = price_before),
					(car.marc = marc),
					(car.model = model),
					(car.available = available),
					(car.type = type);
			}
		},
		deleteCar: (state, action) => {
			// Get Id
			const { id } = action.payload;
			// Get Car
			const car = state.find((car) => car.id == id);
			// Delete Car
			if (car) return state.filter((car) => car.id != id);
		},
	},
});
export const { addCar, editCar, deleteCar } = carsSlice.actions;
export default carsSlice.reducer;

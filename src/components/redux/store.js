import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/carsReducer";

const store = configureStore({
	reducer: {
		cars: carsReducer,
	},
});

export default store;

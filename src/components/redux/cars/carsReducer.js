import { createSlice } from "@reduxjs/toolkit";
import { db } from "/db.jsx";
const carsSlice = createSlice({
	name: "cars",
	initialState: db.cars,
	reducers: {},
});

export default carsSlice.reducer;

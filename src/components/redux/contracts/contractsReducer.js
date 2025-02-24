import { createSlice } from "@reduxjs/toolkit";
import { db } from "/db.jsx";
const contractsSlice = createSlice({
	name: "contracts",
	initialState: db.contracts,
	reducers: {},
});

export default contractsSlice.reducer;

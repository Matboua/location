import { createSlice } from "@reduxjs/toolkit";
import { db } from "/db.jsx";
const clientsSlice = createSlice({
	name: "clients",
	initialState: db.clients,
	reducers: {},
});

export default clientsSlice.reducer;

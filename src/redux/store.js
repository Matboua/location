import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/carsReducer";
import clientsReducer from "./clients/clientsReducer";
import contractsReducer from "./contracts/contractsReducer";

const store = configureStore({
	reducer: {
		cars: carsReducer,
		clients: clientsReducer,
		contracts: contractsReducer,
	},
});

export default store;

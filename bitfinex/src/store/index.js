import { configureStore } from "@reduxjs/toolkit";
import orderBookReducer from "../features/orderbook";
import {socketMiddleware} from "../middleware/socket";
import {Socket} from "../utils/socket"

const store = configureStore({
	reducer: {
		orderBook: orderBookReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(socketMiddleware(new Socket())),
	devTools: true,
});

export default store;

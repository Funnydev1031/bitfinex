import { createSlice } from "@reduxjs/toolkit";

export const orderBook = createSlice({
	name: "orderBook",
	initialState: {
		orderBookData: { bid: [], ask: [] },
	},
	reducers: {
		updateData: (state, action) => {
			const side = action?.payload[2] > 0 ? "bid" : "ask";
			if (Number.isInteger(action?.payload[0])) {
				if (state.orderBookData[side].length) {
					const itemExist = state.orderBookData[side]?.filter(
						(acc) => acc[0] === action?.payload[0],
					)[0];
					if (itemExist) {
						state = {
							...state,
							orderBookData: {
								...state.orderBookData,
								[side]: state.orderBookData[side]?.map((acc) => {
									if (acc[0] === action?.payload[0]) {
										return action?.payload;
									} else {
										return acc;
									}
								}),
							},
						};
					} else {
						state = {
							...state,
							orderBookData: {
								...state.orderBookData,
								[side]: [...state.orderBookData[side], action?.payload],
							},
						};
					}
				} else {
					state = {
						...state,
						orderBookData: {
							...state.orderBookData,
							[side]: [...state.orderBookData[side], action?.payload],
						},
					};
				}
			}

			return state;
		},
		removeData: (state, action) => {
			const side = action?.payload[2] > 0 ? "bid" : "ask";
			state = {
				...state,
				orderBookData: {
					...state.orderBookData,
					[side]: state.orderBookData[side]?.filter(
						(acc) => acc[0] !== action?.payload[0],
					),
				},
			};
			return state;
		},
	},
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = orderBook.actions;

export default orderBook.reducer;

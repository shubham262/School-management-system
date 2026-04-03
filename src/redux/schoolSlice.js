import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 100,
};

const schoolSlice = createSlice({
	name: "school",
	initialState,
	reducers: {
		incremented: (state, action) => {
			state.value += action.payload;
		},
		decremented: (state, action) => {
			state.value -= action.payload;
		},
	},
});

export const { incremented, decremented } = schoolSlice.actions;

export default schoolSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userName: "Shubham",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		updateUserName: (state, action) => {
			state.userName = action.payload;
		},
	},
});

export const { updateUserName } = authSlice.actions;

export default authSlice.reducer;

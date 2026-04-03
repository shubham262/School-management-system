const { configureStore } = require("@reduxjs/toolkit");
import schoolReducer from "./schoolSlice";
import authReducer from "./authSlice";

const makeStore = () =>
	configureStore({
		reducer: {
			school: schoolReducer,
			auth: authReducer,
		},
	});

export default makeStore;

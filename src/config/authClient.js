import { createAuthClient } from "better-auth/react";

const token =
	typeof window !== "undefined" ? localStorage.getItem("token") : null;
export const authClient = createAuthClient({
	baseURL: "http://localhost:3001",
	fetchOptions: {
		headers: {
			authorization: `Bearer ${token}`,
		},
	},
});

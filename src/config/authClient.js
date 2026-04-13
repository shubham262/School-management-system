import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3001",
	fetchOptions: {
		auth: {
			type: "Bearer",
			token: () => {
				const token =
					typeof window !== "undefined" ? localStorage.getItem("token") : null;
				return token;
			},
		},
	},
});

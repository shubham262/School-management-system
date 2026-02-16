import Login from "@/views/auth/Login";
import React, { memo } from "react";

export const metadata = {
	title: "Login to your school",
	description:
		"Streamlining operations,enhance learning and improving communication for students, teachers and admins.",
};

const AuthLogin = () => {
	return <Login />;
};

export default memo(AuthLogin);

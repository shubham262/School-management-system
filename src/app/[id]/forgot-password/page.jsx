import ForgotPassword from "@/views/auth/ForgotPassword";
import React, { memo } from "react";

export const metadata = {
	title: "Forgot your password,you can change it here",
	description:
		"Streamlining operations,enhance learning and improving communication for students, teachers and admins.",
};

const AuthForgot = () => {
	return <ForgotPassword />;
};

export default memo(AuthForgot);

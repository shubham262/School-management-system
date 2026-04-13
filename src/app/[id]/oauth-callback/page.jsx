import Oauth from "@/views/auth/Oauth";
import { cookies } from "next/headers";
import React, { memo } from "react";

export const metadata = {
	title: "Login to your school",
	description:
		"Streamlining operations,enhance learning and improving communication for students, teachers and admins.",
};

const OauthCallback = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get("better-auth.session_token")?.value;

	return <Oauth token={token} />;
};

export default memo(OauthCallback);

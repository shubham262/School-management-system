import Oauth from "@/views/auth/Oauth";
import { cookies } from "next/headers";

export const metadata = {
	title: "Provide your school information",
	description:
		"Streamlining operations, enhance learning and improving communication for students, teachers and admins.",
};

const AuthSchoolInfo = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get("better-auth.session_token")?.value;

	return <Oauth token={token || null} />;
};

export default AuthSchoolInfo;

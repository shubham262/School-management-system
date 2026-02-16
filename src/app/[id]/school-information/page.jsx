import SchoolInformation from "@/views/auth/SchoolInformation";
import React, { memo } from "react";

export const metadata = {
	title: "Provide your school information",
	description:
		"Streamlining operations,enhance learning and improving communication for students, teachers and admins.",
};

const AuthSchoolInfo = () => {
	return <SchoolInformation />;
};

export default memo(AuthSchoolInfo);

import SchoolLanding from "@/views/landing/SchoolLanding";
import React, { memo } from "react";

export const metadata = {
	title: "PW School",
	description:
		"Streamlining operations,enhance learning and improving communication for students, teachers and admins.",
};

const Landing = () => {
	return <SchoolLanding />;
};

export default memo(Landing);

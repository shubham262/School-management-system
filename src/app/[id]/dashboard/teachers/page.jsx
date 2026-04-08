import ProfilePage from "@/views/dashboard/Profile";
import StudentsPage from "@/views/dashboard/Students";
import TeachersPage from "@/views/dashboard/Teachers";
import React, { memo } from "react";

export const metadata = {
	title: "Students page",
	description: "Students information",
};

const StudentsUi = () => {
	return <TeachersPage />;
};

export default memo(StudentsUi);

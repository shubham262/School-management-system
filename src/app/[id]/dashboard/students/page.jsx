import StudentsPage from "@/views/dashboard/Students";
import React, { memo } from "react";

export const metadata = {
	title: "Students page",
	description: "Students information",
};

const StudentsUi = () => {
	return <StudentsPage />;
};

export default memo(StudentsUi);

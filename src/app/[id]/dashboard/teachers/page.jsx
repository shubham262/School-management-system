import TeachersPage from "@/views/dashboard/Teachers";
import React, { memo } from "react";

export const metadata = {
	title: "Teachers page",
	description: "Teachers information",
};

const StudentsUi = () => {
	return <TeachersPage />;
};

export default memo(StudentsUi);

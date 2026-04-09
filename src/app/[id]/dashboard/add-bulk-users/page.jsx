import AddBulkUsersPage from "@/views/dashboard/BulkUsers";

import React, { memo } from "react";

export const metadata = {
	title: "Add bulk users",
	description: "Add bulk users to your school within minutes",
};

const StudentsUi = () => {
	return <AddBulkUsersPage />;
};

export default memo(StudentsUi);

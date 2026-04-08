import AnnouncementsPage from "@/views/dashboard/Announcements";
import ProfilePage from "@/views/dashboard/Profile";
import React, { memo } from "react";

export const metadata = {
	title: "Profile page",
	description: "User profile information",
};

const ProfileUi = () => {
	return <AnnouncementsPage />;
};

export default memo(ProfileUi);

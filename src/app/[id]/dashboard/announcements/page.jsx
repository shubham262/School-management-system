import AnnouncementsPage from "@/views/dashboard/Announcements";
import React, { memo } from "react";

export const metadata = {
	title: "Announcement Information",
	description: "School and class announcements",
};

const AnnouncementUi = () => {
	return <AnnouncementsPage />;
};

export default memo(AnnouncementUi);

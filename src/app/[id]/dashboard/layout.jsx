import Protectedlayout from "@/layouts/ProtectedLayout";
import React from "react";

export default function RootLayout({ children }) {
	return <Protectedlayout>{children}</Protectedlayout>;
}

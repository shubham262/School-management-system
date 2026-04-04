import Sidebar from "@/components/dashboard/Sidebar";
import Protectedlayout from "@/layouts/ProtectedLayout";
import React from "react";

export default function RootLayout({ children }) {
	return (
		<Protectedlayout>
			<div className="min-h-screen bg-slate-50 flex">
				<Sidebar />
				<main className="flex-1 p-6 lg:p-10">{children}</main>
			</div>
		</Protectedlayout>
	);
}

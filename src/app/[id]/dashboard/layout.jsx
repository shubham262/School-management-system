import Sidebar from "@/components/dashboard/Sidebar";
import Protectedlayout from "@/layouts/ProtectedLayout";
import React from "react";

export default function RootLayout({ children }) {
	return (
		<Protectedlayout>
			<div className="flex min-h-screen min-w-screen bg-slate-100">
				{/* Sidebar */}
				<Sidebar />
				<main className="flex-1 self-stretch p-10">{children}</main>
			</div>
		</Protectedlayout>
	);
}

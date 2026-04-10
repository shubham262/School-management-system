import ResponsiveHeader from "@/components/dashboard/ResponsiveHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import Protectedlayout from "@/layouts/ProtectedLayout";
import React from "react";

export default function RootLayout({ children }) {
	return (
		<Protectedlayout>
			<div className="flex min-h-screen min-w-screen bg-slate-100">
				<Sidebar />

				<div className="flex flex-col min-w-0 flex-1 self-stretch">
					<ResponsiveHeader />
					<main className="flex-1 self-stretch p-5 lg:p-10">{children}</main>
				</div>
			</div>
		</Protectedlayout>
	);
}

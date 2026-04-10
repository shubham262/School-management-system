import ResponsiveHeader from "@/components/dashboard/ResponsiveHeader";
import Sidebar from "@/components/dashboard/Sidebar";
import Protectedlayout from "@/layouts/ProtectedLayout";

import React from "react";

export default function RootLayout({ children }) {
	return (
		<Protectedlayout>
			<div className="flex min-h-screen min-w-screen bg-slate-100">
				{/* Sidebar */}
				<Sidebar />
				<div className="flex min-w-screen flex-1 flex-col">
					<ResponsiveHeader />
					<main className="flex-1 self-stretch p-4 sm:p-6 md:p-10">
						{children}
					</main>
				</div>
			</div>
		</Protectedlayout>
	);
}

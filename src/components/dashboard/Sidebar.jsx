"use client";

import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
	UserRound,
	Megaphone,
	GraduationCap,
	Users,
	UploadCloud,
	LogOut,
} from "lucide-react";
import { authClient } from "@/config/authClient";

const Sidebar = () => {
	const pathname = usePathname();
	const params = useParams();
	const router = useRouter();
	const slug = params?.id;

	const navItems = useMemo(
		() => [
			{
				title: "Profile",
				href: `/${slug}/dashboard/profile`,
				icon: UserRound,
			},
			{
				title: "Announcements",
				href: `/${slug}/dashboard/announcements`,
				icon: Megaphone,
			},
			{
				title: "Students",
				href: `/${slug}/dashboard/students`,
				icon: GraduationCap,
			},
			{
				title: "Teachers",
				href: `/${slug}/dashboard/teachers`,
				icon: Users,
			},
			{
				title: "Add Bulk Users",
				href: `/${slug}/dashboard/add-bulk-users`,
				icon: UploadCloud,
			},
		],
		[slug]
	);

	const handleLogout = useCallback(async () => {
		localStorage.clear();
		router.push(`/${slug}/login`);
		await authClient.signOut();
	}, [slug, router]);

	return (
		<aside className="w-64 min-h-screen border-r border-slate-200 bg-white px-4 py-6 shadow-sm">
			<div className="flex flex-col h-full">
				<div className="px-2 mb-8">
					<p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
						Dashboard
					</p>
					<h1 className="text-xl font-bold text-slate-900 mt-1">
						School Admin
					</h1>
				</div>
				<nav className="space-y-1 flex-1">
					{navItems.map((item) => {
						const Icon = item.icon;
						const isActive =
							pathname === item.href || pathname?.startsWith(`${item.href}/`);
						return (
							<Link
								key={item.title}
								href={item.href}
								className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors border
								${
									isActive
										? "bg-blue-50 text-blue-700 border-blue-100"
										: "text-slate-600 hover:bg-slate-100 border-transparent"
								}
							`}
							>
								<Icon className="h-4 w-4" />
								<span>{item.title}</span>
							</Link>
						);
					})}
				</nav>
				<button
					onClick={handleLogout}
					className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 border border-slate-200 hover:bg-red-50 hover:text-red-700 hover:border-red-100 transition-colors"
				>
					<LogOut className="h-4 w-4" />
					<span>Logout</span>
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;

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

const Sidebar = ({ variant = "desktop", onNavigate }) => {
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
		await authClient.signOut();
		localStorage.clear();
		onNavigate?.();
		router.push(`/${slug}/login`);
	}, [slug, router, onNavigate]);

	const content = (
		<div className="flex h-full flex-col">
			<div className="mb-8 px-2">
				<p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
					Dashboard
				</p>
				<h1 className="mt-1 text-xl font-bold text-slate-900">School Admin</h1>
			</div>
			<nav className="flex-1 space-y-1">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive =
						pathname === item.href || pathname?.startsWith(`${item.href}/`);
					return (
						<Link
							key={item.title}
							href={item.href}
							onClick={() => onNavigate?.()}
							className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
								isActive
									? "border-blue-100 bg-blue-50 text-blue-700"
									: "border-transparent text-slate-600 hover:bg-slate-100"
							}`}
						>
							<Icon className="h-4 w-4" />
							<span>{item.title}</span>
						</Link>
					);
				})}
			</nav>
			<button
				onClick={handleLogout}
				className="mt-6 flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-red-100 hover:bg-red-50 hover:text-red-700"
			>
				<LogOut className="h-4 w-4" />
				<span>Logout</span>
			</button>
		</div>
	);

	if (variant === "drawer") {
		return <div className="h-full bg-white px-2 py-2">{content}</div>;
	}

	return (
		<aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white px-4 py-6 shadow-sm md:block">
			{content}
		</aside>
	);
};

export default Sidebar;

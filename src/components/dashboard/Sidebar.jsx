/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
	UserRound,
	Megaphone,
	GraduationCap,
	Users,
	UploadCloud,
	LogOut,
	CalendarCheck2,
} from "lucide-react";
import { authClient } from "@/config/authClient";

const Sidebar = ({ variant = "desktop", closeDrawer }) => {
	const pathname = usePathname();
	const params = useParams();
	const router = useRouter();
	const [info, setInfo] = useState({
		userName: "",
		role: "",
	});
	const slug = params?.id;

	useEffect(() => {
		try {
			if (typeof window === "undefined") return;
			let user = localStorage.getItem("user");
			let memberShip = localStorage.getItem("membership");
			memberShip = memberShip ? JSON.parse(memberShip) : null;
			user = user ? JSON.parse(user) : null;
			setInfo((prev) => ({
				...prev,
				userName: user?.name,
				role: memberShip?.role,
			}));
		} catch (error) {
			console.log("error while fetching user name");
		}
	}, []);

	const navItemsForAdmin = useMemo(
		() => [
			{
				title: "Profile",
				href: `/${slug}/dashboard/profile`,
				icon: UserRound,
				route: "profile",
			},
			{
				title: "Announcements",
				href: `/${slug}/dashboard/announcements`,
				icon: Megaphone,
				route: "announcements",
			},
			{
				title: "Students",
				href: `/${slug}/dashboard/students`,
				icon: GraduationCap,
				route: "students",
			},

			{
				title: "Teachers",
				href: `/${slug}/dashboard/teachers`,
				icon: Users,
				route: "teachers",
			},
			{
				title: "Add Bulk Users",
				href: `/${slug}/dashboard/add-bulk-users`,
				icon: UploadCloud,
				route: "add-bulk-users",
			},
		],
		[slug]
	);

	const navItemsForTeachers = useMemo(
		() => [
			{
				title: "Profile",
				href: `/${slug}/dashboard/profile`,
				icon: UserRound,
				route: "profile",
			},
			{
				title: "Announcements",
				href: `/${slug}/dashboard/announcements`,
				icon: Megaphone,
				route: "announcements",
			},
			{
				title: "Attendance",
				href: `/${slug}/dashboard/attendance`,
				icon: CalendarCheck2,
				route: "attendance",
			},
		],
		[slug]
	);

	const navItemsForUsers = useMemo(
		() => [
			{
				title: "Profile",
				href: `/${slug}/dashboard/profile`,
				icon: UserRound,
				route: "profile",
			},
			{
				title: "Announcements",
				href: `/${slug}/dashboard/announcements`,
				icon: Megaphone,
				route: "announcements",
			},
		],
		[slug]
	);

	const handleNavigation = useCallback(
		(route) => {
			closeDrawer?.();
			router.push(`/${slug}/dashboard/${route}`);
		},
		[closeDrawer, router, slug]
	);

	const handleLogout = useCallback(async () => {
		await authClient.signOut();
		closeDrawer?.();
		localStorage.clear();
		router.push(`/${slug}/login`);
	}, [slug, closeDrawer, router]);

	const navItems = useMemo(() => {
		if (!info?.role) return [];

		if (info?.role === "admin") {
			return navItemsForAdmin;
		}
		if (info?.role === "teacher") {
			return navItemsForTeachers;
		}
		if (info?.role === "student") {
			return navItemsForUsers;
		}
	}, [info?.role, navItemsForAdmin, navItemsForTeachers, navItemsForUsers]);

	const content = (
		<div className="flex flex-col h-full">
			<div className="px-2 mb-8">
				<p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
					Dashboard
				</p>
				<h1 className="text-xl font-bold text-slate-900 mt-1">
					{info?.userName || ""}
				</h1>
			</div>
			<nav className="space-y-1 flex-1">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive =
						pathname === item.href || pathname?.startsWith(`${item.href}/`);
					return (
						<div
							key={item.title}
							onClick={() => handleNavigation(item?.route)}
							className={`cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors border
								${
									isActive
										? "bg-blue-50 text-blue-700 border-blue-100"
										: "text-slate-600 hover:bg-slate-100 border-transparent"
								}
							`}
						>
							<Icon className="h-4 w-4" />
							<span>{item.title}</span>
						</div>
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
	);

	if (variant === "drawer") {
		return <div className="h-full bg-white">{content}</div>;
	}

	return (
		<aside className="hidden w-64 min-h-screen border-r border-slate-200 bg-white px-4 py-6 shadow-sm lg:block">
			{content}
		</aside>
	);
};

export default Sidebar;

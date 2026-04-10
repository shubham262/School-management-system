/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { Button, Drawer } from "antd";
import { Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const ResponsiveHeader = () => {
	const [info, setInfo] = useState({
		userName: "",
		drawerOpen: false,
	});
	useEffect(() => {
		try {
			if (typeof window === "undefined") return;
			let user = localStorage.getItem("user");
			user = user ? JSON.parse(user) : null;
			setInfo((prev) => ({ ...prev, userName: user?.name }));
		} catch (error) {
			console.log("error while fetching user name");
		}
	}, []);

	return (
		<div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur lg:hidden">
			<div className="flex items-center justify-between gap-3">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
						Dashboard
					</p>
					<h1 className="text-base font-semibold text-slate-900">
						{info?.userName || ""}
					</h1>
				</div>
				<Button
					type="text"
					aria-label="Open navigation menu"
					icon={<Menu className="h-5 w-5" />}
					onClick={() =>
						setInfo((prev) => ({ ...prev, drawerOpen: !prev.drawerOpen }))
					}
				/>
			</div>

			<Drawer
				title="Drawer with extra actions"
				placement={"left"}
				size={288}
				onClose={() => setInfo((prev) => ({ ...prev, drawerOpen: false }))}
				open={info?.drawerOpen}
				styles={{
					header: {
						display: "none",
					},
				}}
			>
				<Sidebar
					variant="drawer"
					closeDrawer={() =>
						setInfo((prev) => ({ ...prev, drawerOpen: false }))
					}
				/>
			</Drawer>
		</div>
	);
};

export default ResponsiveHeader;

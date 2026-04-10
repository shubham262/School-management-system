"use client";
import { Button, Drawer } from "antd";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const ResponsiveHeader = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	return (
		<div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:hidden">
			<div className="flex items-center justify-between gap-3">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
						Dashboard
					</p>
					<h1 className="text-base font-semibold text-slate-900">
						School Admin
					</h1>
				</div>
				<Button
					type="text"
					aria-label="Open navigation menu"
					icon={<Menu className="h-5 w-5" />}
					onClick={() => setDrawerOpen(true)}
				/>
			</div>

			<Drawer
				title={null}
				placement="left"
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				size={288}
				closeIcon={null}
				styles={{
					body: { padding: 16 },
					header: { display: "none" },
				}}
			>
				<Sidebar variant="drawer" onNavigate={() => setDrawerOpen(false)} />
			</Drawer>
		</div>
	);
};

export default ResponsiveHeader;

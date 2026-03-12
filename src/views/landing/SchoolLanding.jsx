import { Bell, ChevronRight, GraduationCap, Megaphone } from "lucide-react";
import React, { memo } from "react";

const SchoolLanding = () => {
	return (
		<div className="min-h-screen min-w-screen flex flex-col bg-slate-100">
			<header className="bg-white border-b border-slate-200">
				<div className="mx-auto py-4 px-6 max-w-5xl  flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600">
							<GraduationCap className="w-5 h-5 text-white" />
						</div>
						<div>
							<p className="font-semibold text-slate-800 text-sm ">PW School</p>
							<p className="text-slate-400 text-xs">CBSE Affiliation</p>
						</div>
					</div>

					<a className="flex items-center bg-blue-600 hover:bg-blue-700 transition-all font-medium text-white text-sm py-2 px-4 rounded-lg cursor-pointer">
						Login <ChevronRight className=" w-5 h-5" />
					</a>
				</div>
			</header>
			<div className="flex-1 max-w-5xl mx-auto w-full flex flex-col gap-5 px-4 py-6">
				{/* Hero section  */}
				{/* Announcements  */}
				<div className="w-full bg-white flex flex-col border border-slate-200 rounded-2xl overflow-hidden">
					<div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
								<Megaphone className="w-4 h-4 text-blue-600" />
							</div>
							<h2 className="text-sm font-semibold text-slate-700">
								School Announcements
							</h2>
						</div>

						<span className="text-xs font-semibold bg-slate-100 px-2.5 py-1 rounded-full text-slate-400">
							No Notices
						</span>
					</div>
					{/* empty state for no announcements  */}
					<div className="flex flex-col items-center justify-center py-14 px-6 text-center">
						<div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
							<Bell className="w-6 h-6 text-slate-400" />
						</div>
						<p className="text-slate-700 font-semibold text-sm">
							No Announcements yet
						</p>
						<p className="text-slate-400 text-xs mt-1.5 max-w-xs">
							There are no announcements at the moment. <br></br>Check back
							later for updates from the school
						</p>
					</div>
				</div>
			</div>
			<footer className="bg-white flex items-center justify-center text-center text-xs text-slate-400 py-4  border-t border-slate-200">
				© {new Date().getFullYear()} PW School. All rights reserved.
			</footer>
		</div>
	);
};

export default memo(SchoolLanding);

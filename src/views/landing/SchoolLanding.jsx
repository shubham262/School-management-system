import { ChevronRight, GraduationCap } from "lucide-react";
import React, { memo } from "react";

const SchoolLanding = () => {
	return (
		<div className="min-h-screen min-w-screen flex flex-col bg-slate-100">
			<header className="bg-white border-b border-slate-200">
				<div className="mx-auto py-4 px-6 max-w-5xl  flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600">
							<GraduationCap className="w-5 h-5 text-white"/>
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
			<div className="flex-1"></div>
			<footer className="bg-white flex items-center justify-center text-center text-xs text-slate-400 py-4  border-t border-slate-200">
				© {new Date().getFullYear()} PW School. All rights reserved.
			</footer>
		</div>
	);
};

export default memo(SchoolLanding);

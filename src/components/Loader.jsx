import { Skeleton } from "antd";

const LandingLoader = () => (
	<div className="min-h-screen min-w-screen flex flex-col bg-slate-100">
		<header className="bg-white border-b border-slate-200">
			<div className="mx-auto py-4 px-6 max-w-5xl  flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse" />
					<div className="space-y-2">
						<div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
						<div className="h-2 w-24 bg-slate-100 rounded animate-pulse" />
					</div>
				</div>

				<div className="h-9 w-24 bg-slate-200 rounded-lg animate-pulse" />
			</div>
		</header>
		<div className="flex-1 max-w-5xl mx-auto w-full flex flex-col gap-5 px-4 py-6 ">
			<div className="w-full rounded-2xl flex flex-col overflow-hidden bg-blue-600 p-6 md:p-8 gap-6">
				<div className="flex gap-5  flex-col md:flex-row">
					<div className="w-20 h-20 rounded-2xl bg-white/60 animate-pulse" />

					<div className="flex-1 space-y-3">
						<div className="h-6 w-48 bg-white/60 rounded animate-pulse" />
						<div className="h-3 w-64 bg-blue-200/70 rounded animate-pulse" />
					</div>

					<div className="space-y-2 w-44">
						<Skeleton.Button active block size="large" shape="round" />
						<Skeleton.Button active block size="small" shape="round" />
						<Skeleton.Button active block size="small" shape="round" />
					</div>
				</div>
				<div className="grid md:grid-cols-3 gap-3">
					{Array.from({ length: 3 }).map((_, idx) => (
						<div
							key={idx}
							className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/10 text-white"
						>
							<div className="w-10 h-10 rounded-full bg-white/40 animate-pulse" />
							<div className="flex flex-col gap-2 flex-1">
								<div className="h-3 w-16 bg-white/60 rounded animate-pulse" />
								<div className="h-2 w-20 bg-blue-200/60 rounded animate-pulse" />
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="w-full bg-white flex flex-col border border-slate-200 rounded-2xl overflow-hidden">
				<div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse" />
						<div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
					</div>

					<div className="h-6 w-20 rounded-full bg-slate-100 animate-pulse" />
				</div>
				<div className="flex divide-x divide-slate-100 flex-col md:flex-row divide-y">
					<div className="md:w-[260px] shrink-0 p-3 space-y-2 overflow-y-auto max-h-[400px]">
						{Array.from({ length: 4 }).map((_, idx) => (
							<div
								key={idx}
								className="w-full rounded-xl px-4 py-3 border border-slate-100 bg-slate-50 animate-pulse space-y-3"
							>
								<div className="flex items-center justify-between">
									<div className="h-3 w-10 bg-slate-200 rounded" />
									<div className="h-2 w-12 bg-slate-200 rounded" />
								</div>
								<div className="h-3 w-32 bg-slate-200 rounded" />
							</div>
						))}
					</div>
					<div className="flex-1 p-6">
						<Skeleton active paragraph={{ rows: 5 }} />
					</div>
				</div>
			</div>
		</div>

		<footer className="bg-white flex items-center justify-center text-center text-xs text-slate-400 py-4  border-t border-slate-200">
			<div className="h-2 w-32 bg-slate-200 rounded animate-pulse" />
		</footer>
	</div>
);

export default LandingLoader;

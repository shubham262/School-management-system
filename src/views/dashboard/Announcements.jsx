"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Bell, Megaphone, Edit3, Plus, Trash2, BookOpen } from "lucide-react";
import {
	Button,
	Form,
	Popover,
	Tag,
	message,
	Popconfirm,
	Segmented,
} from "antd";
import moment from "moment";
import AnnouncementModal from "../../components/dashboard/announcementModal";

const demoAnnouncements = [
	{
		id: 1,
		tag: "Urgent",
		title: "Campus closed tomorrow",
		description:
			"Due to heavy rainfall, the school will remain closed tomorrow. Classes will resume the day after.",
		scope: "school",
		classes: [],
		createdAt: Date.now() - 1000 * 60 * 60 * 5,
	},
	{
		id: 2,
		tag: "Exam",
		title: "Mid-term schedule",
		description:
			"Mid-term exams for Class 8 and 9 will start from 15th April. Detailed timetable will be shared in class groups.",
		scope: "class",
		classes: ["CLASS 8", "CLASS 9"],
		createdAt: Date.now() - 1000 * 60 * 60 * 20,
	},
	{
		id: 3,
		tag: "Event",
		title: "Annual Sports Day",
		description:
			"Annual Sports Day is scheduled for 30th April. Practice sessions begin next week. House captains will coordinate.",
		scope: "school",
		classes: [],
		createdAt: Date.now() - 1000 * 60 * 60 * 48,
	},
];

const AnnouncementsPage = () => {
	const [form] = Form.useForm();

	const [info, setInfo] = useState({
		announcements: demoAnnouncements,
		editingId: null,
		activeId: demoAnnouncements?.[0]?.id || null,
		modalOpen: false,
		filterScope: "all",
	});

	const handleSubmit = (values) => {
		const payload = {
			...values,
			id: info?.editingId || Date.now(),
			createdAt: info?.editingId
				? info?.announcements.find((a) => a.id === info?.editingId)?.createdAt
				: Date.now(),
		};

		if (payload.scope === "school") {
			payload.classes = [];
		}

		if (info?.editingId) {
			setInfo((prev) => ({
				...prev,
				announcements: prev?.announcements.map((item) =>
					item.id === prev?.editingId ? payload : item
				),
				activeId: payload.id,
				editingId: null,
				modalOpen: false,
			}));
			message.success("Announcement updated");
		} else {
			setInfo((prev) => ({
				...prev,
				announcements: [payload, ...prev?.announcements],
				activeId: payload.id,
				editingId: null,
				modalOpen: false,
			}));
			message.success("Announcement added");
		}

		form.resetFields();
	};

	const handleEdit = (item) => {
		setInfo((prev) => ({
			...prev,
			editingId: item.id,
			modalOpen: true,
		}));
		form.setFieldsValue({
			tag: item.tag,
			title: item.title,
			description: item.description,
			scope: item.scope,
			classes: item.classes || [],
		});
	};

	const handleDelete = (id) => {
		setInfo((prev) => {
			const nextAnnouncements = prev?.announcements.filter(
				(item) => item.id !== id
			);
			return {
				...prev,
				announcements: nextAnnouncements,
				activeId:
					prev?.activeId === id
						? nextAnnouncements?.[0]?.id || null
						: prev?.activeId,
				editingId: prev?.editingId === id ? null : prev?.editingId,
			};
		});
		message.info("Announcement deleted");
		if (info?.editingId === id) {
			form.resetFields();
		}
	};

	const handleModalClose = () => {
		setInfo((prev) => ({
			...prev,
			modalOpen: false,
			editingId: null,
		}));
		form.resetFields();
	};

	const sortedAnnouncements = useMemo(
		() =>
			[...(info?.announcements || [])].sort(
				(a, b) => b.createdAt - a.createdAt
			),
		[info?.announcements]
	);

	const filteredAnnouncements = useMemo(() => {
		if (info?.filterScope === "all") return sortedAnnouncements;
		return sortedAnnouncements.filter(
			(item) => item.scope === info?.filterScope
		);
	}, [sortedAnnouncements, info?.filterScope]);

	const effectiveActiveId = useMemo(() => {
		if (filteredAnnouncements.length === 0) return null;
		if (filteredAnnouncements.some((item) => item.id === info?.activeId)) {
			return info?.activeId;
		}
		return filteredAnnouncements[0].id;
	}, [filteredAnnouncements, info?.activeId]);

	const activeAnnouncement = useMemo(
		() => filteredAnnouncements.find((a) => a.id === effectiveActiveId),
		[filteredAnnouncements, effectiveActiveId]
	);

	return (
		<div className="max-w-6xl mx-auto space-y-6">
			<div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
					<div className="flex items-center gap-2 text-slate-900">
						<Bell className="w-4 h-4" />
						<span className="text-base font-semibold">Announcements</span>
					</div>
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
						<Segmented
							size="middle"
							block
							options={[
								{ label: "All", value: "all" },
								{ label: "School", value: "school" },
								{ label: "Class", value: "class" },
							]}
							value={info?.filterScope}
							onChange={(val) =>
								setInfo((prev) => ({ ...prev, filterScope: val }))
							}
						/>
						<Button
							type="primary"
							icon={<Plus className="w-4 h-4" />}
							className="w-full sm:w-auto"
							onClick={() => {
								setInfo((prev) => ({
									...prev,
									editingId: null,
									modalOpen: true,
								}));
								form.resetFields();
							}}
						>
							Add announcement
						</Button>
					</div>
				</div>
				<div className="flex flex-col divide-y divide-slate-100 md:flex-row md:divide-x md:divide-y-0">
					{filteredAnnouncements.length === 0 ? (
						<div className="py-10 flex flex-col items-center text-slate-400 gap-2 w-full">
							<Bell className="w-10 h-10" />
							<p className="text-sm">No announcements yet</p>
						</div>
					) : (
						<>
							{/* left list */}
							<div className="space-y-1.5 overflow-y-auto p-3 md:max-h-[420px] md:w-[260px] md:shrink-0">
								{filteredAnnouncements.map((item) => (
									<button
										key={item.id}
										onClick={() =>
											setInfo((prev) => ({ ...prev, activeId: item.id }))
										}
										className={`w-full text-left rounded-xl px-4 py-3 transition-all duration-150 flex flex-col gap-1.5 border ${
											info?.activeId === item.id
												? "bg-blue-50 border-blue-200"
												: "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
										}`}
									>
										<div className="flex items-center justify-between">
											<span
												className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700  border-blue-100`}
											>
												{item.tag}
											</span>
											<span className="text-slate-400 text-[10px]">
												{moment(item.createdAt).format("MMM DD, YYYY")}
											</span>
										</div>
										<p
											className={`text-xs font-semibold leading-snug ${
												info?.activeId === item.id
													? "text-blue-800"
													: "text-slate-700"
											}`}
										>
											{item.title}
										</p>
									</button>
								))}
							</div>

							{/* right detail */}
							<div className="flex flex-1 flex-col gap-3 p-4 sm:p-6">
								{!activeAnnouncement ? (
									<div className="flex flex-col items-center justify-center h-full py-10 text-center">
										<Megaphone className="w-8 h-8 text-slate-300 mb-3" />
										<p className="text-slate-400 text-sm">
											Select an announcement to read it
										</p>
									</div>
								) : (
									<>
										<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
											<div className="flex items-center gap-2 flex-wrap">
												<span
													className={`text-xs font-semibold px-2.5 py-1 rounded-full 
                                                       border-blue-100 text-blue-700 bg-blue-50 
                                                        
                                                   `}
												>
													{activeAnnouncement.tag}
												</span>
												<span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
													{activeAnnouncement.scope === "school"
														? "School"
														: "Class"}
												</span>
												{activeAnnouncement.scope === "class" &&
													activeAnnouncement.classes?.length > 0 && (
														<Popover
															content={
																<div className="max-w-xs">
																	<p className="font-semibold mb-1">Classes</p>
																	<div className="flex flex-wrap gap-1">
																		{activeAnnouncement.classes.map((c) => (
																			<Tag key={c}>{c}</Tag>
																		))}
																	</div>
																</div>
															}
															title={null}
														>
															<span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 cursor-default">
																<BookOpen className="w-3.5 h-3.5" />
																{activeAnnouncement.classes.length} class
																{activeAnnouncement.classes.length > 1
																	? "es"
																	: ""}
															</span>
														</Popover>
													)}
											</div>
											<span className="text-slate-400 text-xs">
												{moment(activeAnnouncement.createdAt).format(
													"MMM DD, YYYY"
												)}
											</span>
										</div>
										<h3 className="text-xl font-bold text-slate-900 leading-snug">
											{activeAnnouncement.title}
										</h3>
										<p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
											{activeAnnouncement.description}
										</p>

										<div className="flex flex-col gap-3 pt-2 sm:flex-row">
											<Button
												type="default"
												icon={<Edit3 className="w-4 h-4" />}
												className="w-full sm:w-auto"
												onClick={() => handleEdit(activeAnnouncement)}
											>
												Edit
											</Button>
											<Popconfirm
												title="Delete this announcement?"
												okText="Delete"
												cancelText="Cancel"
												onConfirm={() => handleDelete(activeAnnouncement.id)}
											>
												<Button
													type="primary"
													danger
													icon={<Trash2 className="w-4 h-4" />}
													className="w-full sm:w-auto"
												>
													Delete
												</Button>
											</Popconfirm>
										</div>
									</>
								)}
							</div>
						</>
					)}
				</div>
			</div>

			<AnnouncementModal
				open={info?.modalOpen}
				editingId={info?.editingId}
				form={form}
				onSubmit={handleSubmit}
				onClose={handleModalClose}
			/>
		</div>
	);
};

export default AnnouncementsPage;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
	Bell,
	Megaphone,
	Edit3,
	Plus,
	Trash2,
	BookOpen,
} from "lucide-react";
import {
	Button,
	Card,
	Form,
	Input,
	Popover,
	Radio,
	Select,
	Tag,
	message,
	Popconfirm,
	Modal,
	Segmented,
} from "antd";
import moment from "moment";

const availableClasses = {
	Nursery: 1,
	LKG: 2,
	UKG: 3,
	"CLASS 1": 4,
	"CLASS 2": 5,
	"CLASS 3": 6,
	"CLASS 4": 7,
	"CLASS 5": 8,
	"CLASS 6": 9,
	"CLASS 7": 10,
	"CLASS 8": 11,
	"CLASS 9": 12,
	"CLASS 10": 13,
	"CLASS 11": 14,
	"CLASS 12": 15,
};

const classOptions = Object.keys(availableClasses).map((key) => ({
	label: key,
	value: key,
}));

const tagColors = {
	Urgent: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-100" },
	Exam: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
	Event: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100" },
	Default: { bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" },
};

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

const emptyForm = {
	tag: "",
	title: "",
	description: "",
	scope: "school",
	classes: [],
};

const getInitialAnnouncements = () => {
	if (typeof window === "undefined") return demoAnnouncements;
	try {
		const stored = localStorage.getItem("announcements");
		if (stored) {
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed) && parsed.length) {
				return parsed;
			}
		}
		return demoAnnouncements;
	} catch (error) {
		console.error("Failed to load announcements", error);
		return demoAnnouncements;
	}
};

const AnnouncementsPage = () => {
	const [form] = Form.useForm();
	const [announcements, setAnnouncements] = useState(getInitialAnnouncements);
	const [editingId, setEditingId] = useState(null);
	const [activeId, setActiveId] = useState(
		getInitialAnnouncements()?.[0]?.id || null
	);
	const [modalOpen, setModalOpen] = useState(false);
	const [filterScope, setFilterScope] = useState("all");

	// Persist announcements
	useEffect(() => {
		localStorage.setItem("announcements", JSON.stringify(announcements));
	}, [announcements]);

	const handleSubmit = (values) => {
		const payload = {
			...values,
			id: editingId || Date.now(),
			createdAt: editingId
				? announcements.find((a) => a.id === editingId)?.createdAt
				: Date.now(),
		};

		if (payload.scope === "school") {
			payload.classes = [];
		}

		if (editingId) {
			setAnnouncements((prev) =>
				prev.map((item) => (item.id === editingId ? payload : item))
			);
			message.success("Announcement updated");
			setActiveId(payload.id);
		} else {
			setAnnouncements((prev) => [payload, ...prev]);
			message.success("Announcement added");
			setActiveId(payload.id);
		}

		setEditingId(null);
		form.resetFields();
		setModalOpen(false);
	};

	const handleEdit = (item) => {
		setEditingId(item.id);
		form.setFieldsValue({
			tag: item.tag,
			title: item.title,
			description: item.description,
			scope: item.scope,
			classes: item.classes || [],
		});
		setModalOpen(true);
	};

	const handleDelete = (id) => {
		setAnnouncements((prev) => {
			const next = prev.filter((item) => item.id !== id);
			const nextActive = activeId === id ? next[0]?.id || null : activeId;
			setActiveId(nextActive);
			return next;
		});
		message.info("Announcement deleted");
		if (editingId === id) {
			setEditingId(null);
			form.resetFields();
		}
	};

	const sortedAnnouncements = useMemo(
		() => [...announcements].sort((a, b) => b.createdAt - a.createdAt),
		[announcements]
	);

const filteredAnnouncements = useMemo(() => {
	if (filterScope === "all") return sortedAnnouncements;
	return sortedAnnouncements.filter((item) => item.scope === filterScope);
}, [sortedAnnouncements, filterScope]);

const effectiveActiveId = useMemo(() => {
	if (filteredAnnouncements.length === 0) return null;
	if (filteredAnnouncements.some((item) => item.id === activeId)) {
		return activeId;
	}
	return filteredAnnouncements[0].id;
}, [filteredAnnouncements, activeId]);

const activeAnnouncement = useMemo(
	() => filteredAnnouncements.find((a) => a.id === effectiveActiveId),
	[filteredAnnouncements, effectiveActiveId]
);

	return (
		<div className="max-w-6xl mx-auto space-y-6">
			<Card
				title={
					<div className="flex items-center gap-2">
						<Bell className="w-4 h-4" />
						<span>Announcements</span>
					</div>
				}
				extra={
					<div className="flex items-center gap-3">
						<Segmented
							size="middle"
							options={[
								{ label: "All", value: "all" },
								{ label: "School", value: "school" },
								{ label: "Class", value: "class" },
							]}
							value={filterScope}
							onChange={(val) => setFilterScope(val)}
						/>
						<Button
							type="primary"
							icon={<Plus className="w-4 h-4" />}
							onClick={() => {
								setEditingId(null);
								form.resetFields();
								setModalOpen(true);
							}}
						>
							Add announcement
						</Button>
					</div>
				}
				bordered
				className="shadow-sm"
			>
				<div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
					{filteredAnnouncements.length === 0 ? (
						<div className="py-10 flex flex-col items-center text-slate-400 gap-2 w-full">
							<Bell className="w-10 h-10" />
							<p className="text-sm">No announcements yet</p>
						</div>
					) : (
						<>
							{/* left list */}
							<div className="md:w-[260px] shrink-0 p-3 space-y-1.5 overflow-y-auto max-h-[420px]">
								{filteredAnnouncements.map((item) => (
									<button
										key={item.id}
										onClick={() => setActiveId(item.id)}
										className={`w-full text-left rounded-xl px-4 py-3 transition-all duration-150 flex flex-col gap-1.5 border ${
											activeId === item.id
												? "bg-blue-50 border-blue-200"
												: "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
										}`}
									>
										<div className="flex items-center justify-between">
											<span
												className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
													tagColors[item.tag]?.bg || tagColors.Default.bg
												} ${tagColors[item.tag]?.text || tagColors.Default.text} ${
													tagColors[item.tag]?.border || tagColors.Default.border
												}`}
											>
												{item.tag}
											</span>
											<span className="text-slate-400 text-[10px]">
												{moment(item.createdAt).format("MMM DD, YYYY")}
											</span>
										</div>
										<p
											className={`text-xs font-semibold leading-snug ${
												activeId === item.id ? "text-blue-800" : "text-slate-700"
											}`}
										>
											{item.title}
										</p>
									</button>
								))}
							</div>

							{/* right detail */}
							<div className="flex-1 p-6 flex flex-col gap-3">
								{!activeAnnouncement ? (
									<div className="flex flex-col items-center justify-center h-full py-10 text-center">
										<Megaphone className="w-8 h-8 text-slate-300 mb-3" />
										<p className="text-slate-400 text-sm">
											Select an announcement to read it
										</p>
									</div>
								) : (
									<>
										<div className="flex items-start justify-between gap-3">
											<div className="flex items-center gap-2 flex-wrap">
												<span
													className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
														tagColors[activeAnnouncement.tag]?.bg || tagColors.Default.bg
													} ${
														tagColors[activeAnnouncement.tag]?.text ||
														tagColors.Default.text
													} ${
														tagColors[activeAnnouncement.tag]?.border ||
														tagColors.Default.border
													}`}
												>
													{activeAnnouncement.tag}
												</span>
												<span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
													{activeAnnouncement.scope === "school" ? "School" : "Class"}
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
																{activeAnnouncement.classes.length > 1 ? "es" : ""}
															</span>
														</Popover>
													)}
											</div>
											<span className="text-slate-400 text-xs">
												{moment(activeAnnouncement.createdAt).format("MMM DD, YYYY")}
											</span>
										</div>
										<h3 className="text-xl font-bold text-slate-900 leading-snug">
											{activeAnnouncement.title}
										</h3>
										<p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
											{activeAnnouncement.description}
										</p>

										<div className="flex gap-3 pt-2">
											<Button
												type="default"
												icon={<Edit3 className="w-4 h-4" />}
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
												<Button type="primary" danger icon={<Trash2 className="w-4 h-4" />}>
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
			</Card>

			<Modal
				title={editingId ? "Edit announcement" : "Add announcement"}
				open={modalOpen}
				onCancel={() => {
					setModalOpen(false);
					setEditingId(null);
					form.resetFields();
				}}
				footer={null}
				width={720}
				destroyOnClose
			>
				<Form form={form} layout="vertical" initialValues={emptyForm} onFinish={handleSubmit}>
					<Form.Item
						name="tag"
						label="Tag"
						rules={[{ required: true, message: "Tag is required" }]}
					>
						<Input placeholder="e.g. Urgent, Exam, Holiday" />
					</Form.Item>

					<Form.Item
						name="title"
						label="Title"
						rules={[{ required: true, message: "Title is required" }]}
					>
						<Input placeholder="Announcement title" />
					</Form.Item>

					<Form.Item
						name="description"
						label="Description"
						rules={[{ required: true, message: "Description is required" }]}
					>
						<Input.TextArea rows={4} placeholder="Details for this announcement" />
					</Form.Item>

					<Form.Item
						name="scope"
						label="Scope"
						rules={[{ required: true, message: "Scope is required" }]}
					>
						<Radio.Group>
							<Radio.Button value="school">School</Radio.Button>
							<Radio.Button value="class">Class</Radio.Button>
						</Radio.Group>
					</Form.Item>

					<Form.Item shouldUpdate noStyle>
						{({ getFieldValue }) =>
							getFieldValue("scope") === "class" ? (
								<Form.Item
									name="classes"
									label="Classes"
									rules={[
										{
											required: true,
											message: "Select at least one class",
										},
									]}
								>
									<Select
										mode="multiple"
										placeholder="Select classes"
										options={classOptions}
										allowClear
									/>
								</Form.Item>
							) : null
						}
					</Form.Item>

					<div className="flex flex-wrap gap-3 pt-1">
						<Button type="primary" htmlType="submit">
							{editingId ? "Update" : "Add"} announcement
						</Button>
						<Button
							htmlType="button"
							onClick={() => {
								setEditingId(null);
								form.resetFields();
								setModalOpen(false);
							}}
						>
							Cancel
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};

export default AnnouncementsPage;

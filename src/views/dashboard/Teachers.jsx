"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
	Card,
	Input,
	Select,
	Tag,
	Table,
	Button,
	Popconfirm,
	message,
	Divider,
	Empty,
} from "antd";
import { Search, Users, Filter, Trash2 } from "lucide-react";

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

const subjectOptions = [
	"Mathematics",
	"Physics",
	"Chemistry",
	"Biology",
	"English",
	"History",
	"Geography",
	"Computer Science",
	"Economics",
	"Art",
].map((s) => ({ label: s, value: s }));

const seedTeachers = [
	{
		id: 1,
		name: "Anjali Mehra",
		email: "anjali.mehra@example.com",
		subjects: ["Mathematics", "Computer Science"],
		classes: ["CLASS 9", "CLASS 10"],
	},
	{
		id: 2,
		name: "Rakesh Nair",
		email: "r.nair@example.com",
		subjects: ["Physics"],
		classes: ["CLASS 11", "CLASS 12"],
	},
	{
		id: 3,
		name: "Priya Kulkarni",
		email: "priya.k@example.com",
		subjects: ["English", "History"],
		classes: ["CLASS 6", "CLASS 7", "CLASS 8"],
	},
];

const TeachersPage = () => {
	const [teachers, setTeachers] = useState(seedTeachers);
	const [search, setSearch] = useState("");
	const [subjectFilter, setSubjectFilter] = useState([]);
	const [classFilter, setClassFilter] = useState([]);

	const handleRemove = (id) => {
		setTeachers((prev) => prev.filter((t) => t.id !== id));
		message.success("Teacher removed");
	};

	const filtered = useMemo(() => {
		return teachers.filter((t) => {
			const q = search.trim().toLowerCase();
			const matchesSearch =
				!q ||
				t.name.toLowerCase().includes(q) ||
				t.email.toLowerCase().includes(q);

			const matchesSubject =
				subjectFilter.length === 0 ||
				subjectFilter.some((sub) => t.subjects.includes(sub));

			const matchesClass =
				classFilter.length === 0 ||
				classFilter.some((cls) => t.classes.includes(cls));

			return matchesSearch && matchesSubject && matchesClass;
		});
	}, [teachers, search, subjectFilter, classFilter]);

	const columns = [
		{ title: "Name", dataIndex: "name", key: "name" },
		{ title: "Email", dataIndex: "email", key: "email" },
		{
			title: "Subjects",
			dataIndex: "subjects",
			key: "subjects",
			render: (subs) => (
				<div className="flex flex-wrap gap-1">
					{subs.map((s) => (
						<Tag key={s}>{s}</Tag>
					))}
				</div>
			),
		},
		{
			title: "Classes",
			dataIndex: "classes",
			key: "classes",
			render: (cls) => (
				<div className="flex flex-wrap gap-1">
					{cls.map((c) => (
						<Tag key={c} color="blue">
							{c}
						</Tag>
					))}
				</div>
			),
		},
		{
			title: "",
			key: "action",
			align: "right",
			width: 110,
			render: (_, record) => (
				<Popconfirm
					title="Remove this teacher?"
					okText="Remove"
					cancelText="Cancel"
					onConfirm={() => handleRemove(record.id)}
				>
					<Button danger type="text" icon={<Trash2 className="w-4 h-4" />}>
						Remove
					</Button>
				</Popconfirm>
			),
		},
	];

	return (
		<div className="max-w-6xl mx-auto space-y-4">
			<Card
				title={
					<div className="flex items-center gap-2">
						<Users className="w-4 h-4" />
						<span>Teachers</span>
					</div>
				}
				extra={
					<span className="text-xs text-slate-500">
						{teachers.length} total
					</span>
				}
				className="shadow-sm"
			>
				<div className="flex flex-col gap-3">
					<div className="flex flex-col md:flex-row gap-3 md:items-center">
						<Input
							allowClear
							prefix={<Search className="w-4 h-4 text-slate-400" />}
							placeholder="Search by name or email"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="md:max-w-sm"
						/>
						<div className="flex items-center gap-2 flex-wrap">
							<Tag
								color="geekblue"
								className="flex items-center gap-1 px-2 py-1 rounded-md border border-blue-100 text-blue-600 bg-blue-50"
							>
								<Filter className="w-3.5 h-3.5" />
								<span className="text-xs font-medium">Filters</span>
							</Tag>
							<Select
								mode="multiple"
								allowClear
								placeholder="Subjects"
								options={subjectOptions}
								value={subjectFilter}
								onChange={setSubjectFilter}
								style={{ minWidth: 200 }}
							/>
							<Select
								mode="multiple"
								allowClear
								placeholder="Classes"
								options={classOptions}
								value={classFilter}
								onChange={setClassFilter}
								style={{ minWidth: 200 }}
							/>
							<Button
								onClick={() => {
									setSubjectFilter([]);
									setClassFilter([]);
									setSearch("");
								}}
							>
								Reset
							</Button>
						</div>
					</div>
					<Divider className="!my-2" />
					<Table
						columns={columns}
						dataSource={filtered.map((t) => ({ ...t, key: t.id }))}
						pagination={{ pageSize: 7, size: "small" }}
						tableLayout="auto"
						locale={{ emptyText: <Empty description="No teachers found" /> }}
					/>
				</div>
			</Card>
		</div>
	);
};

export default TeachersPage;

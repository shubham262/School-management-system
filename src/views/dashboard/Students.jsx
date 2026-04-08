"use client";

import React, { useMemo, useState } from "react";
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
import { Search, GraduationCap, Filter, Trash2 } from "lucide-react";

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

const seedStudents = [
	{
		id: 1,
		name: "Isha Gupta",
		email: "isha.g@example.com",
		className: "CLASS 9",
	},
	{
		id: 2,
		name: "Kabir Singh",
		email: "kabir.s@example.com",
		className: "CLASS 10",
	},
	{
		id: 3,
		name: "Sneha Reddy",
		email: "sneha.r@example.com",
		className: "CLASS 12",
	},
];

const StudentsPage = () => {
	const [students, setStudents] = useState(seedStudents);
	const [search, setSearch] = useState("");
	const [classFilter, setClassFilter] = useState([]);

	const handleRemove = (id) => {
		setStudents((prev) => prev.filter((s) => s.id !== id));
		message.success("Student removed");
	};

	const filtered = useMemo(() => {
		return students.filter((s) => {
			const q = search.trim().toLowerCase();
			const matchesSearch =
				!q ||
				s.name.toLowerCase().includes(q) ||
				s.email.toLowerCase().includes(q);

			const matchesClass =
				classFilter.length === 0 || classFilter.includes(s.className);

			return matchesSearch && matchesClass;
		});
	}, [students, search, classFilter]);

	const columns = [
		{ title: "Name", dataIndex: "name", key: "name" },
		{ title: "Email", dataIndex: "email", key: "email" },
		{
			title: "Class",
			dataIndex: "className",
			key: "className",
			render: (cls) => <Tag color="blue">{cls}</Tag>,
		},
		{
			title: "",
			key: "action",
			align: "right",
			width: 110,
			render: (_, record) => (
				<Popconfirm
					title="Remove this student?"
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
						<GraduationCap className="w-4 h-4" />
						<span>Students</span>
					</div>
				}
				extra={
					<span className="text-xs text-slate-500">
						{students.length} total
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
								placeholder="Classes"
								options={classOptions}
								value={classFilter}
								onChange={setClassFilter}
								style={{ minWidth: 200 }}
							/>
							<Button
								onClick={() => {
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
						dataSource={filtered.map((s) => ({ ...s, key: s.id }))}
						pagination={{ pageSize: 7, size: "small" }}
						tableLayout="auto"
						locale={{ emptyText: <Empty description="No students found" /> }}
					/>
				</div>
			</Card>
		</div>
	);
};

export default StudentsPage;

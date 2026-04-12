/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useCallback, useState } from "react";
import {
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
import { fetchSchoolTeachers, removeUsersFromSchool } from "@/service/auth";
import { useParams } from "next/navigation";

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

const TeachersPage = () => {
	const params = useParams();
	const slug = params?.id;
	const [info, setInfo] = useState({
		teachers: [],
		search: "",
		subjectFilter: [],
		classFilter: [],
		page: 1,
		limit: 10,
		loading: true,
		total: 0,
	});

	useEffect(() => {
		handeFetchTeachers();
	}, [
		info?.search,
		info?.subjectFilter,
		info?.classFilter,
		info?.subjectFilter,
		info?.page,
	]);

	const handeFetchTeachers = useCallback(async () => {
		try {
			const { data } = await fetchSchoolTeachers(
				slug,
				info?.page,
				info?.limit,
				info?.search,
				JSON.stringify(info?.classFilter),
				JSON.stringify(info?.subjectFilter)
			);

			const { teachers = [], total } = data;
			setInfo((prev) => ({ ...prev, teachers, total }));
		} catch (error) {
			console.log("error==>handeFetchTeachers", error);
			message.error("Something went wrong");
		} finally {
			setInfo((prev) => ({ ...prev, loading: false }));
		}
	}, [
		slug,
		info?.page,
		info?.limit,
		info?.search,
		info?.classFilter,
		info?.subjectFilter,
	]);

	const handleRemove = async (id) => {
		try {
			await removeUsersFromSchool(slug, id);
			setInfo((prev) => ({
				...prev,
				teachers: prev.teachers.filter((t) => t.userId !== id),
			}));
			message.success("Teacher removed");
		} catch (error) {
			console.log("Something went wrong");
		}
	};

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
					onConfirm={() => handleRemove(record.userId)}
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
			<div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="flex flex-col gap-2 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
					<div className="flex items-center gap-2 text-slate-900">
						<Users className="w-4 h-4" />
						<span className="text-base font-semibold">Teachers</span>
					</div>
					<span className="text-xs text-slate-500">
						{info.teachers.length} total
					</span>
				</div>
				<div className="flex flex-col gap-3 px-4 py-4 sm:px-6 sm:py-5">
					<div className="flex flex-col md:flex-row gap-3 md:items-center">
						<Input
							allowClear
							prefix={<Search className="w-4 h-4 text-slate-400" />}
							placeholder="Search by name or email"
							value={info.search}
							onChange={(e) =>
								setInfo((prev) => ({ ...prev, search: e.target.value }))
							}
							className="md:max-w-sm"
						/>
						<div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:flex-wrap">
							<Tag
								color="geekblue"
								className="flex w-fit items-center gap-1 px-2 py-1 rounded-md border border-blue-100 text-blue-600 bg-blue-50"
							>
								<Filter className="w-3.5 h-3.5" />
								<span className="text-xs font-medium">Filters</span>
							</Tag>
							<Select
								mode="multiple"
								allowClear
								placeholder="Subjects"
								options={subjectOptions}
								value={info.subjectFilter}
								onChange={(value) =>
									setInfo((prev) => ({ ...prev, subjectFilter: value }))
								}
								className="w-full sm:w-auto"
								style={{ minWidth: 200 }}
							/>
							<Select
								mode="multiple"
								allowClear
								placeholder="Classes"
								options={classOptions}
								value={info.classFilter}
								onChange={(value) =>
									setInfo((prev) => ({ ...prev, classFilter: value }))
								}
								className="w-full sm:w-auto"
								style={{ minWidth: 200 }}
							/>
							<Button
								className="w-full sm:w-auto"
								onClick={() => {
									setInfo((prev) => ({
										...prev,
										subjectFilter: [],
										classFilter: [],
										search: "",
									}));
								}}
							>
								Reset
							</Button>
						</div>
					</div>
					<Divider className="!my-2" />
					<div className="space-y-3 md:hidden">
						{info?.teachers.length === 0 ? (
							<div
								key="emptyState"
								className="rounded-xl border border-dashed border-slate-200 px-4 py-8"
							>
								<Empty description="No teachers found" />
							</div>
						) : (
							info?.teachers?.map((teacher) => (
								<div
									key={teacher._id}
									className="rounded-xl border border-slate-200 bg-slate-50 p-4"
								>
									<div className="space-y-3">
										<div>
											<p className="text-sm font-semibold text-slate-900">
												{teacher.name}
											</p>
											<p className="break-all text-sm text-slate-600">
												{teacher.email}
											</p>
										</div>
										<div>
											<p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
												Subjects
											</p>
											<div className="flex flex-wrap gap-1">
												{teacher.subjects.map((subject) => (
													<Tag key={subject}>{subject}</Tag>
												))}
											</div>
										</div>
										<div>
											<p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
												Classes
											</p>
											<div className="flex flex-wrap gap-1">
												{teacher.classes.map((className) => (
													<Tag key={className} color="blue">
														{className}
													</Tag>
												))}
											</div>
										</div>
										<Popconfirm
											title="Remove this teacher?"
											okText="Remove"
											cancelText="Cancel"
											onConfirm={() => handleRemove(teacher.id)}
										>
											<Button
												danger
												type="default"
												icon={<Trash2 className="w-4 h-4" />}
												className="w-full"
											>
												Remove
											</Button>
										</Popconfirm>
									</div>
								</div>
							))
						)}
					</div>
					<div className="hidden md:block overflow-x-auto">
						<Table
							columns={columns}
							dataSource={info?.teachers.map((t) => ({ ...t, key: t._id }))}
							pagination={{ pageSize: info?.total, size: "small" }}
							tableLayout="auto"
							scroll={{ x: 820 }}
							locale={{ emptyText: <Empty description="No teachers found" /> }}
							loading={info?.loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TeachersPage;

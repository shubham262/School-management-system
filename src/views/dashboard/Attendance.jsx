"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	Button,
	DatePicker,
	Empty,
	Input,
	Select,
	Statistic,
	Table,
	Tag,
	message,
} from "antd";
import {
	CalendarClock,
	CheckCircle2,
	Clock3,
	Search,
	UserX,
	Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

const attendanceStatuses = [
	{ label: "Present", value: "present", color: "green" },
	{ label: "Late", value: "late", color: "gold" },
	{ label: "Absent", value: "absent", color: "red" },
];

const hiddenDefaultStatus = "not-marked";

const availableClasses = [
	"Nursery",
	"LKG",
	"UKG",
	"CLASS 1",
	"CLASS 2",
	"CLASS 3",
	"CLASS 4",
	"CLASS 5",
	"CLASS 6",
	"CLASS 7",
	"CLASS 8",
	"CLASS 9",
	"CLASS 10",
	"CLASS 11",
	"CLASS 12",
];

const classOptions = availableClasses.map((className) => ({
	label: className,
	value: className,
}));

const AttendancePage = () => {
	const params = useParams();
	const slug = params?.id;

	const [info, setInfo] = useState({
		search: "",
		selectedClass: "CLASS 10",
		selectedDate: dayjs().second(0).millisecond(0),
		students: [],
	});

	const updateStudentStatus = useCallback((studentId, nextStatus) => {}, []);
	const handleBulkStatus = useCallback((status) => {}, []);
	const handleSaveSession = useCallback(() => {}, []);
	const attendanceSummary = useMemo(() => {
		const counts = {
			present: 0,
			late: 0,
			absent: 0,
			notMarked: 0,
		};
		return counts;
	}, []);

	const columns = [
		{
			title: "Roll No",
			dataIndex: "rollNo",
			key: "rollNo",
			width: 110,
		},
		{
			title: "Student",
			dataIndex: "name",
			key: "name",
			render: (_, student) => (
				<p className="text-sm font-semibold text-slate-900">{student.name}</p>
			),
		},
		{
			title: "Status",
			key: "status",
			width: 390,
			render: (_, student) => {
				const activeStatus = hiddenDefaultStatus;

				return (
					<div className="flex flex-wrap gap-2">
						{attendanceStatuses.map((status) => {
							const active = activeStatus === status.value;
							return (
								<Button
									key={status.value}
									type={active ? "primary" : "default"}
									color={active ? status.color : "default"}
									variant={active ? "solid" : "outlined"}
									onClick={() => updateStudentStatus(student.id, status.value)}
								>
									{status.label}
								</Button>
							);
						})}
					</div>
				);
			},
		},
	];

	return (
		<div className="max-w-6xl mx-auto space-y-6">
			<div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
					<div className="flex items-center gap-2 text-slate-900">
						<CalendarClock className="h-4 w-4" />
						<span className="text-base font-semibold">Attendance</span>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<Tag color="blue" className="px-2 py-1">
							{info?.students?.length || 0} students
						</Tag>
						<Button onClick={() => handleBulkStatus("present")}>
							Mark all present
						</Button>
						<Button onClick={() => handleBulkStatus("absent")}>
							Mark all absent
						</Button>
						<Button type="primary" onClick={handleSaveSession}>
							Save attendance
						</Button>
					</div>
				</div>

				<div className="space-y-6 px-4 py-4 sm:px-6 sm:py-5">
					<div className="flex flex-col gap-3 lg:flex-row">
						<div className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:flex-[1.1]">
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
								Class Register
							</p>
							<div className="mt-3 space-y-3">
								<Select
									size="large"
									options={classOptions}
									value={info.selectedClass}
									onChange={(value) =>
										setInfo((prev) => ({ ...prev, selectedClass: value }))
									}
								/>
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:flex-1">
							<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
								Jump To Date
							</p>
							<div className="mt-3">
								<DatePicker
									size="large"
									className="w-full"
									value={info.selectedDate}
									disabledDate={(current) =>
										current &&
										current.endOf("day").isAfter(dayjs().endOf("day"))
									}
									onChange={(value) =>
										value &&
										setInfo((prev) => ({ ...prev, selectedDate: value }))
									}
								/>
							</div>
							<p className="mt-3 text-sm text-slate-600">
								Teachers can jump to any saved register by changing the date.
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
						<div className="rounded-xl border border-slate-200 bg-emerald-50 p-4 md:flex-1 md:min-w-[220px]">
							<Statistic
								title="Present"
								value={attendanceSummary.present}
								prefix={<CheckCircle2 className="h-4 w-4" />}
							/>
						</div>
						<div className="rounded-xl border border-slate-200 bg-amber-50 p-4 md:flex-1 md:min-w-[220px]">
							<Statistic
								title="Late"
								value={attendanceSummary.late}
								prefix={<Clock3 className="h-4 w-4" />}
							/>
						</div>
						<div className="rounded-xl border border-slate-200 bg-rose-50 p-4 md:flex-1 md:min-w-[220px]">
							<Statistic
								title="Absent"
								value={attendanceSummary.absent}
								prefix={<UserX className="h-4 w-4" />}
							/>
						</div>
						<div className="rounded-xl border border-slate-200 bg-sky-50 p-4 md:flex-1 md:min-w-[220px]">
							<Statistic
								title="Not Marked"
								value={attendanceSummary.notMarked}
								prefix={<Users className="h-4 w-4" />}
							/>
						</div>
					</div>

					<div className="space-y-3 md:hidden">
						{info?.students.length === 0 ? (
							<div className="rounded-xl border border-dashed border-slate-200 px-4 py-8">
								<Empty description="No students matched this search" />
							</div>
						) : (
							info?.students.map((student) => {
								const activeStatus = hiddenDefaultStatus;
								return (
									<div
										key={student._id}
										className="rounded-xl border border-slate-200 bg-slate-50 p-4"
									>
										<div className="flex items-start justify-between gap-3">
											<div>
												<p className="text-sm font-semibold text-slate-900">
													{student.name}
												</p>
												<p className="text-xs text-slate-500">
													Roll no {student.rollNo}
												</p>
											</div>
											{activeStatus !== hiddenDefaultStatus ? (
												<Tag
													color={
														attendanceStatuses.find(
															(status) => status.value === activeStatus
														)?.color
													}
													className="capitalize"
												>
													{activeStatus}
												</Tag>
											) : (
												<Tag className="border-slate-200 bg-slate-100 text-slate-500">
													Not marked
												</Tag>
											)}
										</div>
										<div className="mt-3 flex flex-wrap gap-2">
											{attendanceStatuses.map((status) => (
												<Button
													key={status.value}
													type={
														activeStatus === status.value
															? "primary"
															: "default"
													}
													onClick={() =>
														updateStudentStatus(student.id, status.value)
													}
												>
													{status.label}
												</Button>
											))}
										</div>
									</div>
								);
							})
						)}
					</div>

					<div className="hidden overflow-x-auto md:block">
						<Table
							columns={columns}
							dataSource={info?.students?.map((student) => ({
								...student,
								key: student._id,
							}))}
							pagination={false}
							scroll={{ x: 900 }}
							locale={{
								emptyText: (
									<Empty description="No students matched this search" />
								),
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AttendancePage;

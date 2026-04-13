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

const demoStudentsByClass = {
	"CLASS 8": [
		{ id: "stu-801", name: "Aarav Sharma", rollNo: "08-01" },
		{ id: "stu-802", name: "Diya Patel", rollNo: "08-02" },
		{ id: "stu-803", name: "Kabir Singh", rollNo: "08-03" },
		{ id: "stu-804", name: "Meera Das", rollNo: "08-04" },
		{ id: "stu-805", name: "Vivaan Nair", rollNo: "08-05" },
	],
	"CLASS 9": [
		{ id: "stu-901", name: "Anaya Gupta", rollNo: "09-01" },
		{ id: "stu-902", name: "Advik Rao", rollNo: "09-02" },
		{ id: "stu-903", name: "Ishita Jain", rollNo: "09-03" },
		{ id: "stu-904", name: "Reyansh Roy", rollNo: "09-04" },
	],
	"CLASS 10": [
		{ id: "stu-1001", name: "Myra Khan", rollNo: "10-01" },
		{ id: "stu-1002", name: "Arjun Verma", rollNo: "10-02" },
		{ id: "stu-1003", name: "Sara Thomas", rollNo: "10-03" },
		{ id: "stu-1004", name: "Yuvan Iyer", rollNo: "10-04" },
		{ id: "stu-1005", name: "Rhea Bose", rollNo: "10-05" },
	],
	"CLASS 11": [
		{ id: "stu-1101", name: "Krish Malhotra", rollNo: "11-01" },
		{ id: "stu-1102", name: "Tara Kulkarni", rollNo: "11-02" },
		{ id: "stu-1103", name: "Zoya Mir", rollNo: "11-03" },
	],
	"CLASS 12": [
		{ id: "stu-1201", name: "Aisha Menon", rollNo: "12-01" },
		{ id: "stu-1202", name: "Dev Batra", rollNo: "12-02" },
		{ id: "stu-1203", name: "Parth Sethi", rollNo: "12-03" },
		{ id: "stu-1204", name: "Siya Chawla", rollNo: "12-04" },
	],
};

const fallbackStudents = [
	{ id: "stu-fallback-1", name: "Class Monitor", rollNo: "00-01" },
	{ id: "stu-fallback-2", name: "Section Representative", rollNo: "00-02" },
];

const buildDefaultSession = (students) =>
	students.reduce((acc, student) => {
		acc[student.id] = hiddenDefaultStatus;
		return acc;
	}, {});

const AttendancePage = () => {
	const params = useParams();
	const slug = params?.id;
	const [messageApi, contextHolder] = message.useMessage();

	const [info, setInfo] = useState(() => {
		const currentMoment = dayjs().second(0).millisecond(0);
		let storedRegister = {};

		if (typeof window !== "undefined") {
			try {
				const rawRegister = localStorage.getItem(
					`attendance-register-${params?.id || "school"}`
				);
				storedRegister = rawRegister ? JSON.parse(rawRegister) : {};
			} catch (error) {
				console.log("error while restoring attendance register", error);
			}
		}

		return {
			search: "",
			selectedClass: "CLASS 10",
			selectedDate: currentMoment,
			register: storedRegister,
		};
	});

	const storageKey = useMemo(
		() => `attendance-register-${slug || "school"}`,
		[slug]
	);

	const students = useMemo(
		() =>
			demoStudentsByClass[info.selectedClass] ||
			fallbackStudents.map((student, index) => ({
				...student,
				id: `${info.selectedClass}-${index + 1}`,
			})),
		[info.selectedClass]
	);

	const sessionKey = useMemo(
		() => `${info.selectedClass}-${info.selectedDate.format("YYYY-MM-DD")}`,
		[info.selectedClass, info.selectedDate]
	);

	useEffect(() => {
		if (typeof window === "undefined") return;

		try {
			localStorage.setItem(storageKey, JSON.stringify(info.register));
		} catch (error) {
			console.log("error while saving attendance register", error);
		}
	}, [info.register, storageKey]);

	const currentSessionRegister = useMemo(
		() => info.register[sessionKey] || buildDefaultSession(students),
		[info.register, sessionKey, students]
	);

	const filteredStudents = useMemo(() => {
		const normalizedQuery = info.search.trim().toLowerCase();

		return students.filter((student) => {
			if (!normalizedQuery) return true;
			return student.name.toLowerCase().includes(normalizedQuery);
		});
	}, [info.search, students]);

	const attendanceSummary = useMemo(() => {
		const counts = {
			present: 0,
			late: 0,
			absent: 0,
			notMarked: 0,
		};

		students.forEach((student) => {
			const status = currentSessionRegister[student.id] || hiddenDefaultStatus;
			if (status === hiddenDefaultStatus) {
				counts.notMarked += 1;
				return;
			}
			counts[status] += 1;
		});

		return {
			...counts,
			total: students.length,
		};
	}, [currentSessionRegister, students]);

	const updateStudentStatus = useCallback(
		(studentId, nextStatus) => {
			setInfo((prev) => ({
				...prev,
				register: {
					...prev.register,
					[sessionKey]: {
						...(prev.register[sessionKey] || buildDefaultSession(students)),
						[studentId]: nextStatus,
					},
				},
			}));
		},
		[sessionKey, students]
	);

	const handleBulkStatus = useCallback(
		(nextStatus) => {
			const nextSession = students.reduce((acc, student) => {
				acc[student.id] = nextStatus;
				return acc;
			}, {});

			setInfo((prev) => ({
				...prev,
				register: {
					...prev.register,
					[sessionKey]: nextSession,
				},
			}));
		},
		[sessionKey, students]
	);

	const handleSaveSession = useCallback(() => {
		messageApi.success(
			`Attendance saved for ${info.selectedClass} on ${info.selectedDate.format(
				"DD MMM YYYY"
			)}`
		);
	}, [info.selectedClass, info.selectedDate, messageApi]);

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
				const activeStatus =
					currentSessionRegister[student.id] || hiddenDefaultStatus;

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
			{contextHolder}
			<div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
				<div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
					<div className="flex items-center gap-2 text-slate-900">
						<CalendarClock className="h-4 w-4" />
						<span className="text-base font-semibold">Attendance</span>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<Tag color="blue" className="px-2 py-1">
							{attendanceSummary.total} students
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
										current && current.endOf("day").isAfter(dayjs().endOf("day"))
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
						{filteredStudents.length === 0 ? (
							<div className="rounded-xl border border-dashed border-slate-200 px-4 py-8">
								<Empty description="No students matched this search" />
							</div>
						) : (
							filteredStudents.map((student) => {
								const activeStatus =
									currentSessionRegister[student.id] || hiddenDefaultStatus;
								return (
									<div
										key={student.id}
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
							dataSource={filteredStudents.map((student) => ({
								...student,
								key: student.id,
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

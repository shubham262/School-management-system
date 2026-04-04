"use client";

import React, { useEffect, useMemo, useState } from "react";
import { LogOut, Mail, ShieldCheck, UserRound, Edit3 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

const baseFields = [
	{ label: "Name", key: "name", icon: UserRound, editable: true },
	{ label: "Email", key: "email", icon: Mail, editable: false },
	{ label: "Role", key: "role", fallbackKey: "designation", icon: ShieldCheck, editable: false },
];

const extendedFields = [
	{ label: "Class", key: "className", placeholder: "e.g. 10-B" },
	{ label: "Roll Number", key: "rollNumber", placeholder: "e.g. 42" },
	{ label: "Grades", key: "grades", placeholder: "e.g. A / GPA 3.8" },
	{ label: "Attendance", key: "attendance", placeholder: "e.g. 95%" },
];

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const [formData, setFormData] = useState({});
	const [isEditing, setIsEditing] = useState(false);

	const params = useParams();
	const router = useRouter();
	const slug = params?.id;

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (!storedUser) return;
		try {
			const parsed = JSON.parse(storedUser);
			setUser(parsed);
			setFormData(parsed);
		} catch (error) {
			console.error("Failed to parse user from storage", error);
		}
	}, []);

	const initials = useMemo(() => {
		if (!formData?.name) return "U";
		const parts = formData.name.split(" ").filter(Boolean);
		if (parts.length === 1) return parts[0][0]?.toUpperCase();
		return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
	}, [formData?.name]);

	const handleChange = (key, value) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	const handleSave = () => {
		setIsEditing(false);
		setUser(formData);
		localStorage.setItem("user", JSON.stringify(formData));
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("membership");
		router.push(`/${slug}/login`);
	};

	const renderField = (field) => {
		const value = formData[field.key] || formData[field.fallbackKey] || "";
		const editable = isEditing && field.editable !== false;

		return (
			<label
				key={field.key}
				className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition"
			>
				<span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 flex items-center gap-2">
					{field.icon && <field.icon className="h-4 w-4 text-slate-400" />}
					{field.label}
				</span>
				{editable ? (
					<input
						type="text"
						value={value}
						onChange={(e) => handleChange(field.key, e.target.value)}
						placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
						className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
					/>
				) : (
					<p className="text-base font-semibold text-slate-900">
						{value || field.placeholder || "Not provided"}
					</p>
				)}
			</label>
		);
	};

	return (
		<div className="max-w-6xl mx-auto space-y-6">
			<header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
				<div className="flex items-center gap-4">
					<div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">
						{initials}
					</div>
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
							User Profile
						</p>
						<h1 className="text-2xl font-bold text-slate-900 leading-snug">
							{formData?.name || "Unnamed account"}
						</h1>
						<p className="text-sm text-slate-600">
							{formData?.role || formData?.designation || "Role not set"}
						</p>
					</div>
				</div>
				<div className="flex flex-wrap gap-3">
					<button
						onClick={() => setIsEditing((prev) => !prev)}
						className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
					>
						<Edit3 className="h-4 w-4" />
						{isEditing ? "Cancel edit" : "Edit profile"}
					</button>
					<button
						onClick={handleLogout}
						className="inline-flex items-center gap-2 rounded-lg bg-red-500 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-red-600"
					>
						<LogOut className="h-4 w-4" />
						Log out
					</button>
				</div>
			</header>

			<section className="space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
							Account Details
						</p>
						<h2 className="text-lg font-semibold text-slate-900">Core information</h2>
					</div>
					{isEditing && (
						<button
							onClick={handleSave}
							className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700"
						>
							Save changes
						</button>
					)}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{baseFields.map((field) => renderField(field))}
				</div>
			</section>

			<section className="space-y-4">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
						Academic / Admin
					</p>
					<h2 className="text-lg font-semibold text-slate-900">Extendable fields</h2>
					<p className="text-sm text-slate-600">
						Use these for student/teacher/admin specifics. Add or remove fields as needed.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{extendedFields.map((field) =>
						renderField({ ...field, icon: field.icon ?? ShieldCheck, editable: true })
					)}
				</div>
			</section>
		</div>
	);
};

export default ProfilePage;

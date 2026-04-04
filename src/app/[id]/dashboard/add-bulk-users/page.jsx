"use client";

import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
	Alert,
	Button,
	Card,
	Form,
	Input,
	Modal,
	Select,
	Table,
	Tag,
	Typography,
	Upload,
	message,
} from "antd";
import {
	UploadCloud,
	Info,
	FileJson2,
	UserPlus,
	Send,
} from "lucide-react";

const { Paragraph, Text, Title } = Typography;
const { Dragger } = Upload;

const roleOptions = [
	{ label: "Admin", value: "admin" },
	{ label: "Students", value: "students" },
	{ label: "Teachers", value: "teachers" },
];

const template = [
	{ name: "Riya Sharma", email: "riya@example.com", role: "students" },
	{ name: "Ankit Verma", email: "ankit@example.com", role: "teachers" },
];

const AddBulkUsersPage = () => {
	const params = useParams();
	const slug = params?.id;
	const [preview, setPreview] = useState([]);
	const [uploadError, setUploadError] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [form] = Form.useForm();
	const removeRow = (key) => {
		setPreview((prev) => prev.filter((item) => item.key !== key));
	};

	const columns = useMemo(
		() => [
			{ title: "Name", dataIndex: "name", key: "name" },
			{ title: "Email", dataIndex: "email", key: "email" },
			{
				title: "Role",
				dataIndex: "role",
				key: "role",
				render: (role) => <Tag color="blue">{role}</Tag>,
			},
			{
				title: "Source",
				dataIndex: "source",
				key: "source",
				render: (src) => (
					<Tag color={src === "upload" ? "purple" : "green"}>{src}</Tag>
				),
			},
			{
				title: "",
				key: "action",
				fixed: "right",
				width: 90,
				render: (_, record) => (
					<Button
						type="link"
						danger
						size="small"
						onClick={() => removeRow(record.key)}
					>
						Remove
					</Button>
				),
			},
		],
		[]
	);

	const totalByRole = useMemo(() => {
		return preview.reduce(
			(acc, cur) => {
				acc[cur.role] = (acc[cur.role] || 0) + 1;
				return acc;
			},
			{}
		);
	}, [preview]);

	const handleParsedData = (records, source) => {
		const cleaned = [];
		const errors = [];

		records.forEach((item, index) => {
			const name = item?.name?.trim();
			const email = item?.email?.trim();
			const role = item?.role?.trim?.().toLowerCase?.();

			if (!name || !email || !role) {
				errors.push(`Row ${index + 1}: name, email, role required`);
				return;
			}
			if (!roleOptions.some((r) => r.value === role)) {
				errors.push(`Row ${index + 1}: role must be admin/students/teachers`);
				return;
			}

			cleaned.push({
				key: `${source}-${index}-${email}`,
				name,
				email,
				role,
				source,
			});
		});

		if (errors.length) {
			setUploadError(errors.slice(0, 4).join("; "));
			message.error("Some records were skipped. Check errors.");
		} else {
			setUploadError(null);
		}

		if (cleaned.length) {
			setPreview((prev) => [...cleaned, ...prev]);
			message.success(`${cleaned.length} user record(s) added to queue`);
		}
	};

	const beforeUpload = (file) => {
		const isJson =
			file.type === "application/json" || file.name.toLowerCase().endsWith(".json");
		if (!isJson) {
			message.error("Please upload a .json file");
			return Upload.LIST_IGNORE;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const parsed = JSON.parse(e.target.result);
				if (!Array.isArray(parsed)) {
					throw new Error("JSON must be an array of user objects");
				}
				handleParsedData(parsed, "upload");
			} catch (err) {
				console.error(err);
				setUploadError(err.message);
				message.error("Invalid JSON structure");
			}
		};
		reader.readAsText(file);

		return Upload.LIST_IGNORE;
	};

	const handleSingleSubmit = (values) => {
		handleParsedData([{ ...values }], "manual");
		setModalOpen(false);
		form.resetFields();
	};

	const handleSendToBackend = async () => {
		if (!preview.length) {
			message.warning("Add at least one user first");
			return;
		}

		// Placeholder for backend integration
		message.loading({ content: "Sending to backend...", key: "bulk" });
		setTimeout(() => {
			message.success({
				content: "Backend will create the users from uploaded list",
				key: "bulk",
			});
		}, 600);
	};

	return (
		<div className="max-w-6xl mx-auto space-y-6">
			<div className="flex items-start gap-4 flex-wrap">
				<div className="flex-1 min-w-[260px]">
					<Title level={3} className="!mb-1">
						Bulk Add Users
					</Title>
					<Paragraph type="secondary" className="!mb-2">
						Upload a JSON file to create users in one go. Best suited for
						beginning of session migrations, shifting from legacy systems, or
						onboarding new batches across {slug || "your school"}.
					</Paragraph>
					<Alert
						type="info"
						showIcon
						icon={<Info className="w-4 h-4" />}
						message="Backend will create all users from the uploaded payload. JSON should be an array of objects with name, email, role."
					/>
				</div>
				<Card className="min-w-[260px] shadow-sm">
					<div className="flex items-center gap-3">
						<FileJson2 className="w-8 h-8 text-blue-600" />
						<div>
							<Text strong>Sample JSON</Text>
							<Paragraph className="!mb-0 text-xs text-slate-500">
								Copy this structure before exporting from your SIS
							</Paragraph>
						</div>
					</div>
					<pre className="bg-slate-50 text-[12px] rounded-md p-3 mt-3 border border-slate-100 overflow-auto">
						{JSON.stringify(template, null, 2)}
					</pre>
				</Card>
			</div>

			<Card
				title={
					<span className="flex items-center gap-2">
						<UploadCloud className="w-4 h-4" />
						Bulk JSON Upload
					</span>
				}
				extra={
					<Button icon={<UserPlus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
						Add single user
					</Button>
				}
				className="shadow-sm"
			>
				<Dragger
					name="file"
					maxCount={1}
					accept=".json,application/json"
					beforeUpload={beforeUpload}
					showUploadList={false}
					className="rounded-xl"
				>
					<p className="ant-upload-drag-icon">
						<UploadCloud className="w-10 h-10 text-blue-600 mx-auto" />
					</p>
					<p className="ant-upload-text">Click or drag JSON to this area</p>
					<p className="ant-upload-hint">
						JSON array with fields: name (string), email (string), role (admin | students | teachers)
					</p>
				</Dragger>
				{uploadError && (
					<Alert className="mt-3" type="error" showIcon message={uploadError} />
				)}
			</Card>

			<Card
				title="Queued Users"
				extra={
					<Button
						type="primary"
						icon={<Send className="w-4 h-4" />}
						onClick={handleSendToBackend}
					>
						Send to backend
					</Button>
				}
				className="shadow-sm"
			>
				<div className="flex flex-wrap gap-3 mb-3">
					<Tag color="blue">Total: {preview.length}</Tag>
					{Object.entries(totalByRole).map(([role, count]) => (
						<Tag key={role} color="green">
							{role}: {count}
						</Tag>
					))}
				</div>
				<Table
					columns={columns}
					dataSource={preview}
					pagination={{ pageSize: 5, size: "small" }}
					locale={{
						emptyText: "Upload a JSON file or add a user to see the queue",
					}}
					scroll={{ x: 700, y: 360 }}
				/>
			</Card>

			<Modal
				title="Add single user"
				open={modalOpen}
				onCancel={() => setModalOpen(false)}
				footer={null}
				destroyOnClose
			>
				<Form layout="vertical" form={form} onFinish={handleSingleSubmit}>
					<Form.Item
						name="name"
						label="Name"
						rules={[{ required: true, message: "Name is required" }]}
					>
						<Input placeholder="Enter full name" />
					</Form.Item>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{ required: true, message: "Email is required" },
							{ type: "email", message: "Enter a valid email" },
						]}
					>
						<Input placeholder="user@example.com" />
					</Form.Item>
					<Form.Item
						name="role"
						label="Role"
						rules={[{ required: true, message: "Role is required" }]}
					>
						<Select options={roleOptions} placeholder="Select role" />
					</Form.Item>
					<div className="flex gap-2 justify-end">
						<Button onClick={() => setModalOpen(false)}>Cancel</Button>
						<Button type="primary" htmlType="submit">
							Add to queue
						</Button>
					</div>
				</Form>
			</Modal>
		</div>
	);
};

export default AddBulkUsersPage;

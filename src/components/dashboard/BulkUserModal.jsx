import React from "react";
import { Button, Form, Input, Modal, Select } from "antd";

const BulkUserModal = ({ open, form, roleOptions, onSubmit, onClose }) => {
	return (
		<Modal
			title="Add single user"
			open={open}
			onCancel={onClose}
			footer={null}
			destroyOnClose
			style={{ top: 16 }}
		>
			<Form layout="vertical" form={form} onFinish={onSubmit}>
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
					<Button onClick={onClose}>Cancel</Button>
					<Button type="primary" htmlType="submit">
						Add to queue
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

export default BulkUserModal;

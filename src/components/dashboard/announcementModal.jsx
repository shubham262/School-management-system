import React from "react";
import { Button, Form, Input, Modal, Radio, Select } from "antd";

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

const emptyForm = {
	tag: "",
	title: "",
	description: "",
	scope: "school",
	classes: [],
};
const AnnouncementModal = ({ open, editingId, form, onSubmit, onClose }) => {
	return (
		<Modal
			title={editingId ? "Edit announcement" : "Add announcement"}
			open={open}
			onCancel={onClose}
			footer={null}
			width={720}
			style={{ top: 16 }}
			styles={{ body: { paddingTop: 12 } }}
		>
			<Form
				form={form}
				layout="vertical"
				initialValues={emptyForm}
				onFinish={onSubmit}
			>
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
					<Input.TextArea
						rows={4}
						placeholder="Details for this announcement"
					/>
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
					<Button htmlType="button" onClick={onClose}>
						Cancel
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

export default AnnouncementModal;

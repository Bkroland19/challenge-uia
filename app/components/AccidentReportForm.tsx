"use client";

import { useState } from "react";
import { Form, Input, Upload, Button, message } from "antd";

const AccidentReportForm = () => {
	const [fileList, setFileList] = useState<any>([]);

	const handleSubmit = async (values: any) => {
		const userId = localStorage.getItem("userId");

		if (!userId) {
			message.error("User not logged in. Please log in first.");
			return;
		}

		// Convert file objects to URLs or file paths as needed
		const imageUrls = fileList.map(
			(file: any) => file.originFileObj?.name
		); // Example: you might need to upload files and get URLs

		try {
			const response = await fetch("/api/report-accident", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...values,
					userId,
					images: imageUrls,
				}),
			});

			if (response.ok) {
				message.success("Accident report submitted successfully!");
			} else {
				const errorData = await response.json();
				message.error(
					errorData.error || "Failed to submit report."
				);
			}
		} catch (error) {
			message.error("An error occurred. Please try again.");
		}
	};

	return (
		<Form
			onFinish={handleSubmit}
			layout="vertical"
			className="p-6 bg-white shadow rounded-md"
		>
			<Form.Item
				name="details"
				label="Accident Details"
				rules={[
					{
						required: true,
						message: "Please provide accident details.",
					},
				]}
			>
				<Input.TextArea rows={4} />
			</Form.Item>
			<Form.Item
				name="location"
				label="Location"
				rules={[
					{
						required: true,
						message: "Please provide the location.",
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item label="Upload Photos">
				<Upload
					listType="picture"
					fileList={fileList}
					onChange={({ fileList }) => setFileList(fileList)}
				>
					<Button>Upload</Button>
				</Upload>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
				>
					Submit Report
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AccidentReportForm;

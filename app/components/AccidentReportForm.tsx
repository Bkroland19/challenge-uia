"use client";

import { useState } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AccidentReportForm = () => {
	const [fileList, setFileList] = useState<any>([]);
	const [uploading, setUploading] = useState(false);

	const handleSubmit = async (values: any) => {
		const userId = localStorage.getItem("userId");

		if (!userId) {
			message.error("User not logged in. Please log in first.");
			return;
		}

		// Ensure the user has uploaded files
		if (fileList.length === 0) {
			message.error("Please upload images of the accident.");
			return;
		}

		setUploading(true);

		// Upload each image to Cloudinary and get the URL
		const uploadedImageUrls = await Promise.all(
			fileList.map(async (file: any) => {
				const formData = new FormData();
				formData.append("file", file.originFileObj);
				formData.append("upload_preset", "etkzljdu"); // Use your Cloudinary upload preset

				try {
					const response = await fetch(
						"https://api.cloudinary.com/v1_1/dpku25fsd/image/upload",
						{
							method: "POST",
							body: formData,
						}
					);
					const data = await response.json();
					return data.secure_url; // Get the URL from Cloudinary response
				} catch (error) {
					message.error("Error uploading file.");
					return null;
				}
			})
		);

		// Filter out any null URLs
		const imageUrls = uploadedImageUrls.filter((url) => url !== null);

		if (imageUrls.length === 0) {
			message.error("Failed to upload images.");
			setUploading(false);
			return;
		}

		// Now submit the form data along with the image URLs
		try {
			const response = await fetch("/api/report-accident", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...values,
					userId,
					images: imageUrls, // Submit the Cloudinary URLs
				}),
			});

			if (response.ok) {
				message.success("Accident report submitted successfully!");
				setFileList([]); // Clear the file list after submission
			} else {
				const errorData = await response.json();
				message.error(
					errorData.error || "Failed to submit report."
				);
			}
		} catch (error) {
			message.error("An error occurred. Please try again.");
		} finally {
			setUploading(false);
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
			<Form.Item
				name="vehicleNo"
				label="Vehicle Number"
				rules={[
					{
						required: true,
						message: "Please enter the vehicle number.",
					},
				]}
			>
				<Input placeholder="Enter the vehicle number" />
			</Form.Item>
			<Form.Item label="Upload Photos">
				<Upload
					listType="picture"
					fileList={fileList}
					onChange={({ fileList }) => setFileList(fileList)}
					beforeUpload={() => false} // Prevent automatic upload
				>
					<Button icon={<UploadOutlined />}>Upload</Button>
				</Upload>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					loading={uploading} // Disable the button while uploading
				>
					Submit Report
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AccidentReportForm;

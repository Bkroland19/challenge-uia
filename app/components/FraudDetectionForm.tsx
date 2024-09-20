"use client";

import { useState } from "react";
import { Form, Input, Button, message } from "antd";

const FraudDetectionForm = () => {
	const [loading, setLoading] = useState(false);

	const handleFraudCheck = async (values: any) => {
		setLoading(true);
		try {
			const response = await fetch("/api/check-fraud", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					vehicleNo: values.vehicleNo,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				message.success(data.message || "No mismatch detected.");
			} else {
				message.error(
					data.error ||
						"Mismatch detected, manual review triggered."
				);
			}
		} catch (error) {
			message.error("An error occurred during fraud detection.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form
			onFinish={handleFraudCheck}
			layout="vertical"
		>
			<Form.Item
				label="Vehicle Number"
				name="vehicleNo"
				rules={[
					{
						required: true,
						message: "Please input a vehicle number!",
					},
				]}
			>
				<Input placeholder="Enter Vehicle Number" />
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					loading={loading}
				>
					Check for Fraud
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FraudDetectionForm;

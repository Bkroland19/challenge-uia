"use client";

import { useState } from "react";
import { Form, Input, Button, message } from "antd";

const AddVehicleForm = () => {
	const [loading, setLoading] = useState(false);

	const handleAddVehicle = async (values: any) => {
		setLoading(true);
		try {
			const response = await fetch("/api/add-vehicle", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			const data = await response.json();

			if (response.ok) {
				message.success("Vehicle added successfully!");
			} else {
				message.error(data.error || "Failed to add vehicle.");
			}
		} catch (error) {
			message.error("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form
			onFinish={handleAddVehicle}
			layout="vertical"
		>
			<Form.Item
				label="Vehicle Number Plate"
				name="numberPlate"
				rules={[
					{
						required: true,
						message: "Please input the vehicle number plate!",
					},
				]}
			>
				<Input placeholder="Enter Vehicle Number Plate" />
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					loading={loading}
				>
					Add Vehicle
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AddVehicleForm;

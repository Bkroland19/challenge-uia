import { Form, Input, DatePicker, Button, message } from "antd";
import { useState } from "react";

const AddPolicyForm: React.FC = () => {
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: any) => {
		setLoading(true);
		try {
			const response = await fetch("/api/policies", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});
			if (response.ok) {
				message.success("Policy added successfully!");
			} else {
				message.error("Failed to add policy.");
			}
		} catch (error) {
			message.error("An error occurred.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form
			onFinish={onFinish}
			layout="vertical"
		>
			<Form.Item
				name="userId"
				label="User ID"
				rules={[{ required: true }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="renewalAt"
				label="Renewal Date"
				rules={[{ required: true }]}
			>
				<DatePicker />
			</Form.Item>
			<Form.Item
				name="vehicle"
				label="Vehicle"
			>
				<Input />
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					loading={loading}
				>
					Add Policy
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AddPolicyForm;

"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation"; // use next/navigation instead
import Link from "next/link";

const { Title } = Typography;

export default function RegisterPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: {
		email: string;
		name: string;
		phoneNumber: string;
		password: string;
	}) => {
		setLoading(true);
		try {
			const response = await axios.post("/api/register", values);

			if (response.status === 201) {
				message.success("Registration successful!");
				router.push("/login"); // Make sure this route exists
			} else {
				message.error("Registration failed. Please try again.");
			}
		} catch (error) {
			console.error("Registration error:", error); // Log the error details
			message.error("An error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="flex items-center justify-center min-h-screen bg-gray-100"
		>
			<div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
				<Title
					level={2}
					className="text-center"
				>
					Register
				</Title>
				<Form
					onFinish={onFinish}
					layout="vertical"
				>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: "Please input your email!",
							},
						]}
					>
						<Input type="email" />
					</Form.Item>
					<Form.Item
						name="name"
						label="Name"
						rules={[
							{
								required: true,
								message: "Please input your name!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="phoneNumber"
						label="Phone Number"
						rules={[
							{
								required: true,
								message: "Please input your phone number!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						tooltip="Password must be 4 characters and above"
						name="password"
						label="Password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							loading={loading}
							block
						>
							Register
						</Button>
					</Form.Item>
					<span>Already have an account ? </span>
					<Link href={"/login"}>Login</Link>
				</Form>
			</div>
		</motion.div>
	);
}

"use client";

import { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { motion } from "framer-motion";
import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title } = Typography;

export default function LoginPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: { email: string; password: string }) => {
		setLoading(true);
		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			const data = await res.json();

			if (res.ok) {
				message.success("Login successful!");
				localStorage.setItem("userId", data.user?.id);
				{
					data.user?.role === "USER"
						? router.push("/accidents")
						: router.push("/dashboard");
				}
			} else {
				message.error(
					data.error || "Login failed. Please try again."
				);
			}
		} catch (error) {
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
					Login
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
							Login
						</Button>
					</Form.Item>
					<span>Already have an account ? </span>
					<Link href={"/register"}>Register</Link>
				</Form>
			</div>
		</motion.div>
	);
}

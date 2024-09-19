"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "antd";
import {
	FacebookOutlined,
	TwitterOutlined,
	LinkedinOutlined,
} from "@ant-design/icons";

export default function LandingPage() {
	const router = useRouter();

	const handleGetStartedClick = () => {
		router.push("/register");
	};

	return (
		<div className="bg-gray-50 min-h-screen">
			{/* Hero Section */}
			<div className="relative flex flex-col items-center justify-center h-screen text-white text-center bg-[url('/hero.jpg')] bg-cover bg-center">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-700 opacity-70"></div>
				<motion.h1
					className="relative text-6xl font-extrabold mb-6 z-10"
					initial={{ y: -200, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.7 }}
				>
					Insurance, Simplified.
				</motion.h1>
				<motion.p
					className="relative text-xl mb-8 z-10 max-w-2xl"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.7 }}
				>
					Experience fast, secure, and transparent motor
					insurance with real-time accident reporting and
					automated renewal notifications.
				</motion.p>
				<motion.div
					className="relative z-10"
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<Button
						type="primary"
						size="large"
						className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-8 py-3"
						onClick={handleGetStartedClick}
					>
						Get Started
					</Button>
				</motion.div>
			</div>

			{/* Features Section */}
			<div className="py-16 px-6 bg-white">
				<div className="text-center mb-12">
					<h2 className="text-4xl text-gray-500 font-semibold">
						Our Features
					</h2>
					<p className="text-gray-600 mt-4">
						We deliver tailored solutions to meet your needs.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					{[
						{
							title: "Real-Time Accident Reporting",
							description:
								"Instantly report accidents with live tracking of the incident.",
							icon: "/rt.jpg",
						},
						{
							title: "Automated Renewal Notifications",
							description:
								"Stay informed with timely notifications before your insurance expires.",
							icon: "/not.jpg",
						},
						{
							title: "Transparent Claims Processing",
							description:
								"Follow your claims with real-time updates at every stage.",
							icon: "/claim.jpg",
						},
					].map((feature, index) => (
						<motion.div
							key={index}
							className="p-6 bg-gray-50 rounded-lg shadow-lg text-center"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.7,
								delay: index * 0.3,
							}}
						>
							<img
								src={feature.icon}
								alt={feature.title}
								className="mx-auto h-20 mb-6"
							/>
							<h3 className="text-xl text-gray-500 font-semibold mb-4">
								{feature.title}
							</h3>
							<p className="text-gray-600">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>

			{/* Testimonials Section */}
			<div className="py-16 px-6 bg-gray-50">
				<div className="text-center mb-12">
					<h2 className="text-4xl text-gray-500 font-semibold">
						What Our Users Say
					</h2>
				</div>
				<motion.div
					className="flex justify-center space-x-6 overflow-hidden"
					initial={{ x: 200, opacity: 0 }}
					whileInView={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.7 }}
				>
					{[
						{
							name: "Bukenya Kizza",
							feedback:
								"The platform is incredibly easy to use and saved me so much time!",
							avatar: "/not.jpg",
						},
						{
							name: "Josh K",
							feedback:
								"Insurance renewal notifications are a game-changer.",
							avatar: "/not.jpg",
						},
					].map((testimonial, index) => (
						<div
							key={index}
							className="p-6 bg-white rounded-lg shadow-lg max-w-xs text-center"
						>
							<img
								src={testimonial.avatar}
								alt={testimonial.name}
								className="mx-auto rounded-full h-16 mb-4"
							/>
							<p className="text-gray-600 mb-4">
								"{testimonial.feedback}"
							</p>
							<h4 className="text-xl font-semibold text-blue-600">
								{testimonial.name}
							</h4>
						</div>
					))}
				</motion.div>
			</div>

			{/* Footer Section */}
			<div className="py-6 bg-gray-900 text-white">
				<div className="text-center">
					<p>
						&copy; 2024 Insurance Platform. All rights
						reserved.
					</p>
					<div className="flex justify-center space-x-4 mt-4">
						<a
							href="#"
							className="hover:text-blue-400"
						>
							<FacebookOutlined />
						</a>
						<a
							href="#"
							className="hover:text-blue-400"
						>
							<TwitterOutlined />
						</a>
						<a
							href="#"
							className="hover:text-blue-400"
						>
							<LinkedinOutlined />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

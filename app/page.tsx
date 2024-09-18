"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "antd";

export default function LandingPage() {
	const router = useRouter();

	const handleGetStartedClick = () => {
		router.push("/register");
	};

	return (
		<div className="bg-gray-50 min-h-screen">
			{/* Hero Section */}
			<div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white text-center">
				<motion.h1
					className="text-5xl font-bold mb-6"
					initial={{ y: -200, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.7 }}
				>
					Welcome to the Future of Insurance
				</motion.h1>
				<motion.p
					className="text-xl mb-8"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.7 }}
				>
					Get fast, secure, and transparent motor insurance
					coverage.
				</motion.p>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5 }}
				>
					<Button
						type="primary"
						size="large"
						className="bg-white text-blue-600"
						onClick={handleGetStartedClick}
					>
						Get Started
					</Button>
				</motion.div>
			</div>

			{/* Features Section */}
			<div className="py-16 px-6 bg-white">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-semibold">
						Our Features
					</h2>
					<p className="text-gray-600 mt-4">
						Experience seamless services designed for your
						convenience.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					{[
						{
							title: "Real-Time Accident Reporting",
							description:
								"Report accidents instantly with live status tracking.",
						},
						{
							title: "Automated Renewal Notifications",
							description:
								"Never miss a renewal date for your insurance.",
						},
						{
							title: "Transparent Claims Processing",
							description:
								"Track claims and get updates at every step.",
						},
					].map((feature, index) => (
						<motion.div
							key={index}
							className="p-6 bg-gray-100 rounded-lg shadow-lg"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{
								duration: 0.7,
								delay: index * 0.3,
							}}
						>
							<h3 className="text-xl font-semibold mb-4">
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
					<h2 className="text-3xl font-semibold">
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
							name: "John Doe",
							feedback:
								"The platform is incredibly easy to use and saved me so much time!",
						},
						{
							name: "Jane Smith",
							feedback:
								"Insurance renewal notifications are a game-changer.",
						},
					].map((testimonial, index) => (
						<div
							key={index}
							className="p-6 bg-white rounded-lg shadow-lg max-w-xs"
						>
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
							Facebook
						</a>
						<a
							href="#"
							className="hover:text-blue-400"
						>
							Twitter
						</a>
						<a
							href="#"
							className="hover:text-blue-400"
						>
							LinkedIn
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

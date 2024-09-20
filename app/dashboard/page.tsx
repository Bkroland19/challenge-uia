"use client";

import { useState } from "react";
import { Layout, Menu, Card, Table, Statistic } from "antd";
import {
	BarChartOutlined,
	FileTextOutlined,
	NotificationOutlined,
	AlertOutlined,
	CarOutlined,
} from "@ant-design/icons";
import { Bar, Pie, Line } from "@ant-design/charts";
import { motion } from "framer-motion";
import FraudDetectionForm from "../components/FraudDetectionForm";
import AddVehicleForm from "../components/AddVehicleForm"; // Import the AddVehicleForm

const { Header, Content, Sider } = Layout;

const DashboardPage = () => {
	const [selectedMenu, setSelectedMenu] = useState("1");

	const accidentReports = [
		{
			key: "1",
			date: "2024-08-16",
			vehicle: "UBG 123X",
			status: "Pending",
			location: "Kampala",
		},
		{
			key: "2",
			date: "2024-09-01",
			vehicle: "UBA 321Z",
			status: "Resolved",
			location: "Entebbe",
		},
	];

	const renewals = [
		{
			key: "1",
			policyNumber: "MTP-001",
			vehicle: "UBG 123X",
			renewalDate: "2024-10-01",
			status: "Due Soon",
		},
		{
			key: "2",
			policyNumber: "MTP-002",
			vehicle: "UBA 321Z",
			renewalDate: "2024-12-12",
			status: "Active",
		},
	];

	const claimsTrendData = [
		{ date: "2024-01", value: 5 },
		{ date: "2024-02", value: 10 },
		{ date: "2024-03", value: 20 },
		{ date: "2024-04", value: 15 },
		{ date: "2024-05", value: 30 },
	];

	const accidentBarConfig = {
		data: [
			{ date: "2024-08-16", count: 10 },
			{ date: "2024-08-17", count: 20 },
			{ date: "2024-08-18", count: 15 },
			{ date: "2024-08-19", count: 25 },
			{ date: "2024-08-20", count: 30 },
		],
		xField: "date",
		yField: "count",
		color: "#007bff",
		barWidthRatio: 0.4,
		xAxis: {
			label: {
				autoRotate: true,
			},
		},
	};

	const renewalPieConfig = {
		appendPadding: 10,
		data: [
			{ type: "Due Soon", value: 45 },
			{ type: "Active", value: 75 },
		],
		angleField: "value",
		colorField: "type",
		radius: 0.75,
		label: {
			type: "inner",
			offset: "-30%",
			content: "{value}",
			style: {
				fontSize: 14,
				textAlign: "center",
			},
		},
		interactions: [{ type: "element-active" }],
	};

	const claimsLineConfig = {
		data: claimsTrendData,
		xField: "date",
		yField: "value",
		color: "#ff4d4f",
		point: {
			size: 5,
			shape: "diamond",
		},
		label: {
			style: {
				fill: "#aaa",
			},
		},
		smooth: true,
	};

	const columnsAccidents = [
		{ title: "Date", dataIndex: "date", key: "date" },
		{ title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
		{ title: "Status", dataIndex: "status", key: "status" },
		{ title: "Location", dataIndex: "location", key: "location" },
	];

	const columnsRenewals = [
		{
			title: "Policy Number",
			dataIndex: "policyNumber",
			key: "policyNumber",
		},
		{ title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
		{
			title: "Renewal Date",
			dataIndex: "renewalDate",
			key: "renewalDate",
		},
		{ title: "Status", dataIndex: "status", key: "status" },
	];

	const renderContent = () => {
		if (selectedMenu === "1") {
			return (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="mb-8"
				>
					<Card
						title="Recent Accident Reports"
						bordered={false}
						className="shadow-lg mb-6"
					>
						<Table
							dataSource={accidentReports}
							columns={columnsAccidents}
							pagination={false}
						/>
					</Card>
					<Card
						title="Accident Reports (Bar Chart)"
						bordered={false}
						className="shadow-lg mb-6"
					>
						<Bar {...accidentBarConfig} />
					</Card>
				</motion.div>
			);
		}

		if (selectedMenu === "2") {
			return (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="mb-8"
				>
					<Card
						title="Upcoming Renewals"
						bordered={false}
						className="shadow-lg mb-6"
					>
						<Table
							dataSource={renewals}
							columns={columnsRenewals}
							pagination={false}
						/>
					</Card>
					<Card
						title="Renewals Status (Pie Chart)"
						bordered={false}
						className="shadow-lg"
					>
						<Pie {...renewalPieConfig} />
					</Card>
				</motion.div>
			);
		}

		if (selectedMenu === "3") {
			return (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="mb-8"
				>
					<Card
						title="Data Insights"
						bordered={false}
						className="shadow-lg mb-6"
					>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<Statistic
								title="Total Accident Reports"
								value={34}
							/>
							<Statistic
								title="Active Policies"
								value={120}
							/>
							<Statistic
								title="Pending Claims"
								value={5}
							/>
						</div>
					</Card>
					<Card
						title="Claims Trends (Line Chart)"
						bordered={false}
						className="shadow-lg"
					>
						<Line {...claimsLineConfig} />
					</Card>
				</motion.div>
			);
		}

		if (selectedMenu === "4") {
			return (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="mb-8"
				>
					<Card
						title="Fraud Detection"
						bordered={false}
						className="shadow-lg"
					>
						<FraudDetectionForm />
					</Card>
				</motion.div>
			);
		}

		if (selectedMenu === "5") {
			return (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7 }}
					className="mb-8"
				>
					<Card
						title="Add Vehicle"
						bordered={false}
						className="shadow-lg"
					>
						<AddVehicleForm />
					</Card>
				</motion.div>
			);
		}

		return null;
	};

	return (
		<Layout className="min-h-screen">
			<Sider
				width={250}
				className="bg-white shadow-lg"
			>
				<div className="p-4 text-center text-xl font-bold">
					Dashboard
				</div>
				<Menu
					mode="inline"
					defaultSelectedKeys={["1"]}
					selectedKeys={[selectedMenu]}
					onClick={(e) => setSelectedMenu(e.key)}
					items={[
						{
							key: "1",
							icon: <FileTextOutlined />,
							label: "Accident Reports",
						},
						{
							key: "2",
							icon: <NotificationOutlined />,
							label: "Renewals",
						},
						{
							key: "3",
							icon: <BarChartOutlined />,
							label: "Claims & Insights",
						},
						{
							key: "4",
							icon: <AlertOutlined />,
							label: "Fraud Detection",
						},
						{
							key: "5",
							icon: <CarOutlined />,
							label: "Add Vehicle",
						}, // New Add Vehicle menu
					]}
				/>
			</Sider>

			<Layout>
				<Header className="bg-gray-800 p-4 text-white text-xl font-bold">
					Insurance Dashboard
				</Header>

				<Content className="p-6 bg-gray-100">
					{renderContent()}
				</Content>
			</Layout>
		</Layout>
	);
};

export default DashboardPage;

"use client";

// components/AccidentTable.tsx

import { useState, useEffect } from "react";
import { Table, Button, message, Typography } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import AccidentReportModal from "./AccidentReportModal";
import AccidentDetailModal from "./AccidentDetailModal";

const { Text } = Typography;

const AccidentTable = () => {
	const [data, setData] = useState([]);
	const [isReportModalVisible, setIsReportModalVisible] = useState(false);
	const [selectedAccident, setSelectedAccident] = useState<any>(null); // Replace 'any' with your accident type
	const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

	useEffect(() => {
		// Fetch accidents from the API
		const fetchAccidents = async () => {
			try {
				const response = await fetch("/api/get-accidents");
				const result = await response.json();
				console.log(result, "result");
				setData(result);
			} catch (error) {
				message.error("Failed to fetch accidents");
			}
		};

		fetchAccidents();
	}, []);

	const showReportModal = () => {
		setIsReportModalVisible(true);
	};

	const handleReportOk = () => {
		setIsReportModalVisible(false);
		// Refresh the table data
		const fetchAccidents = async () => {
			try {
				const response = await fetch("/api/get-accidents");
				const result = await response.json();
				setData(result);
			} catch (error) {
				message.error("Failed to fetch accidents");
			}
		};

		fetchAccidents();
	};

	const handleReportCancel = () => {
		setIsReportModalVisible(false);
	};

	const showDetailModal = (accident: any) => {
		setSelectedAccident(accident);
		setIsDetailModalVisible(true);
	};

	const handleDetailCancel = () => {
		setIsDetailModalVisible(false);
	};

	const columns = [
		{
			title: "Details",
			dataIndex: "details",
			key: "details",
			render: (text: string) => (
				<Text
					ellipsis={{ tooltip: text }}
					style={{ maxWidth: 150 }}
				>
					{text}
				</Text>
			),
		},
		{
			title: "Location",
			dataIndex: "location",
			key: "location",
			render: (text: string) => (
				<Text
					ellipsis={{ tooltip: text }}
					style={{ maxWidth: 150 }}
				>
					{text}
				</Text>
			),
		},
		{
			title: "Date",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (text: string) => new Date(text).toLocaleDateString(),
		},
		{
			title: "Action",
			key: "action",
			render: (_: any, record: any) => (
				<Button
					icon={<EyeOutlined />}
					onClick={() => {
						showDetailModal(record);
						console.log(record, "record");
					}}
				>
					View
				</Button>
			),
		},
	];

	return (
		<>
			<Button
				type="primary"
				icon={<PlusOutlined />}
				onClick={showReportModal}
				style={{ marginBottom: 16 }}
			>
				Report New Accident
			</Button>
			<Table
				columns={columns}
				dataSource={data}
				rowKey="id"
				pagination={{ pageSize: 10 }}
			/>
			<AccidentReportModal
				visible={isReportModalVisible}
				onCancel={handleReportCancel}
				onOk={handleReportOk}
			/>
			<AccidentDetailModal
				visible={isDetailModalVisible}
				onCancel={handleDetailCancel}
				accident={selectedAccident}
			/>
		</>
	);
};

export default AccidentTable;

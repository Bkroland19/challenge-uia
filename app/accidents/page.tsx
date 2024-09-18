"use client";

import { Typography } from "antd";
import AccidentTable from "../components/AccidentTable";

const { Title } = Typography;

export default function AccidentsPage() {
	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<Title
				level={1}
				className="text-center mb-6"
			>
				Accident Reports
			</Title>
			<AccidentTable />
		</div>
	);
}

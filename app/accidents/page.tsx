"use client";

import { Typography } from "antd";
import AccidentTable from "../components/AccidentTable";

const { Title } = Typography;

export default function AccidentsPage() {
	return (
		<div className="min-h-screen flex flex-col bg-gray-100">
			{/* Header */}
			<header className="bg-white shadow-md">
				<div className="container mx-auto px-6 py-4 flex justify-between items-center">
					<h1 className="text-2xl font-semibold text-gray-800">
						UIA Dashboard
					</h1>
					<nav>
						<ul className="flex space-x-4">
							<li>
								<a
									href="/"
									className="text-gray-600 hover:text-indigo-600"
								>
									Home
								</a>
							</li>
						
							<li>
								<a
									href="/logout"
									className="text-gray-600 hover:text-red-600"
								>
									Logout
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			<div className="flex flex-1">
				{/* Sidebar */}
				<aside className="bg-indigo-600 text-white w-64 hidden lg:block">
					<div className="h-full py-8 px-6">
						<h2 className="text-xl font-semibold mb-6">
							UIA
						</h2>
						<ul>
							<li className="mb-4">
								<a
									href="/dashboard"
									className="block py-2 px-4 rounded hover:bg-indigo-700"
								>
									Dashboard Overview
								</a>
							</li>
							<li className="mb-4">
								<a
									href="/report-incident"
									className="block py-2 px-4 rounded hover:bg-indigo-700"
								>
									Report Incident
								</a>
							</li>
							<li className="mb-4">
								<a
									href="/accidents"
									className="block py-2 px-4 rounded bg-indigo-700"
								>
									Accident Reports
								</a>
							</li>
							<li>
								<a
									href="/history"
									className="block py-2 px-4 rounded hover:bg-indigo-700"
								>
									Incident History
								</a>
							</li>
						</ul>
					</div>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-6 bg-gray-100">
					<div className="bg-white shadow-lg rounded-lg p-6">
						<Title
							level={1}
							className="text-center mb-6 text-gray-700"
						>
							Accident Reports
						</Title>
						<AccidentTable />
					</div>
				</main>
			</div>
		</div>
	);
}

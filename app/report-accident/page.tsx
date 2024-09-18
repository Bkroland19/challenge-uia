import AccidentReportForm from "../components/AccidentReportForm";

export default function ReportIncidentPage() {
	return (
		<div className="container mx-auto px-4 py-16">
			<h1 className="text-3xl font-bold text-center mb-8">
				Report an Incident
			</h1>
			<div className="max-w-lg mx-auto">
				<AccidentReportForm />
			</div>
		</div>
	);
}

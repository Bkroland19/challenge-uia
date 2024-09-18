// components/AccidentReportModal.tsx

import { Modal } from "antd";
import AccidentReportForm from "./AccidentReportForm";

interface AccidentReportModalProps {
	visible: boolean;
	onCancel: () => void;
	onOk: () => void;
}

const AccidentReportModal: React.FC<AccidentReportModalProps> = ({
	visible,
	onCancel,
	onOk,
}) => {
	return (
		<Modal
			title="Report Accident"
			visible={visible}
			onCancel={onCancel}
			onOk={onOk}
			footer={null}
		>
			<AccidentReportForm />
		</Modal>
	);
};

export default AccidentReportModal;

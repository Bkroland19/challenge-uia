// components/AccidentDetailModal.tsx

import { Modal, Card, Typography, Image, Divider, Row, Col } from "antd";
import React from "react";

const { Title, Text } = Typography;

interface AccidentDetailModalProps {
	visible: boolean;
	onCancel: () => void;
	accident: any;
}

const AccidentDetailModal: React.FC<AccidentDetailModalProps> = ({
	visible,
	onCancel,
	accident,
}) => {
	if (!accident) return null; // Handle case when no accident is provided

	return (
		<Modal
			title="Accident Details"
			visible={visible}
			onCancel={onCancel}
			footer={null}
			width={800}
		>
			<Card>
				<Title level={3}>Accident Report</Title>
				<Divider />

				<Row gutter={16}>
					<Col span={12}>
						<Text strong>Details:</Text>
						<p>{accident?.details}</p>
					</Col>
					<Col span={12}>
						<Text strong>Location:</Text>
						<p>{accident?.location}</p>
					</Col>
				</Row>

				<Row gutter={16}>
					<Col span={12}>
						<Text strong>Date:</Text>
						<p>
							{new Date(
								accident?.createdAt
							).toLocaleDateString()}
						</p>
					</Col>
				</Row>

				<Divider />
				<Title level={4}>Images</Title>
				<Row gutter={16}>
					{accident?.images.map(
						(image: string, index: number) => (
							<Col
								span={8}
								key={index}
							>
								<Image
									width={200}
									src={`${image}`} // Adjust the path based on your setup
									preview={false}
									style={{ marginBottom: 8 }}
								/>
							</Col>
						)
					)}
				</Row>
			</Card>
		</Modal>
	);
};

export default AccidentDetailModal;

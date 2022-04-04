import React, { useState } from 'react';
import Rec from './Rec';
import RenderCustomPdf from 'components/renderPdf';
import { Avatar, Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const RecPdf: React.FC<any> = ({ load, setLoad, imagen }) => {
	const [modal, setModal] = useState(false);

	const handleOpenModal = () => {
		setModal(true);
	};

	const handleCloseModal = () => {
		setModal(false);
	};
	return (
		<>
			{imagen.split('.')[imagen.split('.').length - 1] === 'pdf' ? (
				<>
					<Button onClick={handleOpenModal}>
						<Avatar>
							<PictureAsPdfIcon />
						</Avatar>
					</Button>
					<RenderCustomPdf modal={modal} handleCloseModal={handleCloseModal} url={imagen} />
				</>
			) : (
				<Rec load={load} setLoad={setLoad} imagen={imagen} />
			)}
		</>
	);
};

export default RecPdf;

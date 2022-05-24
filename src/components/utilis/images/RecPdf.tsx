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
				<div
					style={{
						width: '100%',
						justifyContent: 'center',
						display: 'flex',
						marginTop: '2rem',
					}}>
					<Button variant='contained' color='primary' onClick={handleOpenModal}>
						<Avatar sx={{ padding: 2 }}>
							<PictureAsPdfIcon
								sx={{
									fontSize: '4rem',
									padding: 2,
									width: 50,
								}}
							/>
						</Avatar>
					</Button>
					<RenderCustomPdf modal={modal} handleCloseModal={handleCloseModal} url={imagen} />
				</div>
			) : (
				<Rec load={load} setLoad={setLoad} imagen={imagen} />
			)}
		</>
	);
};

export default RecPdf;

import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useStyles } from './styles/styles';

import LoaderPrimary from '../../loaders/LoaderPrimary';

import AnimatedModal from '../../modals/AnimationModal';

const Rec: React.FC<any> = ({ load, setLoad, imagen, wi, he, setSize }) => {
	const classes = useStyles();

	const [modal, setModal] = React.useState(false);
	//const [size, setSize] = React.useState(0);

	const handleOpenModal = () => {
		setModal(true);
	}

	const handleCloseModal = () => {
		setModal(false);
	}

	return (
		<>
			<div className={classes.container_img}>
				<div className={classes.container_zoom}
					onClick={handleOpenModal}
				>
					<TransformWrapper>
					<TransformComponent>
						{!load &&
							<div
								className={classes.img_zoom}
							>
								<LoaderPrimary />
							</div>
						}
						<img 
							className={classes.img_zoom}
							style={load ? {} : { display: '' }}
							onLoad={() => {
								setLoad(true)
							}}
							src={imagen}
							alt="test"
						/>
					</TransformComponent>
				</TransformWrapper>
				</div>
			</div>
			<div
				style={{ 
					zIndex: 999999
				}}
			>
				<AnimatedModal
					openModal={modal}
					handleCloseModal={handleCloseModal}
				>
					<div
					style={{
						maxHeight: '700px',
						maxWidth: '700px'
					}}
					>
					<TransformWrapper>
					<TransformComponent>
						<img 
							style={{
								minWidth: '500px',
								display: load ? 'flex' : 'none'
							}}
							src={imagen}
							alt="test"
						/>
					</TransformComponent>
				</TransformWrapper>
					</div>
				</AnimatedModal>
			</div>
		</>
	)
}

export default Rec;

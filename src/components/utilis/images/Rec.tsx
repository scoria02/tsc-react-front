import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useStyles } from './styles/styles';

import LoaderPrimary from '../../loaders/LoaderPrimary';

import AnimatedModal from '../../modals/AnimationModal';

const Rec: React.FC<any> = ({ load, setLoad, imagen }) => {
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
								//console.log('Imagen Cargada', imagen)
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
					<TransformWrapper>
					<TransformComponent>
						<img 
							style={{
								width: '700px',
								display: load ? 'flex' : 'none'
							}}
							onLoad={(event) => {
								//console.log('Imagen Cargada Full Scream', imagen)
								/*
								setLoad(true)
								let width= event.currentTarget.width;
								let height= event.currentTarget.height;
								let res = 0;
								console.log(width, height)
								if (width >= height){
									res = width >= window.innerWidth ? window.innerWidth-100 : width;
								}else {
									res = height >= window.innerHeight ? window.innerHeight-200 : height;
								}
								setSize(res); 
								 */
							}}
							src={imagen}
							alt="test"
						/>
					</TransformComponent>
				</TransformWrapper>
				</AnimatedModal>
			</div>
		</>
	)
}

export default Rec;

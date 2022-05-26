/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useLayoutEffect } from 'react';
//import { FMDiferidoContextProvider } from 'context/Admision/Diferido/FmDiferidoContext';
//import { DataListAdmisionProvider } from 'context/DataList/DatalistAdmisionContext';
import StepUpdateCommerce from './steps/StepUpdateCommerce';
import { UpdateCommerceContextProvider } from 'context/UpdateData/Commerce/UpdateCommerceContext';
import { DataListAdmisionProvider } from 'context/DataList/DatalistAdmisionContext';
import { useStyles } from '../styles/styles';
import AnimatedModal from 'components/modals/AnimationModal';
import '../../modals/scss/fullmodal.scss';

interface Prop {
	commerce: any;
	click: boolean;
}

const DataCommerce: React.FC<Prop> = ({ commerce, click }) => {
	const [modalOpen, setModelOpen] = useState(true);
	const classes = useStyles();

	useLayoutEffect(() => {
		setModelOpen(true);
	}, [commerce, click]);

	const handleClose = () => {
		setModelOpen(false);
	};

	console.log(modalOpen);

	return (
		<DataListAdmisionProvider>
			<UpdateCommerceContextProvider data={commerce}>
				<div
					onClick={(e) => {
						e.preventDefault();
						console.log('aqui');
						//setModelOpen(true);
					}}
					style={{
						position: modalOpen ? 'fixed' : 'relative',
						pointerEvents: 'none',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
					}}>
					<AnimatedModal openModal={modalOpen} handleCloseModal={handleClose}>
						<div
							style={{
								position: 'fixed',
								top: '50%',
								left: '50%',
								width: '80%',
								height: '40%',
								transform: 'translate(-50%, -50%)',
								background: '#fff',
								padding: '4rem',
								borderRadius: '1rem',
							}}
							className={classes.containerSteps}>
							<div className='button-close'>
								<div className='close-container' onClick={handleClose}>
									<div className='leftright'></div>
									<div className='rightleft'></div>
									<label className='closee'>Cerrar</label>
								</div>
							</div>
							<StepUpdateCommerce />
						</div>
					</AnimatedModal>
				</div>
			</UpdateCommerceContextProvider>
		</DataListAdmisionProvider>
	);
};

export default DataCommerce;

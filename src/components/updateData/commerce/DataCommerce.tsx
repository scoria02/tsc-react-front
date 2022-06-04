/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect, useContext } from 'react';
import StepUpdateCommerce from './steps/StepUpdateCommerce';
import UpdateCommerceContext, {
	UpdateCommerceContextProvider,
} from 'context/UpdateData/Commerce/UpdateCommerceContext';
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

	const { reset } = useContext(UpdateCommerceContext);

	useLayoutEffect(() => {
		setModelOpen(true);
	}, [commerce, click]);

	const handleClose = () => {
		reset();
		//console.log('deberia reset');
		setModelOpen(false);
	};

	return (
		<UpdateCommerceContextProvider data={commerce} closeModal={modalOpen}>
			<AnimatedModal openModal={modalOpen} handleCloseModal={() => {}}>
				<div className={classes.containerModalUpdate}>
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
		</UpdateCommerceContextProvider>
	);
};

export default DataCommerce;

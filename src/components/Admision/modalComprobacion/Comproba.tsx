import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseModal } from '../../../store/actions/ui';
import Comprobacion from '../comprobacion';
//Redux
import { RootState } from '../../../store/store';
import LoaderPrimary from '../../loaders/LoaderPrimary';
import { cleanRec } from '../../../store/actions/accept';
import { cleanAdmisionFM } from '../../../store/actions/admisionFm';

import './comprobar.scss';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function Comproba() {
	const dispatch = useDispatch();

	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);

	const { modalOpen } = useSelector((state: any) => state.ui);

	useEffect(() => {
		if(modalOpen === false){
			dispatch(cleanRec())
			dispatch(cleanAdmisionFM())
		}
	}, [modalOpen, dispatch])

	const handleClose = () => {
		dispatch(CloseModal());
	};

	return (
		<div>
			<Dialog fullScreen open={modalOpen} onClose={handleClose} TransitionComponent={Transition}>
				{Object.keys(fm).length ? 
					<Comprobacion special={fm.special_contributor} /> 
					:
					<LoaderPrimary />
				}
			</Dialog>
		</div>
	);
}

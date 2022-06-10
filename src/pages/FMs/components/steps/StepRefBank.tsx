import { TextField } from '@mui/material';
import RecPdf from 'components/images/RecPdf';
import React, { useContext, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { useStyles } from './styles/styles';
import FMContextData from 'context/FM/FMContextData';

const StepRefBank: React.FC = () => {
	const classes = useStyles();
	const [load, setLoad] = useState(false);

	const { solic } = useContext(FMContextData);

	const imagen = `${process.env.REACT_APP_API_IMAGES}/${solic.rc_ref_bank.path}`;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						className={classes.btn_stepNro}
						label='Numero de Cuenta'
						value={solic.bank_account_num}
						variant='outlined'
					/>
				</div>
				<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
			</form>
		</>
	);
};

export default StepRefBank;

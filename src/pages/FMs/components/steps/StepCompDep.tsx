import { TextField } from '@mui/material';
import RecPdf from 'components/images/RecPdf';
import React, { useContext, useState } from 'react';
//Redux
import { useStyles } from './styles/styles';
import FMContextData from 'context/FM/FMContextData';

const StepCompDep: React.FC = () => {
	//const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const classes = useStyles();
	const [load, setLoad] = useState(false);

	const { solic } = useContext(FMContextData);
	const imagen = `${process.env.REACT_APP_API_IMAGES}/${solic.rc_comp_dep.path}`;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField className={classes.btn_stepNro} label='Numero de comprobante' value={solic?.nro_comp_dep} />
				</div>
				<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
			</form>
		</>
	);
};

export default StepCompDep;

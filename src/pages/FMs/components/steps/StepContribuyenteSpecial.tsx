import RecPdf from 'components/images/RecPdf';
import React, { useContext, useState } from 'react';
//Redux
import { useStyles } from './styles/styles';
import FMContextData from 'context/FM/FMContextData';

const StepContribuyenteSpecial: React.FC = () => {
	const classes = useStyles();

	const [load, setLoad] = useState(false);

	const { commerce } = useContext(FMContextData);

	const imagen: string = `${process.env.REACT_APP_API_IMAGES}/${commerce.rc_special_contributor.path}`;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}></div>
				<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
			</form>
		</>
	);
};

export default StepContribuyenteSpecial;

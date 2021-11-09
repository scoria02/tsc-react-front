import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//Url
import { PortFiles, URL as urlBack} from '../../../config';
import '../comprobacion/pasosComprobacion/styles/pasos.scss';
import { useStyles } from './styles';
import './index.scss';
import { recaudo } from '../../utilis/recaudos';

import Rec from '../../utilis/images/Rec';

const StepDiferido: React.FC<any> = ({
	name,
	fm,
	path,
	handleChangeImages,
	uploadImg,
	ready,
}) => {
	const classes = useStyles();
  const [load, setLoad] = useState(false)

	const	imagen:string= uploadImg ? path : `${urlBack}:${PortFiles}/${fm.path}`;

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
				<Button
					className={classes.uploadImg}
					variant='contained'
					component='label'
					disabled={ready}
					style={{ 
						background: uploadImg ? '#00c853' : '#f44336' ,
						opacity: !ready ? 1 : 0,
					}}
				>
					<IconButton aria-label='upload picture' component='span'>
						<CloudUploadIcon className={classes.iconUpload}/>
					</IconButton>
					<input
						type='file'
						hidden
						name={name}
						accept={recaudo.acc}
						onChange={handleChangeImages}
					/>
				</Button>
				</div>
			</form>
			<Rec 
				load={load}
				setLoad={setLoad}
				imagen={imagen}
			/>
		</>
	);
}

export default StepDiferido;

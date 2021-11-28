import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//Url
import { PortFiles, URL as urlBack} from '../../../config';
import { useStyles } from '../styles/styles';
import '../comprobacion/pasosComprobacion/styles/pasos.scss';
import '../scss/index.scss';
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

	const [size, setSize] = useState<any>({
		file: 700 //widthFullScrean
	})

	//console.log(size)

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
						id='img'
						type='file'
						hidden
						name={name}
						accept={recaudo.acc}
						onChange={handleChangeImages}
					/>
				</Button>
				</div>
			</form>
			{uploadImg && uploadImg.name.split('.')[uploadImg.name.split('.').length-1] === 'pdf' ?
				<>
					<div className={classes.btn_stepM}>
						<h1>PDF</h1>
					</div>
					<div className={classes.btn_stepM}>
						<a 
							target="_blank"
							rel="noreferrer"
							href={path}>
							<Button
								className={classes.uploadPdf}
								variant='contained'
								component='label'
								color='primary'
								disabled={ready}
							>
								<IconButton aria-label='upload picture' component='span'>
									<PictureAsPdfIcon className={classes.iconUpload}/>
								</IconButton>
							</Button>
						</a>
					</div>
					<div className={classes.btn_stepM}>
						<h2>Solo se guardara la primera pagina</h2>
					</div>
				</>
			:
				<Rec 
					load={load}
					setLoad={setLoad}
					imagen={imagen}
					wi={size.file}
					setSize={setSize}
				/>
			}
		</>
	);
}

export default StepDiferido;

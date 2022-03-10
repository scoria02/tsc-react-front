import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineSharp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Button, IconButton } from '@mui/material';
//Url
import Rec from 'components/utilis/images/Rec';
import React, { useState } from 'react';
import { recaudo } from 'utils/recaudos';
import '../comprobacion/pasosComprobacion/styles/pasos.scss';
import '../scss/index.scss';
import { useStyles } from '../styles/styles';
import './index.scss';

const StepDiferido: React.FC<any> = ({ name, fm, valid, path, handleChangeImages, uploadImg, ready }) => {
	const classes = useStyles();
	const [load, setLoad] = useState(false);

	const imagen: string = uploadImg ? path : `${process.env.REACT_APP_API_IMAGES}/${fm.path}`;

	const [size, setSize] = useState<any>({
		file: 700, //widthFullScrean
	});

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<Button
						className={classes.uploadImg}
						variant='contained'
						component='label'
						disabled={ready}
						style={{
							background: uploadImg ? '#00c853' : '#f44336',
							opacity: !ready ? 1 : 0,
						}}>
						<IconButton aria-label='upload picture' component='span'>
							<CloudUploadIcon className={classes.iconUpload} />
						</IconButton>
						<input id='img' type='file' hidden name={name} accept={recaudo.acc} onChange={handleChangeImages} />
					</Button>
					<div className='containerItem'>
						<div className='containerTop'>
							<p className='textareaAlert'>
								<ErrorOutlineIcon className='icon-alert' />
								{valid}
							</p>
						</div>
					</div>
				</div>
			</form>
			{uploadImg && uploadImg.name.split('.')[uploadImg.name.split('.').length - 1] === 'pdf' ? (
				<>
					<div className={classes.btn_stepM}>
						<h1>PDF</h1>
					</div>
					<div className={classes.btn_stepM}>
						<a target='_blank' rel='noreferrer' href={path}>
							<Button
								className={classes.uploadPdf}
								variant='contained'
								component='label'
								color='primary'
								disabled={ready}>
								<IconButton aria-label='upload picture' component='span'>
									<PictureAsPdfIcon className={classes.iconUpload} />
								</IconButton>
							</Button>
						</a>
					</div>
					<div className={classes.btn_stepM}>
						<h2>Solo se guardara la primera pagina</h2>
					</div>
				</>
			) : (
				<Rec load={load} setLoad={setLoad} imagen={imagen} wi={size.file} setSize={setSize} />
			)}
		</>
	);
};

export default StepDiferido;

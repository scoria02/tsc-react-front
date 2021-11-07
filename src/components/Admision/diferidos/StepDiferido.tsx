import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Button, makeStyles, TextField, Theme } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
//Url
import { PortFiles, URL as urlBack} from '../../../config';
import { Valid } from '../../../store/actions/accept';
import { RootState } from '../../../store/store';
import '../comprobacion/pasosComprobacion/styles/pasos.scss';
import { useStyles } from './styles';

import luffy from '../../../img/obama.jpg';

const StepDiferido: React.FC<any> = ({
	name,
	fm,
	path,
	handleChangeImages,
	uploadImg,
	readyStep,
	ready,
}) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [ flag, setFlag ] = useState<boolean>(false); //Flag for loading
	const [state, setState] = React.useState({
		status: false
	});
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	const [nameImg, setNameImage] = useState<string>('');

	const handleOpenModal = () => {
		handleCancel()
		setOpenModal(true);
	};
	const handleCloseModal = (cancel: boolean) => {
		/*
		if(cancel){
			setState({ 
				...state, 
				status: !state.status,
			});
		}
		 */
		setOpenModal(false);
	};

	setTimeout(() => {
		setFlag(true);
	}, 150)

	useEffect(() => {
		//dispatch(Valid({ rc_ident_card: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const props = {
		zoomPosition: 'original',
		height: 350,
		width: 500,
		img: uploadImg ? path : `${urlBack}:${PortFiles}/${fm.path}`,
	};

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					{console.log(ready)}
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
						accept='image/png, image/jpeg, image/jpg'
						onChange={handleChangeImages}
					/>
				</Button>
				</div>
			</form>
			{flag &&
				<div className='img_container'>
					<ReactImageZoom className={classes.img_zoom} {...props} />
				</div>
			}
		</>
	);
}

export default StepDiferido;

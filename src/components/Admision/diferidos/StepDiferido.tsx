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
import { PortFiles, URL as URLBD} from '../../../config';
import { Valid } from '../../../store/actions/accept';
import { RootState } from '../../../store/store';
import '../comprobacion/pasosComprobacion/styles/pasos.scss';
import { useStyles } from './styles';

import luffy from '../../../img/obama.jpg';

const StepDiferido: React.FC<any> = ({ fm }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [ flag, setFlag ] = useState<boolean>(false); //Flag for loading
	const [state, setState] = React.useState({
		status: false
	});
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	const [nameImg, setNameImage] = useState<string>('');
	const [uploadImg, setUploadImg] = useState<any>(null);
	const [Path, setPath] = useState<string>('');

	const handleChangeImages = (event: any) => {
		const path = URL.createObjectURL(event.target.files[0]);
		if (event.target.files[0]) {
			let file = event.target.files[0];
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: 'image/jpeg' });
			//Save img
			setUploadImg(newFile); 
			setNameImage(event.target.files[0].name);
			//prueba
			setPath(path)
		}
	};

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

	const handleIncorret = () => {
		dispatch(Valid({ rc_ident_card: state }));
		handleCloseModal(false);
	};

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const handleChangeI = (event:any) => {
		setState({ 
			...state, 
			[event.target.name]: event.target.value,
		});
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ 
			...state, 
			[event.target.name]: event.target.checked,
		});
		if(!event.target.checked)
			handleOpenModal();
	};

	const props = {
		zoomPosition: 'original',
		height: 350,
		width: 500,
		img: uploadImg ? Path : luffy,
	};

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Nro'
						variant='outlined'
						value={fm.code}
					/>
				<Button
					className={classes.uploadImg}
					variant='contained'
					component='label'
					style={{ 
						background: uploadImg ? '#00c853' : '#f44336' 
					}}
				>
					<IconButton aria-label='upload picture' component='span'>
						<CloudUploadIcon className={classes.iconUpload}/>
					</IconButton>
					<input
						type='file'
						hidden
						name='rc_comp_dep'
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

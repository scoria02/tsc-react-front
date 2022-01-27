import { Button } from '@material-ui/core';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import Swal from 'sweetalert2';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
//Url
import { useStyles } from '../styles/styles';
import '../comprobacion/pasosComprobacion/styles/pasos.scss';
import '../scss/index.scss';
import { recaudo } from '../../utilis/recaudos';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Avatar from '@material-ui/core/Avatar';

import ImageIcon from '@material-ui/icons/Image';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const StepActaConst: React.FC<any> = ({
	name,
	acta,
	paths,
	handleChangeImages,
	uploadImg,
	ready,
	deleteActa,
	setDeleteActa,
}) => {
	const classes = useStyles();

	const url: string = process.env.REACT_APP_API_IMAGES + '/';

	const handleAddDelete = (id: number) => {
		Swal.fire({
			title: 'Eliminar Imagen',
			icon: 'error',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Aceptar',
			showCancelButton: true,
			cancelButtonText: 'Atras',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				setDeleteActa([...deleteActa, id]);
			}
		});
	};

	const validDelete = (id: number) => {
		for (const item of deleteActa) {
			if (id === item) return true;
		}
		return false;
	};

	return (
		<>
			<form className='container-step' noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<Button
						className={classes.uploadImg}
						variant='contained'
						component='label'
						disabled={ready}
						style={{
							background: Object.keys(uploadImg).length ? '#00c853' : '#f44336',
							opacity: !ready ? 1 : 0,
						}}>
						<IconButton aria-label='upload picture' component='span'>
							<CloudUploadIcon className={classes.iconUpload} />
						</IconButton>
						<input
							id='img'
							type='file'
							hidden
							multiple
							name={name}
							accept={recaudo.acc}
							onChange={handleChangeImages}
						/>
					</Button>
				</div>

				<List className={classes.container_ListActa}>
					{uploadImg.length
						? Object.keys(uploadImg).map((item: any, index: number) => (
								<ListItem key={item}>
									<Button className={classes.link} href={paths[item]} target='_blank' rel='noreferrer'>
										<Avatar>
											{uploadImg[item].name.split('.')[uploadImg[item].name.split('.').length - 1] === 'pdf' ? (
												<PictureAsPdfIcon />
											) : (
												<ImageIcon />
											)}
										</Avatar>
										<ListItemText
											className={classes.itemLink}
											primary={uploadImg[item].name}
											secondary={index + 1}
										/>
									</Button>
								</ListItem>
						  ))
						: null}
					{acta.map((item: any, index: number) => {
						if (validDelete(item.id)) {
							return null;
						} else {
							return (
								<ListItem key={item.id} value={item.id}>
									<Button
										className={classes.link}
										href={url + item.id_photo.path}
										target='_blank'
										rel='noreferrer'
										key={item.id}>
										<Avatar>
											{item.id_photo.name.split('.')[item.id_photo.name.split('.').length - 1] === 'pdf' ? (
												<PictureAsPdfIcon />
											) : (
												<ImageIcon />
											)}
										</Avatar>
										<ListItemText
											className={classes.itemLink}
											primary={item.id_photo.name.split('@')[item.id_photo.name.split('.').length - 1]}
											secondary={index + 1}
										/>
									</Button>
									<Button
										size='small'
										variant='contained'
										color='secondary'
										onClick={() => handleAddDelete(item.id)}>
										<DeleteIcon />
									</Button>
								</ListItem>
							);
						}
					})}
				</List>
			</form>
		</>
	);
};

export default StepActaConst;

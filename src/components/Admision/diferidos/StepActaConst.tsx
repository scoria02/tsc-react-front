import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//Url
import { PortFiles, URL } from '../../../config';
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

import Rec from '../../utilis/images/Rec';

const StepActaConst: React.FC<any> = ({
	name,
	acta,
	paths,
	handleChangeImages,
	uploadImg,
	ready,
}) => {
	const classes = useStyles();
  const [load, setLoad] = useState(false)
  
  const url:string = URL + ':' + PortFiles + '/';

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
							multiple
							name={name}
							accept={recaudo.acc}
							onChange={handleChangeImages}
						/>
					</Button>
				</div>

				<List className={classes.container_ListActa}>
					{uploadImg.length ?
						(Object.keys(uploadImg).map((item: any, index: number) => (
							<ListItem key={item}>
								<Button
									className={classes.link}
									href={paths[item]}
									target="_blank"
									rel="noreferrer"
								>
									<Avatar>
										{uploadImg[item].name.split('.')[uploadImg[item].name.split('.').length-1] === 'pdf' ?
											<PictureAsPdfIcon />
										:
											<ImageIcon />
										}
									</Avatar>
									<ListItemText 
										className={classes.itemLink}
										primary={uploadImg[item].name} 
										secondary={index+1}
									/>
								</Button>
							</ListItem>
						)))
						:
						(acta.map((item: any, index: number) => (
							<ListItem key={item.id} value={item.id}>
								<Button
									className={classes.link}
									href={url + item.id_photo.path}
									target="_blank"
									rel="noreferrer"
									key={item.id}
								>
									<Avatar>
										{item.id_photo.name.split('.')[item.id_photo.name.split('.').length-1] === 'pdf' ?
											<PictureAsPdfIcon />
										:
											<ImageIcon />
										}
									</Avatar>
									<ListItemText 
										className={classes.itemLink}
										primary={
											item.id_photo.name.split('@')[item.id_photo.name.split('.').length-1]
										} 
										secondary={index+1}
									/>
								</Button>
							</ListItem>
						)))
					}
				</List>
			</form>
		</>
	);
}

export default StepActaConst;

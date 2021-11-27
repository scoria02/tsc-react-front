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
	fm,
	handleChangeImages,
	uploadImg,
	ready,
}) => {
	const classes = useStyles();
    const [load, setLoad] = useState(false)

    console.log(fm)
    
    const url:string = URL + ':' + PortFiles + '/';

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
            <List
					className={classes.container_ListActa} >
					{fm.rc_contitutive_acta.map((item: any, index: number) => (
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
					))}
					</List>
			</form>
		</>
	);
}

export default StepActaConst;

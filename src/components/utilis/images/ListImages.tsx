import React from 'react';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PhotoCamera } from '@mui/icons-material';
import ImageIcon from '@mui/icons-material/Image';
import { useStyles } from '../../Admision/diferidos/pasosComprobacion/styles/styles';
import {
	Avatar,
	Button,
	IconButton,
	FormControlLabel,
	List,
	ListItem,
	ListItemText,
	Switch,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import { sxStyledList } from './styles/styles';

interface Props {
	listImagen: FileList | [];
	imagenes: any;
}

const ListImages: React.FC<Props> = ({ listImagen, imagenes }) => {
	const classes = useStyles();
	const url: string = process.env.REACT_APP_API_IMAGES + '/';
	return (
		<List sx={sxStyledList.container_ListActa} className={classes.container_ListActa}>
			{Array.from(listImagen).map((item, index) => {
				console.log(item);
				return (
					<ListItem key={item.name} value={item.name}>
						<Button
							className={classes.link}
							href={URL.createObjectURL(item)}
							target='_blank'
							rel='noreferrer'
							key={item.name}>
							<Avatar sx={{ backgroundColor: 'blue' }}>
								{item.name.split('.')[item.name.split('.').length - 1] === 'pdf' ? (
									<PictureAsPdfIcon />
								) : (
									<ImageIcon />
								)}
							</Avatar>
							<ListItemText className={classes.itemLink} primary={item.name} secondary={index + 1} />
						</Button>
					</ListItem>
				);
			})}
			{imagenes.map((item: any, index: number) => (
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
				</ListItem>
			))}
		</List>
	);
};

export default ListImages;

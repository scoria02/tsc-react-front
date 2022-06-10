import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Avatar, Button, List, ListItem, ListItemText } from '@mui/material';
import FMContextData from 'context/FM/FMContextData';
import React, { useContext } from 'react';
import { sxStyled, useStyles } from './styles/styles';

const StepActaConst: React.FC = () => {
	const classes = useStyles();

	const { commerce } = useContext(FMContextData);

	const imagenes: any = commerce.rc_constitutive_act;
	const url: string = process.env.REACT_APP_API_IMAGES + '/';

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<List sx={sxStyled.container_ListActa}>
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
			</form>
		</>
	);
};

export default StepActaConst;

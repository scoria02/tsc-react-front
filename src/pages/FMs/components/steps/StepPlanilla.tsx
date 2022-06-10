import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TextField, Avatar, Button, List, ListItem, ListItemText } from '@mui/material';
import React, { useContext } from 'react';
//import ReactImageZoom from 'react-image-zoom';
//Redux
import { sxStyled, useStylesFM } from '../styles';
import FMContextData from 'context/FM/FMContextData';

const StepPlanilla: React.FC = () => {
	const classes = useStylesFM();

	const { solic } = useContext(FMContextData);

	const imagenes: any = solic.rc_planilla;
	const url: string = process.env.REACT_APP_API_IMAGES + '/';

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						sx={sxStyled.inputSelect}
						variant='outlined'
						label='Tipo de Solicitud'
						name='typeSolict'
						value={solic?.id_type_request.name}
					/>
				</div>
				<List sx={sxStyled.container_ListActa} className={classes.container_ListActa}>
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

export default StepPlanilla;

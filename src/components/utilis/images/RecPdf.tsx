import { Avatar, Button, List, ListItem, ListItemText } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import React from 'react';

import Rec from './Rec';

import { useStyles } from '../../Admision/comprobacion/pasosComprobacion/styles/styles';

const sxStyled = {
	imgcenter: {
		marginTop: '3rem',
		justifyContent: 'center',
	},
};

const RecPdf: React.FC<any> = ({ load, setLoad, imagen }) => {
	const classes = useStyles();
	return (
		<>
			{imagen.split('.')[imagen.split('.').length - 1] === 'pdf' ? (
				<List className={classes.container_imgpdf}>
					<ListItem sx={sxStyled.imgcenter} value={imagen}>
						<Button className={classes.link} href={imagen} target='_blank' rel='noreferrer'>
							<Avatar>
								<PictureAsPdfIcon />
							</Avatar>
							<ListItemText className={classes.itemLink} primary={imagen.split('@')[1]} />
						</Button>
					</ListItem>
				</List>
			) : (
				<Rec load={load} setLoad={setLoad} imagen={imagen} />
			)}
		</>
	);
};

export default RecPdf;

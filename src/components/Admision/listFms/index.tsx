import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../../context/SocketContext';
import { CloseModalListSolic } from '../../../store/actions/ui';
import { useStyles } from './styles';

import AnimationModal from '../../modals/AnimationModal';

//Material ui
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import luffy from '../../../img/itachi2.png'

const ListFms: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [search, setSearch] = useState<string>('');

	const { modalOpenListSolic } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);

	const { socket } = useContext(SocketContext);

	const handleClose = () => {
		dispatch(CloseModalListSolic());
		//dispatch(clean());
	};

	return (
		<AnimationModal 
			openModal={modalOpenListSolic}
			handleCloseModal={handleClose}
		>
				<div className={classes.root}>
					<Paper
						component="form"
						style={{ width: '100%' }}
					>
						<InputBase
							style={{
								padding: '10px',
								width: '80%'
							}}
							placeholder="Buscar FM"
							name='search'
							onChange={(event: any) => setSearch(event.target.value)}
							value={search}
							inputProps={{ 'aria-label': '' }}
						/>
						<IconButton 
							aria-label="search">
							<SearchIcon />
						</IconButton>
				</Paper>
				<Paper>
					<Grid container spacing={4}>
						<Grid item>
							<ButtonBase style={{ width: 128, height: 128 }}>
								<img alt="complex" src={luffy} />
							</ButtonBase>
						</Grid>
						<Grid item xs={12} sm container>
							<Grid item xs container direction="column" spacing={2}>
								<Grid item xs>
									<Typography gutterBottom variant="subtitle1" component="div">
										Standard license
									</Typography>
									<Typography variant="body2" gutterBottom>
										Full resolution 1920x1080 • JPEG
									</Typography>
									<Typography variant="body2" color="secondary">
										Code: S42II4
									</Typography>
								</Grid>
								<Grid item>
									<Typography style={{ cursor: 'pointer' }} variant="body2">
										Remove
									</Typography>
								</Grid>
							</Grid>
							<Grid item>
								<Typography variant="subtitle1" component="div">
									$19.00
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</div>
		</AnimationModal>
	);
};

export default ListFms;

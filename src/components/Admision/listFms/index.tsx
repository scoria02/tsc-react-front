import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { SocketContext } from '../../../context/SocketContext';
import { CloseModalListSolic } from '../../../store/actions/ui';
import { useStyles } from './styles';

import AnimationModal from '../../modals/AnimationModal';

//Material ui
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ListFms: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [search, setSearch] = useState<string>('');
	const [searching, setSearching] = useState<boolean>(false);

	const { modalOpenListSolic } = useSelector((state: any) => state.ui);
	//const { user } = useSelector((state: any) => state.auth);

	//const { socket } = useContext(SocketContext);

	const handleClose = () => {
		dispatch(CloseModalListSolic());
		//dispatch(clean());
	};

	const handleSearching = (e:any) => {
		e.preventDefault();
		setSearching(true);
	}

	return (
		<AnimationModal 
			openModal={modalOpenListSolic}
			handleCloseModal={handleClose}
		>
				<div className={classes.root}>
					<Paper
						component="form"
						style={{ width: '100%' }}
						onSubmit={handleSearching}
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
							onClick={handleSearching}
							aria-label="search">
							<SearchIcon />
						</IconButton>
				</Paper>
				<Paper
				>
					{searching &&
						<>
							<Grid container spacing={4}
								style={{
									padding: '.5rem 1rem',
								}}
							>
								<Grid item xs={12} sm container
									style={{
										cursor: 'pointer'
									}}
								>
									<Grid item xs container direction="column" spacing={2}>
										<Grid item xs>
											<Typography gutterBottom variant="subtitle1" component="div">
												<b>
													{'Nombre Comercio: '}
												</b>
												1000pagos
											</Typography>
											<Typography gutterBottom variant="subtitle1" component="div">
												<b>
													{'Nombre Cliente: '}
												</b>
													Armando No Rivas
											</Typography>
											<Typography variant="body2" color="secondary">
												<b>{'Code: '}</b> 
												{search}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</>
					}
				</Paper>
			</div>
		</AnimationModal>
	);
};

export default ListFms;

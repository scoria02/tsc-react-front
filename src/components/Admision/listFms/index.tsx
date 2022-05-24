import SearchIcon from '@mui/icons-material/Search';
import { Grid, IconButton, InputBase, Paper, Typography } from '@mui/material';
import AnimationModal from 'components/modals/AnimationModal';
import { SocketContext } from 'context/SocketContext';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { SocketContext } from 'context/SocketContext';
import { CloseModalListSolic } from 'store/actions/ui';
import { useStyles } from './styles';

const ListFms: React.FC = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { socket } = useContext(SocketContext);

	const [search, setSearch] = useState<string>('');
	const [searching, setSearching] = useState<boolean>(false);

	const [fm, setFm] = useState<any>({
		email: '',
		name: '',
		last: '',
		ci: '',
		code: '',
	});

	const { modalOpenListSolic } = useSelector((state: any) => state.ui);
	//const { user } = useSelector((state: any) => state.auth);

	//const { socket } = useContext(SocketContext);

	const handleClose = () => {
		dispatch(CloseModalListSolic());
		//dispatch(clean());
	};

	const handleSearching = (e: any) => {
		e.preventDefault();
		//console.log(search);
		socket.emit('cliente:coleado', search, (data: any) => {
			//console.log('data del boton', data);
			if (data) {
				setFm({
					email: data.email,
					name: data.name,
					last: data.last_name,
					ci: data.ident_num,
					code: data.requests[0].code,
				});
				setSearching(true);
			}
		});
	};

	const handleSelect = () => {
		//socket.emit('cliente:coleado',search)
	};

	return (
		<AnimationModal openModal={modalOpenListSolic} handleCloseModal={handleClose}>
			<div className={classes.root}>
				<Paper component='form' style={{ width: '100%' }} onSubmit={handleSearching}>
					<InputBase
						style={{
							padding: '10px',
							width: '80%',
						}}
						placeholder='Buscar FM'
						name='search'
						onChange={(event: any) => setSearch(event.target.value)}
						value={search}
						inputProps={{ 'aria-label': '' }}
					/>
					<IconButton onClick={handleSearching} aria-label='search'>
						<SearchIcon />
					</IconButton>
				</Paper>
				<Paper>
					{searching && (
						<>
							<Grid
								container
								spacing={4}
								onClick={handleSelect}
								style={{
									padding: '.5rem 1rem',
								}}>
								<Grid
									item
									xs={12}
									sm
									container
									style={{
										cursor: 'pointer',
									}}>
									<Grid item xs container direction='column' spacing={2}>
										<Grid item xs>
											<Typography gutterBottom variant='subtitle1' component='div'>
												<b>{'Correo: '}</b>
												{fm.email}
											</Typography>
											<Typography gutterBottom variant='subtitle1' component='div'>
												<b>{'Nombre Cliente: '}</b>
												{`${fm.name} ${fm.last}`}
											</Typography>
											<Typography variant='body2' color='secondary'>
												<b>{'Code: '}</b>
												{fm.code}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</>
					)}
				</Paper>
				<p
					style={{
						marginTop: '1.5rem',
						marginBottom: 0,
						padding: '.2rem',
					}}>
					Puede Buscar por: Correo, Cedula, Rif, Codigo FM
				</p>
			</div>
		</AnimationModal>
	);
};

export default ListFms;

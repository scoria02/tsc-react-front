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
	/*
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
	 */

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
					>
						<InputBase
							style={{
								padding: '10px'
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
			</div>
		</AnimationModal>
	);
};

export default ListFms;

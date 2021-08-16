import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { BackOfficeScreen } from '../backoffice/BackOfficeScreen';
import { Grid } from '@material-ui/core';
import { SolicitudesEnEspera } from '../backoffice/SolicitudesEnEspera';
import { DiagramaBarra } from '../backoffice/DiagramaBarra';
import { DiagramaTorta } from '../backoffice/DiagramaTorta';
import { SolicitudesEnProceso } from '../backoffice/SolicitudesEnProceso';
import { SolicitudesTerminadas } from '../backoffice/SolicitudesTerminadas';
import DraftsIcon from '@material-ui/icons/Drafts';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function MilpagosScreen() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
		console.log(index);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						1000Pagos
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />

				<List component='nav' aria-label='main mailbox folders'>
					<ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary='Inbox' />
					</ListItem>
					<ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
						<ListItemIcon>
							<DraftsIcon />
						</ListItemIcon>
						<ListItemText primary='Drafts' />
					</ListItem>
				</List>
				<Divider />
				<List component='nav' aria-label='secondary mailbox folder'>
					<ListItem button selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
						<ListItemText primary='Trash' />
					</ListItem>
					<ListItem button selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
						<ListItemText primary='Spam' />
					</ListItem>
				</List>
				<Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{/* Componentes principales del BackOffice */}
				<div className='backoffice__main-content'>
					<div className='backoffice__list-content'>
						<BackOfficeScreen />
					</div>
					<div className='backoffice__block1-content '>
						<Grid
							container
							direction='column'
							justifyContent='center'
							alignItems='center'
							className='backoffice__block1-columna'>
							<DiagramaBarra />
						</Grid>
						<Grid
							container
							direction='column'
							justifyContent='center'
							alignItems='center'
							className='backoffice__block1-columna '>
							<SolicitudesEnEspera />
						</Grid>
						<Grid
							container
							direction='column'
							justifyContent='center'
							alignItems='center'
							className='backoffice__block1-columna '>
							<SolicitudesEnProceso />
						</Grid>
					</div>
					<div className='backoffice__block2-content'>
						<Grid
							container
							direction='column'
							justifyContent='center'
							alignItems='center'
							className='backoffice__block1-columna'>
							<DiagramaTorta />
						</Grid>
						<Grid
							container
							direction='column'
							justifyContent='center'
							alignItems='center'
							className='backoffice__block1-columna '>
							<SolicitudesTerminadas />
						</Grid>
						<Grid
							container
							direction='column'
							justifyContent='center'
							alignItems='center'
							className='backoffice__block1-columna '></Grid>
					</div>
				</div>
			</main>
		</div>
	);
}

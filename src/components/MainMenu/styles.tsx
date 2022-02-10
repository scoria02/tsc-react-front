import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		zIndex: `${theme.zIndex.drawer + 1} !important`,
		transition: `${theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})} !important`,
	},
	appBarShift: {
		marginLeft: `${drawerWidth}px !important`,
		width: `calc(100% - ${drawerWidth}px) !important`,
		transition: `${theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		})} !important`,
	},
	menuButton: {
		marginRight: 36,
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	hide: {
		display: 'none',
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	grow: {
		flexGrow: 1,
	},
	userName: {
		display: 'none',
		padding: '1rem',
		paddingRight: '0',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: `${drawerWidth + 1}px !important`,
		transition: `${theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		})} !important`,
	},
	drawerClose: {
		transition: `${theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})} !important`,
		overflowX: `hidden`,
		width: `${theme.spacing(7)} !important`,
		[theme.breakpoints.up('sm')]: {
			// width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	link: {
		textDecoration: 'none',
		// color: theme.palette.primary.contrastText,
	},
	img: {
		'& img': {
			maxWidth: 176,
		},
	},
	icon: {
		minWidth: `40px !important`,
	},
	avatarLetter: {
		textTransform: 'uppercase',
		backgroundColor: theme.palette.primary.light,
	},
}));

export default useStyles;

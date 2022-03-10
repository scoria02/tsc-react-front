import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CobranzaContext } from 'context/CobranzaContext';
import { FC, useState } from 'react';
import Completed from './views/Completed';
import Pending from './views/Pending';

export const useStyles = makeStyles((theme: Theme) => ({
	red: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.error.light} !important`,
		},
	},
	yellow: {
		backgroundColor: theme.palette.warning.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.warning.light} !important`,
		},
	},
	green: {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.success.light} !important`,
		},
	},
	selected: {
		backgroundColor: `${theme.palette.info.main} !important`,
		color: theme.palette.info.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.info.light} !important`,
		},
	},
	wrapper: {
		flexGrow: 1,
	},
	tabPanel: {
		padding: '16px 16px 0',
	},
	tabLabel: {
		fontWeight: 'bold',
		fontSize: '0.85rem',
	},
	containerFlex: {},
}));

const Cobranza: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('pending');
	const [rowSelected, setRow] = useState({});

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	// useEffect(() => {
	// 	console.log('rowSelected 1', rowSelected);
	// }, [rowSelected]);

	return (
		<CobranzaContext.Provider value={{ rowSelected, setRow }}>
			<div className={classes.wrapper}>
				<TabContext value={tab}>
					<TabList
						// centered
						onChange={handleChange}
						aria-label='lab API tabs example'
						indicatorColor='primary'
						textColor='primary'>
						<Tab label='Solicitudes Por Cobrar' value={'pending'} wrapped classes={{ root: classes.tabLabel }} />
						<Tab label='Solicitudes Completas' value={'completed'} wrapped classes={{ root: classes.tabLabel }} />
					</TabList>
					<TabPanel value={'pending'} classes={{ root: classes.tabPanel }}>
						<Pending />
					</TabPanel>
					<TabPanel value={'completed'} classes={{ root: classes.tabPanel }}>
						<Completed />
					</TabPanel>
				</TabContext>
			</div>
		</CobranzaContext.Provider>
	);
};

export default Cobranza;

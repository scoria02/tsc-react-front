import { Tab } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { FC, useEffect, useState } from 'react';
import { CobranzaContext } from '../../context/CobranzaContext';
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

	useEffect(() => {
		console.log('rowSelected 1', rowSelected);
	}, [rowSelected]);

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

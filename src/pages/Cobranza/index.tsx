import { Tab } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { FC, useState } from 'react';
import Completed from './views/Completed';
import Pending from './views/Pending';

const useStyles = makeStyles((styles: Theme) => ({
	wrapper: {
		flexGrow: 1,
	},
	tabPanel: {
		padding: 16,
	},
}));

const Cobranza: FC = () => {
	const classes = useStyles();
	const [value, setValue] = useState('one');

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue);
	};

	return (
		<div className={classes.wrapper}>
			<TabContext value={value}>
				<TabList
					onChange={handleChange}
					aria-label='lab API tabs example'
					// centered
					indicatorColor='primary'
					textColor='primary'>
					<Tab label='Solicitudes Por Cobrar' value={'pending'} wrapped />
					<Tab label='Solicitudes Completas' value={'completed'} wrapped />
				</TabList>
				<TabPanel value={'pending'} classes={{ root: classes.tabPanel }}>
					<Pending />
				</TabPanel>
				<TabPanel value={'completed'} classes={{ root: classes.tabPanel }}>
					<Completed />
				</TabPanel>
			</TabContext>
		</div>
	);
};

export default Cobranza;

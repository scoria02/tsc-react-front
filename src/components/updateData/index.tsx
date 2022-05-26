import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC, useState } from 'react';
import CommerceList from './commerce';

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
		textTransform: 'none',
		fontSize: '0.85rem',
	},
	containerFlex: {},
}));

const UpdataData: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('commerce');

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	return (
		<div className={classes.wrapper}>
			<TabContext value={tab}>
				<TabList
					// centered
					onChange={handleChange}
					aria-label='lab API tabs example'
					indicatorColor='primary'
					textColor='primary'>
					<Tab
						sx={{
							textTransform: 'none',
							fontSize: '1rem',
						}}
						label='Comercios'
						value={'commerce'}
						wrapped
						classes={{ root: classes.tabLabel }}
					/>
				</TabList>
				<TabPanel value={'commerce'} classes={{ root: classes.tabPanel }}>
					<CommerceList />
				</TabPanel>
			</TabContext>
		</div>
	);
};

export default UpdataData;

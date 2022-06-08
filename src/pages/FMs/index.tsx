import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import LoaderLine from 'components/loaders/LoaderLine';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { FC, useState, useLayoutEffect, useEffect } from 'react';
import { sxStyled, useStyles } from 'pages/Terminales/styles/styles';
//import ListTerminals from './components/ListTerminals';
//import ListCommerce from './components/ListCommerce';
import Swal from 'sweetalert2';
import { fms } from './services';
import ListSolicitudes from './components/ListFms';

const FMS: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('solics');
	const [listFms, setListFms] = useState([]);
	const [listCommerces, setListCommerces] = useState([]);

	const getListFms = async () => {
		const res: any = await fms.getAllListFms();
		console.log(res.solicitudes);
		//Swal.close();
		if (res.ok && res.solicitudes.length) {
			Swal.close();
			setListFms(res.solicitudes);
		}
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	useLayoutEffect(() => {
		getListFms();
	}, []);

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	return (
		<div className={classes.wrapper}>
			<TabContext value={tab}>
				<TabList
					onChange={handleChange}
					aria-label='lab API tabs example'
					indicatorColor='primary'
					textColor='primary'>
					<Tab
						sx={sxStyled.tabName}
						label='Solicitudes'
						value={'solics'}
						wrapped
						classes={{ root: classes.tabLabel }}
					/>
				</TabList>
				<>
					<TabPanel value={'solics'} classes={{ root: classes.tabPanel }}>
						{listFms.length ? <ListSolicitudes listFms={listFms} /> : <LoaderLine />}
					</TabPanel>
				</>
			</TabContext>
		</div>
	);
};

export default FMS;

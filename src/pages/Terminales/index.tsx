import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import LoaderLine from 'components/loaders/LoaderLine';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import { FC, useState, useLayoutEffect, useEffect } from 'react';
import { sxStyled, useStyles } from './styles/styles';
import ListTerminals from './components/ListTerminals';
import ListCommerce from './components/ListCommerce';
import Swal from 'sweetalert2';
import { handleLoadingSearch } from 'utils/handleSwal';
import { activacion } from './services';

const Seguridad: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('');
	const [listTerminales, setListTerminales] = useState([]);
	const [listCommerces, setListCommerces] = useState([]);

	const getListTerminals = async () => {
		const res: any = await activacion.getAllListTerminals();
		console.log(res.terminals);
		//Swal.close();
		if (res.ok && res.terminals.length) {
			Swal.close();
			setListTerminales(res.terminals);
		}
	};

	const getListCommerces = async () => {
		const res: any = await activacion.getAllListCommerces();
		//Swal.close();
		console.log(res);
		if (res.ok && res.commerces.length) {
			Swal.close();
			setListCommerces(res.commerces);
		}
	};

	useEffect(() => {
		if (tab === 'terminal' && !listTerminales.length) {
			handleLoadingSearch();
			console.log('buscar terminales');
			getListTerminals();
		}
		if (tab === 'commerce' && !listCommerces.length) {
			handleLoadingSearch();
			console.log('buscar comercio');
			getListCommerces();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	useLayoutEffect(() => {
		Swal.fire({
			icon: 'question',
			title: 'Buscar lista de: ',
			showDenyButton: true,
			//showCancelButton: true,
			confirmButtonText: 'Comercios',
			denyButtonText: 'Terminales',
			allowOutsideClick: false,
			allowEscapeKey: false,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				Swal.fire('Comercio', '', 'success');
				setTab('commerce');
			} else if (result.isDenied) {
				Swal.fire('Terminal', '', 'info');
				setTab('terminal');
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
						label='Terminales'
						value={'terminal'}
						wrapped
						classes={{ root: classes.tabLabel }}
					/>
					<Tab
						sx={sxStyled.tabName}
						label='Comercios'
						value={'commerce'}
						wrapped
						classes={{ root: classes.tabLabel }}
					/>
				</TabList>
				{tab && (
					<>
						<TabPanel value={'terminal'} classes={{ root: classes.tabPanel }}>
							{listTerminales.length ? <ListTerminals terminals={listTerminales} /> : <LoaderLine />}
						</TabPanel>
						<TabPanel value={'commerce'} classes={{ root: classes.tabPanel }}>
							{listCommerces.length ? <ListCommerce commerces={listCommerces} /> : <LoaderLine />}
						</TabPanel>
					</>
				)}
			</TabContext>
		</div>
	);
};

export default Seguridad;

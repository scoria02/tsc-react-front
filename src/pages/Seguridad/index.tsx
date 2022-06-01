import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import EditarPermisos from 'components/seguridad/editarPermisos';
import GestionUsuarios from 'components/seguridad/editarUsuarios';
import { FC, useState } from 'react';
import { sxStyled, useStyles } from './styles';

const Seguridad: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('gestionUsuarios');

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
						sx={sxStyled.tabName}
						label='Gestion de Usuarios'
						value={'gestionUsuarios'}
						wrapped
						classes={{ root: classes.tabLabel }}
					/>
					<Tab
						sx={sxStyled.tabName}
						label='Permisos'
						value={'gestionPermisos'}
						wrapped
						classes={{ root: classes.tabLabel }}
					/>
				</TabList>
				<TabPanel value={'gestionUsuarios'} classes={{ root: classes.tabPanel }}>
					<GestionUsuarios />
				</TabPanel>
				<TabPanel value={'gestionPermisos'} classes={{ root: classes.tabPanel }}>
					<EditarPermisos />
				</TabPanel>
			</TabContext>
		</div>
	);
};

export default Seguridad;

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import LoaderLine from 'components/loaders/LoaderLine';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import EditarPermisos from 'components/seguridad/editarPermisos';
import GestionUsuarios from 'components/seguridad/editarUsuarios';
import { FC, useState, useLayoutEffect } from 'react';
import { editPermisos } from 'services/seguridad/permisos';
import { sxStyled, useStyles } from './styles';
import EditarViews from 'components/seguridad/editarViews';

const Seguridad: FC = () => {
	const classes = useStyles();
	const [tab, setTab] = useState('gestionUsuarios');
	const [listDepartment, setListDepartment] = useState([]);
	const [listRoles, setListRoles] = useState([]);

	const getList = async () => {
		const res: any = await editPermisos.getAllListSeguridad();
		console.log(res);
		if (res.departments.length) {
			setListDepartment(res.departments);
		}
		if (res.roles.length) {
			setListRoles(res.roles);
		}
	};

	useLayoutEffect(() => {
		if (!listDepartment.length || !listRoles) getList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: any, newValue: any) => {
		setTab(newValue);
	};

	return (
		<div className={classes.wrapper}>
			{!listDepartment.length || !listRoles ? (
				<LoaderLine />
			) : (
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
						<Tab
							sx={sxStyled.tabName}
							label='Vistas'
							value={'gestionViews'}
							wrapped
							classes={{ root: classes.tabLabel }}
						/>
					</TabList>
					<TabPanel value={'gestionUsuarios'} classes={{ root: classes.tabPanel }}>
						<GestionUsuarios listDepartment={listDepartment} listRoles={listRoles} />
					</TabPanel>
					<TabPanel value={'gestionPermisos'} classes={{ root: classes.tabPanel }}>
						<EditarPermisos listDepartment={listDepartment} listRoles={listRoles} />
					</TabPanel>
					<TabPanel value={'gestionViews'} classes={{ root: classes.tabPanel }}>
						<EditarViews listDepartment={listDepartment} />
					</TabPanel>
				</TabContext>
			)}
		</div>
	);
};

export default Seguridad;

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import LoaderLine from 'components/loaders/LoaderLine';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import EditarPermisos from 'pages/Seguridad/components/editarPermisos';
import GestionUsuarios from 'pages/Seguridad/components/editarUsuarios';
import { FC, useState, useLayoutEffect } from 'react';
import { editPermisos } from 'pages/Seguridad/services/permisos';
import { sxStyled, useStyles } from './styles';
import EditarViews from 'pages/Seguridad/components/editarViews';

//redux
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const Seguridad: FC = () => {
	const { permiss }: any = useSelector((state: RootState) => state.auth.user);
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
						{permiss['Editar Permisos'] && (
							<Tab
								sx={sxStyled.tabName}
								label='Permisos'
								value={'gestionPermisos'}
								wrapped
								classes={{ root: classes.tabLabel }}
							/>
						)}
						{permiss['Editar Vistas'] && (
							<Tab
								sx={sxStyled.tabName}
								label='Vistas'
								value={'gestionViews'}
								wrapped
								classes={{ root: classes.tabLabel }}
							/>
						)}
					</TabList>
					<TabPanel value={'gestionUsuarios'} classes={{ root: classes.tabPanel }}>
						<GestionUsuarios listDepartment={listDepartment} listRoles={listRoles} />
					</TabPanel>
					{permiss['Editar Permisos'] && (
						<TabPanel value={'gestionPermisos'} classes={{ root: classes.tabPanel }}>
							<EditarPermisos listDepartment={listDepartment} listRoles={listRoles} />
						</TabPanel>
					)}
					{permiss['Editar Vistas'] && (
						<TabPanel value={'gestionViews'} classes={{ root: classes.tabPanel }}>
							<EditarViews listDepartment={listDepartment} />
						</TabPanel>
					)}
				</TabContext>
			)}
		</div>
	);
};

export default Seguridad;

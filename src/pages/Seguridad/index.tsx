import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import LoaderLine from 'components/loaders/LoaderLine';
import TabPanel from '@mui/lab/TabPanel';
import { Tab } from '@mui/material';
import EditarPermisos from 'pages/Seguridad/components/editarPermisos';
import GestionUsuarios from 'pages/Seguridad/components/editarUsuarios';
import { FC, useState, useLayoutEffect, useContext, useEffect } from 'react';
import { seguridad } from 'pages/Seguridad/services/permisos';
import { sxStyled, useStyles } from './styles';
import EditarViews from 'pages/Seguridad/components/editarViews';

//redux
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import EditarDepartments from './components/editarDepartments';
import { Department, Roles } from './interfaces';
import { SocketContext } from 'context/SocketContext';

const Seguridad: FC = () => {
	const { permiss }: any = useSelector((state: RootState) => state.auth.user);
	const classes = useStyles();
	const [tab, setTab] = useState('gestionUsuarios');
	const [listDepartment, setListDepartment] = useState<Department[] | []>([]);
	const [listRoles, setListRoles] = useState<Roles[] | []>([]);
	const [allUser, setUsers] = useState<any[]>([]);

	const { socket } = useContext(SocketContext);

	const getData = async () => {
		const res: any = await seguridad.getAllUser();
		if (res.ok) {
			setUsers(res.users);
		}
	};

	const getList = async () => {
		const res: any = await seguridad.getAllListSeguridad();
		//console.log(res);
		if (res.departments.length) {
			setListDepartment(res.departments);
		}
		if (res.roles.length) {
			setListRoles(res.roles);
		}
	};

	useLayoutEffect(() => {
		getList();
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		socket.on('server:reloadWorkers', () => {
			getData();
		});
	}, [socket]);

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
								label='Modulos'
								value={'gestionViews'}
								wrapped
								classes={{ root: classes.tabLabel }}
							/>
						)}
						{permiss['Crear Departamento'] && (
							<Tab
								sx={sxStyled.tabName}
								label='Departamentos'
								value={'gestionDepartments'}
								wrapped
								classes={{ root: classes.tabLabel }}
							/>
						)}
					</TabList>
					<TabPanel value={'gestionUsuarios'} classes={{ root: classes.tabPanel }}>
						<GestionUsuarios listDepartment={listDepartment} listRoles={listRoles} allUser={allUser} />
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
					{permiss['Crear Departamento'] && (
						<TabPanel value={'gestionDepartments'} classes={{ root: classes.tabPanel }}>
							<EditarDepartments listDepartment={listDepartment} setListDepartment={setListDepartment} />
						</TabPanel>
					)}
				</TabContext>
			)}
		</div>
	);
};

export default Seguridad;

import { Select } from '@material-ui/core';
import BackUpIcon from '@mui/icons-material/Backup';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Tooltip } from '@mui/material';
import classNames from 'classnames';
import { FC, useContext, useEffect } from 'react';
import FMDataContext from '../../../context/FM/fmAdmision/FmContext';
import ImagesFmContext from '../../../context/FM/fmImages/ImagesFmContext';
import LocationsContext from '../../../context/FM/Location/LocationsContext';
import { recaudo } from '../../utilis/recaudos';
import { useStylesFM } from '../styles';

const typesSolicts = [
	{
		id: 0,
		name: 'Persona Natural',
		steps: [
			'client',
			'commerce', //cambiar list docu ident client + un digito,foto va,Contriu no va, acta no va
			'pos',
		],
	},
	{
		id: 1,
		name: 'Persona Juridica',
		steps: [
			'client',
			'commerce', //J obligura, comercio acta constitu,
			'pos',
		],
	},
	{
		id: 2,
		name: 'Firma Personal',
		steps: ['client', 'commerce', 'actaConst', 'pos'],
		//normal, comercio acta constitu,
	},
	{
		id: 3,
		name: 'Punto/Pos Extra',
		steps: ['client-commerce', 'pos'],
	},
];

const StepBase: FC = () => {
	const classes = useStylesFM();

	const { typeSolict, handleTypeSolict, resetFm } = useContext(FMDataContext);
	const { resetListLocaitons } = useContext(LocationsContext);
	const { imagePlanilla, handleChangePlanilla, removePlanilla, resetImages } = useContext(ImagesFmContext);

	useEffect(() => {
		resetFm();
		resetListLocaitons();
		resetImages();
	}, [typeSolict]);

	return (
		<div className='ed-container container-formMaldito'>
			<div className='container-form'>
				<div
					style={{
						marginTop: '5rem',
					}}
					className={classNames(classes.input, classes.daysCB)}>
					<FormControl fullWidth variant='outlined' className={classes.inputSelectSolict}>
						<InputLabel>Solicitudes</InputLabel>
						<Select
							value={typeSolict}
							onChange={(e) => handleTypeSolict(e.target.value as number)}
							name='typeSolict'
							label='TipoSolict'>
							{typesSolicts.map((item: any) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<div className={classes.containerBtn} style={{ marginTop: '2rem' }}>
						<b>Cargar la planilla digitalizada</b>
						<Button
							className={classes.imgIdent}
							variant='contained'
							style={{
								background: imagePlanilla ? '#5c62c5' : '#f44336',
							}}
							component='label'>
							<IconButton aria-label='upload picture' component='span'>
								{imagePlanilla ? <CheckCircleIcon /> : <BackUpIcon />}
							</IconButton>
							<input type='file' hidden name='rc_planilla' accept={recaudo.acc} onChange={handleChangePlanilla} />
						</Button>
						{imagePlanilla ? (
							<Button
								className={classes.imgIdent}
								variant='contained'
								onClick={removePlanilla}
								color='secondary'
								style={{
									marginLeft: '10px',
									width: '20px',
								}}
								component='label'>
								<Tooltip title='Borrar Planilla'>
									<IconButton aria-label='upload picture' component='span'>
										<ClearIcon />
									</IconButton>
								</Tooltip>
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepBase;

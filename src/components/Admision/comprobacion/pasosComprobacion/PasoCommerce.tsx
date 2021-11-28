import TextField from '@material-ui/core/TextField';
//Redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

export default function PasoUno() {
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const classes = useStyles();

	return (
		<>
		<form className="container-step" noValidate autoComplete='off' style={{ marginTop: '1rem' }}>
			<div className={classes.btn_stepM}>
				<TextField 
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Nombre del Comercio'
					variant='outlined'
					value={fm.id_commerce.name}
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Numero ID'
					variant='outlined'
					value={`${fm.id_commerce.id_ident_type.name} ${fm.id_commerce.ident_num}`}
				/>
			</div>
			<div className={classes.btn_stepM}>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Estado'
					value={fm.id_commerce.id_location.id_estado.estado}
					variant='outlined'
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Ciudad'
					value={fm.id_commerce.id_location.id_ciudad.ciudad}
					variant='outlined'
				/>
			</div>
			<div className={classes.btn_stepM}>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Municipio'
					value={fm.id_commerce.id_location.id_municipio.municipio}
					variant='outlined'
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Parroquia'
					value={fm.id_commerce.id_location.id_parroquia.parroquia}
					variant='outlined'
				/>
			</div>
			<div className={classes.btn_stepM}>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Cod. Postal'
					value={fm.id_commerce.id_location.id_ciudad.postal_code}
					variant='outlined'
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Sector'
					value={fm.id_commerce.id_location.sector}
					variant='outlined'
				/>
			</div>
			<div className={classes.btn_stepM}>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Calle'
					value={fm.id_commerce.id_location.calle}
					variant='outlined'
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Local'
					value={fm.id_commerce.id_location.local}
					variant='outlined'
				/>
			</div>
		</form>
		</>
	);
}

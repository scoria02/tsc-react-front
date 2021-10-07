import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
		<form className="container-step" noValidate autoComplete='off'>
			<div className={classes.btn_stepM}>
				<TextField 
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Nombre Completo'
					variant='outlined'
					value={fm.name_commerce}
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Numero ID'
					variant='outlined'
					value={`${fm.ident_type_commerce} ${fm.ident_num_commerce}`}
				/>
			</div>
			<div className={classes.btn_stepM}>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Estado'
					value={fm.estado_commerce}
					variant='outlined'
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Ciudad'
					value={fm.ciudad_commerce}
					variant='outlined'
				/>
			</div>
			<div className={classes.btn_stepM}>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Municipio'
					value={fm.municipio_commerce}
					variant='outlined'
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Parroquia'
					value={fm.parroquia_commerce}
					variant='outlined'
				/>
			</div>
			<div className={classes.btn_stepM}>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Sector'
					value={fm.sector_commerce}
					variant='outlined'
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Calle'
					value={fm.calle_commerce}
					variant='outlined'
				/>
			</div>
			<div className={classes.btn_stepM}>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Local'
					value={fm.local_commerce}
					variant='outlined'
				/>
				<TextField
					className={classes.btn_stepT}
					id='outlined-basic'
					label='Cod. Postal'
					value={'codigo postal'}
					variant='outlined'
				/>
			</div>
		</form>
	);
}

//Redux
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import './styles/pasos.scss';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import { useStyles } from './styles/styles';
import { useContext } from 'react';

export default function PasoUno() {
	const classes = useStyles();

	const { fm, disabled, handleChangeCommerce, imagesForm, handleChangeImages, deleteImg, pathImages } =
		useContext(FMDiferidoContext);

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off' style={{ marginTop: '1rem' }}>
				<div className={classes.btn_stepM}>
					<TextField
						disabled={disabled}
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Nombre del Comercio'
						variant='outlined'
						value={fm.id_commerce.name}
						name='name'
						onChange={handleChangeCommerce}
					/>
					<TextField
						disabled={disabled}
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Numero ID'
						variant='outlined'
						name='ident_num'
						onChange={(e: any) => {
							e.target.value = e.target.value.slice(2, e.target.value.length);
							handleChangeCommerce(e);
						}}
						value={`${fm.id_commerce.id_ident_type.name} ${fm.id_commerce.ident_num}`}
					/>
				</div>
				<div className={classes.btn_stepM}>
					<TextField
						disabled={disabled}
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Estado'
						value={fm.id_commerce.id_location.id_estado.estado}
						variant='outlined'
					/>
					<TextField
						disabled={disabled}
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Ciudad'
						value={fm.id_commerce.id_location.id_ciudad.ciudad}
						variant='outlined'
					/>
				</div>
				<div className={classes.btn_stepM}>
					<TextField
						disabled={disabled}
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Municipio'
						value={fm.id_commerce.id_location.id_municipio.municipio}
						variant='outlined'
					/>
					<TextField
						disabled={disabled}
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Parroquia'
						value={fm.id_commerce.id_location.id_parroquia.parroquia}
						variant='outlined'
					/>
				</div>
				<div className={classes.btn_stepM}>
					<TextField
						disabled={disabled}
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Cod. Postal'
						value={fm.id_commerce.id_location.id_ciudad.postal_code}
						variant='outlined'
					/>
					<TextField
						disabled={disabled}
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Sector'
						value={fm.id_commerce.id_location.sector}
						variant='outlined'
					/>
				</div>
				<div className={classes.btn_stepM}>
					<TextField
						disabled={disabled}
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Calle'
						value={fm.id_commerce.id_location.calle}
						variant='outlined'
					/>
					<TextField
						disabled={disabled}
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

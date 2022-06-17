import { Button, TextField } from '@mui/material';
import classNames from 'classnames';
import RecPdf from 'components/images/RecPdf';
import { FC, useContext, useState } from 'react';
//sytles
import { sxStyled, useStylesFM } from '../styles';
import FMContextData from 'context/FM/FMContextData';
//import Swal from 'sweetalert2';
import '../../../../utils/swal.scss';

const StepCommerce: FC = () => {
	const classes = useStylesFM();

	const { handleExistStep, handleChangeStep, commerce, locationCommerce } = useContext(FMContextData);

	const [load, setLoad] = useState(false);
	const imagen = `${process.env.REACT_APP_API_IMAGES}/${commerce?.rc_rif?.path}`;

	/*
	const handleTMS7Commerce = () => {
		Swal.fire({
			title: 'Buscar si existe en TMS7',
			html: `<p>Esto puede tardar <b>unos minutos</b></p>`,
			confirmButtonText: 'Buscar',
			showCancelButton: true,
			cancelButtonColor: '#d33',
			allowOutsideClick: false,
			allowEscapeKey: false,
			customClass: { container: 'swal2-validated' },
		}).then((confirm) => {
			if (confirm.isConfirmed) {
				//console.log('xd');
			}
		});
	};
	*/

	return (
		<div className={classes.grid}>
			<div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							className={classes.inputText}
							type='text'
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Nombre del Comercio'
							autoComplete='off'
							name='email'
							value={commerce?.name}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputText}
							variant='outlined'
							label='Rif'
							autoComplete='off'
							name='ident_num'
							value={`${commerce?.id_ident_type.name} ${commerce?.ident_num}`}
						/>
					</div>
				</div>
				<div className={classes.input}>
					<TextField
						className={classes.inputText}
						variant='outlined'
						label='Actividad Comercial'
						name='activity'
						value={commerce?.id_activity.name}
					/>
				</div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Estado'
							name='Estado'
							value={locationCommerce?.id_direccion.estado}
						/>
						<TextField
							className={classNames(classes.inputText)}
							variant='outlined'
							label='Municipio'
							name='municipio'
							value={locationCommerce?.id_direccion.municipio}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Ciudad'
							name='ciudad'
							value={locationCommerce?.id_direccion.ciudad}
						/>
						<TextField
							className={classNames(classes.inputText)}
							variant='outlined'
							label='Parroquia'
							name='parroquia'
							value={locationCommerce?.id_direccion.parroquia}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Cod. Postal'
							name='codigo_postal'
							value={locationCommerce?.id_direccion?.codigoPostal}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							label='Sector'
							name='sector'
							value={locationCommerce?.id_direccion?.sector}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Calle'
							name='calle'
							value={locationCommerce?.calle}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							label='Casa/Quinta/Apart'
							name='local'
							value={locationCommerce?.local}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputText}
							type='text'
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Creado en 1000pagos'
							autoComplete='off'
							name='aplicativo1000pagos'
							value={commerce?.codComer_1000pagos ? 'Si' : 'No'}
						/>
						<div className={classes.input}></div>
					</div>
					<div className={classes.input}>
						{/* 
						<Button
							sx={{
								mr: 2,
								textTransform: 'none',
							}}
							size='large'
							variant='contained'
							onClick={handleTMS7Commerce}
							color='primary'>
							TMS7
						</Button>
						*/}
					</div>
					{handleExistStep('Acta Const.') ? (
						<Button
							sx={{
								mr: 2,
								textTransform: 'none',
							}}
							size='large'
							variant='outlined'
							onClick={() => handleChangeStep('Acta Const.')}
							color='success'>
							Acta Constitutiva
						</Button>
					) : null}
					{handleExistStep('Cont. Especial') ? (
						<Button
							sx={{
								mr: 2,
								textTransform: 'none',
							}}
							size='large'
							variant='outlined'
							onClick={() => handleChangeStep('Cont. Especial')}
							color='success'>
							Contribuyente Especial
						</Button>
					) : null}
				</div>
			</div>
			<div className={classes.validRecaudo}>
				<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
			</div>
		</div>
	);
};

export default StepCommerce;

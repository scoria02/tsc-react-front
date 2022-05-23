import { TextField, Stack, Alert } from '@mui/material';
import classNames from 'classnames';
import { FC, useContext, useState } from 'react';
//sytles
import { sxStyled, useStylesFM } from '../styles';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import RecDifPdf from 'components/utilis/images/RecDifPdf';

const DifStepPos: FC = () => {
	const classes = useStylesFM();

	const {
		solic,
		client,
		locationPos,
		phones,
		handleChangeClientPhone,
		disabled,
		handleChangeClient,
		imagesForm,
		handleChangeImages,
		pathImages,
		handleChange,
		handleChangeRefClient,
		listValidated,
	} = useContext(FMDiferidoContext);

	const [load, setLoad] = useState(false);

	return (
		<>
			<div>
				<div className={classes.btn_stepM}>
					<Stack sx={{ width: '50%' }} spacing={2}>
						<Alert severity={disabled ? 'success' : 'error'}>
							{listValidated.id_typedif_pos === 2 ? listValidated.valid_pos : 'Error Interno'}
						</Alert>
					</Stack>
				</div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							disabled={disabled}
							required
							type='number'
							variant='outlined'
							label='Numero de Pos'
							name='number_post'
							value={solic.number_post}
							onChange={handleChange}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							label='Origen de la Solicitud'
							name='request_origin'
							value={solic?.id_request_origin.name}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							disabled
							className={classes.inputText}
							variant='outlined'
							label='Pos'
							name='product'
							value={solic.id_product.name}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputText}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Entrega Punto'
							name='discount'
							value={solic.discount ? 'Si' : 'No'}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							label='Metodo de Pago'
							name='payment_method'
							value={solic.id_payment_method.name}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputText}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Tipo de Pago'
							name='type_payment'
							value={solic?.id_type_payment.name}
						/>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							variant='outlined'
							label='Pagadero Destino'
							name='pagadero'
							value={solic?.pagadero ? 'Si' : 'No'}
						/>
					</div>
				</div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							disabled
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							id='standard-required'
							label='Estado'
							name='Estado'
							value={locationPos?.id_estado.estado}
							//value={locationPos.ciudad?.postal_code || ''}
						/>
						<TextField
							disabled
							className={classNames(classes.inputText)}
							variant='outlined'
							required
							id='standard-required'
							label='Municipio'
							name='municipio'
							value={locationPos?.id_municipio.municipio}
							//value={locationPos.ciudad?.postal_code || ''}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							disabled
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							id='standard-required'
							label='ciudad'
							name='ciudad'
							value={locationPos?.id_ciudad.ciudad}
							//value={locationPos.ciudad?.postal_code || ''}
						/>
						<TextField
							disabled
							className={classNames(classes.inputText)}
							variant='outlined'
							required
							id='standard-required'
							label='Parroquia'
							name='parroquia'
							value={locationPos?.id_parroquia.parroquia}
							//value={locationPos.ciudad?.postal_code || ''}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							disabled
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							id='standard-required'
							label='Cod. Postal'
							name='codigo_postal'
							value={locationPos?.id_ciudad?.ciudad}
						/>
						<TextField
							disabled
							className={classes.inputText}
							variant='outlined'
							required
							id='standard-required'
							label='Sector'
							name='sector'
							value={locationPos?.sector}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							disabled
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							id='standard-required'
							label='Calle'
							name='calle'
							value={locationPos?.calle}
						/>
						<TextField
							disabled
							className={classes.inputText}
							variant='outlined'
							required
							id='standard-required'
							label='Casa/Quinta/Apart'
							name='local'
							value={locationPos?.local}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default DifStepPos;

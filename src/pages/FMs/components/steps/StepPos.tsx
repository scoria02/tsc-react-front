import { TextField } from '@mui/material';
import classNames from 'classnames';
import FMContextData from 'context/FM/FMContextData';
import { FC, useContext } from 'react';
//sytles
import { sxStyled, useStylesFM } from '../styles';

const StepPos: FC = () => {
	const classes = useStylesFM();

	const { locationPos, solic } = useContext(FMContextData);

	return (
		<div>
			<div className={classes.grid}>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						type='text'
						variant='outlined'
						label='Numero de Pos'
						name='number_post'
						value={solic.number_post}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						label='Pos'
						name='product'
						value={solic.pos[0].id_product.name}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						label='Pagadero Destino'
						name='pagadero'
						value={solic?.pagadero ? 'Si' : 'No'}
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
						variant='outlined'
						label='Tipo de Pago'
						name='type_payment'
						value={solic?.id_type_payment.name}
					/>
				</div>
			</div>
			<h2
				style={{
					marginTop: 1,
					marginBottom: 1,
					fontSize: '12px',
				}}>
				Ubicacion del Pos
			</h2>
			<div className={classes.grid}>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						label='Estado'
						name='Estado'
						value={locationPos?.id_direccion.estado}
					/>
					<TextField
						className={classNames(classes.inputText)}
						variant='outlined'
						label='Municipio'
						name='municipio'
						value={locationPos?.id_direccion.municipio}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						label='ciudad'
						name='ciudad'
						value={locationPos?.id_direccion.ciudad}
					/>
					<TextField
						className={classNames(classes.inputText)}
						variant='outlined'
						label='Parroquia'
						name='parroquia'
						value={locationPos?.id_direccion.parroquia}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						label='Cod. Postal'
						name='codigo_postal'
						value={locationPos?.id_direccion?.codigoPostal}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						label='Sector'
						name='sector'
						value={locationPos?.id_direccion.sector}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						label='Calle'
						name='calle'
						value={locationPos?.calle}
					/>
					<TextField
						className={classes.inputText}
						variant='outlined'
						label='Casa/Quinta/Apart'
						name='local'
						value={locationPos?.local}
					/>
				</div>
			</div>
		</div>
	);
};

export default StepPos;

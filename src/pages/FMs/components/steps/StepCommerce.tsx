import { TextField } from '@mui/material';
import classNames from 'classnames';
import RecPdf from 'components/images/RecPdf';
import { FC, useContext, useState } from 'react';
//sytles
import { sxStyled, useStylesFM } from '../styles';
import FMContextData from 'context/FM/FMContextData';

const StepCommerce: FC = () => {
	const classes = useStylesFM();

	const { commerce, locationCommerce } = useContext(FMContextData);

	const [load, setLoad] = useState(false);
	const imagen = `${process.env.REACT_APP_API_IMAGES}/${commerce?.rc_rif?.path}`;

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
				</div>
			</div>
			<div className={classes.validRecaudo}>
				<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
			</div>
		</div>
	);
};

export default StepCommerce;

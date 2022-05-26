import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { InputAdornment, Alert, Button, IconButton, Stack, TextField } from '@mui/material';
import classNames from 'classnames';
import React, { FC, useContext, useState } from 'react';
import { recaudo } from 'utils/recaudos';
//sytles
import { sxStyled, useStyles } from './styles/styles';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import UpdateCommerceContext from 'context/UpdateData/Commerce/UpdateCommerceContext';

const StepUpdateCommerce: FC = () => {
	const classes = useStyles();

	const { commerce, locationCommerce, disabled, handleChangeCommerce, imagen, handleChangeImages, pathImages } =
		useContext(UpdateCommerceContext);

	const [load, setLoad] = useState(false);

	const newImagen = imagen.rc_rif
		? pathImages.rc_rif?.path
		: commerce.rc_rif
		? `${process.env.REACT_APP_API_IMAGES}/${commerce.rc_rif.path}`
		: null;

	const typeImagen = imagen.rc_rif ? pathImages.rc_rif.type : null;

	return (
		<div className={classes.grid}>
			<div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							disabled={disabled}
							required
							className={classes.inputText}
							type='text'
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Nombre del Comercio'
							autoComplete='off'
							name='name'
							onChange={handleChangeCommerce}
							value={commerce?.name}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							disabled={disabled}
							className={classes.inputText}
							variant='outlined'
							required
							label='Rif'
							autoComplete='off'
							name='ident_num'
							value={commerce?.ident_num}
							onChange={handleChangeCommerce}
							inputProps={{ maxLength: 10 }}
							InputProps={{
								startAdornment: <InputAdornment position='start'>{commerce?.id_ident_type.name}</InputAdornment>,
							}}
						/>
					</div>
				</div>
				<div className={classes.input}>
					<TextField
						disabled={disabled}
						className={classes.inputText}
						variant='outlined'
						label='Actividad Comercial'
						name='activity'
						//value={commerce?.id_activity.name}
					/>
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
							//value={locationCommerce?.id_direccion.estado}
						/>
						<TextField
							disabled
							className={classNames(classes.inputText)}
							variant='outlined'
							required
							id='standard-required'
							label='Municipio'
							name='municipio'
							//value={locationCommerce?.id_direccion.municipio}
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
							label='Ciudad'
							name='ciudad'
							//value={locationCommerce?.id_direccion.ciudad}
						/>
						<TextField
							disabled
							className={classNames(classes.inputText)}
							variant='outlined'
							required
							id='standard-required'
							label='Parroquia'
							name='parroquia'
							//value={locationCommerce?.id_direccion.parroquia}
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
							//value={locationCommerce?.id_direccion?.codigoPostal}
						/>
						<TextField
							disabled
							className={classes.inputText}
							variant='outlined'
							required
							id='standard-required'
							label='Sector'
							name='sector'
							//value={locationCommerce?.id_direccion.sector}
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
							//value={locationCommerce?.calle}
						/>
						<TextField
							disabled
							className={classes.inputText}
							variant='outlined'
							required
							id='standard-required'
							label='Casa/Quinta/Apart'
							name='local'
							//value={locationCommerce?.local}
						/>
					</div>
				</div>
			</div>
			<div className={classes.validRecaudo}>
				<Button
					className={classes.imgIdent}
					variant='contained'
					disabled={disabled}
					style={{
						background: imagen.rc_rif && !disabled ? '#5c62c5' : '#D3D3D3',
					}}
					component='label'>
					<IconButton aria-label='upload picture' component='span'>
						<PhotoCamera />
					</IconButton>
					<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
				</Button>
				{newImagen && <RecDifPdf load={load} setLoad={setLoad} imagen={newImagen} type={typeImagen} />}
			</div>
		</div>
	);
};

export default StepUpdateCommerce;

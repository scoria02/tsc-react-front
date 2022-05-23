import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Button, IconButton, InputAdornment, TextField, Stack, Alert } from '@mui/material';
import classNames from 'classnames';
import { FC, useContext, useState } from 'react';
import { capitalizedFull } from 'utils/formatName';
import { recaudo } from 'utils/recaudos';
//sytles
import { sxStyled, useStylesFM } from '../styles';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import RecDifPdf from 'components/utilis/images/RecDifPdf';

const DifStepClient: FC = () => {
	const classes = useStylesFM();

	const {
		solic,
		client,
		locationClient,
		phones,
		handleChangeClientPhone,
		disabled,
		handleChangeClient,
		imagesForm,
		handleChangeImages,
		pathImages,
		handleChangeRefClient,
		listValidated,
	} = useContext(FMDiferidoContext);

	const [load, setLoad] = useState(false);

	const imagen = imagesForm.rc_ident_card
		? pathImages.rc_ident_card.path
		: `${process.env.REACT_APP_API_IMAGES}/${client?.rc_ident_card.path}`;

	const typeImagen = imagesForm.rc_ident_card ? pathImages.rc_ident_card.type : null;

	return (
		<>
			<div className={classes.grid}>
				<div>
					<div className={classes.btn_stepM}>
						<Stack sx={{ width: '50%' }} spacing={2}>
							<Alert severity={disabled ? 'success' : 'error'}>
								{listValidated.id_typedif_client === 2 ? listValidated.valid_client : 'Error Interno'}
							</Alert>
						</Stack>
					</div>
					<div className={classes.grid}>
						<div className={classes.input}>
							<TextField
								disabled={disabled}
								required
								sx={sxStyled.inputLeft}
								className={classes.inputText}
								type='email'
								label='Correo'
								autoComplete='off'
								variant='outlined'
								name='email'
								value={client?.email}
								onChange={handleChangeClient}
							/>
						</div>
						<div className={classes.input}>
							<TextField
								disabled={disabled}
								className={classes.inputText}
								variant='outlined'
								required
								label='C.I.'
								autoComplete='off'
								name='ident_num'
								value={client?.ident_num}
								onChange={handleChangeClient}
								inputProps={{ maxLength: 9 }}
								InputProps={{
									startAdornment: <InputAdornment position='start'>{client?.id_ident_type.name}</InputAdornment>,
								}}
							/>
						</div>
						<div className={classes.input}>
							<TextField
								disabled={disabled}
								className={classNames(classes.inputText, classes.inputTextLeft)}
								sx={sxStyled.inputLeft}
								variant='outlined'
								required
								label='Nombre'
								autoComplete='nombre'
								name='name'
								value={client?.name}
								onChange={handleChangeClient}
							/>
							<TextField
								disabled={disabled}
								className={classes.inputText}
								variant='outlined'
								required
								label='Apellido'
								autoComplete='last_name'
								name='last_name'
								value={client?.last_name}
								onChange={handleChangeClient}
							/>
						</div>
						<div className={classes.input}>
							<TextField
								disabled={disabled}
								className={classes.inputText}
								sx={sxStyled.inputLeft}
								variant='outlined'
								required
								label='Telefono'
								name='phone1'
								autoComplete='telefono1'
								onChange={handleChangeClientPhone}
								inputProps={{ maxLength: 10 }}
								value={phones.phone1}
							/>
							<TextField
								disabled={disabled}
								className={classes.inputText}
								variant='outlined'
								required
								label='Telefono'
								name='phone2'
								autoComplete='telefono2'
								onChange={handleChangeClientPhone}
								inputProps={{ maxLength: 10 }}
								value={phones.phone2}
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
								value={locationClient?.id_estado.estado}
								//value={locationClient.ciudad?.postal_code || ''}
							/>
							<TextField
								disabled
								className={classNames(classes.inputText)}
								variant='outlined'
								required
								id='standard-required'
								label='Municipio'
								name='municipio'
								value={locationClient?.id_municipio.municipio}
								//value={locationClient.ciudad?.postal_code || ''}
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
								value={locationClient?.id_ciudad.ciudad}
								//value={locationClient.ciudad?.postal_code || ''}
							/>
							<TextField
								disabled
								className={classNames(classes.inputText)}
								variant='outlined'
								required
								id='standard-required'
								label='Parroquia'
								name='parroquia'
								value={locationClient?.id_parroquia.parroquia}
								//value={locationClient.ciudad?.postal_code || ''}
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
								value={locationClient?.id_ciudad?.ciudad}
							/>
							<TextField
								disabled
								className={classes.inputText}
								variant='outlined'
								required
								id='standard-required'
								label='Sector'
								name='sector'
								value={locationClient?.sector}
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
								value={locationClient?.calle}
							/>
							<TextField
								disabled
								className={classes.inputText}
								variant='outlined'
								required
								id='standard-required'
								label='Casa/Quinta/Apart'
								name='local'
								value={locationClient?.local}
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
							background: imagesForm.rc_ident_card && !disabled ? '#5c62c5' : '#D3D3D3',
						}}
						component='label'>
						<IconButton aria-label='upload picture' component='span'>
							<PhotoCamera />
						</IconButton>
						<input type='file' hidden name='rc_ident_card' accept={recaudo.acc} onChange={handleChangeImages} />
					</Button>
					<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
				</div>
			</div>
		</>
	);
};

export default DifStepClient;

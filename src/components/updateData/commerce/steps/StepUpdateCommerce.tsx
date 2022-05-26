import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	InputAdornment,
	Button,
	IconButton,
	TextField,
	FormControl,
	Select,
	MenuItem,
	Autocomplete,
} from '@mui/material';
import classNames from 'classnames';
import React, { FC, useContext, useState } from 'react';
import { recaudo } from 'utils/recaudos';
//sytles
import { sxStyled, useStyles } from './styles/styles';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import UpdateCommerceContext from 'context/UpdateData/Commerce/UpdateCommerceContext';
import DataListContext from 'context/DataList/DataListContext';
import { Activity } from 'context/DataList/interface';

const StepUpdateCommerce: FC = () => {
	const classes = useStyles();

	const { listIdentType, listActivity } = useContext(DataListContext);

	const {
		commerce,
		disabled,
		handleChangeCommerce,
		imagen,
		handleChangeImages,
		pathImages,
		handleChange,
		handleChangeIdenType,
	} = useContext(UpdateCommerceContext);

	const [load, setLoad] = useState(false);

	const newImagen = imagen.rc_rif
		? pathImages.rc_rif?.path
		: commerce.rc_rif
		? `${process.env.REACT_APP_API_IMAGES}/${commerce.rc_rif.path}`
		: null;

	const typeImagen = imagen.rc_rif ? pathImages.rc_rif.type : null;

	return (
		<>
			<div className={classes.grid}>
				<div>
					<div className={classes.grid}>
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
								inputProps={{
									maxLength: commerce.id_ident_type === 'P' ? 20 : 9,
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<FormControl variant='standard'>
												<Select
													//onBlur={handleBlurCommerce}
													//error={fm.errorCommerce}>
													onChange={(event: any) => {
														//console.log(event.target.value);
														handleChangeIdenType(event.target.value);
													}}
													name='id_ident_type'
													value={commerce.id_ident_type.id}
													label='Tipo'>
													{listIdentType.map((item: any) => (
														<MenuItem key={item.id} value={item.id}>
															{item.name}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</InputAdornment>
									),
								}}
							/>
						</div>
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
					</div>
					<div className={classes.input}>
						<Autocomplete
							className={classes.input}
							onChange={(event, value: Activity | null) => (value ? handleChange('id_activity', value) : null)}
							options={listActivity}
							value={commerce.id_activity || null}
							getOptionLabel={(option: Activity) => (option.name ? option.name : '')}
							renderInput={(params: any) => (
								<TextField {...params} name='activity' label='Actividad Comercial' variant='outlined' />
							)}
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
					{!commerce.rc_rif ? (
						<Button
							className={classes.buttonImage}
							variant='contained'
							disabled={disabled}
							style={{
								background: imagen.rc_rif && !disabled ? '#5c62c5' : '#D3D3D3',
							}}
							component='label'>
							<IconButton aria-label='upload picture' component='span'>
								<span style={{ textTransform: 'none' }}>Cargar Rif</span>
								<PhotoCamera />
							</IconButton>
							<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
						</Button>
					) : (
						<Button
							className={classes.buttonImage}
							variant='contained'
							disabled={disabled}
							style={{
								background: imagen.rc_rif ? '#5c62c5' : '#D3D3D3',
							}}
							component='label'>
							<span style={{ textTransform: 'none' }}>Cambiar imagen del rif</span>
							<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
						</Button>
					)}
					{newImagen && <RecDifPdf load={load} setLoad={setLoad} imagen={newImagen} type={typeImagen} />}
				</div>
			</div>
			<Button
				sx={sxStyled.buttonSave}
				className={classes.buttonNext}
				variant='contained'
				disabled={disabled}
				component='label'>
				<span style={{ textTransform: 'none' }}>Guardar</span>
			</Button>
		</>
	);
};

export default StepUpdateCommerce;

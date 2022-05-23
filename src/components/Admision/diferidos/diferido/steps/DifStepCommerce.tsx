import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Autocomplete from '@mui/lab/Autocomplete';
import {
	InputAdornment,
	Alert,
	Button,
	FormControlLabel,
	IconButton,
	Stack,
	Switch,
	TextField,
} from '@mui/material';
import { Valid } from 'store/actions/accept';
import classNames from 'classnames';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecPdf from 'components/utilis/images/RecPdf';
import DataListContext from 'context/DataList/DataListContext';
import FMDataContext from 'context/FM/fmAdmision/FmContext';
import ImagesFmContext from 'context/FM/fmImages/ImagesFmContext';
import { Ciudad, Estado, Municipio, Parroquia } from 'context/FM/Location/interfaces';
import LocationsContext from 'context/FM/Location/LocationsContext';
import React, { FC, useContext, useEffect, useState } from 'react';
import { validationClient } from 'store/actions/fm';
import { RootState } from 'store/store';
import { validInputString } from 'utils/fm';
import { capitalizedFull } from 'utils/formatName';
import { recaudo } from 'utils/recaudos';
//sytles
import { sxStyled, useStylesFM } from '../styles';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import RecDifPdf from 'components/utilis/images/RecDifPdf';

const DifStepCommerce: FC = () => {
	const classes = useStylesFM();

	const [openModal, setOpenModal] = useState<boolean>(false);

	const {
		solic,
		commerce,
		locationCommerce,
		disabled,
		handleChangeCommerce,
		imagesForm,
		handleChangeImages,
		pathImages,
		handleChangeRefClient,
	} = useContext(FMDiferidoContext);

	const [load, setLoad] = useState(false);

	const imagen = imagesForm.rc_rif
		? pathImages.rc_rif.path
		: `${process.env.REACT_APP_API_IMAGES}/${commerce.rc_rif.path}`;

	const typeImagen = imagesForm.rc_rif ? pathImages.rc_rif.type : null;

	return (
		<div className={classes.grid}>
			<div>
				<div className={classes.btn_stepM}>
					<Stack sx={{ width: '50%' }} spacing={2}>
						<Alert severity={disabled ? 'success' : 'error'}>
							{solic.id_valid_request.id_typedif_commerce === 2
								? solic.id_valid_request.valid_commerce
								: 'Error Interno'}
						</Alert>
					</Stack>
				</div>
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
						value={commerce?.id_activity.name}
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
							value={locationCommerce?.id_estado.estado}
						/>
						<TextField
							disabled
							className={classNames(classes.inputText)}
							variant='outlined'
							required
							id='standard-required'
							label='Municipio'
							name='municipio'
							value={locationCommerce?.id_municipio.municipio}
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
							value={locationCommerce?.id_ciudad.ciudad}
						/>
						<TextField
							disabled
							className={classNames(classes.inputText)}
							variant='outlined'
							required
							id='standard-required'
							label='Parroquia'
							name='parroquia'
							value={locationCommerce?.id_parroquia.parroquia}
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
							value={locationCommerce?.id_ciudad?.ciudad}
						/>
						<TextField
							disabled
							className={classes.inputText}
							variant='outlined'
							required
							id='standard-required'
							label='Sector'
							name='sector'
							value={locationCommerce?.sector}
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
							value={locationCommerce?.calle}
						/>
						<TextField
							disabled
							className={classes.inputText}
							variant='outlined'
							required
							id='standard-required'
							label='Casa/Quinta/Apart'
							name='local'
							value={locationCommerce?.local}
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
						background: imagesForm.rc_rif && !disabled ? '#5c62c5' : '#D3D3D3',
					}}
					component='label'>
					<IconButton aria-label='upload picture' component='span'>
						<PhotoCamera />
					</IconButton>
					<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
				</Button>
				<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			</div>
		</div>
	);
};

export default DifStepCommerce;

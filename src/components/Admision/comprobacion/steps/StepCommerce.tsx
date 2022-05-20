import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Autocomplete from '@mui/lab/Autocomplete';
import { FormControlLabel, Switch, TextField } from '@mui/material';
import { Valid } from 'store/actions/accept';
import classNames from 'classnames';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecPdf from 'components/utilis/images/RecPdf';
import FMValidDataContext from 'context/Admision/Validation/FmContext';
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

const StepCommerce: FC = () => {
	const classes = useStylesFM();

	const [openModal, setOpenModal] = useState<boolean>(false);

	const { commerce, locationClient, handleChangeValid, listValidated } = useContext(FMValidDataContext);

	console.log(commerce);
	// id: 5
	// banks: [{…}]
	// days: "Lun/Mar/Mie/Jue/Vie/Sab/Dom"
	// id_aci: null
	// id_activity: {id: 5422, name: 'Alimentación\tProveedores de cavas y estantes'}
	// id_ident_type: {id: 3, name: 'J'}
	// id_location: {id: 10, sector: '1', calle: '2', local: '2', id_estado: {…}, …}
	// ident_num: "7777777"
	// name: "backoffice"
	// rc_constitutive_act: [{…}]
	// rc_rif: {id: 181, path: 'static/5/5/7c32d082-9fb9-45f7-9562-d4079bd6f504@rc_rif.jpeg', name: '7c32d082-9fb9-45f7-9562-d4079bd6f504@rc_rif.jpeg', id_status: 1, descript: 'rc_rif'}
	// rc_special_contributor: null
	// special_contributor: 0

	const { valid_commerce } = listValidated;
	const [state, setState] = useState(valid_commerce);

	const [load, setLoad] = useState(false);

	const handleOpenModal = () => {
		handleCancel();
		setOpenModal(true);
	};

	const handleCloseModal = (cancel: boolean) => {
		if (cancel) {
			setState({
				...state,
				status: !state.status,
			});
		}
		setOpenModal(false);
	};

	useEffect(() => {
		//console.log(state);
		handleChangeValid('valid_commerce', state);
	}, [state]);

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});
		if (!event.target.checked) handleOpenModal();
	};

	const imagen = `${process.env.REACT_APP_API_IMAGES}/${commerce?.rc_rif?.path}`;

	return (
		<div className={classes.grid}>
			<div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							required
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
							required
							label='Rif'
							autoComplete='off'
							name='ident_num'
							value={`${commerce?.id_ident_type.name} ${commerce?.ident_num}`}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputText}
							variant='outlined'
							required
							label='Rif'
							autoComplete='off'
							name='ident_num'
							value={commerce?.id_activity.name}
						/>
					</div>
				</div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							id='standard-required'
							label='Estado'
							name='Estado'
							value={locationClient?.id_estado.estado}
						/>
						<TextField
							className={classNames(classes.inputText)}
							variant='outlined'
							required
							id='standard-required'
							label='Municipio'
							name='municipio'
							value={locationClient?.id_municipio.municipio}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							id='standard-required'
							label='Ciudad'
							name='ciudad'
							value={locationClient?.id_ciudad.ciudad}
						/>
						<TextField
							className={classNames(classes.inputText)}
							variant='outlined'
							required
							id='standard-required'
							label='Parroquia'
							name='parroquia'
							value={locationClient?.id_parroquia.parroquia}
						/>
					</div>
					<div className={classes.input}>
						<TextField
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
				<FormControlLabel
					control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
					className={classes.checkText}
					label={state.status ? 'Correcto' : 'Incorrecto'}
				/>
				<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
				<ModalAlert
					from='valid_commerce'
					openModal={openModal}
					state={state}
					setState={setState}
					handleCloseModal={handleCloseModal}
				/>
			</div>
		</div>
	);
};

export default StepCommerce;

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

	const { commerce, locationCommerce, handleChangeValid, listValidated } = useContext(FMValidDataContext);

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
							required
							id='standard-required'
							label='Estado'
							name='Estado'
							value={locationCommerce?.id_estado.estado}
						/>
						<TextField
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

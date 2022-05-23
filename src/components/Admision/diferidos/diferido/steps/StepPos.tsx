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

const StepPos: FC = () => {
	const classes = useStylesFM();

	const [openModal, setOpenModal] = useState<boolean>(false);

	const { locationPos, client, solic, handleChangeValid, listValidated } = useContext(FMValidDataContext);

	const { valid_pos } = listValidated;
	const [state, setState] = useState(valid_pos);

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
		handleChangeValid('valid_pos', state);
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

	const imagen = `${process.env.REACT_APP_API_IMAGES}/${client?.rc_ident_card?.path}`;

	console.log(solic);

	return (
		<div className={classes.grid}>
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
							value={solic.id_product.name}
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
							sx={sxStyled.inputLeft}
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
							value={locationPos?.id_estado.estado}
						/>
						<TextField
							className={classNames(classes.inputText)}
							variant='outlined'
							label='Municipio'
							name='municipio'
							value={locationPos?.id_municipio.municipio}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='ciudad'
							name='ciudad'
							value={locationPos?.id_ciudad.ciudad}
						/>
						<TextField
							className={classNames(classes.inputText)}
							variant='outlined'
							label='Parroquia'
							name='parroquia'
							value={locationPos?.id_parroquia.parroquia}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Cod. Postal'
							name='codigo_postal'
							value={locationPos?.id_ciudad?.ciudad}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							label='Sector'
							name='sector'
							value={locationPos?.sector}
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
			<div className={classes.validRecaudo}>
				<FormControlLabel
					control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
					className={classes.checkText}
					label={state.status ? 'Correcto' : 'Incorrecto'}
				/>
				<RecPdf load={load} setLoad={setLoad} imagen={imagen} />
				<ModalAlert
					from='valid_pos'
					openModal={openModal}
					state={state}
					setState={setState}
					handleCloseModal={handleCloseModal}
				/>
			</div>
		</div>
	);
};

export default StepPos;

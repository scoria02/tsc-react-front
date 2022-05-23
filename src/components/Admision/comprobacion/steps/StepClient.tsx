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

const StepClient: FC = () => {
	const classes = useStylesFM();

	const [openModal, setOpenModal] = useState<boolean>(false);

	const { client, locationClient, handleChangeValid, listValidated } = useContext(FMValidDataContext);

	const { valid_cliente } = listValidated;
	const [state, setState] = useState(valid_cliente);

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
		handleChangeValid('valid_cliente', state);
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

	return (
		<div className={classes.grid}>
			<div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							required
							className={classes.inputText}
							type='email'
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Correo'
							autoComplete='off'
							name='email'
							value={client?.email}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputText}
							variant='outlined'
							required
							label='C.I.'
							autoComplete='off'
							name='ident_num'
							value={`${client?.id_ident_type.name} ${client?.ident_num}`}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							label='Nombre'
							autoComplete='nombre'
							name='name'
							value={client?.name}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							required
							label='Apellido'
							autoComplete='last_name'
							name='last_name'
							value={client?.last_name}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classes.inputText}
							sx={sxStyled.inputLeft}
							variant='outlined'
							required
							label='Telefono'
							name='phone1'
							autoComplete='telefono1'
							value={client?.phones[0].phone.slice(2, client?.phones[0].phone.length)}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							required
							label='Telefono'
							name='phone2'
							autoComplete='telefono2'
							value={(client?.phones[1].phone as string).length > 11 ? client?.phones[1].phone : 'NT'}
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
							//value={locationClient.ciudad?.postal_code || ''}
						/>
						<TextField
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
				<h2
					style={{
						marginTop: 1,
						fontSize: '12px',
					}}>
					Rerencias Personales
				</h2>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						required
						id='standard-required'
						label='Nombre Completo'
						name='name_ref1'
						value={client?.ref_person_1?.fullName}
					/>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						required
						id='standard-required'
						label='Doc. de Identidad'
						placeholder='Ej: 12345678'
						name='doc_ident_ref1'
						value={client?.ref_person_1.document}
					/>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						required
						label='Telefono'
						name='phone_ref1'
						autoComplete='telefono'
						value={client?.ref_person_1?.phone.slice(3, client?.ref_person_1?.phone.length)}
					/>
				</div>
				<div className={classes.input}>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						required
						id='standard-required'
						label='Nombre Completo'
						name='name_ref2'
						value={client?.ref_person_2?.fullName}
					/>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						required
						id='standard-required'
						label='Doc. de Identidad'
						placeholder='Ej: 87654321'
						name='doc_ident_ref2'
						value={client?.ref_person_2.document}
					/>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						required
						label='Telefono'
						name='phone_ref2'
						autoComplete='telefono'
						value={client?.ref_person_2?.phone.slice(3, client?.ref_person_2?.phone.length)}
					/>
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
					from='valid_cliente'
					openModal={openModal}
					state={state}
					setState={setState}
					handleCloseModal={handleCloseModal}
				/>
			</div>
		</div>
	);
};

export default StepClient;

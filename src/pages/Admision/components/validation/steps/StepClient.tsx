import { FormControlLabel, Switch, TextField } from '@mui/material';
import classNames from 'classnames';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecPdf from 'components/images/RecPdf';
import FMValidDataContext from 'context/Admision/Validation/FMValidDataContext';
import React, { FC, useContext, useEffect, useState } from 'react';
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
							label='CI'
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
							label='Nombre'
							autoComplete='nombre'
							name='name'
							value={client?.name}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
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
							label='Telefono'
							name='phone1'
							autoComplete='telefono1'
							value={client?.phones[0].phone.slice(3, client?.phones[0].phone.length)}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							label='Telefono'
							name='phone2'
							autoComplete='telefono2'
							value={
								(client?.phones[1].phone as string).length > 11
									? client?.phones[1].phone.slice(3, client?.phones[1].phone.length)
									: 'NT'
							}
						/>
					</div>
				</div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Estado'
							name='Estado'
							value={locationClient?.id_direccion.estado}
							//value={locationClient.ciudad?.postal_code || ''}
						/>
						<TextField
							className={classNames(classes.inputText)}
							variant='outlined'
							label='Municipio'
							name='municipio'
							value={locationClient?.id_direccion.municipio}
							//value={locationClient.ciudad?.postal_code || ''}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='ciudad'
							name='ciudad'
							value={locationClient?.id_direccion.ciudad}
							//value={locationClient.ciudad?.postal_code || ''}
						/>
						<TextField
							className={classNames(classes.inputText)}
							variant='outlined'
							label='Parroquia'
							name='parroquia'
							value={locationClient?.id_direccion.parroquia}
							//value={locationClient.ciudad?.postal_code || ''}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Cod. Postal'
							name='codigo_postal'
							value={locationClient?.id_direccion.codigoPostal}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
							label='Sector'
							name='sector'
							value={locationClient?.id_direccion.sector}
						/>
					</div>
					<div className={classes.input}>
						<TextField
							className={classNames(classes.inputText, classes.inputTextLeft)}
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Calle'
							name='calle'
							value={locationClient?.calle}
						/>
						<TextField
							className={classes.inputText}
							variant='outlined'
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
						label='Nombre Completo'
						name='name_ref1'
						value={client?.ref_person_1?.fullName}
					/>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						label='Doc. de Identidad'
						placeholder='Ej: 12345678'
						name='doc_ident_ref1'
						value={client?.ref_person_1.document}
					/>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
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
						label='Nombre Completo'
						name='name_ref2'
						value={client?.ref_person_2?.fullName}
					/>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
						label='Doc. de Identidad'
						placeholder='Ej: 87654321'
						name='doc_ident_ref2'
						value={client?.ref_person_2.document}
					/>
					<TextField
						className={classNames(classes.inputText, classes.inputTextLeft)}
						sx={sxStyled.inputLeft}
						variant='outlined'
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

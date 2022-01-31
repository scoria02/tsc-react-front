import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { recaudo } from '../../utilis/recaudos';
import { useStylesFM } from '../styles';
import { FMContext } from '../../../context/FM/FMContext';

import { DataListContext } from '../../../context/DataList/DataListContext';
import { Activity } from '../../../context/DataList/interface';
import { validationCommerce } from '../../../store/actions/fm';
import FMDataContext from '../../../context/FMAdmision/fmContext';
import { types } from 'util';

export const Step3: React.FC<any> = ({
	imagesActa,
	namesImages,
	imagesForm,
	handleChangeImages,
	handleChangeImagesMulti,
	deleteImgContributor,
}) => {
	const classes = useStylesFM();
	const [actaFlag, setActaFlag] = useState(false);
	const dispatch = useDispatch();

	const fm: any = useSelector((state: RootState) => state.fm);

	//Context
	const { typeSolict, errorsFm, commerce, handleSelectIdentCommerce, handleChangeCommerce } =
		useContext(FMDataContext);

	const {
		handleParamsCommerce,

		//ad
		fmDataError,
		days,
		activity,
		setActivity,
		changeDays,
	}: any = useContext(FMContext);

	const { listIdentType, listActivity }: any = useContext(DataListContext);

	const handleBlurCommerce = (): void => {
		if (commerce.id_ident_type !== 0 && commerce.ident_num !== '') {
			dispatch(
				validationCommerce(fm.id_client, {
					id_ident_type: commerce.id_ident_type,
					ident_num: commerce.ident_num,
				})
			);
		}
	};

	const handleChangeNameCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[a-z0-9]+$/i.test(event.target.value) || event.target.value === '') {
			handleChangeCommerce(event);
		}
	};

	const handleSelectActivity = (event: any, value: any, item: string) => {
		if (value) {
			handleParamsCommerce(`id_${item}`, value.id);
			setActivity(value);
		} else {
			handleParamsCommerce(`id_${item}`, 0);
			setActivity(null);
		}
	};

	const handleChecked = (e: any) => {
		if (e.target.checked) {
			deleteImgContributor(e.target.name);
		}
		handleParamsCommerce(e.target.name, e.target.checked);
	};

	const handleIdentNum = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
			handleChangeCommerce(event);
		}
	};

	useEffect(() => {
		setActaFlag(false);
		if (commerce.id_ident_type === 3) {
			setActaFlag(true);
		} else {
			if (imagesForm.rc_constitutive_act) {
				deleteImgContributor('constitutive_act');
			}
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [commerce.id_ident_type]);

	const DocIdentCommerce = () => {
		switch (typeSolict) {
			case 0:
				return (
					<TextField
						disabled
						value={'V'}
						id='standard-required'
						name='ident_num'
						onChange={handleIdentNum}
						variant='outlined'
						className={classes.inputSelect}
					/>
				);
			default:
				return (
					<FormControl variant='outlined' className={classes.inputSelect}>
						<InputLabel id='demo-simple-select-outlined-label'>Doc.</InputLabel>
						<Select
							value={commerce.id_ident_type}
							onChange={handleSelectIdentCommerce}
							name='id_ident_type'
							label='Tipo'
							onBlur={handleBlurCommerce}
							error={fm.errorCommerce}
							placeholder=''>
							{listIdentType.map((item: any) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				);
				break;
		}
	};

	return (
		<>
			<div className={classes.grid}>
				<div className={classes.input}>
					<DocIdentCommerce />
					<TextField
						disabled={typeSolict === 0 ? true : false}
						className={classes.inputTextLeft}
						variant='outlined'
						required
						id='standard-required'
						label={commerce.id_ident_type === 3 ? 'Numero de Rif' : 'C.I.'}
						name='ident_num'
						onChange={handleIdentNum}
						onBlur={handleBlurCommerce}
						value={commerce.ident_num}
						error={fm.errorCommerce}
						inputProps={{
							maxLength: commerce.id_ident_type === 5 ? 20 : 9,
						}}
					/>
					<Button
						className={classes.imgIdent}
						disabled={fm.imagesCommerce}
						variant='contained'
						style={{
							opacity: fm.imagesCommerce ? 0 : 1,
							background: imagesForm.rc_rif ? '#5c62c5' : '#f44336',
						}}
						component='label'>
						{imagesForm.rc_rif !== null ? (
							<p className='nameImg'>{namesImages.rc_rif.slice(0, 7)}...</p>
						) : (
							<>
								{/*<b>Subir</b>*/}
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
							</>
						)}
						<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
					</Button>
				</div>
				<div className={classes.input}>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Nombre del Comercio'
						name='name'
						onChange={handleChangeNameCommerce}
						value={commerce.name}
						error={fmDataError.name}
						disabled={fm.mashCommerce}
					/>
				</div>
				<Autocomplete
					className={classes.input}
					disabled={fm.mashCommerce}
					onChange={(event, value: Activity | null) => handleSelectActivity(event, value, 'activity')}
					options={listActivity}
					value={activity || null}
					getOptionLabel={(option: Activity) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='activity' label='Actividad Comercial' variant='outlined' />
					)}
				/>
				<div className={classes.input}>
					{actaFlag && (
						<>
							<b className={classes.inputText}>{!fm.imagesCommerce && 'Acta Constitutiva'}</b>
							<Button
								className={classes.imgIdent}
								variant='contained'
								disabled={fm.imagesCommerce}
								style={{
									opacity: fm.imagesCommerce ? 0 : 1,
									background: imagesActa.length ? '#5c62c5' : '#f44336',
								}}
								component='label'>
								{imagesActa.length !== 0 ? (
									<>
										<p className='nameImg'>{imagesActa.length} Archivos</p>
									</>
								) : (
									<>
										<IconButton aria-label='upload picture' component='span'>
											<PhotoCamera />
										</IconButton>
									</>
								)}
								<input
									type='file'
									hidden
									multiple
									name='rc_constitutive_act'
									accept={recaudo.acc}
									onChange={handleChangeImagesMulti}
								/>
							</Button>
						</>
					)}
				</div>
				<div className={classes.input}>
					<div className={classes.inputText}>
						<FormControlLabel
							style={{ margin: 0 }}
							label=''
							control={
								<>
									<Checkbox
										name='special_contributor'
										checked={commerce.special_contributor ? true : false}
										onChange={handleChecked}
										disabled={fm.imagesCommerce}
										color='primary'
										inputProps={{ 'aria-label': 'secondary checkbox' }}
									/>
									<b
										style={{
											fontSize: '1rem',
										}}>
										Contribuye Especial
									</b>
								</>
							}
						/>
					</div>
					<Button
						className={classes.imgIdent}
						disabled={fm.imagesCommerce}
						variant='contained'
						style={{
							opacity: fm.imagesCommerce ? 0 : 1,
							background: imagesForm.rc_special_contributor ? '#5c62c5' : '#f44336',
							visibility: commerce.special_contributor ? 'visible' : 'hidden',
						}}
						component='label'>
						{imagesForm.rc_special_contributor !== null ? (
							<>
								<p className='nameImg'>{namesImages.rc_special_contributor.slice(0, 7)}...</p>
							</>
						) : (
							<>
								{/*<b>Subir</b>*/}
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
							</>
						)}
						<input
							type='file'
							hidden
							name='rc_special_contributor'
							accept={recaudo.acc}
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
			</div>
			<div className={classes.daysCB}>
				Días laborales
				<FormGroup row style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr ' }}>
					{Object.keys(days).map((key: any) => {
						return (
							<FormControlLabel
								control={<Checkbox checked={days[key]} onChange={changeDays} name={key} color='primary' />}
								label={key.replaceAll('_', ' ')}
								key={key}
							/>
						);
					})}
				</FormGroup>
			</div>
		</>
	);
};

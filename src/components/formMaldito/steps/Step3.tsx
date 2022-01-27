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
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { recaudo } from '../../utilis/recaudos';
import { useStylesFM } from '../styles';
import { FMContext } from '../../../context/FM/FMContext';

import { DataListContext } from '../../../context/DataList/DataListContext';

export const Step3: React.FC<any> = ({
	imagesActa,
	namesImages,
	imagesForm,
	handleBlurCommerce,
	handleChangeImages,
	handleChangeImagesMulti,
	deleteImgContributor,
}) => {
	const classes = useStylesFM();
	const [actaFlag, setActaFlag] = useState(false);

	const fm: any = useSelector((state: RootState) => state.fm);

	const { fmData, fmDataError, days, activity, setActivity, changeFmData, changeFmParms, changeDays }: any =
		useContext(FMContext);

	const { listIdentType, listActivity }: any = useContext(DataListContext);

	const handleSelectActivity = (event: any, value: any, item: string) => {
		if (value) {
			changeFmParms(`id_${item}`, value.id);
			setActivity(value);
		} else {
			changeFmParms(`id_${item}`, 0);
			setActivity(null);
		}
	};

	const handleChecked = (e: any) => {
		if (e.target.checked) {
			deleteImgContributor(e.target.name);
		}
		changeFmParms(e.target.name, e.target.checked ? 1 : 0);
	};

	const handleIdentNum = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
			changeFmData(event);
		}
	};

	useEffect(() => {
		setActaFlag(false);
		if (fmData.id_ident_type_commerce === 3) {
			setActaFlag(true);
		} else {
			if (imagesForm.rc_constitutive_act) {
				deleteImgContributor('constitutive_act');
			}
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [fmData.id_ident_type_commerce]);

	console.log('comerce', fmData);

	return (
		<>
			<div className={classes.grid}>
				<div className={classes.input}>
					<FormControl variant='outlined' className={classes.inputSelect}>
						<InputLabel id='demo-simple-select-outlined-label'>Doc.</InputLabel>
						<Select
							value={fmData.id_ident_type_commerce}
							onChange={changeFmData}
							name='id_ident_type_commerce'
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
					<TextField
						className={classes.inputTextLeft}
						variant='outlined'
						required
						id='standard-required'
						label={fmData.id_ident_type_commerce === 3 ? 'Numero de Rif' : 'C.I.'}
						name='ident_num_commerce'
						onChange={handleIdentNum}
						onBlur={handleBlurCommerce}
						value={fmData.ident_num_commerce}
						error={fm.errorCommerce}
						inputProps={{
							maxLength: fmData.id_ident_type_commerce === 5 ? 20 : 9,
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
						name='name_commerce'
						onChange={changeFmData}
						value={fmData.name_commerce}
						error={fmDataError.name_commerce}
						disabled={fm.mashCommerce}
					/>
				</div>
				<Autocomplete
					className={classes.input}
					disabled={fm.mashCommerce}
					onChange={(event, value) => {
						handleSelectActivity(event, value, 'activity');
					}}
					options={listActivity}
					value={activity || null}
					getOptionLabel={(option: any) => (option.name ? option.name : '')}
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
										checked={fmData.special_contributor ? true : false}
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
							visibility: fmData.special_contributor ? 'visible' : 'hidden',
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

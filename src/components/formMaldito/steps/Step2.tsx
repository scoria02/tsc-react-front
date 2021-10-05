import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useStylesFM } from '../styles';

export const Step2: React.FC<any> = ({
	listActivity,
	activity,
	setActivity,
	namesImages,
	cursedForm,
	error,
	imagesForm,
	setCursedForm,
	handleChange,
	handleChangeImages,
	deleteImgContributor
}) => {
	const classes = useStylesFM();

	const handleSelect = (event: any) => {
		setCursedForm({
			...cursedForm,
			[event.target.name]: parseInt(event.target.value, 10),
		});
	};

	const handleSelectActivity= (event: any, value: any, item: string) => {
		if(value){
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id
			});
			setActivity(value);
		} else{
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0
			});
			setActivity(null);
		}
	};

	const handleChecked = (e: any) => {
		if(!(!cursedForm.special_contributor)){
			deleteImgContributor(e.target.name)
		}
		setCursedForm({
			...cursedForm,
			[e.target.name]: !cursedForm.special_contributor ? 1 : 0
		})
	}

  return (
    <>
			<div className={classes.inputLine3}>
				<div>
					<TextField
						className={classes.input}
						variant="outlined"
						required id="standard-required"
						label="Nombre del Comercio" 
						name='name_commerce' 
						onChange={handleChange} 
						value={cursedForm.name_commerce} 
						error={error.name_commerce}
					/>
				</div>
				<div className={classes.input}>
					<FormControl variant='outlined' className={classes.inputTipoId}>
						<InputLabel id='demo-simple-select-outlined-label'>Rif</InputLabel>
						<Select 
							value={cursedForm.id_ident_type_commerce} 
							onChange={handleSelect} 
							name='id_ident_type_commerce' 
							label='Tipo' 
							placeholder=''>
							<MenuItem value='3'>J</MenuItem>
						</Select>
					</FormControl>
					<TextField className={classes.inputDoc} variant="outlined" required id="standard-required" label={cursedForm.id_ident_type_commerce === 3 ? 'Numero de Rif' : 'C.I.'} name='ident_num_commerce' onChange={handleChange} value={cursedForm.ident_num_commerce} 
					/>
				<Button
					className={classes.imgIdent}
					variant="contained"
					//color="secondary"
					component="label"
				>
					{imagesForm.rc_rif !== null ? (
						<p className="nameImg" >{namesImages.rc_rif.slice(0, 7)}...</p>
					):(
						<>
							<b className="textSubir">Subir</b>
							<IconButton aria-label="upload picture" component="span">
								<PhotoCamera />
							</IconButton>
						</>
						)
					}
					<input
						type="file"
						hidden
						name="rc_rif"
						accept="image/png, image/jpeg, image/jpg"
						onChange={handleChangeImages}
					/>
				</Button>
				</div>
			<Autocomplete
					className={classes.input}
					onChange={(event,value) => {
						handleSelectActivity(event,value,'activity') 
					}}
					options={listActivity}
					value={activity || null}
					getOptionLabel={(option:any) => option.name ? option.name : ''}
					renderInput={(params:any) => 
					<TextField {...params} 
						name="activity" 
						label="Actividad Comercial"
						variant="outlined" 
					/>
					}
				/>
				<div className={classes.input}>
					<div className={classes.inputText}>
						<FormControlLabel 
							style={{ margin: 0 }}
							label=''
							control={
								<>
									<b style={{
										fontSize: '1rem'}}>Contribuye Especial</b>
									<Checkbox
										name="special_contributor"
										checked={cursedForm.special_contributor ? true : false}
										onChange={handleChecked}
										color="primary"
										inputProps={{ 'aria-label': 'secondary checkbox' }}
									/>
								</>
							}
						/>
					</div>
					<Button
						className={classes.imgStep1}
						style={{ visibility: cursedForm.special_contributor? 'visible' : 'hidden'}}
						variant="contained"
						//color="secondary"
						component="label"
					>
						{imagesForm.rc_special_contributor !== null ? (
							<>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
								<p className="nameImg" >{namesImages.rc_special_contributor.slice(0, 10)}...</p>
							</>
						):(
							<>
								<b>Subir</b>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
							</>
							)
						}
						<input
							type="file"
							hidden
							name="rc_special_contributor"
							accept="image/png, image/jpeg, image/jpg"
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
				<div className={classes.input} style={{ justifyContent: 'center' }}>
					<b
					className={classes.inputText}>
						Referencia Bancaria
					</b>
					<Button
						className={classes.imgStep1}
						variant="contained"
						//color="secondary"
						component="label"
					>
						{imagesForm.rc_ref_bank !== null ?
								<>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
									<p className="nameImg" >{namesImages.rc_ref_bank.slice(0, 10)}...</p>
								</>
							: 
								<>
									<b>Subir</b>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
								</>
						}
						<input
							type="file"
							hidden
							name="rc_ref_bank"
							accept="image/png, image/jpeg, image/jpg"
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
				<div className={classes.input} style={{ justifyContent: 'center' }}>
					<b
					className={classes.inputText}>
						Acta Constitutiva
					</b>
					<Button
						className={classes.imgStep1}
						variant="contained"
						//color="secondary"
						component="label"
					>
						{imagesForm.rc_constitutive_act!== null?
								<>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
									<p className="nameImg" >{namesImages.rc_constitutive_act.slice(0, 10)}...</p>
								</>
							: 
								<>
									<b>Subir</b>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
								</>
						}
						<input
							type="file"
							hidden
							name="rc_constitutive_act"
							accept="image/png, image/jpeg, image/jpg"
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
				<div className={classes.input} style={{ justifyContent: 'center' }}>
					<b
					className={classes.inputText}>
						Documento de Propiedad
					</b>
					<Button
						className={classes.imgStep1}
						variant="contained"
						//color="secondary"
						component="label"
					>
						{imagesForm.rc_property_document !== null ?
								<>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
									<p className="nameImg" >{namesImages.rc_property_document.slice(0, 10)}...</p>
								</>
							: 
								<>
									<b>Subir</b>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
								</>
						}
						<input
							type="file"
							hidden
							name="rc_property_document"
							accept="image/png, image/jpeg, image/jpg"
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
				<div className={classes.input} style={{ justifyContent: 'center' }}>
					<b
					className={classes.inputText}>
						Servicios
					</b>
					<Button
						className={classes.imgStep1}
						variant="contained"
						component="label"
					>
						{imagesForm.rc_service_document!== null ?
								<>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
									<p className="nameImg" >{namesImages.rc_service_document.slice(0, 10)}...</p>
								</>
							: 
								<>
									<b>Subir</b>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
								</>
						}
						<input
							type="file"
							hidden
							name="rc_service_document"
							accept="image/png, image/jpeg, image/jpg"
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
			</div>
    </>
  )
}

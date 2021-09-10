import React from "react"

//Materail
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import { useStylesFM } from '../styles';

export const Step3: React.FC<any> = ({location, cursedForm, imagesForm, setCursedForm, handleChange, handleChangeImages}) => {
	const classes = useStylesFM();

	const handleSelectEstado = (event: any, value: any, item: string) => {
		if(value){
			setCursedForm({
				...cursedForm,
				[item]: value
			});
		} else{
			setCursedForm({
				...cursedForm,
				[item]: null
			});
		}
	};

  return (
    <>
			<div className={classes.input}>
				<Autocomplete
						className={classes.inputM}
						onChange={(event,value) => handleSelectEstado(event,value,'estado')}
						value={cursedForm.estado || null}
						options={location.estado}
						getOptionLabel={(option:any) => option.estado ? option.estado : ''}
						renderInput={(params:any) => <TextField {...params}  name="estado" label="Estado" variant="outlined" />}
					/>
				<Autocomplete
						className={classes.inputN}
						onChange={(event,value) => handleSelectEstado(event,value,'ciudad')}
						value={cursedForm.ciudad || null}
						options={location.ciudad}
						getOptionLabel={(option:any) => option.ciudad ? option.ciudad : ''}
						renderInput={(params:any) => <TextField {...params}  name="estado" label="Ciudad" variant="outlined" />}
					/>
			</div>
			<div className={classes.input}>
				<Autocomplete
						className={classes.inputM}
						onChange={(event,value) => handleSelectEstado(event,value,'municipio')}
						value={cursedForm.municipio || null}
						options={location.municipio}
						getOptionLabel={(option:any) => option.municipio ?  option.municipio : ''}
						renderInput={(params:any) => <TextField {...params}  name="estado" label="Municipio" variant="outlined" />}
					/>
					{/*
				<Autocomplete
						className={classes.inputN}
						onChange={(event,value) => handleSelectEstado(event,value,'parroquia')}
						value={cursedForm.parroquia !== 0 ? cursedForm.parroquia : null}
						options={location.parroquia}
						getOptionLabel={(option:any) => option.parroquia ?  option.parroquia : ''}
						renderInput={(params:any) => <TextField {...params}  name="estado" label="Parroquia" variant="outlined" />}
					/>
						*/}
				<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Parroquia" name='Parroquia' onChange={handleChange} value={cursedForm.parroquia} />
			</div>
			<div className={classes.input}>
			<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Sector" name='sector' onChange={handleChange} value={cursedForm.sector} />
			<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Calle" name='calle' onChange={handleChange} value={cursedForm.calle} />
			</div>
			<div className={classes.input}>
			<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Local" name='local' onChange={handleChange} value={cursedForm.local} />
			</div>
				<div className={classes.input}>
				<div className={classes.input}>
					<b
					className={classes.inputTextN}>
						Frente del Local
					</b>
					<Button
						className={classes.imgStep3}
						variant="contained"
						//color="secondary"
						component="label"
					>
						{imagesForm.rc_front_local.name  !== '' ?
								<>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
									<p className="nameImg" >{imagesForm.rc_front_local.name.slice(0, 5)}...</p>
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
							name="rc_front_local"
							accept="image/png, image/jpeg"
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
				<div className={classes.input}>
					<b
					className={classes.inputTextN}>
						Interior del Local
					</b>
					<Button
						className={classes.imgStep3}
						variant="contained"
						//color="secondary"
						component="label"
					>
						{imagesForm.rc_in_local.name  !== '' ?
								<>
									<IconButton aria-label="upload picture" component="span">
										<PhotoCamera />
									</IconButton>
									<p className="nameImg" >{imagesForm.rc_in_local.name.slice(0, 5)}...</p>
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
							name="rc_in_local"
							accept="image/png, image/jpeg"
							onChange={handleChangeImages}
						/>
					</Button>
				</div>
			</div>
    </>
  )
}



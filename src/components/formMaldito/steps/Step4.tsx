import React from "react"
import TextField from '@material-ui/core/TextField';
import { useStylesFM } from '../styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import Autocomplete from '@material-ui/lab/Autocomplete';

//Pedido
export const Step4: React.FC<any> = ({payment, cursedForm, imagesForm, setCursedForm, handleChange, handleChangeImages}) => {
	const classes = useStylesFM();

	const handleSelectPayment = (event: any, value: any, item: string) => {
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
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Numero de Puntos" name='number_post' onChange={handleChange} value={cursedForm.number_post} />
				<Autocomplete
						className={classes.inputM}
						onChange={(event,value) => handleSelectPayment(event,value, 'id_payment_method')}
						value={cursedForm.id_payment_method|| null}
						options={payment}
						getOptionLabel={(option:any) => option.name ? option.name : ''}
						renderInput={(params:any) => <TextField {...params}  name="estado" label="Forma de Pago" variant="outlined" />}
					/>
			<div className={classes.input}>
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
					{imagesForm.rc_constitutive_act.name  !== '' ?
							<>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
								<p className="nameImg" >{imagesForm.rc_constitutive_act.name.slice(0, 10)}...</p>
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
						accept="image/png, image/jpeg"
						onChange={handleChangeImages}
					/>
				</Button>
			</div>
			<div className={classes.input}>
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
					{imagesForm.rc_property_document.name  !== '' ?
							<>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
								<p className="nameImg" >{imagesForm.rc_property_document.name.slice(0, 10)}...</p>
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
						accept="image/png, image/jpeg"
						onChange={handleChangeImages}
					/>
				</Button>
			</div>
			<div className={classes.input}>
				<b
				className={classes.inputText}>
					Servicios
				</b>
				<Button
					className={classes.imgStep1}
					variant="contained"
					//color="secondary"
					component="label"
				>
					{imagesForm.rc_service_document.name  !== '' ?
							<>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
								<p className="nameImg" >{imagesForm.rc_service_document.name.slice(0, 10)}...</p>
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
						accept="image/png, image/jpeg"
						onChange={handleChangeImages}
					/>
				</Button>
			</div>
    </>
  )
}



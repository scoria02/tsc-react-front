import React from "react"
import TextField from '@material-ui/core/TextField';
import { useStylesFM } from '../styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import Autocomplete from '@material-ui/lab/Autocomplete';

//Pedido
export const Step4: React.FC<any> = ({namesImages, listPayment, payment, setPayment, cursedForm, imagesForm, setCursedForm, handleChange, handleChangeImages}) => {
	const classes = useStylesFM();

	const handleSelectPayment = (event: any, value: any, item: string) => {
		if(value){
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id
			});
			setPayment(value);
		} else{
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0
			});
			setPayment(null);
		}
	};

  return (
    <>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Numero de Puntos" name='number_post' onChange={handleChange} value={cursedForm.number_post} />
				<Autocomplete
						className={classes.inputM}
						onChange={(event,value) => handleSelectPayment(event,value, 'payment_method')}
						value={payment || null}
						options={listPayment}
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
					{imagesForm.rc_service_document !== null ?
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
						accept="image/png, image/jpeg"
						onChange={handleChangeImages}
					/>
				</Button>
			</div>
    </>
  )
}



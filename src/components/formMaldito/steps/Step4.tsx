import React from "react"
import TextField from '@material-ui/core/TextField';
import { useStylesFM } from '../styles';
import Button from '@material-ui/core/Button';

//Pedido
export const Step4: React.FC<any> = ({cursedForm, setCursedForm, handleChange}) => {
	const classes = useStylesFM();

  return (
    <>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Numero de Puntos" name='number_post' onChange={handleChange} value={cursedForm.number_post} />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Metodo de Pago" name='id_payment_method' onChange={handleChange} value={cursedForm.id_payment_method} />
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
					Subir Foto
					<input
						type="file"
						hidden
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
					Subir Foto
					<input
						type="file"
						hidden
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
					Subir Foto
					<input
						type="file"
						hidden
					/>
				</Button>
			</div>
    </>
  )
}



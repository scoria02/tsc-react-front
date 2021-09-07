import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export const useStyles = makeStyles((styles) => ({
	input: {
    display: 'flex',
    width: '50%',
    textAlign: 'center',
		marginTop: styles.spacing(1),
		alignSelf: 'center',
	},
	inputTipoId: {
    width: '30%',
		marginRight: styles.spacing(1.5),
	},
	inputDoc: {
    width: '80%',
	}
}));

export const Step3: React.FC<any> = ({cursedForm, setCursedForm, handleChange}) => {
	const classes = useStyles();

  return (
    <>
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Metodo de Pago" name='payment_method' onChange={handleChange} value={cursedForm.payment_method} />
			<div className={classes.input}>
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Estado" name='estado' onChange={handleChange} value={cursedForm.estado} />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Ciudad" name='ciudad' onChange={handleChange} value={cursedForm.ciudad} />
			</div>
			<div className={classes.input}>
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Municipio" name='municipio' onChange={handleChange} value={cursedForm.municipio} />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Parroquia" name='parroquia' onChange={handleChange} value={cursedForm.parroquia} />
			</div>
			<div className={classes.input}>
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Sector" name='sector' onChange={handleChange} value={cursedForm.sector} />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Calle" name='calle' onChange={handleChange} value={cursedForm.calle} />
			</div>
			<div className={classes.input}>
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Local" name='local' onChange={handleChange} value={cursedForm.local} />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Codigo Postal" name='codigo_postal' onChange={handleChange} value={cursedForm.codigo_postal} />
			</div>
    </>
  )
}



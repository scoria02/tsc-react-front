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

export const Step1: React.FC<any> = ({cursedForm, setCursedForm, handleChange}) => {
	const classes = useStyles();

  return (
    <>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Correo" name='email' onChange={handleChange} value={cursedForm.email} />
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Nombre" name='name' onChange={handleChange} value={cursedForm.name}/>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Apellido" name='last_name' onChange={handleChange} value={cursedForm.last_name}/>
			<div className={classes.input}>
				<TextField className={classes.inputTipoId} variant="outlined" required id="standard-required" label="Tipo ID" name='id_ident_type' onChange={handleChange} value={cursedForm.id_ident_type}/>
				<TextField className={classes.inputDoc} variant="outlined" required id="standard-required" label="ID" name='ident_num' onChange={handleChange} value={cursedForm.ident_num}/>
			</div>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Telefono" name='phone1' onChange={handleChange} value={cursedForm.phone1}/>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Telefono" name='phone2' onChange={handleChange} value={cursedForm.phone2}/>
    </>
  )
}


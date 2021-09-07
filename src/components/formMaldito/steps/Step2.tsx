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

export const Step2: React.FC<any> = ({cursedForm, setCursedForm, handleChange}) => {
	const classes = useStyles();

	const handleChecked = () => {
		setCursedForm({
			...cursedForm,
			'contributor': !cursedForm.contributor
		})
	}

  return (
    <>
			<div className={classes.input}>
				<Checkbox
					name="contributor"
					checked={cursedForm.contributor}
					onChange={handleChecked}
					defaultChecked
					color="primary"
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
				<b style={{ fontSize: '1rem', paddingTop: '10px' }}>Contribuye</b>
			</div>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Numero de Post" name='nro_post' onChange={handleChange} value={cursedForm.nro_post} />
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Nombre" name='name2' onChange={handleChange} value={cursedForm.name2} />
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Apellido" name='last_name2' onChange={handleChange} value={cursedForm.last_name2} />
			<div className={classes.input}>
				<TextField className={classes.inputTipoId} variant="outlined" required id="standard-required" label="Tipo ID" name='id_ident_type2' onChange={handleChange} value={cursedForm.id_ident_type2} />
				<TextField className={classes.inputDoc} variant="outlined" required id="standard-required" label="ID" name='ident_num2' onChange={handleChange} value={cursedForm.ident_num2} />
			</div>
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Nro Cuenta" name='nro_account' onChange={handleChange} value={cursedForm.nro_account} />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Actividad Comercial" name='id_activity' onChange={handleChange} value={cursedForm.id_activity} />
    </>
  )
}

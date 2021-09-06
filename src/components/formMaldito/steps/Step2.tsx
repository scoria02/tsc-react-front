import React, { useState } from "react"
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export const useStyles = makeStyles((styles) => ({
	input: {
    display: 'flex',
    width: '50%',
    textAlign: 'center',
		marginTop: styles.spacing(1.5),
		marginBottom: styles.spacing(1),
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

export const Step2: React.FC = () => {
	const classes = useStyles();
	const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
			<div className={classes.input}>
				<Checkbox
					checked={checked}
					onChange={handleChange}
					defaultChecked
					color="primary"
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
				<b style={{ fontSize: '1rem', paddingTop: '10px' }}>Contribuye</b>
			</div>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Numero de Post" />
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Nombre" />
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Apellido" />
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Numero de Post" />
			<div className={classes.input}>
				<TextField className={classes.inputTipoId} variant="outlined" required id="standard-required" label="Tipo ID" />
				<TextField className={classes.inputDoc} variant="outlined" required id="standard-required" label="ID" />
			</div>
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Actividad Comercial" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Nro Cuenta" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Metodo de Pago" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Ciudad" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Estado" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Municipio" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Parroquia" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Sector" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Calle" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Local" />
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Codigo Postal" />
    </>
  )
}


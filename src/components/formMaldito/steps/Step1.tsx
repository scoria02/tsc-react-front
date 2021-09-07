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

export const Step1: React.FC<any> = ({maldito}) => {
	const classes = useStyles();
	const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Correo" inputRef={maldito()}/>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Nombre" />
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Apellido" />
			<div className={classes.input}>
				<TextField className={classes.inputTipoId} variant="outlined" required id="standard-required" label="Tipo ID" />
				<TextField className={classes.inputDoc} variant="outlined" required id="standard-required" label="ID" />
			</div>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Telefono" />
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Telefono" />
    </>
  )
}


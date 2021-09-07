import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import { useStylesFM } from '../styles';

export const Step3: React.FC<any> = ({cursedForm, setCursedForm, handleChange}) => {
	const classes = useStylesFM();

  return (
    <>
			<div className={classes.input}>
			<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Estado" name='estado' onChange={handleChange} value={cursedForm.estado} />
			<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Ciudad" name='ciudad' onChange={handleChange} value={cursedForm.ciudad} />
			</div>
			<div className={classes.input}>
			<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Municipio" name='municipio' onChange={handleChange} value={cursedForm.municipio} />
			<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Parroquia" name='parroquia' onChange={handleChange} value={cursedForm.parroquia} />
			</div>
			<div className={classes.input}>
			<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Sector" name='sector' onChange={handleChange} value={cursedForm.sector} />
			<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Calle" name='calle' onChange={handleChange} value={cursedForm.calle} />
			</div>
			<div className={classes.input}>
			<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Local" name='local' onChange={handleChange} value={cursedForm.local} />
			<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Codigo Postal" name='codigo_postal' onChange={handleChange} value={cursedForm.codigo_postal} />
			</div>
				<div className={classes.input}>
				<div className={classes.input}>
					<b
					className={classes.inputTextN}>
						Frente del Local
					</b>
					<Button
						className={classes.imgStep1}
						variant="contained"
						//color="secondary"
						component="label"
					>
					<IconButton aria-label="upload picture" component="span">
						<PhotoCamera />
					</IconButton>
					<input
						type="file"
						hidden
					/>
					</Button>
				</div>
				<div className={classes.input}>
					<b
					className={classes.inputTextN}>
						Interior del Local
					</b>
					<Button
						className={classes.imgStep1}
						variant="contained"
						//color="secondary"
						component="label"
					>
					<IconButton aria-label="upload picture" component="span">
						<PhotoCamera />
					</IconButton>
					<input
						type="file"
						hidden
					/>
					</Button>
				</div>
			</div>
    </>
  )
}



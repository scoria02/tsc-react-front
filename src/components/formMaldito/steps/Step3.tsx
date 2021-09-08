import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import { useStylesFM } from '../styles';

export const Step3: React.FC<any> = ({cursedForm, imagesForm, setCursedForm, handleChange, handleChangeImages}) => {
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
						className={classes.imgStep1}
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



import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useStylesFM } from '../styles';

export const Step2: React.FC<any> = ({namesImages, cursedForm, imagesForm, setCursedForm, handleChange, handleChangeImages, deleteImgContributor}) => {
	const classes = useStylesFM();

	const handleSelect = (event: any) => {
		setCursedForm({
			...cursedForm,
			[event.target.name]: parseInt(event.target.value, 10),
		});
	};

	const handleChecked = (e: any) => {
		if(!(!cursedForm.special_contributor)){
			deleteImgContributor(e.target.name)
		}
		setCursedForm({
			...cursedForm,
			[e.target.name]: !cursedForm.special_contributor
		})
	}

  return (
    <>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Nombre del Comercio" name='name_commerce' onChange={handleChange} value={cursedForm.name_commerce} />
			<div className={classes.input}>
				<FormControl variant='outlined' className={classes.inputTipoId}>
					<InputLabel id='demo-simple-select-outlined-label'>Rif</InputLabel>
					<Select 
            value={cursedForm.id_ident_type_commerce} 
						onChange={handleSelect} 
						name='id_ident_type_commerce' 
						label='Tipo' 
						placeholder=''>
						<MenuItem value='3'>J</MenuItem>
					</Select>
				</FormControl>
				<TextField className={classes.inputDoc} variant="outlined" required id="standard-required" label={cursedForm.id_ident_type_commerce === 3 ? 'Rif' : 'C.I.'} name='ident_num_commerce' onChange={handleChange} value={cursedForm.ident_num_commerce} />
			<Button
				className={classes.imgIdent}
				variant="contained"
				//color="secondary"
				component="label"
			>
				{imagesForm.rc_rif !== null ? (
					<p className="nameImg" >{namesImages.rc_rif.slice(0, 10)}...</p>
				):(
					<>
						<b>Subir</b>
						<IconButton aria-label="upload picture" component="span">
							<PhotoCamera />
						</IconButton>
					</>
					)
				}
				<input
					type="file"
					hidden
					name="rc_rif"
					accept="image/png, image/jpeg"
					onChange={handleChangeImages}
				/>
			</Button>
			</div>
			<div className={classes.input}>
				<TextField className={classes.inputA} variant="outlined" required id="standard-required" label="Numero de Cuenta" name='text_account_number' onChange={handleChange} value={cursedForm.text_account_number} />
				<Button
					className={classes.imgIdent}
					variant="contained"
					//color="secondary"
					component="label"
				>
				{imagesForm.rc_account_number !== null ? (
					<p className="nameImg" >{namesImages.rc_account_number.slice(0, 10)}...</p>
				):(
					<>
						<b>Subir</b>
						<IconButton aria-label="upload picture" component="span">
							<PhotoCamera />
						</IconButton>
					</>
					)
				}
				<input
					type="file"
					hidden
					name="rc_account_number"
					accept="image/png, image/jpeg"
					onChange={handleChangeImages}
				/>
				</Button>
			</div>
			<TextField className={classes.input} variant="outlined" required id="standard-required" label="Actividad Comercial" name='id_activity' onChange={handleChange} value={cursedForm.id_activity} />
			<div className={classes.input}>
				<b
				className={classes.inputText}>
					Referencia Bancaria
				</b>
				<Button
					className={classes.imgStep1}
					variant="contained"
					//color="secondary"
					component="label"
				>
					{imagesForm.rc_ref_bank !== null ?
							<>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
								<p className="nameImg" >{namesImages.rc_ref_bank.slice(0, 10)}...</p>
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
						name="rc_ref_bank"
						accept="image/png, image/jpeg"
						onChange={handleChangeImages}
					/>
				</Button>
			</div>
			<div className={classes.input}>
				<FormControlLabel 
					label=''
					control={
						<>
							<b style={{ fontSize: '1rem', paddingTop: '10px', marginTop: 0 }}>Contribuye Especial</b>
							<Checkbox
								name="special_contributor"
								checked={cursedForm.special_contributor}
								onChange={handleChecked}
								color="primary"
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						</>
					}
				/>
				<Button
					className={classes.imgContributor}
					style={{ visibility: cursedForm.special_contributor? 'visible' : 'hidden'}}
					variant="contained"
					//color="secondary"
					component="label"
				>
					{imagesForm.rc_special_contributor !== null ? (
						<>
							<IconButton aria-label="upload picture" component="span">
								<PhotoCamera />
							</IconButton>
							<p className="nameImg" >{namesImages.rc_special_contributor.slice(0, 10)}...</p>
						</>
					):(
						<>
							<b>Subir</b>
							<IconButton aria-label="upload picture" component="span">
								<PhotoCamera />
							</IconButton>
						</>
						)
					}
					<input
						type="file"
						hidden
						name="rc_special_contributor"
						accept="image/png, image/jpeg"
						onChange={handleChangeImages}
					/>
				</Button>
			</div>
    </>
  )
}

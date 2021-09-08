import React  from "react"
import TextField from '@material-ui/core/TextField';

//Material
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

//sytles
import { useStylesFM } from '../styles';

export const Step1: React.FC<any> = ({cursedForm, setCursedForm, handleChange}) => {
	const classes = useStylesFM();

	const handleSelect = (event: any) => {
		console.log(event.target.value)
		setCursedForm({
			...cursedForm,
			[event.target.name]: parseInt(event.target.value, 10),
		});
	};

  return (
    <>
      <TextField className={classes.input} type="email" variant="outlined" required id="standard-required" label="Correo" name='email' onChange={handleChange} value={cursedForm.email} />
			<div className={classes.input}>
				<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Nombre" name='name' onChange={handleChange} value={cursedForm.name}/>
				<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Apellido" name='last_name' onChange={handleChange} value={cursedForm.last_name}/>
			</div>
			<div className={classes.input}>
				<FormControl variant='outlined' className={classes.inputTipoId}>
					<InputLabel id='demo-simple-select-outlined-label'>Tipo</InputLabel>
					<Select 
            value={cursedForm.id_ident_type} 
						onChange={handleSelect} 
						name='id_ident_type' 
						label='Tipo' 
						placeholder=''>
						<MenuItem value='1'>V</MenuItem>
						<MenuItem value='2'>E</MenuItem>
						<MenuItem value='3'>J</MenuItem>
						<MenuItem value='4'>R</MenuItem>
						<MenuItem value='5'>P</MenuItem>
					</Select>
				</FormControl>
				<TextField className={classes.inputDoc} variant="outlined" required id="standard-required" label="C.I." name='ident_num' onChange={handleChange} value={cursedForm.ident_num}/>
				<Button
					className={classes.imgIdent}
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
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Telefono" name='phone1' onChange={handleChange} value={cursedForm.phone1}/>
      <TextField className={classes.input} variant="outlined" required id="standard-required" label="Telefono" name='phone2' onChange={handleChange} value={cursedForm.phone2}/>
			<div className={classes.input}>
				<b
				className={classes.inputText}>
					Referencia Personal
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


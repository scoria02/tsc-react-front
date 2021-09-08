import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

import { useStylesFM } from '../styles';

export const Step2: React.FC<any> = ({cursedForm, setCursedForm, handleChange}) => {
	const classes = useStylesFM();

	const handleSelect = (event: any) => {
		console.log(event.target.value)
		setCursedForm({
			...cursedForm,
			[event.target.name]: parseInt(event.target.value, 10),
		});
	};

	const handleChecked = () => {
		setCursedForm({
			...cursedForm,
			'contributor': !cursedForm.contributor
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
				<TextField className={classes.inputA} variant="outlined" required id="standard-required" label="Numero de Cuenta" name='text_account_number' onChange={handleChange} value={cursedForm.text_account_number} />
				<Button
					className={classes.imgNroAccount}
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
					Subir Foto
					<input
						type="file"
						hidden
					/>
				</Button>
			</div>
			<div className={classes.input}>
				<b style={{ fontSize: '1rem', paddingTop: '10px' }}>Contribuye Especial</b>
				<Checkbox
					name="contributor"
					checked={cursedForm.contributor}
					onChange={handleChecked}
					color="primary"
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
				{cursedForm.contributor ? 
					<Button
						className={classes.imgContributor}
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
					: null
				}
			</div>
    </>
  )
}

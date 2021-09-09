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

export const Step1: React.FC<any> = ({cursedForm, error, imagesForm, setCursedForm, handleChange, handleChangeImages,  validateForm}) => {
	const classes = useStylesFM();

	const handleSelect = (event: any) => {
		setCursedForm({
			...cursedForm,
			[event.target.name]: parseInt(event.target.value, 10),
		});
		validateForm(event.target.name, parseInt(event.target.value, 10));
	};

  return (
    <>
			<TextField 
				required 
				className={classes.input} 
				type="email" 
				variant="outlined" 
				label="Correo" 
				name='email' 
				onChange={handleChange} 
				value={cursedForm.email} 
				error={error.email}
			/>
			<div className={classes.input}>
				<TextField 
					className={classes.inputM} 
					variant="outlined" 
					required 
					label="Nombre" 
					name='name'
					onChange={handleChange} 
					value={cursedForm.name}
					error={error.name}
				/>
				<TextField 
					className={classes.inputN} 
					variant="outlined" 
					required 
					label="Apellido" 
					name='last_name' 
					onChange={handleChange} 
					value={cursedForm.last_name}
					error={error.last_name}
				/>
			</div>
			<div className={classes.input}>
				<FormControl variant='outlined' className={classes.inputTipoId}>
					<InputLabel id='demo-simple-select-outlined-label'>Tipo</InputLabel>
					<Select 
            value={cursedForm.id_ident_type} 
						onChange={handleSelect} 
						name='id_ident_type' 
						label='Tipo'>
						<MenuItem value='1'>V</MenuItem>
						<MenuItem value='2'>E</MenuItem>
						<MenuItem value='3'>J</MenuItem>
						<MenuItem value='4'>R</MenuItem>
						<MenuItem value='5'>P</MenuItem>
					</Select>
				</FormControl>
				<TextField 
					className={classes.inputDoc} 
					variant="outlined" 
					required 
					label="C.I." 
					name='ident_num'
					onChange={handleChange} 
					value={cursedForm.ident_num}
					error={error.ident_num}
				/>
				<Button
					className={classes.imgIdent}
					variant="contained"
					//color="secondary"
					component="label"
				>
				{imagesForm.rc_ident_card.name !== '' ? (
					<p className="nameImg" >{imagesForm.rc_ident_card.name.slice(0, 10)}...</p>
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
					name="rc_ident_card"
					accept="image/png, image/jpeg"
					onChange={handleChangeImages}
				/>
				</Button>
			</div>
			<TextField 
				className={classes.input} 
				variant="outlined" 
				required 
				label="Telefono" 
				name='phone1' 
				onChange={handleChange} 
				value={cursedForm.phone1}
				error={error.phone1}
			/>
			<TextField 
				className={classes.input}
				variant="outlined"
				required 
				label="Telefono"
				name='phone2'
				onChange={handleChange}
				value={cursedForm.phone2}
				error={error.phone2}
			/>
			<div className={classes.input}>
				<b
				className={classes.inputText}>
					Referencia Personal
				</b>
				<Button
					className={classes.imgStep1}
					variant="contained"
					component="label"
				>
					{imagesForm.rc_ref_perso.name  !== '' ?
							<>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
								<p className="nameImg" >{imagesForm.rc_ref_perso.name.slice(0, 10)}...</p>
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
						name="rc_ref_perso"
						accept="image/png, image/jpeg"
						onChange={handleChangeImages}
					/>
				</Button>
			</div>
    </>
  )
}


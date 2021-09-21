import React  from "react"
import TextField from '@material-ui/core/TextField';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

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

export const Step1: React.FC<any> = ({
	namesImages,
	listIdentType,
	cursedForm,
	error,
	validEmailIdent,
	imagesForm,
	setCursedForm,
	handleChange,
	handleChangeImages,
	handleBlurEmailIdent,
	validateForm
}) => {
	const classes = useStylesFM();
	const fm: any = useSelector((state: RootState) => state.fm);

	const handleSelect = (event: any) => {
		setCursedForm({
			...cursedForm,
			[event.target.name]: event.target.value,
		});
		validateForm(event.target.name, event.target.value);
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
				onBlur={handleBlurEmailIdent}
				value={cursedForm.email} 
				error={error.email || validEmailIdent}
			/>
			<div className={classes.input}>
				<FormControl variant='outlined' className={classes.inputTipoId} >
					<InputLabel>DI</InputLabel>
					<Select 
            value={cursedForm.id_ident_type} 
						onChange={handleSelect} 
						onBlur={handleBlurEmailIdent}
						name='id_ident_type' 
						error={validEmailIdent}
						label='Tipo'>
						{listIdentType.map( (item:any) =>  (
							<MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
						))
						}
					</Select>
				</FormControl>
				<TextField 
					className={classes.inputDoc} 
					variant="outlined" 
					required 
					label="C.I." 
					name='ident_num'
					onChange={handleChange} 
					onBlur={handleBlurEmailIdent}
					value={cursedForm.ident_num}
					error={error.ident_num || validEmailIdent}
				/>
				<Button
					className={classes.imgIdent}
					variant="contained"
					//color="secondary"
					component="label"
					disabled={fm.mashClient}
				>
				{imagesForm.rc_ident_card !== null ? (
					<p className="nameImg" >{namesImages.rc_ident_card.slice(0, 7)} ...</p>
				):(
					<>
						<b className="textSubir">Subir</b>
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
					accept="image/png, image/jpeg, image/jpg"
					onChange={handleChangeImages}
				/>
				</Button>
			</div>
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
					disabled={fm.mashClient}
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
					disabled={fm.mashClient}
				/>
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
				disabled={fm.mashClient}
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
				disabled={fm.mashClient}
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
					disabled={fm.mashClient}
				>
					{imagesForm.rc_ref_perso !== null ?
							<>
								<IconButton aria-label="upload picture" component="span">
									<PhotoCamera />
								</IconButton>
								<p className="nameImg" >{namesImages.rc_ref_perso.slice(0, 10)}...</p>
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
						accept="image/png, image/jpeg, image/jpg"
						onChange={handleChangeImages}
					/>
				</Button>
			</div>
    </>
  )
}


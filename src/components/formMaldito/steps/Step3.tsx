import React from "react"

//Materail
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useStylesFM } from '../styles';

export const Step3: React.FC<any> = ({
	listLocation,
	location,
	setLocation,
	cursedForm,
	setCursedForm,
	handleChange,
}) => {

	const classes = useStylesFM();

	const handleSelect= (event: any, value: any, item: string) => {
		if(value){
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id
			});
			setLocation({
				...location,
				[item]: value 
			});
		} else{
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0
			});
			setLocation({
				...location,
				[item]: null
			});
		}
	};

  return (
    <>
			<div className={classes.input}>
				<Autocomplete
						className={classes.inputM}
						onChange={(event,value) => {
							handleSelect(event,value,'estado') 
						}}
						value={location.estado || null}
						options={listLocation.estado}
						getOptionLabel={(option:any) => option.estado ? option.estado : ''}
						renderInput={(params:any) => <TextField {...params}  name="estado" label="Estado" variant="outlined" />}
					/>
				<Autocomplete
						className={classes.inputN}
						onChange={(event,value) => handleSelect(event,value,'ciudad')}
						value={location.ciudad || null}
						options={listLocation.ciudad}
						getOptionLabel={(option:any) => option.ciudad ? option.ciudad : ''}
						renderInput={(params:any) => <TextField {...params}  name="ciudad" label="Ciudad" variant="outlined" />}
					/>
			</div>
			<div className={classes.input}>
				<Autocomplete
						className={classes.inputM}
						onChange={(event,value) => handleSelect(event,value,'municipio')}
						value={location.municipio || null}
						options={listLocation.municipio}
						getOptionLabel={(option:any) => option.municipio ?  option.municipio : ''}
						renderInput={(params:any) => <TextField {...params}  name="municipio" label="Municipio" variant="outlined" />}
					/>
				<Autocomplete
						className={classes.inputN}
						onChange={(event,value) => handleSelect(event, value, 'parroquia')}
						value={location.parroquia || null}
						options={listLocation.parroquia}
						getOptionLabel={(option:any) => option.parroquia ?  option.parroquia : ''} 
						renderInput={(params:any) => <TextField {...params}  name="parroquia" label="Parroquia" variant="outlined" />}
					/>
			</div>
			<div className={classes.input}>
			<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Sector" name='sector' onChange={handleChange} value={cursedForm.sector} />
			<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Calle" name='calle' onChange={handleChange} value={cursedForm.calle} />
			</div>
			<div className={classes.input}>
			<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Local" name='local' onChange={handleChange} value={cursedForm.local} />
			</div>
    </>
  )
}



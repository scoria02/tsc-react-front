import React from "react"

//Materail
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useStylesFM } from '../styles';

export const Step3: React.FC<any> = ({
	listLocation,
	location,
	setLocation,
	listLocationPos,
	locationPos,
	setLocationPos,
	cursedForm,
	setCursedForm,
	handleChange,
}) => {

	const classes = useStylesFM();

	const handleSelectPos = (event: any, value: any, item: string) => {
		if(value){
			setCursedForm({
				...cursedForm,
				[`id_${item}_pos`]: value.id
			});
			setLocationPos({
				...locationPos,
				[item]: value 
			});
		} else{
			setCursedForm({
				...cursedForm,
				[`id_${item}_pos`]: 0
			});
			setLocationPos({
				...locationPos,
				[item]: null
			});
		}
	};

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
    <div className="container-location">
			<div>
				<h2>Ubicacion del Comercio</h2>
				<div className={classes.input}>
					<Autocomplete
							className={classes.inputM}
							onChange={(event,value) => {
								handleSelect(event,value,'estado') 
							}}
							value={location.estado || null}
							options={listLocation.estado}
							getOptionLabel={(option:any) => option.estado ? option.estado : ''}
							renderInput={(params:any) => 
								<TextField {...params} 
									name="estado" 
									label="Estado" 
									variant="outlined" 
								/>
							}
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
				<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Codigo Postal" name='codigo_postal' onChange={handleChange} value={cursedForm.codigo_postal} />
				</div>
			</div>
			<div>
				<h2>Ubicacion del POS</h2>
				<div className={classes.input}>
					<Autocomplete
							className={classes.inputM}
							onChange={(event,value) => {
								handleSelectPos(event,value,'estado') 
							}}
							options={listLocationPos.estado}
							value={locationPos.estado || null}
							getOptionLabel={(option:any) => option.estado ? option.estado : ''}
							renderInput={(params:any) => <TextField {...params}  name="estado" label="Estado" variant="outlined" />}
						/>
					<Autocomplete
							className={classes.inputN}
							onChange={(event,value) => handleSelectPos(event,value,'ciudad')}
							options={listLocationPos.ciudad}
							value={locationPos.ciudad || null}
							getOptionLabel={(option:any) => option.ciudad ? option.ciudad : ''}
							renderInput={(params:any) => <TextField {...params}  name="ciudad" label="Ciudad" variant="outlined" />}
						/>
				</div>
				<div className={classes.input}>
					<Autocomplete
							className={classes.inputM}
							onChange={(event,value) => handleSelectPos(event,value,'municipio')}
							value={locationPos.municipio || null}
							options={listLocationPos.municipio}
							getOptionLabel={(option:any) => option.municipio ?  option.municipio : ''}
							renderInput={(params:any) => <TextField {...params}  name="municipio" label="Municipio" variant="outlined" />}
						/>
					<Autocomplete
							className={classes.inputN}
							onChange={(event,value) => handleSelectPos(event, value, 'parroquia')}
							options={listLocationPos.parroquia}
							value={locationPos.parroquia || null}
							getOptionLabel={(option:any) => option.parroquia ?  option.parroquia : ''} 
							renderInput={(params:any) => <TextField {...params}  name="parroquia" label="Parroquia" variant="outlined" />}
						/>
				</div>
				<div className={classes.input}>
				<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Sector" name='sector_pos' onChange={handleChange} value={cursedForm.sector_pos} />
				<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Calle" name='calle_pos' onChange={handleChange} value={cursedForm.calle_pos} />
				</div>
				<div className={classes.input}>
				<TextField className={classes.inputM} variant="outlined" required id="standard-required" label="Local" name='local_pos' onChange={handleChange} value={cursedForm.local_pos} />
				<TextField className={classes.inputN} variant="outlined" required id="standard-required" label="Codigo Postal" name='codigo_postal_pos' onChange={handleChange} value={cursedForm.codigo_postal_pos} />
				</div>
			</div>
		</div>
  )
}



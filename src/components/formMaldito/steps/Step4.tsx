import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useStylesFM } from '../styles';


//Pedido
export const Step4: React.FC<any> = ({
	listLocationPos,
	listModelPos,
	locationPos,
	setLocationPos,
	listPayment, 
	error,
	payment,
	modelPos,
	setPayment,
	setModelPost,
	cursedForm,
	setCursedForm,
	handleChange,
}) => {
	const classes = useStylesFM();

	const handleSelect= (event: any, value: any, item: string) => {
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

	const handleSelectPayment = (event: any, value: any, item: string) => {
		if(value){
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id
			});
			setPayment(value);
		} else{
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0
			});
			setPayment(null);
		}
	};

	const handleSelectPos= (event: any, value: any, item: string) => {
		if(value){
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id
			});
			setModelPost(value);
		} else{
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0
			});
			setModelPost(null);
		}
	};

  return (
    <>
			<div className={classes.input}>
				<TextField
					className={classes.inputMP} 
					variant="outlined" 
					required 
					id="standard-required" 
					label="Numero de Puntos" 
					type="number"
					name='number_post'
					onChange={handleChange} 
					error={error.number_post}
					value={cursedForm.number_post}/>
					<Autocomplete
							className={classes.inputNP}
							onChange={(event,value) => handleSelectPos(event,value, 'model_post')}
							value={modelPos || null}
							options={listModelPos}
							getOptionLabel={(option:any) => option.name ? option.name: ''}
							renderInput={(params:any) => <TextField {...params}  name="model_post" label="Modelo de los POS" variant="outlined" />}
					/>
			</div>
			<Autocomplete
					className={classes.input}
					onChange={(event,value) => handleSelectPayment(event,value, 'payment_method')}
					options={listPayment}
					value={payment || null}
					getOptionLabel={(option:any) => option.name ? option.name : ''}
					renderInput={(params:any) => <TextField {...params}  name="payment_method" label="Forma de Pago" variant="outlined" />}
			/>
			<div className={classes.input}>
				<Autocomplete
						className={classes.inputM}
						onChange={(event,value) => {
							handleSelect(event,value,'estado') 
						}}
						options={listLocationPos.estado}
						value={locationPos.estado || null}
						getOptionLabel={(option:any) => option.estado ? option.estado : ''}
						renderInput={(params:any) => <TextField {...params}  name="estado" label="Estado" variant="outlined" />}
					/>
				<Autocomplete
						className={classes.inputN}
						onChange={(event,value) => handleSelect(event,value,'ciudad')}
						options={listLocationPos.ciudad}
						value={locationPos.ciudad || null}
						getOptionLabel={(option:any) => option.ciudad ? option.ciudad : ''}
						renderInput={(params:any) => <TextField {...params}  name="ciudad" label="Ciudad" variant="outlined" />}
					/>
			</div>
			<div className={classes.input}>
				<Autocomplete
						className={classes.inputM}
						onChange={(event,value) => handleSelect(event,value,'municipio')}
						value={locationPos.municipio || null}
						options={listLocationPos.municipio}
						getOptionLabel={(option:any) => option.municipio ?  option.municipio : ''}
						renderInput={(params:any) => <TextField {...params}  name="municipio" label="Municipio" variant="outlined" />}
					/>
				<Autocomplete
						className={classes.inputN}
						onChange={(event,value) => handleSelect(event, value, 'parroquia')}
						options={listLocationPos.parroquia}
						value={locationPos.parroquia || null}
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

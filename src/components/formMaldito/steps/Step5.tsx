import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useStylesFM } from '../styles';


//Pedido
export const Step5: React.FC<any> = ({
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
		</>
  )
}

import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { FC, useContext } from 'react';
import { FMContext } from '../../../context/FM/FMContext';
import { useStylesFM } from '../styles';

const typesSolicts = [
	{
		id: 0,
		name: 'Nueva Solicitud',
	},
	{
		id: 1,
		name: 'Agregar Punto',
	},
	{
		id: 2,
		name: 'Agregar Punto 2',
	},
];

const StepBase: FC = () => {
	const classes = useStylesFM();

	const { typeSolict, selectTypeSolict }: any = useContext(FMContext);

	return (
		<div className='ed-container container-formMaldito'>
			<div className='container-form'>
				<FormControl fullWidth variant='outlined' className={classes.inputSelectSolict}>
					<InputLabel>Solicitudes</InputLabel>
					<Select
						value={typeSolict}
						onChange={(e) => selectTypeSolict(e.target.value)}
						name='typeSolict'
						label='TipoSolict'>
						{typesSolicts.map((item: any) => (
							<MenuItem key={item.id} value={item.id}>
								{item.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		</div>
	);
};

export default StepBase;

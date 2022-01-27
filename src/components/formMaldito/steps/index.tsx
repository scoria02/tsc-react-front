import { Button, FormControl, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
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
		name: 'Persona Natural',
	},
	{
		id: 2,
		name: 'Persona Juridica',
	},
	{
		id: 3,
		name: 'Firma Personal',
	},
	{
		id: 4,
		name: 'Punto/Pos Extra',
	},
];

const StepBase: FC = () => {
	const classes = useStylesFM();

	const { typeSolict, selectTypeSolict }: any = useContext(FMContext);

	return (
		<div className='ed-container container-formMaldito'>
			<div className='container-form'>
				<div
					style={{
						marginTop: '5rem',
					}}
					className={classes.input}>
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
					<Button
						className={classes.imgIdent}
						variant='contained'
						/*
								style={{
									opacity: fm.imagesCommerce ? 0 : 1,
									background: imagesActa.length ? '#5c62c5' : '#f44336',
								}}
								*/
						component='label'>
						<IconButton aria-label='upload picture' component='span'>
							<PhotoCamera />
						</IconButton>
						<input
							type='file'
							hidden
							multiple
							name='rc_constitutive_act'
							//accept={recaudo.acc}
							//onChange={handleChangeImagesMulti}
						/>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default StepBase;

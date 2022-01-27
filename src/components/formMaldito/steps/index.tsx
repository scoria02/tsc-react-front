import { Button, FormControl, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core';
import BackUpIcon from '@material-ui/icons/Backup';
import { FC, useContext } from 'react';
import { FMContext } from '../../../context/FM/FMContext';
import { useStylesFM } from '../styles';

const typesSolicts = [
	{
		id: 0,
		name: 'Persona Natural',
		steps: [
			'client',
			'commerce', //cambiar list docu ident client + un digito,foto va,Contriu no va, acta no va
			'pos',
		],
	},
	{
		id: 1,
		name: 'Persona Juridica',
		steps: [
			'client',
			'commerce', //J obligura, comercio acta constitu,
			'pos',
		],
	},
	{
		id: 2,
		name: 'Firma Personal',
		steps: ['client', 'commerce', 'actaConst', 'pos'],
		//normal, comercio acta constitu,
	},
	{
		id: 3,
		name: 'Punto/Pos Extra',
		steps: ['client-commerce', 'pos'],
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
							<BackUpIcon />
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

import { Button, TextField, Typography } from '@mui/material';
import { FC, useContext } from 'react';
//sytles
import { useStylesFM } from '../styles';
import FMContextData from 'context/FM/FMContextData';

const InfoGeneral: FC = () => {
	const classes = useStylesFM();

	const { handleChangeStep, client, commerce, codeFM } = useContext(FMContextData);

	return (
		<>
			<div className={classes.grid}>
				<div className={classes.grid}>
					<div className={classes.input}>
						<TextField variant='outlined' required label='Code' autoComplete='off' name='code' value={codeFM} />
					</div>
					<div className={classes.input}>
						<Button
							sx={{
								mr: 2,
							}}
							size='large'
							variant='contained'
							onClick={() => handleChangeStep('Comercio')}
							color='success'>
							<span className={classes.textButton}>xxx</span>
						</Button>
						<TextField
							className={classes.inputTextLeft}
							variant='outlined'
							required
							label='Rif'
							autoComplete='off'
							name='ident_num_commerce'
							value={`${commerce.id_ident_type.name}${commerce.ident_num}`}
						/>
					</div>
				</div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<Typography sx={{ mr: 1, width: '10rem' }}>Comercio</Typography>
						<TextField
							className={classes.inputTextLeft}
							variant='outlined'
							required
							label='Nombre'
							autoComplete='off'
							name='ident_num_commerce'
							value={commerce.name}
						/>
					</div>
					<div className={classes.input}>
						<Button
							sx={{
								mr: 2,
							}}
							size='large'
							variant='outlined'
							onClick={() => handleChangeStep('Comercio')}
							color='success'>
							{`${commerce.id_ident_type.name}${commerce.ident_num}`}
						</Button>
					</div>
					<div className={classes.input}>
						<Typography sx={{ mr: 1, width: '10rem' }}>Cliente</Typography>
						<TextField
							className={classes.inputTextLeft}
							variant='outlined'
							required
							label='Nombre'
							autoComplete='off'
							name='ident_num_commerce'
							value={`${client?.name} ${client?.last_name}`}
						/>
					</div>
					<div className={classes.input}>
						<Button
							sx={{
								mr: 2,
							}}
							size='large'
							variant='outlined'
							onClick={() => handleChangeStep('Comercio')}
							color='success'>
							{`${commerce.id_ident_type.name}${commerce.ident_num}`}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default InfoGeneral;

import { Button, TextField, Typography } from '@mui/material';
import { FC, useContext } from 'react';
//sytles
import { useStylesFM, sxStyled } from '../styles';
import FMContextData from 'context/FM/FMContextData';
import TableStatusFM from './table/TableStatusFM';
import { DateTime } from 'luxon';

const InfoGeneral: FC = () => {
	const classes = useStylesFM();

	const { handleExistStep, handleChangeStep, client, commerce, codeFM, solic } = useContext(FMContextData);
	//console.log(solic);

	return (
		<>
			<div className={classes.grid}>
				<div className={classes.gridBorder}>
					<div className={classes.input}>
						<TextField
							sx={sxStyled.inputLeft}
							variant='outlined'
							label='Code'
							autoComplete='off'
							name='code'
							value={codeFM}
						/>
						<TextField
							variant='outlined'
							label='Fecha de Creacion'
							autoComplete='off'
							name='date'
							value={DateTime.fromISO(solic.createdAt.toString()).toFormat('dd/LL/yyyy').toLocaleString().trim()}
						/>
					</div>
					<div className={classes.input}></div>
					<div className={classes.input}>
						{handleExistStep('Planilla de Solicitud') ? (
							<Button
								sx={{
									mr: 2,
									textTransform: 'none',
								}}
								size='large'
								variant='outlined'
								onClick={() => handleChangeStep('Planilla de Solicitud')}
								color='success'>
								Planilla de Solicitud
							</Button>
						) : null}
					</div>
					<div></div>
					<div>
						<TableStatusFM status={solic.status} />
					</div>
				</div>
				<div className={classes.grid}>
					<div className={classes.input}>
						<Typography sx={{ mr: 1, width: '10rem' }}>
							<b>Comercio</b>
						</Typography>
						<TextField
							sx={{
								width: '20rem',
							}}
							className={classes.inputTextLeft}
							variant='outlined'
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
						<Typography sx={{ mr: 1, width: '10rem' }}>
							<b>Cliente</b>
						</Typography>
						<TextField
							sx={{
								width: '20rem',
							}}
							className={classes.inputTextLeft}
							variant='outlined'
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
							onClick={() => handleChangeStep('Cliente')}
							color='success'>
							{`${client?.id_ident_type.name}${client?.ident_num}`}
						</Button>
					</div>
					<div className={classes.input}>
						<Button
							sx={{
								//ml: 20,
								ml: 30,
							}}
							size='large'
							variant='outlined'
							onClick={() => handleChangeStep('Pos')}
							color='primary'>
							POS
						</Button>
					</div>
					<div className={classes.input}></div>
				</div>
			</div>
		</>
	);
};

export default InfoGeneral;

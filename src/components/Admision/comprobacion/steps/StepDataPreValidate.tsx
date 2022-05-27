import { TextField } from '@mui/material';
import FMValidDataContext from 'context/Admision/Validation/FMValidDataContext';
import { FC, useContext } from 'react';
//sytles
import { sxStyled, useStylesFM } from '../styles';

const StepDataPreValidate: FC = () => {
	const classes = useStylesFM();

	const { client, commerce } = useContext(FMValidDataContext);

	return (
		<>
			<div className={classes.grid2}>
				<h2
					style={{
						marginTop: '10px',
						marginBottom: '5px',
						fontSize: '20px',
						marginRight: '10px',
					}}>
					El ya fue validado
				</h2>
				<div className={classes.input}>
					<TextField
						className={classes.inputText}
						sx={sxStyled.inputLeft}
						variant='outlined'
						label='CI'
						autoComplete='off'
						name='ident_num'
						value={`${client?.id_ident_type.name} ${client?.ident_num}`}
					/>
					<TextField
						className={classes.inputText}
						type='text'
						sx={sxStyled.inputLeft}
						variant='outlined'
						label='Nombre del Cliente'
						autoComplete='off'
						name='name'
						value={client?.name}
					/>
					<TextField
						className={classes.inputText}
						sx={sxStyled.inputLeft}
						type='text'
						variant='outlined'
						label='Apellido del Cliente'
						name='last_name'
						value={client?.last_name}
					/>
				</div>
				{commerce.validate ? (
					<>
						<h2
							style={{
								marginTop: '10px',
								fontSize: '20px',
								marginBottom: '5px',
								marginRight: '10px',
							}}>
							El comercio ya fue validado
						</h2>
						<div className={classes.input}>
							<TextField
								className={classes.inputText}
								sx={sxStyled.inputLeft}
								variant='outlined'
								label='Rif'
								autoComplete='off'
								name='ident_num'
								value={`${commerce?.id_ident_type.name} ${commerce?.ident_num}`}
							/>
							<TextField
								className={classes.inputText}
								type='text'
								sx={sxStyled.inputLeft}
								variant='outlined'
								label='Nombre del Commercio'
								autoComplete='off'
								name='name'
								value={commerce?.name}
							/>
						</div>
					</>
				) : null}
			</div>
		</>
	);
};

export default StepDataPreValidate;

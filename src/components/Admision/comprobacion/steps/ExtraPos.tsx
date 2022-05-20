import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import DataListContext from 'context/DataList/DataListContext';
import FMDataContext from 'context/FM/fmAdmision/FmContext';
import React, { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
//sytles
import { sxStyled, useStylesFM } from '../styles';

const StepExtraPos: FC = () => {
	const classes = useStylesFM();
	const fm: any = useSelector((state: RootState) => state.fm);

	//Context
	const {
		errorsClient,
		errorsCommerce,
		client,
		commerce,
		handleChangeCommerce,
		handleChangeClient,
		handleSelectIdentClient,
		handleSelectIdentCommerce,
	} = useContext(FMDataContext);

	const { listIdentType } = useContext(DataListContext);

	const handleIdentNum = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
			handleChangeClient(event);
		}
	};

	const handleIdentNumCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
			handleChangeCommerce(event);
		}
	};

	return (
		<>
			<div className={classes.grid2}>
				<h2
					style={{
						marginTop: '10px',
						fontSize: '20px',
						marginRight: '10px',
					}}>
					Cliente
				</h2>
				<div className={classes.input}>
					<FormControl sx={sxStyled.inputSelect} className={classes.inputSelect}>
						<Select
							onChange={(event: any) => handleSelectIdentClient('id_ident_type', event.target.value)}
							variant='outlined'
							value={client.id_ident_type}
							name='id_ident_type'
							//error={validEmailIdent}
							label='Tipo'>
							{listIdentType.map((item: any) => {
								if (item.name === 'J') return null;
								return (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<TextField
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						variant='outlined'
						required
						label='C.I.'
						autoComplete='off'
						name='ident_num'
						onChange={handleIdentNum}
						value={client.ident_num}
						error={errorsClient.ident_num}
						inputProps={{
							maxLength: client.id_ident_type === 5 ? 20 : 9,
						}}
					/>
				</div>
				<h2
					style={{
						marginTop: '10px',
						fontSize: '20px',
						marginRight: '10px',
					}}>
					Comercio
				</h2>
				<div className={classes.input}>
					<FormControl sx={sxStyled.inputSelect} className={classes.inputSelect}>
						<Select
							onChange={(event: any) => handleSelectIdentCommerce('id_ident_type', event.target.value)}
							variant='outlined'
							value={commerce.id_ident_type}
							name='id_ident_type'
							label='Tipo'
							error={fm.errorCommerce}
							placeholder=''>
							{listIdentType.map((item: any) => {
								return (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<TextField
						className={classes.inputTextLeft}
						sx={sxStyled.inputSelect}
						variant='outlined'
						required
						id='standard-required'
						label={commerce.id_ident_type === 3 ? 'Numero de Rif' : 'C.I.'}
						name='ident_num'
						onChange={handleIdentNumCommerce}
						value={commerce.ident_num}
						error={errorsCommerce.ident_num}
						inputProps={{
							maxLength: commerce.id_ident_type === 5 ? 20 : 9,
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default StepExtraPos;

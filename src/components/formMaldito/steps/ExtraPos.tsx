import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React, { useContext, FC } from 'react';
import { useSelector } from 'react-redux';
import DataListContext from '../../../context/DataList/DataListContext';
import FMDataContext from '../../../context/FM/fmAdmision/FmContext';
import { RootState } from '../../../store/store';
//sytles
import { useStylesFM } from '../styles';

const ExtraPos: FC = () => {
	const classes = useStylesFM();
	const fm: any = useSelector((state: RootState) => state.fm);

	//Context
	const {
		errorsClient,
		errorsCommerce,
		typeSolict,
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
					<FormControl variant='outlined' className={classes.inputSelect}>
						<InputLabel>DI</InputLabel>
						<Select
							value={client.id_ident_type}
							onChange={handleSelectIdentClient}
							name='id_ident_type'
							//error={validEmailIdent}
							label='Tipo'>
							{listIdentType.map((item: any) => {
								if (item.name === 'J') return;
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
					<FormControl variant='outlined' className={classes.inputSelect}>
						<InputLabel id='demo-simple-select-outlined-label'>Doc.</InputLabel>
						<Select
							disabled={typeSolict === 0 || typeSolict === 1}
							value={commerce.id_ident_type}
							onChange={handleSelectIdentCommerce}
							name='id_ident_type'
							label='Tipo'
							error={fm.errorCommerce}
							placeholder=''>
							{listIdentType.map((item: any) => {
								if ((typeSolict === 1 || typeSolict === 2) && item.name !== 'J') return;
								return (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<TextField
						disabled={typeSolict === 0 ? true : false}
						className={classes.inputTextLeft}
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

export default ExtraPos;

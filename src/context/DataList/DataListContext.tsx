/* eslint-disable no-unused-vars */
import { INIT_LIST } from './types';
import { createContext, useReducer, useLayoutEffect, ReactChild, ReactChildren } from 'react';

import DatalistReducer from './DatalistReducer';
import axios from '../../config';

import { InterFaceStateList, base } from './interface';

export const DataListContext = createContext({});

interface Props {
	children: ReactChild | ReactChildren;
}

const DataListProvider = ({ children }: Props) => {
	const listRequestS: base[] = [
		{
			id: 1,
			name: 'Referido',
		},
		{
			id: 2,
			name: 'ACI',
		},
		{
			id: 3,
			name: 'Call Center',
		},
		{
			id: 4,
			name: 'Feria',
		},
		{
			id: 5,
			name: 'Pagina WEB',
		},
	];

	const listTPay: base[] = [
		{
			id: 1,
			name: 'De Contado',
		},
		{
			id: 2,
			name: 'Inicial',
		},
	];

	const initialState: InterFaceStateList = {
		listIdentType: [],
		listActivity: [],
		listPayment: [],
		listModelPos: [],
		listTypePay: listTPay,
		listRequestSource: listRequestS,
	};

	const [state, dispatch] = useReducer(DatalistReducer, initialState);

	const getters = async (routes: string[]) => {
		try {
			const stop = routes.map(async (route: string) => {
				return await axios.get(route, {
					baseURL: process.env.REACT_APP_API_API,
					headers: { common: { token: localStorage.getItem('token') } },
				});
			});

			const resps = await Promise.all(stop);

			return resps;
		} catch (err) {
			console.error('en getters', err);

			return [];
		}
	};

	const initList = (arrayData: any[]) => {
		dispatch({
			type: INIT_LIST,
			payload: arrayData,
		});
	};

	useLayoutEffect(() => {
		const routes = [`/ident_type`, `/activity`, `/payment/all`, `/products`];
		getters(routes)
			.then((responses) => {
				initList(responses);
			})
			.catch((errors) => {
				console.log('error multi axos', errors);
			});
	}, []);

	return (
		<DataListContext.Provider
			value={{
				...state,
			}}>
			{children}
		</DataListContext.Provider>
	);
};

export default DataListProvider;

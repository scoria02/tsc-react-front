/* eslint-disable no-unused-vars */
import { createContext, ReactChild, ReactChildren, useLayoutEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import useAxios from 'config/index';
import { Aci, base } from './interface';

interface Props {
	children: ReactChild | ReactChildren;
}

interface ContextDataListAdmision {
	listRazon: base[];
	listAci: Aci[];
}

const DataListAdmisionContext = createContext<ContextDataListAdmision>({
	listRazon: [],
	listAci: [],
});

export const DataListAdmisionProvider = ({ children }: Props) => {
	const [listRazon, setListRazon] = useState<base[]>([]);
	const [listAci, setListAci] = useState<Aci[]>([]);

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

	const initList = (array: any[]) => {
		setListRazon(array[0].data.info);
		setListAci(array[1].data.info);
	};

	useLayoutEffect(() => {
		const routes = [`/type_diferido`, `/aci&distribuidores`];
		getters(routes)
			.then((responses) => {
				initList(responses);
			})
			.catch((errors) => {
				console.log('error multi axos', errors);
			});
	}, []);

	return (
		<DataListAdmisionContext.Provider
			value={{
				listRazon,
				listAci,
			}}>
			{children}
		</DataListAdmisionContext.Provider>
	);
};

export default DataListAdmisionContext;

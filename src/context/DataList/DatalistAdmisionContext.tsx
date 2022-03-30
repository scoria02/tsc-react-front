/* eslint-disable no-unused-vars */
import { createContext, ReactChild, ReactChildren, useLayoutEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import useAxios from 'config/index';
import { base } from './interface';

interface Props {
	children: ReactChild | ReactChildren;
}

interface ContextDataListAdmision {
	listRazon: base[];
}

const DataListAdmisionContext = createContext<ContextDataListAdmision>({
	listRazon: [],
});

export const DataListAdmisionProvider = ({ children }: Props) => {
	const [listRazon, setListRazon] = useState<base[]>([]);

	const getData = async () => {
		try {
			const res: AxiosResponse<any> = await useAxios.get(`/type_diferido`);
			setListRazon(res.data.info);
		} catch (err) {
			console.log(err);
		}
	};

	useLayoutEffect(() => {
		getData();
	}, []);

	return (
		<DataListAdmisionContext.Provider
			value={{
				listRazon,
			}}>
			{children}
		</DataListAdmisionContext.Provider>
	);
};

export default DataListAdmisionContext;

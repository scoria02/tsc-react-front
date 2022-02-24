/* eslint-disable no-unused-vars */
import { createContext, useLayoutEffect, ReactChild, ReactChildren, useState } from 'react';

import axios from '../../config';

import { base, Activity, Products, Aci, TypeWallet, TeleMarket } from './interface';
import { listRequestS, listTPay } from './state';

interface Props {
	children: ReactChild | ReactChildren;
}

interface ContextDataList {
	listIdentType: base[];
	listActivity: Activity[];
	listPayment: base[];
	listModelPos: Products[];
	listTypePay: base[];
	listRequestSource: base[];
	listAci: Aci[];
	listTypesSolicts: base[];
	listWalletType: TypeWallet[];
	listTeleMarket: TeleMarket[];
}

const DataListContext = createContext<ContextDataList>({
	listIdentType: [],
	listActivity: [],
	listPayment: [],
	listModelPos: [],
	listTypePay: [],
	listRequestSource: [],
	listAci: [],
	listTypesSolicts: [],
	listWalletType: [],
	listTeleMarket: [],
});

export const DataListProvider = ({ children }: Props) => {
	const [listIdentType, setListIdentType] = useState<base[]>([]);
	const [listActivity, setListActivity] = useState<Activity[]>([]);
	const [listPayment, setListPayment] = useState<base[]>([]);
	const [listModelPos, setListModelPos] = useState<Products[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [listTypePay, setListTypePay] = useState<base[]>(listTPay);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [listRequestSource, setListRequestSource] = useState<base[]>(listRequestS);
	const [listAci, setListAci] = useState<Aci[]>([]);
	const [listTypesSolicts, setListTypesSolicts] = useState<base[]>([]);
	const [listWalletType, setListWalletType] = useState<TypeWallet[]>([]);
	const [listTeleMarket, setListTeleMarket] = useState<TeleMarket[]>([]);

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
		setListIdentType(array[0].data.info);
		setListActivity(array[1].data.info);
		setListPayment(array[2].data.info);
		setListModelPos(array[3].data.info);
		setListAci(array[4].data.info);
		setListTypesSolicts(array[5].data.info);
		setListWalletType(array[6].data.info);
		setListTeleMarket(array[7].data.info);
	};

	useLayoutEffect(() => {
		const routes = [
			`/ident_type`,
			`/activity`,
			`/payment/all`,
			`/products`,
			`/aci`,
			`/types_solict`,
			`/tipo_de_carteras`,
			`/telemarket`,
		];
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
				listIdentType,
				listActivity,
				listPayment,
				listModelPos,
				listTypePay,
				listRequestSource,
				listAci,
				listTypesSolicts,
				listWalletType,
				listTeleMarket,
			}}>
			{children}
		</DataListContext.Provider>
	);
};

export default DataListContext;

/* eslint-disable no-unused-vars */
import axios from 'config';
import { createContext, ReactChild, ReactChildren, useLayoutEffect, useState } from 'react';
import { Aci, Activity, base, Distributor, Products, TeleMarket, TypeWallet } from './interface';

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
	listDistributor: Distributor[];
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
	listDistributor: [],
});

export const DataListProvider = ({ children }: Props) => {
	const [listIdentType, setListIdentType] = useState<base[]>([]);
	const [listActivity, setListActivity] = useState<Activity[]>([]);
	const [listPayment, setListPayment] = useState<base[]>([]);
	const [listModelPos, setListModelPos] = useState<Products[]>([]);
	const [listTypePay, setListTypePay] = useState<base[]>([]);
	const [listRequestSource, setListRequestSource] = useState<base[]>([]);
	const [listAci, setListAci] = useState<Aci[]>([]);
	const [listTypesSolicts, setListTypesSolicts] = useState<base[]>([]);
	const [listWalletType, setListWalletType] = useState<TypeWallet[]>([]);
	const [listTeleMarket, setListTeleMarket] = useState<TeleMarket[]>([]);
	const [listDistributor, setListDistributor] = useState<Distributor[]>([]);

	const getters = async (routes: string[]) => {
		try {
			const stop = routes.map(async (route: string) => {
				return await axios.get(route, {
					baseURL: process.env.REACT_APP_API_API,
					headers: { Authorization: `${localStorage.getItem('token')}` },
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
		setListDistributor(array[8].data.info);
		setListTypePay(array[9].data.info);
		setListRequestSource(array[10].data.info);
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
			`/distribuidores`,
			`/type_pay`,
			`/request_source`,
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
				listDistributor,
			}}>
			{children}
		</DataListContext.Provider>
	);
};

export default DataListContext;

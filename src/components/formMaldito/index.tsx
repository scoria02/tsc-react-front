import React from 'react';
import FormM from './FormM';

import { DataListProvider } from '../../context/DataList/DataListContext';
import { LocationsProvider } from '../../context/Location/LocationsContext';
import { FMContextProvider } from '../../context/FMAdmision/fmContext';

export const FormMaldito: React.FC = () => {
	return (
		<DataListProvider>
			<LocationsProvider>
				<FMContextProvider>
					<FormM />
				</FMContextProvider>
			</LocationsProvider>
		</DataListProvider>
	);
};

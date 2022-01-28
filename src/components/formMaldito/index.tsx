import React from 'react';
import FMProvider from '../../context/FM/FMContext';
import DataListProvider from '../../context/DataList/DataListContext';
import LocationsProvider from '../../context/Location/LocationsContext';
import FormM from './FormM';

import { FMContextProvider } from '../../context/FMAdmision/fmContext';

export const FormMaldito: React.FC = () => {
	return (
		<DataListProvider>
			<LocationsProvider>
				<FMProvider>
					<FMContextProvider>
						<FormM />
					</FMContextProvider>
				</FMProvider>
			</LocationsProvider>
		</DataListProvider>
	);
};

import React from 'react';
import LocationsProvider from '../../context/Location/LocationsContext';
import FMProvider from '../../context/FM/FMContext';
import DataListProvider from '../../context/DataList/DataListContext';
import FormM from './FormM';

export const FormMaldito: React.FC = () => {
	return (
		<DataListProvider>
			<LocationsProvider>
				<FMProvider>
					<FormM/>
				</FMProvider>
			</LocationsProvider>
		</DataListProvider>
	);
};

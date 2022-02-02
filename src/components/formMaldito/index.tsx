import React from 'react';
import FormM from './FormM';

import { DataListProvider } from '../../context/DataList/DataListContext';
import { LocationsProvider } from '../../context/FM/Location/LocationsContext';
import { FMContextProvider } from '../../context/FM/fmAdmision/FmContext';
import { ImagesFmProvider } from '../../context/FM/fmImages/ImagesFmContext';

export const FormMaldito: React.FC = () => {
	return (
		<DataListProvider>
			<ImagesFmProvider>
				<LocationsProvider>
					<FMContextProvider>
						<FormM />
					</FMContextProvider>
				</LocationsProvider>
			</ImagesFmProvider>
		</DataListProvider>
	);
};

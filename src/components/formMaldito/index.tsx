import { DataListProvider } from 'context/DataList/DataListContext';
import { FMContextProvider } from 'context/FM/fmAdmision/FmContext';
import { ImagesFmProvider } from 'context/FM/fmImages/ImagesFmContext';
import { LocationsProvider } from 'context/FM/Location/LocationsContext';
import React from 'react';
import FormM from './FormM';

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

import { DataListProvider } from 'context/DataList/DataListContext';
import { FMContextProvider } from 'context/Admision/CreationFM/fmAdmision/FmContext';
import { ImagesFmProvider } from 'context/Admision/CreationFM/fmImages/ImagesFmContext';
import { LocationsProvider } from 'context/Admision/CreationFM/Location/LocationsContext';
import React from 'react';
import FormM from './components/FormM';

const FormMaldito: React.FC = () => {
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

export default FormMaldito;

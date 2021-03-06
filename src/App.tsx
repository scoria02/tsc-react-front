import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core';
import { esES } from '@material-ui/data-grid';
import { esES as coreesES } from '@material-ui/core/locale';

import './styles/styles.scss';
export * from './store/store';

const theme = createTheme(
	{
		palette: {},
	},
	esES,
	coreesES
);

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<AppRouter />
			</ThemeProvider>
		</Provider>
	);
}

export default App;

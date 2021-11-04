import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core';
import { esES as coreesES } from '@material-ui/core/locale';
import { esES } from '@material-ui/data-grid';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
import { SocketProvider } from './context/SocketContext';

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
		<SocketProvider>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<AppRouter />
				</ThemeProvider>
			</Provider>
		</SocketProvider>
	);
}

export default App;

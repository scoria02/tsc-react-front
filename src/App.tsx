import { esES as coreesES } from '@mui/material/locale';
import { ThemeProvider, unstable_createMuiStrictModeTheme as createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';
import { Provider } from 'react-redux';
import { SocketProvider } from './context/SocketContext';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
import './styles/styles.scss';

export * from './store/store';

const theme = createTheme(
	{
		palette: {
			primary: {
				main: '#2f3775',
				contrastText: '#ffffff',
			},
			secondary: {
				main: '#f44336',
			},
			info: {
				main: '#808080',
			},
		},
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

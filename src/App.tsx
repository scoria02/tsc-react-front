import { store } from './store/store';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';

import './styles/styles.scss';

function App() {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
}

export default App;

import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import configStore, { persistor } from './Redux/Store/index';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
	<Provider store={configStore}>
		{/* <PersistGate persistor={persistor} loading={<div>LOADING...</div>}>
		</PersistGate> */}
			<App />
	</Provider>,
	document.getElementById('root'),
);

reportWebVitals();

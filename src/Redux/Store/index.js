import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { productReducer, userReducer, searchReducer } from '../Reducer/index';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

export const initialState = {
	user: {
		firstName: '',
		lastName: '',
		email: '',
		avatar: '',
		password: '',
		role: 'USER',
		cart: [],
	},
	product: { stock: [], isLoading: true, isError: false },
	search: { stock: [], isLoading: true, isError: false },
};

const persistConfig = { key: 'root', storage: storage };

const bigReducer = combineReducers({
	user: userReducer,
	product: productReducer,
	search: searchReducer,
});

const persistBigReducer = persistReducer(persistConfig, bigReducer);

const configStore = createStore(
	persistBigReducer,
	initialState,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__(),
	),
);

export const persistor = persistStore(configStore);

export default configStore;

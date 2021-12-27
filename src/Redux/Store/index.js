import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import {
	productReducer,
	userReducer,
	singleProductReducer,
	searchReducer,
	commentsReducer,
} from '../Reducer/index';
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
		_id: '',
	},
	product: { stock: [], isLoading: true, isError: false },
	singleProduct: { product: [], isLoading: true, isError: false },
	search: { stock: [], isLoading: true, isError: false },
	comments: { comments: [], isLoading: true, isError: false },
};

const persistConfig = { key: 'root', storage: storage };

const bigReducer = combineReducers({
	user: userReducer,
	product: productReducer,
	search: searchReducer,
	singleProduct: singleProductReducer,
	comments: commentsReducer
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

// export const persistor = persistStore(configStore);

export default configStore;

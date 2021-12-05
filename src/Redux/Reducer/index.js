import { initialState } from '../Store/index';
import {
	SEARCH_PRODUCTS_ERROR,
	GET_PRODUCTS_ERROR,
	REMOVE_FROM_CART,
	SEARCH_PRODUCTS,
	ADD_USER_NAME,
	TOGGLE_LOADER,
	SEARCH_LOADER,
	GET_PRODUCTS,
	ADD_TO_CART,
} from '../Action/index';

export const userReducer = (state = initialState.user, action) => {
	switch (action.type) {
		case ADD_USER_NAME:
			return { ...state, userName: action.payload };
		case ADD_TO_CART:
			return { ...state, cart: [...state.cart, action.payload] };
		case REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter((i) => i !== action.payload),
			};
		default:
			return state;
	}
};

export const productReducer = (state = initialState.product, action) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return { ...state, stock: action.payload };
		case TOGGLE_LOADER:
			return { ...state, isLoading: action.payload };
		case GET_PRODUCTS_ERROR:
			return { ...state, isError: action.payload };
		default:
			return state;
	}
};

export const searchReducer = (state = initialState.search, action) => {
	switch (action.type) {
		case SEARCH_PRODUCTS:
			return { ...state, stock: action.payload };
		case SEARCH_LOADER:
			return { ...state, isLoading: action.payload };
		case SEARCH_PRODUCTS_ERROR:
			return { ...state, isError: action.payload };
		default:
			return state;
	}
};

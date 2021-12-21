import { initialState } from '../Store/index';
import {
	SEARCH_PRODUCTS_ERROR,
	GET_PRODUCTS_ERROR,
	REMOVE_FROM_CART,
	SEARCH_PRODUCTS,
	TOGGLE_LOADER,
	SEARCH_LOADER,
	GET_PRODUCTS,
	SEARCH_RESET,
	ADD_TO_CART,
	REGISTER,
	LOG_IN,
} from '../Action/index';

export const userReducer = (state = initialState.user, action) => {
	switch (action.type) {
		case LOG_IN:
			return { ...state, userName: action.payload };
		case REGISTER:
			return {
				...state,
				email: action.payload.email,
				avatar: action.payload.image,
				lastName: action.payload.lastName,
				password: action.payload.password,
				firstName: action.payload.firstName,
			};
		case ADD_TO_CART:
			return { ...state, cart: [...state.cart, action.payload] };
		case REMOVE_FROM_CART:
			return {
				...state,
				cart: [
					...state.cart.slice(0, action.payload),
					...state.cart.slice(action.payload + 1),
				],
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
			return { stock: action.payload };
		case SEARCH_RESET:
			return { stock: action.payload, isLoading: true };
		case SEARCH_LOADER:
			return { ...state, isLoading: action.payload };
		case SEARCH_PRODUCTS_ERROR:
			return { ...state, isError: action.payload };
		default:
			return state;
	}
};

export const SEARCH_PRODUCTS_ERROR = 'SEARCH_PRODUCTS_ERROR';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const TOGGLE_LOADER = 'TOGGLE_LOADER';
export const SEARCH_LOADER = 'SEARCH_LOADER';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const SEARCH_RESET = 'SEARCH_RESET';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REGISTER = 'REGISTER';
export const LOG_IN = 'LOG_IN';

export const removeFromCart = (index) => ({
	type: REMOVE_FROM_CART,
	payload: index,
});

export const addToCar = (toAdd) => ({
	type: ADD_TO_CART,
	payload: toAdd,
});

export const logIn = (userInfo) => ({
	type: LOG_IN,
	payload: userInfo,
});

export const register = (userInfo) => ({
	type: REGISTER,
	payload: userInfo,
});

export const getAllProducts = () => {
	return async (dispatch) => {
		searchReset();
		try {
			const resp = await fetch(
				'https://strive-jobs-api.herokuapp.com/jobs?limit=10',
			);
			if (resp.ok) {
				const data = await resp.json();
				dispatch({
					type: GET_PRODUCTS,
					payload: data.data,
				});

				dispatch({ type: TOGGLE_LOADER, payload: false });
			} else {
				console.log('Error fetching.');
				dispatch({ type: GET_PRODUCTS_ERROR });
				dispatch({ type: TOGGLE_LOADER, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: GET_PRODUCTS_ERROR });
			dispatch({ type: TOGGLE_LOADER, payload: false });
		}
	};
};

export const searchProducts = (name) => {
	return async (dispatch) => {
		try {
			const resp = await fetch(
				'https://strive-jobs-api.herokuapp.com/jobs?search=' +
					name +
					'&limit=15',
			);
			if (resp.ok) {
				const data = await resp.json();
				console.log(data.data);
				dispatch({
					type: SEARCH_PRODUCTS,
					payload: data.data,
				});

				dispatch({ type: SEARCH_LOADER, payload: false });
			} else {
				console.log('Error fetching.');
				dispatch({ type: SEARCH_PRODUCTS_ERROR });
				dispatch({ type: SEARCH_LOADER, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: SEARCH_PRODUCTS_ERROR });
			dispatch({ type: SEARCH_LOADER, payload: false });
		}
	};
};

export const searchReset = () => ({
	type: SEARCH_RESET,
	payload: [],
});

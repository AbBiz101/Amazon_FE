export const SEARCH_PRODUCTS_ERROR = 'SEARCH_PRODUCTS_ERROR';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const ADD_USER_NAME = 'ADD_USER_NAME';
export const TOGGLE_LOADER = 'TOGGLE_LOADER';
export const SEARCH_LOADER = 'SEARCH_LOADER';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';

export const removeFromCart = (index) => ({
	type: REMOVE_FROM_CART,
	payload: index,
});

export const addToCar = (toAdd) => ({
	type: ADD_TO_CART,
	payload: toAdd,
});

export const addUserName = (name) => ({
	type: ADD_USER_NAME,
	payload: name,
});

export const getAllProducts = () => {
	return async (dispatch) => {
		try {
			const resp = await fetch(
				'https://striveschool-api.herokuapp.com/food-books',
			);
			if (resp.ok) {
				const data = await resp.json();
				dispatch({
					type: GET_PRODUCTS,
					payload: data,
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
				'https://striveschool-api.herokuapp.com/' + name,
			);
			if (resp.ok) {
				const data = await resp.json();
				dispatch({
					type: SEARCH_PRODUCTS,
					payload: data,
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

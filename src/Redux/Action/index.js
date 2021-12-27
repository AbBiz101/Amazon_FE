export const SEARCH_PRODUCTS_ERROR = 'SEARCH_PRODUCTS_ERROR';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const SEARCH_LOADER = 'SEARCH_LOADER';

export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';
export const TOGGLE_LOADER = 'TOGGLE_LOADER';
export const GET_PRODUCTS = 'GET_PRODUCTS';

export const GET_A_PRODUCT_ERROR = 'GET_A_PRODUCT_ERROR';
export const A_PRODUCT_LOADER = 'A_PRODUCT_LOADER';
export const GET_A_PRODUCT = 'GET_A_PRODUCT';

export const GET_ALL_COMMENTS = 'GET_ALL_COMMENTS';
export const GET_ALL_COMMENTS_ERROR = 'GET_ALL_COMMENTS_ERROR';
export const GET_ALL_COMMENTS_LOADER = 'GET_ALL_COMMENTS_LOADER';

export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_TO_CART = 'ADD_TO_CART';

export const SEARCH_RESET = 'SEARCH_RESET';
export const REGISTER = 'REGISTER';
export const LOG_IN = 'LOG_IN';

export const POST_COMMENT = 'POST_COMMENT';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
const url = 'https://amazon-be-completed.herokuapp.com/';

export const giveComment = (id, comment, userID) => {
	return async (dispatch) => {
		try {
			const resp = await fetch(
				`https://amazon-be-completed.herokuapp.com/product/${id}/comments`,
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

export const getUserData = () => {};

export const register = (userInfo) => ({
	type: REGISTER,
	payload: userInfo,
});

export const getAllProducts = () => {
	return async (dispatch) => {
		searchReset();
		try {
			const resp = await fetch(
				`https://amazon-be-completed.herokuapp.com/product`,
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

export const getAProduct = (id) => {
	return async (dispatch) => {
		try {
			const resp = await fetch(
				`https://amazon-be-completed.herokuapp.com/product/${id}`,
			);
			if (resp.ok) {
				const data = await resp.json();
				console.log(data);
				dispatch({
					type: GET_A_PRODUCT,
					payload: data,
				});
				dispatch({ type: A_PRODUCT_LOADER, payload: false });
			} else {
				console.log('Error fetching.');
				dispatch({ type: GET_A_PRODUCT_ERROR });
				dispatch({ type: A_PRODUCT_LOADER, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: GET_A_PRODUCT_ERROR });
			dispatch({ type: A_PRODUCT_LOADER, payload: false });
		}
	};
};

export const searchProducts = (name) => {
	return async (dispatch) => {
		try {
			const resp = await fetch(
				`https://amazon-be-completed.herokuapp.com/product/search=${name}`,
			);
			if (resp.ok) {
				const data = await resp.json();
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

export const getComments = (id) => {
	return async (dispatch) => {
		try {
			const resp = await fetch(
				'https://amazon-be-completed.herokuapp.com/product/' + id + '/comments',
			);
			if (resp.ok) {
				const data = await resp.json();
				console.log(data);
				dispatch({
					type: GET_ALL_COMMENTS,
					payload: data,
				});
				dispatch({ type: GET_ALL_COMMENTS_LOADER, payload: false });
			} else {
				console.log('Error fetching.');
				dispatch({ type: GET_ALL_COMMENTS_ERROR });
				dispatch({ type: GET_ALL_COMMENTS_LOADER, payload: false });
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: GET_ALL_COMMENTS_ERROR });
			dispatch({ type: GET_ALL_COMMENTS_LOADER, payload: false });
		}
	};
};

export const updateProduct = () => ({});

export const deleteProduct = () => ({});

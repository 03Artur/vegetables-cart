import produce from 'immer';
import { ACTIONS } from './constants';


const reducer = produce((draftState, action) => {
    const { type, payload } = action;
    console.group('REDUCER');
    console.log(action);
    console.groupEnd();

    switch (type) {
        case ACTIONS.GET_PRODUCTS_REQUEST: {
            draftState.isLoading = true;
        }
            break;
        case ACTIONS.GET_PRODUCTS_SUCCESS: {
            const { products } = payload;
            draftState.isLoading = false;
            draftState.products = products;
        }
            break;
        case ACTIONS.GET_PRODUCTS_ERROR: {
            const { error } = payload;
            draftState.isLoading = false;
            draftState.error = error;
        }
            break;
        case ACTIONS.ADD_PRODUCT_TO_CART: {
            const { index } = payload;
            const { products } = draftState;
            const product = products[index];
            draftState.cart[product.id] = {
                quantity: 1,
                product: products[index]
            };
        }
            break;
        case ACTIONS.REMOVE_PRODUCT_TO_CART: {
            const { id } = payload;
            delete draftState.cart[id];
        }
            break;
        case ACTIONS.CONFIRM_ERROR: {
            draftState.error = null;
        }
            break;
        case ACTIONS.SET_PRODUCT_CART_QUANTITY: {
            const { id, quantity } = payload;
            draftState.cart[id].quantity = Number(quantity);
        }
            break;

    }
});

export default reducer;

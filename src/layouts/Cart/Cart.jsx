import React, { useContext } from 'react';
import AppContext from '../../AppContext';
import { ACTIONS } from '../../constants';

const Cart = () => {
    const [{ cart }, dispatch] = useContext(AppContext);
    const ids = Object.keys(cart);
    return (
        <ul>
            {
                ids.map(
                    id => (
                        <li key={id}>
                            {
                                JSON.stringify(cart[id])
                            }
                            <button onClick={() => {
                                dispatch({
                                    type: ACTIONS.REMOVE_PRODUCT_TO_CART,
                                    payload: {
                                        id,
                                    }
                                });
                            }}>delete
                            </button>
                        </li>
                    )
                )
            }
        </ul>
    );
};

export default Cart;

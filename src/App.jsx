import React, { useReducer, lazy, Suspense, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import reducer from './reducer';
import { ACTIONS, CART_KEY } from './constants';
import AppContext from './AppContext';
import Header from './components/Header';
import * as API from './api';

const ProductsLayout = lazy(() => import('./layouts/Products'));
const CartLayout = lazy(() => import('./layouts/Cart'));

const initialState = {
    products: [],
    isLoading: false,
    error: null,
    cart: {},
};

const initializer = (savedShoppingCard) => {
    return {
        ...initialState,
        cart: savedShoppingCard ?? {}
    };
};

const App = () => {

    const [state, dispatch] = useReducer(
        reducer,
        JSON.parse(localStorage.getItem(CART_KEY) ?? '{}'),
        initializer
    );

    // remove that
    useEffect(() => {
        console.group('State changed');
        console.log(state);
        console.groupEnd();
    }, [state]);

    // temporary
    /*
       useEffect(() => {
            localStorage.setItem(CART_KEY, JSON.stringify(state.cart));
        }, [state.cart]);
        */

    useEffect(() => {
        dispatch({
            type: ACTIONS.GET_PRODUCTS_REQUEST,
        });
        API.getAllProducts()
            .then(({ data }) => {
                dispatch({
                    type: ACTIONS.GET_PRODUCTS_SUCCESS,
                    payload: {
                        products: data
                    }
                });
            }).catch(err => {
            dispatch({
                type: ACTIONS.GET_PRODUCTS_ERROR,
                payload: {
                    error: err
                }
            });
        });

    }, []);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            <Suspense fallback={<CircularProgress />}>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={ProductsLayout} />
                        <Route path="/cart" component={CartLayout} />
                        <Router path="*" component={() => 'Not Found'} />
                    </Switch>
                </Router>
            </Suspense>
        </AppContext.Provider>
    );
};

export default App;

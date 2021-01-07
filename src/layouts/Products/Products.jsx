import React, { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppContext from '../../AppContext';
import ProductsTable from './components/ProductsTable';
import { ACTIONS } from '../../constants';


function Products() {

    const [state, dispatch] = useContext(AppContext);
    const { isLoading, products, error } = state;


    if (error) {
        window.confirm(JSON.stringify(error));
        dispatch({
            type: ACTIONS.CONFIRM_ERROR
        });
        return null;
    }

    if (isLoading) {
        return <CircularProgress />;
    }


    return (
        <AppContext.Provider value={[state, dispatch]}>
            <ProductsTable products={products} />
        </AppContext.Provider>
    );
}

export default Products;

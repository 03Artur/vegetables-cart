import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <div>
            <Link to="/">Logo</Link>
            <Link to="/cart">Cart</Link>
        </div>
    );
};

export default Header;

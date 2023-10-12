import React from 'react';

function Header({ appName }) {
    return (
        <header className='header'>
            <h1>{appName}</h1>
        </header>
    );
}

export default Header;
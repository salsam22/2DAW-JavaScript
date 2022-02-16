import React, { useContext } from 'react'
import { appContext } from './contextData'

const Header = () => {
    const valors = useContext(appContext);
    console.log(valors);
    console.log(JSON.parse(localStorage.getItem('data')));
    return (
        <header className='App-header'>
            Header
            <h1 style={{color:valors.color}}>{valors.title}</h1>
        </header>
    )
}

export default Header
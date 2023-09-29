import React from 'react';
import { useState } from 'react';
import './Header.css';
import { BsSearch } from 'react-icons/bs';


function Header({handleLocation}) {
    const [location, setLocation] = useState('')
    const handleInput = (e) => {
        setLocation(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLocation(location)
        setLocation('')
    }
    return (
        <div className='header'>
            <div className='title'>Weather App</div>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className='search-input'
                    type='text'
                    value={location}
                    placeholder='Search Location...'
                    onChange={handleInput}
                ></input>
                <button
                    className='search-button'
                    type='submit'>
                    Get Weather
                </button>
            </form>
        </div>
    )
}

export default Header
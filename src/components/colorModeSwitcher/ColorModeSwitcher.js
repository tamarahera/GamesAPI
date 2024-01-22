import React from 'react'
import './colorModeSwitcher.scss';
import Moon from '../../resources/moon.svg';
import Sun from '../../resources/sun.svg';

const ColorModeSwitcher = () => {
    return (
        <div className="switcher">
            <input className="switcher__input" type="checkbox" id="darkmode-toggle" />
            <label className="switcher__label" htmlFor="darkmode-toggle">
                <img className="switcher__img switcher__img-moon" src={Moon} alt="moon" />
                <img className="switcher__img switcher__img-sun" src={Sun} alt="moon" />

            </label>
        </div>
    )
}

export default ColorModeSwitcher;
import Moon from '../../resources/moon.svg';
import Sun from '../../resources/sun.svg';

import { useEffect, useState } from 'react';

import './colorModeSwitcher.scss';

const ColorModeSwitcher = () => {
    const [theme, setTheme] = useState('dark');
    const [checkInput, setCheckInput] = useState(false);

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const onChangeTheme = (checkInput) => {
        setCheckInput(checkInput => !checkInput);
        if (checkInput) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return (
        <div className="switcher">
            <input className="switcher__input"
                type="checkbox"
                id="darkmode-toggle"
                onChange={() => onChangeTheme(checkInput)}
                checked={theme === 'dark'} />
            <label className="switcher__label"
                htmlFor="darkmode-toggle"
                tabIndex="0"
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        onChangeTheme(checkInput);
                    }
                }}>
                <img className="switcher__img switcher__img-moon" src={Moon} alt="moon" />
                <img className="switcher__img switcher__img-sun" src={Sun} alt="moon" />

            </label>
        </div>
    )
}

export default ColorModeSwitcher;
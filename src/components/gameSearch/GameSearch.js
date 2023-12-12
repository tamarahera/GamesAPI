import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import useRawgService from '../services/RawgService';

import './gameSearch.scss';

const GameSearch = () => {
    const [foundGames, setFoundGames] = useState([
        {
            "id": 14022,
            "name": "DUNGEONS",
            "background_image": "https://media.rawg.io/media/screenshots/f7b/f7b1cf81632880407321f8e3385c5ee6.jpg",
            "released": "2011-02-04"
        },
        {
            "id": 7485,
            "name": "Elite Dangerous",
            "background_image": "https://media.rawg.io/media/games/b69/b69a67833630dd96d8eee9d2c8c27574.jpg",
            "released": "2015-04-02"
        },
        {
            "id": 18454,
            "name": "Crossfire: Dungeons",
            "background_image": "https://media.rawg.io/media/screenshots/d64/d6400b91cc1ee03708032a4e0fa73ca2.jpg",
            "released": "2015-05-21"
        },
        {
            "id": 257195,
            "name": "Minecraft: Dungeons",
            "background_image": "https://media.rawg.io/media/games/c14/c146d28ceb14c84ea9fdbd7410701277.jpg",
            "released": "2020-05-26"
        },
        {
            "id": 20990,
            "name": "Dungeon-Party",
            "background_image": "https://media.rawg.io/media/screenshots/c44/c44b5bc1923d26c200c311fd997f4e33.jpg",
            "released": "2013-03-13"
        }
    ]);
    const { getGamesBySearch } = useRawgService();

    const onRequest = (value) => {
        console.log(value)
        const searchStr = value.search;
        getGamesBySearch(searchStr)
            .then(arr => {
                console.log(arr);
                setFoundGames(arr);
            })
    }

    const onResetSearch = () => {
        setFoundGames(null);
    }

    const createList = (foundGames) => {
        const items = foundGames.map(item => {
            const { id, name, background_image, released } = item;
            return (
                <li className="search__item"
                    key={id}>
                    <div className="search__item-box">
                        <img src={background_image} alt={name} className="search__item-img" />
                    </div>
                    <h4 className="search__item-title">{name}</h4>
                    <p className="search__released">
                        <i>Released:</i> <br />
                        {released}
                    </p>
                </li>
            )
        })
        return (
            <>
                <ul className="search__list">
                    {items}
                </ul>

            </>
        )
    }
    console.log()
    return (
        <section className='search'>
            <div className="container">
                <div className="search__wrapper">
                    <Formik
                        initialValues={{
                            search: ''
                        }}
                        validationSchema={Yup.object({
                            search: Yup.string()
                                .min(2, 'Must be at least two characters')
                                .required(`This field is required`)
                        })}
                        onSubmit={value => onRequest(value)}
                    >
                        {props => (
                            <>
                                <Form className="search__form">
                                    <label
                                        htmlFor="name"
                                        className='search__label'>
                                        Find a game by name:
                                    </label>
                                    <div className="search__box">
                                        <Field
                                            className="text"
                                            placeholder="Enter a game..."
                                            id="search"
                                            name="search"
                                            type="text"
                                        />
                                        <button type="submit"
                                            className='search__submit button'>
                                            Find
                                        </button>
                                    </div>
                                    <ErrorMessage className="search__error" name="search" component="div" />

                                </Form>
                                {foundGames ? createList(foundGames) : null}
                                {foundGames ? <button
                                    className="search__reset"
                                    type="reset"
                                    onClick={() => {
                                        onResetSearch();
                                        props.handleReset();
                                    }}>
                                    <i>Reset all</i>
                                </button> : null}
                            </>

                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}

export default GameSearch;
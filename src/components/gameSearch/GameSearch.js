import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import useRawgService from '../services/RawgService';

import './gameSearch.scss';

const GameSearch = () => {
    const [foundGames, setFoundGames] = useState(null);
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
                    <h4 className="search__item-title ">{name}</h4>
                    <p className="search__released text">
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
                                        className='title'>
                                        Or find a game by name:
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
                                    <i className='text'>Reset all</i>
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
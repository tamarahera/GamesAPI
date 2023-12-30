import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage as ErrorMessageForm } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import useRawgService from "../services/RawgService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import './gameSearch.scss';

const GameSearch = () => {
    const [foundGames, setFoundGames] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const { getGamesBySearch, loading, error } = useRawgService();

    useEffect(() => {
        let timer;

        if (searchValue.length > 1 && searchValue) {
            timer = setTimeout(() => onRequest(searchValue), 2000); // debounce
        }

        return () => {
            clearTimeout(timer);
        }
        // eslint-disable-next-line
    }, [searchValue])

    const onRequest = (value) => {
        setFoundGames(null);
        setSearchLoading(true);
        getGamesBySearch(value)
            .then(arr => arr.length > 0 ? setFoundGames(arr) : setFoundGames(undefined))
            .finally(() => {
                setSearchLoading(false);
            })
    }

    const onResetGames = () => {
        setFoundGames(null);
    }

    const createList = (foundGames) => {
        const items = foundGames.map(item => {
            const { id, name, img, released } = item;
            return (
                <motion.li
                    key={id}
                    className='search__item'
                    variants={itemAnimation}
                >
                    <Link to={`/${id}`} className="search__link">
                        <div className="search__link-box">
                            <img src={img} alt={name} className="search__link-img" />
                        </div>
                        <h4 className="search__link-title">{name}</h4>
                        <p className="search__released">
                            <i>Released:</i> <br />
                            {released}
                        </p>
                    </Link>
                </motion.li>
            )
        })
        return (
            <motion.ul
                className="search__list"
                initial="hidden"
                animate="visible"
                variants={containerAnimation}
            >
                {items}
            </motion.ul>
        )
    }

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const noMatches = foundGames === undefined ? noMatchesMessage : null;
    const gamesList = foundGames ? createList(foundGames) : null;

    const content = spinner || errorMessage || noMatches || gamesList;

    return (
        <section className='search'>
            <div className="container">
                <motion.div
                    className="search__wrapper"
                    initial={{ opacity: 0, x: -150 }}
                    animate={{ opacity: 1, x: 0 }} >
                    <Formik
                        initialValues={{
                            search: ''
                        }}
                        validationSchema={Yup.object({
                            search: Yup.string()
                                .min(2, 'Must be at least two characters')
                                .required(`This field is required`)
                        })}

                        onSubmit={() => onRequest(searchValue)}
                    >
                        {({ handleChange, handleReset }) => (
                            <>
                                <Form className="search__form">
                                    <label
                                        htmlFor="name"
                                        className='search__label'>
                                        Find a game by name:
                                    </label>
                                    <div className="search__box">
                                        <Field as='input'
                                            className="text"
                                            placeholder="Enter a game..."
                                            id="search"
                                            name="search"
                                            type="text"
                                            onChange={(e) => {
                                                onResetGames();
                                                handleChange(e); //set value by each changing
                                                setSearchValue(e.target.value)
                                            }}
                                        />

                                        <button type="submit"
                                            className='search__submit button'
                                            disabled={searchLoading}>
                                            Find
                                        </button>
                                    </div>
                                    <ErrorMessageForm className="search__error" name="search" component="div" />
                                </Form>
                                {content}
                                {foundGames && !loading ? <button
                                    className="search__reset"
                                    type="reset"
                                    onClick={() => {
                                        onResetGames();
                                        handleReset();
                                    }}>
                                    <i>Reset all</i>
                                </button> : null}
                            </>

                        )}
                    </Formik>
                </motion.div>
            </div>
        </section >
    )
}

const noMatchesMessage = <p className="search__error">There are no matches</p>;

const containerAnimation = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1, y: 0
    }
};

export default GameSearch;
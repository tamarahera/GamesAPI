import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import useRawgService from '../services/RawgService';

import './gameSearch.scss';

const GameSearch = () => {
    const [foundGames, setFoundGames] = useState(null);
    const { getGamesBySearch } = useRawgService();

    const onRequest = (value) => {
        const searchStr = value.search;
        getGamesBySearch(searchStr)
            .then(arr => {
                setFoundGames(arr);
            })
    }

    const onResetSearch = () => {
        setFoundGames(null);
    }

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

    const createList = (foundGames) => {
        const items = foundGames.map(item => {
            const { id, name, background_image, released } = item;
            return (
                <motion.li
                    key={id}
                    className='search__item'
                    variants={itemAnimation}
                >
                    <Link to={`/${id}`} className="search__link">
                        <div className="search__link-box">
                            <img src={background_image} alt={name} className="search__link-img" />
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
                </motion.div>
            </div>
        </section >
    )
}

export default GameSearch;
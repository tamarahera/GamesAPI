import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';

import GenresList from "../genresList/GenresList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const GenresPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Games by genres</title>
                <meta name="description" content="Search games by genres" />
            </Helmet>
            <motion.section
                className="genres"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <div className="container">
                    <div className="genres__wrapper">
                        <ErrorBoundary>
                            <GenresList />
                        </ErrorBoundary>
                    </div>
                </div>
            </motion.section>
        </HelmetProvider>

    )
}

export default GenresPage;
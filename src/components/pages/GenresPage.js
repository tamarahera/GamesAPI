import GenresList from "../genresList/GenresList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { motion } from 'framer-motion'

const GenresPage = () => {
    return (
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
    )
}

export default GenresPage;
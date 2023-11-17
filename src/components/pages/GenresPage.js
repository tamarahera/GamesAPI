import GenresList from "../genresList/GenresList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const GenresPage = () => {
    return (
        <section className="genres">
            <div className="container">
                <div className="genres__wrapper">
                    <ErrorBoundary>
                        <GenresList />
                    </ErrorBoundary>
                </div>
            </div>
        </section>
    )
}

export default GenresPage;
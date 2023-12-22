import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from "react-router-dom"

import ErrorMessage from "../../errorMessage/ErrorMessage";
import './Page404.scss';

const Page404 = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>404 – Page not found</title>
                <meta name="description" content="404 – Page not found" />
            </Helmet>
            <section className="failure">
                <div className="failure__wrapper">
                    <ErrorMessage />
                    <hr className="failure__divider" />
                    <h2 className="failure__title">Page doesn't exist</h2>
                    <Link to="/" className="failure__link">Back to the main page</Link>
                </div>
            </section>
        </HelmetProvider>

    )
}

export default Page404
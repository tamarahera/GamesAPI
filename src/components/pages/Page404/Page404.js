import ErrorMessage from "../../errorMessage/ErrorMessage";
import './Page404.scss';
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <section className="failure">
            <ErrorMessage />
            <hr className="failure__divider" />
            <h2 className="failure__title">Page doesn't exist</h2>
            <Link to="/" className="failure__link">Back to the main page</Link>
        </section>
    )
}

export default Page404
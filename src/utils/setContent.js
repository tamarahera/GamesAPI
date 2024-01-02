import Spinner from './../components/spinner/Spinner';
import ErrorMessage from './../components/errorMessage/ErrorMessage';

const setContent = (action, Component, data) => {
    switch (action) {
        case 'waiting': {
            return <Spinner />;
        }
        case 'loading': {
            return <Spinner />;
        }
        case 'confirmed': {
            return <Component data={data} />;
        }
        case 'error': {
            return <ErrorMessage />;
        }
        default: {
            throw new Error('Unexpected process state');
        }
    }
}

export default setContent;
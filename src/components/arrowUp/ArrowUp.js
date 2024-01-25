import { motion } from 'framer-motion'
import { Link as HashLink } from 'react-scroll';

import './arrowUp.scss';

const ArrowBtn = () => {
    return (
        <HashLink className='up' to='header'>
            <motion.svg
                viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                className='up__svg'
                key="arrow"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
            >
                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM377 271c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-87-87-87 87c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 167c9.4-9.4 24.6-9.4 33.9 0L377 271z" />
            </motion.svg>
        </HashLink>
    )
}

export default ArrowBtn;
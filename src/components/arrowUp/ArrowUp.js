import { motion } from 'framer-motion'
import { Link as HashLink } from 'react-scroll';

import UpArrowImg from '../../resources/circle-chevron-up-solid.svg';

import './arrowUp.scss';

const ArrowBtn = () => {
    return (
        <HashLink className='up' to='header'>
            <motion.img
                src={UpArrowImg}
                alt="up"
                className='up__img'
                key="arrow"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }} />
        </HashLink>
    )
}

export default ArrowBtn;
import { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Modal from '../../components/modal/Modal';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './screenshots.scss'
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const GameScreenschots = ({ data, name }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [modal, setModal] = useState(false);
    const [mainSwiperImg, setMainSwiperImg] = useState(null);

    const swiperRef = useRef(null);

    const { slag } = name;

    const showModal = (modal) => {
        setModal(modal => !modal);
        if (modal) {
            changeSrc();
        }
    }

    const swiperList = () => {
        const newList = data.map(item => {
            const { id, image } = item;
            return (
                <SwiperSlide key={id}>
                    <img src={image} alt={slag} />
                </SwiperSlide>
            )
        })
        return newList;
    }

    const changeSrc = () => {
        if (swiperRef.current) {
            const currentSlide = swiperRef.current.swiper.slides[swiperRef.current.swiper.activeIndex];
            const currentSlideSrc = currentSlide.querySelector('img').getAttribute('src');
            setMainSwiperImg(currentSlideSrc);
        }
    }

    const images = swiperList();
    const amountThumbs = window.matchMedia('(max-width: 576px)').matches ? 3 : 4;

    return (
        <ErrorBoundary>
            <Swiper
                ref={swiperRef}
                className="swiper-main"
                loop={true}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                lazy="true"
                onClick={() => showModal(modal)}
                onSlideChange={changeSrc}
            >
                {images}
            </Swiper>
            <Swiper
                className="swiper-thumbs"
                loop={true}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={amountThumbs}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
            >
                {images}
            </Swiper>
            {modal ? <Modal modal={modal} showModal={showModal} src={mainSwiperImg} /> : null}
        </ErrorBoundary>
    )
}
export default GameScreenschots;
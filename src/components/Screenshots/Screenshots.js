import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './screenshots.scss'
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const Screenschots = ({ data, name }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const { slag } = name;

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

    const images = swiperList();
    const amountThumbs = window.matchMedia('(max-width: 576px)').matches ? 3 : 4;

    return (
        <ErrorBoundary>
            <Swiper
                loop={true}
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="swiper-thumbs"
            >
                {images}
            </Swiper>
            <Swiper
                loop={true}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={amountThumbs}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="swiper-main"
            >
                {images}
            </Swiper>
        </ErrorBoundary>
    )
}
export default Screenschots;
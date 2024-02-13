import React from 'react'
import './modal.scss';
import Close from '../../resources/close.svg'

const Modal = (name, src) => {
    return (
        <div className="modal">
            <div className="modal__overlay"></div>
            <div className="modal__content">
                <button className="modal__close" type="button">
                    <img src={Close} alt="close" className="modal__close-img" />
                </button>
                <div className="modal__box">
                    <img src="https://media.rawg.io/media/screenshots/a67/a676cdec0eadc42a133ac49e7f2e1aac.jpg" alt="game" className="modal__box-img" />
                </div>
            </div>
        </div>
    )
}

export default Modal;
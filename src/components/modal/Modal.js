import React, { useState } from 'react'
import './modal.scss';
import Close from '../../resources/close.svg'

const Modal = ({ modal, showModal, src }) => {
    return (
        <div className="modal">
            <div className="modal__overlay" onClick={() => showModal(modal)}></div>
            <div className="modal__content">
                <button className="modal__close" type="button" onClick={() => showModal(modal)}>
                    <img src={Close} alt="close" className="modal__close-img" />
                </button>
                <div className="modal__box">
                    <img src={src} alt="game" className="modal__box-img" />
                </div>
            </div>
        </div>
    )
}

export default Modal;
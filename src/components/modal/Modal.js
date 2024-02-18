import './modal.scss';

const Modal = ({ modal, showModal, src }) => {

    return (
        <div className="modal">
            <div className="modal__overlay" onClick={() => showModal(modal)}></div>
            <div className="modal__content">
                <button className="modal__close" type="button" onClick={() => showModal(modal)}>
                    <span />
                    <span />
                </button>
                <div className="modal__box">
                    <img src={src} alt="game" className="modal__box-img" />
                </div>
            </div>
        </div>
    )
}

export default Modal;
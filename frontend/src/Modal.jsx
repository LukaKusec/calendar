const Modal = (props) => {

    return(
        (props.show &&
            <div className="modal-overlay">
                <div className="modal-box">
                    <h2>{props.title}</h2>
                    <button onClick={()=>props.setShowModal(false)} className="modal-close">X</button>
                    {props.children}
                </div>
            </div>
        )
    )
}

export default Modal;
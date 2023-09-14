import Modal from "../Modal";
import { useState } from "react";
import axios from "axios";
import { getToken, removeToken } from "../util";

const EventDeleteModal = (props) => {

    const [isDisabled, setIsDisabled] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true)
            
        const eventId = props.eventId

        const response = await axios.delete("/api/events",{
            params: {
                eventId: eventId
            }
        })

        if(response && response.status==204){
            props.setShowModal(false)
            props.refreshEvents();
        }

        setIsDisabled(false)
    };

    const handleCancel = (e) => {
        props.setShowModal(false)
        setIsDisabled(false)
    }

    return(
        <Modal {...props}>
            <h3>Are you sure you want to delete "{props.summary}"?</h3>
            <button disabled={isDisabled} className="modal-btn" onClick={handleSubmit}>Yes</button>
            <button disabled={isDisabled} className="modal-btn" onClick={handleCancel}>No</button>
        </Modal>
    )
}

export default EventDeleteModal;
import Modal from "../Modal";
import { useState } from "react";
import axios from "axios";
import { getToken } from "../util";

const EventModal = (props) => {

    const [event, setEvent] = useState({
        summary: "",
        start: "",
        end: ""
    });

    const [isDisabled, setIsDisabled] = useState(false)

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true)
        
        const response = await axios.post("/api/events", {...event}
        ).catch((err)=>{
            console.log("Error")
        })

        if(response && response.status==201){
            setEvent({
                summary: "",
                start: "",
                end: ""
            })
            props.setShowModal(false)
            props.refreshEvents();
        }

        setIsDisabled(false);
    };

    return(
        <Modal {...props}>
            <form id="eventForm" onSubmit={handleSubmit} className="event-form">
                <label htmlFor="summary">Summary</label>
                <input type="text" id="summary" name="summary" value={event.summary} onChange={handleChange}></input>
                <label htmlFor="start">Event start</label>
                <input type="datetime-local" id="start" name="start" value={event.start} onChange={handleChange}></input>
                <label htmlFor="end">Event end</label>
                <input type="datetime-local" id="end" name="end" value={event.end} onChange={handleChange}></input>
            </form>

            <button type="submit" disabled={isDisabled} className="modal-btn" form="eventForm">Create event</button>
            
        </Modal>
    )
}

export default EventModal;
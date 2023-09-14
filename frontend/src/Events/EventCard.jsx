import { useState } from "react"
import EventDeleteModal from "./EventDeleteModal";

const EventCard = ({event, refreshEvents}) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const start = new Date(event.start.dateTime)
    const end = new Date(event.end.dateTime)

    return(
        <>
        <div className="event-card" onClick={()=>setShowDeleteModal(true)}>
            <div>
                {start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {start.toLocaleDateString()}
            </div>
            <div>
                {event.summary}
            </div>
            <div>
                {end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {end.toLocaleDateString()}
            </div>
        </div>
        <EventDeleteModal show={showDeleteModal} refreshEvents={refreshEvents} summary={event.summary} eventId={event.id} setShowModal={setShowDeleteModal} title="Delete event"></EventDeleteModal>
        </>
    )
}

export default EventCard;
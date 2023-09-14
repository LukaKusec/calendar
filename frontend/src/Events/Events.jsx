import EventCard from "./EventCard"
import { useEffect, useState } from "react"
import EventModal from "./EventModal";
import { getToken, groupByDate } from "../util";
import axios from "axios";

const Events = ({showDays, isAuthorized}) => {

    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setEvents([])
        if(!isAuthorized)
            return
        refreshEvents();
        
    }, [showDays, isAuthorized])

    const refreshEvents = () => {
        setIsLoading(true)
        axios.get("/api/events", {
          params: {
            days: showDays
          }
        }).then(response=>{
          const events = response.data;
          setEvents(groupByDate(events, showDays))
          setIsLoading(false)
        }).catch(err=>{
          console.log(err)
          setIsLoading(false)
        })
        
    }

    return(
        <>
            <button className='create-event-btn' onClick={()=>setShowModal(true)}>Create a new event</button>
            {!isLoading ? 
                (events.length>0 ? 
                    events.map((element,index)=>
                        {
                        return(
                            <div key={index}>
                                <h3>
                                    {element.group}
                                </h3>
                                <div>
                                    {element.items.map((el, i)=>{
                                        return (
                                            <EventCard key={i} event={el} refreshEvents={refreshEvents}></EventCard>
                                        )})
                                    }
                                </div>
                            </div>
                        )})
                    :
                    <h2>
                        No events!
                    </h2>
                )
                :
                <h2>Loading...</h2>
            }

            <EventModal show={showModal} refreshEvents={refreshEvents} setShowModal={setShowModal} title="Event form"></EventModal>
        </>
    )
}

export default Events;
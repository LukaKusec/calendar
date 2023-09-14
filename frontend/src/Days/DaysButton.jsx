const GoogleButton = ({days, selectedDays, changeDays}) => {

    return(
        <button
            className={`show-days ${selectedDays==days && "active-btn"}`}
            onClick={()=>changeDays(days)}
        >
            {days} {days==1 ? "day" : "days"}
        </button>
    )
}

export default GoogleButton;
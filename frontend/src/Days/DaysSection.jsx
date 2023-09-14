import DaysButton from './DaysButton';

const DaysSection = ({selectedDays, setShowDays}) => {

    const changeDays = (days)=>{
        setShowDays(days)
    }

    return(
        <>
            <DaysButton days={1} selectedDays={selectedDays} changeDays={changeDays}></DaysButton>
            <DaysButton days={7} selectedDays={selectedDays} changeDays={changeDays}></DaysButton>
            <DaysButton days={30} selectedDays={selectedDays} changeDays={changeDays}></DaysButton>
        </>
    )
}

export default DaysSection;
function getWeekNumber(date) {
    const today = new Date();

    const diff = date - today;
    const daysInWeek = 7;
    const millisecondsInDay = 24 * 60 * 60 * 1000;
  
    const weekNumber = Math.floor(diff / (daysInWeek * millisecondsInDay)) + 1;
  
    if(weekNumber<1){
      return "Ongoing events"
    }

    if(weekNumber==1){
      return "This week"
    }

    return "Week #" + weekNumber
  }

function groupByDate(inputArray, days) {
  const grouped = {};

  for (const item of inputArray) {
    const date = new Date(item.start.dateTime)
    let group;
    if(date<new Date())
      group="Ongoing events"
    else if(days>=30)
      group = getWeekNumber(date)
    else
      group = date.toLocaleDateString()

    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(item);
  }

  const resultArray = Object.keys(grouped).map((group) => ({
    group,
    items: grouped[group],
  }));
  return resultArray;
}

const getToken = () => {
  return localStorage.getItem('access_token')
}

const setToken = (token) => {
  localStorage.setItem('access_token', token);
}

const removeToken = () => {
  localStorage.removeItem('access_token');
}

export {groupByDate, getToken, setToken, removeToken}; 
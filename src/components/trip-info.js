export const createTripInfoTeamplate = (eventList) => {
  let startPoint = eventList.slice().sort((a, b) => a.eventStartTime - b.eventStartTime);
  let finishPoint = eventList.slice().sort((a, b) => b.eventEndTime - a.eventEndTime);
  let startPointDate = new Date(startPoint[0].eventStartTime).toLocaleDateString(`en-US`, {month: `short`, day: `numeric`});
  let finishPointDate = new Date(finishPoint[0].eventEndTime).toLocaleDateString(`en-US`, (new Date(startPoint[0].eventStartTime).getMonth()) === (new Date(finishPoint[0].eventEndTime).getMonth()) ? {day: `numeric`} : {month: `short`, day: `numeric`});
  let getTripInfoTitle = () => {
    if (!eventList.length) {
      return ``;
    } else if (eventList.length === 1) {
      return startPoint[0].city;
    } else if (eventList.length === 3) {
      return `${startPoint[0].city} &mdash; ${startPoint[1].city} &mdash; ${startPoint[2].city}`;
    } else if (eventList.length === 2) {
      return `${startPoint[0].city} &mdash; ${finishPoint[0].city}`;
    } else {
      return `${startPoint[0].city} &mdash; ... &mdash; ${finishPoint[0].city}`;
    }
  };
  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${getTripInfoTitle()}</h1>

    <p class="trip-info__dates">${eventList.length ? `${startPointDate} &nbsp;&mdash;&nbsp;${finishPointDate}` : ``}</p>
  </div>`;
};

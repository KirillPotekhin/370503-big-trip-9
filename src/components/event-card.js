export const createEventCardTeamplate = ({type, city, eventStartTime, eventEndTime, price, optionAll}) => {
  const DAY = 24 * 60 * 60 * 1000;
  const HOUR = 60 * 60 * 1000;
  const MINUTE = 60 * 1000;
  let differenceTime = Math.floor(eventEndTime - eventStartTime);
  let getDay = () => {Math.floor(differenceTime / DAY)};
  let getHour = () => (differenceTime < DAY) ? Math.floor(differenceTime / HOUR) : Math.floor(Math.floor(differenceTime % DAY) / HOUR);
  let getMinute = () => (differenceTime < HOUR) ? differenceTime / MINUTE : (differenceTime < DAY) ? Math.floor(differenceTime % HOUR) / MINUTE : Math.floor(Math.floor(Math.floor(differenceTime % DAY) % HOUR) / MINUTE);
  let getDifferenceTime = () => {
    return `${getDay() ? `${getDay()}D ` : ``}${getHour() ? `${getHour()}H ` : ``}${getMinute() ? `${getMinute()}M` : ``}`;
  };
  return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${(type === `check-in` || type === `restaurant` || type === `sightseeing`) ? `in` : `to`} ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${new Date(eventStartTime).toTimeString()}">${new Date(eventStartTime).getHours()}:${new Date(eventStartTime).getMinutes()}</time>
            &mdash;
            <time class="event__end-time" datetime="${new Date(eventEndTime).toTimeString()}">${new Date(eventEndTime).getHours()}:${new Date(eventEndTime).getMinutes()}</time>
          </p>
          <p class="event__duration">${getDifferenceTime()}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${Array.from(optionAll).filter((it) => it.isOption).slice(0, 2).map((option) => `<li class="event__offer">
            <span class="event__offer-title">${option.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
          </li>`).join(``) }
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
};

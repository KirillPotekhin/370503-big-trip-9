import {TimeValue, ArrivalPoint, SortingMethod, RevisionNumberTitle, EVENT_COUNT} from '../variables.js';

import {Position, createElement, render, unrender} from '../utils.js';

export default class Event {
  constructor ({type, city, startTime, endTime, price, optionAll}) {
    this._type = type;
    this._city = city;
    this._startTime = startTime;
    this._endTime = endTime;
    this._price = price;
    this._optionAll = optionAll;
  }

  getDifferenceTime() {
    const differenceTime = Math.floor(this._endTime - this._startTime);
    const day = Math.floor(differenceTime / TimeValue.DAY);
    const hour = (differenceTime < TimeValue.DAY) ? Math.floor(differenceTime / TimeValue.HOUR) : Math.floor(Math.floor(differenceTime % TimeValue.DAY) / TimeValue.HOUR);
    let minute;
    if (differenceTime < TimeValue.HOUR) {
      minute = differenceTime / TimeValue.MINUTE;
    } else if (differenceTime < TimeValue.DAY) {
      minute = Math.floor(differenceTime % TimeValue.HOUR) / TimeValue.MINUTE;
    } else {
      minute = Math.floor(Math.floor(Math.floor(differenceTime % TimeValue.DAY) % TimeValue.HOUR) / TimeValue.MINUTE);
    }
    return `${day ? `${day}D ` : ``}${hour ? `${hour}H ` : ``}${minute ? `${minute}M` : ``}`;
  }

  getTimeString(time) {
    return new Date(time).toTimeString();
  }

  getTime(time) {
    const hours = new Date(time).getHours();
    const minute = new Date(time).getMinutes();
    return `${hours < TimeValue.REVISION_TIME ? `0${hours}` : `${hours}`}:${minute < TimeValue.REVISION_TIME ? `0${minute}` : `${minute}`}`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._type} ${(this._type === ArrivalPoint.CHECK_IN || this._type === ArrivalPoint.RESTAURANT || this._type === ArrivalPoint.SIGHTSEEING) ? `in` : `to`} ${this._city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${this.getTimeString(this._startTime)}">${this.getTime(this._startTime)}</time>
            &mdash;
            <time class="event__end-time" datetime="${this.getTimeString(this._endTime)}">${this.getTime(this._endTime)}</time>
          </p>
          <p class="event__duration">${this.getDifferenceTime()}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${Array.from(this._optionAll).filter((it) => it.isOption).slice(0, 2).map((option) => `<li class="event__offer">
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
  }
}

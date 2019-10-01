import Message from '../components/message.js';

import Sort from '../components/sort.js';

import DaysContainer from '../components/days-container.js';

import DayContainer from '../components/day-container.js';

import DayInfo from '../components/day-info.js';

import EventContainer from '../components/event-container.js';

import EventEdit from '../components/event-edit-form.js';

import Event from '../components/event-card.js';

import Tab from '../components/tab.js';

import Filter from '../components/filter.js';

import Info from '../components/info.js';

import {Position, render} from '../utils.js';

import {ArrivalPoint, SortingMethod} from '../variables.js';

export default class TripController {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._message = new Message();
    this._sort = new Sort();
    this._daysContainer = new DaysContainer();
    this._dayContainer = new DayContainer();
    this._dayInfo = new DayInfo();
    this._EventContainer = new EventContainer();
    this._infoContainer = document.querySelector(`.trip-info`);
    this._info = new Info(this._events);
    this._tab = new Tab();
    this._filter = new Filter();
  }

  init() {
    render(this._infoContainer, this._info.getElement(), Position.AFTERBEGIN);
    this._getCost();
    const controls = document.querySelector(`.trip-controls`);
    render(controls, this._tab.getElement(), Position.AFTERBEGIN);
    render(controls, this._filter.getElement());

    if (!this._events.length) {
      render(this._container, this._message.getElement(), Position.AFTERBEGIN);
    } else {
      render(this._container, this._sort.getElement(), Position.AFTERBEGIN);

      render(this._container, this._daysContainer.getElement());
      this._days = this._container.querySelector(`.trip-days`);

      render(this._days, this._dayContainer.getElement());
      this._day = this._days.querySelector(`.day`);

      render(this._day, this._dayInfo.getElement());
      render(this._day, this._EventContainer.getElement());
      this._eventsList = this._day.querySelector(`.trip-events__list`);

      this._renderItems(this._events);

      this._onSortBtnClick();

      this._onFilterBtnClick();
    }
  }

  _renderEvent(event) {
    const eventCardComponent = new Event(event);
    const eventEditCardComponent = new EventEdit(event);

    const onKeyEscDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._eventsList.replaceChild(eventCardComponent.getElement(), eventEditCardComponent.getElement());
        document.removeEventListener(`keydown`, onKeyEscDown);
      }
    };

    const onCloseForm = () => {
      this._eventsList.replaceChild(eventCardComponent.getElement(), eventEditCardComponent.getElement());
      document.removeEventListener(`keydown`, onKeyEscDown);
    };

    eventCardComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._eventsList.replaceChild(eventEditCardComponent.getElement(), eventCardComponent.getElement());
      document.addEventListener(`keydown`, onKeyEscDown);
      this._getEventType();
    });

    const inputs = eventEditCardComponent.getElement().querySelectorAll(`input`);
    for (const input of inputs) {
      input.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onKeyEscDown);
      });

      input.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onKeyEscDown);
      });
    }

    eventEditCardComponent.getElement().querySelector(`form`).addEventListener(`submit`, () => {
      onCloseForm();
    });

    eventEditCardComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, onCloseForm);

    eventEditCardComponent.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
      eventEditCardComponent.removeElement();
    });

    render(this._eventsList, eventCardComponent.getElement());
  }

  _renderItems(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _onSortBtnClick() {
    const tripSort = document.querySelector(`.trip-sort`);
    const tripSortBtns = tripSort.querySelectorAll(`.trip-sort__btn`);

    for (let tripSortBtn of tripSortBtns) {
      tripSortBtn.addEventListener(`click`, () => {
        this._eventsList.innerHTML = ``;
        const tripSortBtnValue = tripSortBtn.innerText;
        let tripSortMethod;
        switch (tripSortBtnValue) {
          case SortingMethod.EVENT:
            tripSortMethod = this._events;
            break;
          case SortingMethod.TIME:
            tripSortMethod = this._events.slice().sort((a, b) => {
              return ((b.endTime - b.startTime) - (a.endTime - a.startTime));
            });
            break;
          case SortingMethod.PRICE:
            tripSortMethod = this._events.slice().sort((a, b) => b.price - a.price);
            break;
        }
        this._renderItems(tripSortMethod);
      });
    }
  }

  _onFilterBtnClick() {
    const tripFilter = document.querySelector(`.trip-filters`);
    const tripFilterBtns = tripFilter.querySelectorAll(`.trip-filters__filter-label`);
    for (let tripFilterBtn of tripFilterBtns) {
      tripFilterBtn.addEventListener(`click`, () => {
        this._eventsList.innerHTML = ``;
        const tripSortInput = document.querySelector(`.trip-sort__input`);
        tripSortInput.checked = true;
        const tripFilterBtnValue = tripFilterBtn.innerText;
        let tripFilterMethod;
        switch (tripFilterBtnValue) {
          case SortingMethod.EVERYTHING:
            tripFilterMethod = this._events;
            break;
          case SortingMethod.FUTURE:
            tripFilterMethod = this._events.filter((it) => it.startTime > Date.now());
            break;
          case SortingMethod.PAST:
            tripFilterMethod = this._events.filter((it) => it.endTime < Date.now());
            break;
        }
        this._renderItems(tripFilterMethod);
      });
    }
  }

  _getEventType() {
    const event = document.querySelector(`.event--edit`);
    const eventTypes = event.querySelectorAll(`.event__type-label`);
    const eventLabel = event.querySelector(`.event__label`);
    for (let eventType of eventTypes) {
      eventType.addEventListener(`click`, () => {
        const eventTypeIcon = event.querySelector(`.event__type-icon`);
        const eventTypeValue = eventType.textContent;
        eventTypeIcon.src = `img/icons/${eventTypeValue}.png`;
        eventLabel.textContent = `${eventTypeValue} ${(eventTypeValue === ArrivalPoint.CHECK_IN || eventTypeValue === ArrivalPoint.RESTAURANT || eventTypeValue === ArrivalPoint.SIGHTSEEING) ? `in` : `to`}`;
      });
    }
  }

  _getCost() {
    const infoCost = this._infoContainer.querySelector(`.trip-info__cost-value`);
    infoCost.textContent = this._events.reduce((tripCost, point) => tripCost + point.price + point.optionAll.reduce((optionCost, additional) => additional.isOption ? optionCost + additional.price : optionCost, 0), 0);
  }
}

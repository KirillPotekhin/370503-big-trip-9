import Message from '../components/message.js';

import Sort from '../components/sort.js';

import DaysContainer from '../components/days-container.js';

import Day from '../components/day.js';

import EventEdit from '../components/event-edit-form.js';

import Event from '../components/event-card.js';

import Tab from '../components/tab.js';

import Filter from '../components/filter.js';

import Info from '../components/info.js';

import {Position, render} from '../utils.js';

import {ArrivalPoint, SortingMethod} from '../variables.js';

export default class TripController {
  constructor(container, events) {
    this._dates = [];
    this._routeDayList = [];
    this._container = container;
    this._events = events;
    this._message = new Message();
    this._sort = new Sort();
    this._daysContainer = new DaysContainer();
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
      this._points = this._getRouteDayPoint(this._events);

      this._renderRouteDayPoint(this._getRouteDayPoint(this._events), true);

      this._onFilterBtnClick();

      this._onSortBtnClick();
    }
  }

  _renderEvent(container, event) {
    const eventCardComponent = new Event(event);
    const eventEditCardComponent = new EventEdit(event);

    const onKeyEscDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        container.replaceChild(eventCardComponent.getElement(), eventEditCardComponent.getElement());
        document.removeEventListener(`keydown`, onKeyEscDown);
      }
    };

    const onCloseForm = () => {
      container.replaceChild(eventCardComponent.getElement(), eventEditCardComponent.getElement());
      document.removeEventListener(`keydown`, onKeyEscDown);
    };

    eventCardComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      container.replaceChild(eventEditCardComponent.getElement(), eventCardComponent.getElement());
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

    eventEditCardComponent.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(eventEditCardComponent.getElement());
      const entry = {
        city: formData.get(`event-destination`),
        startTime: new Date(formData.get(`event-start-time`)),
        endTime: new Date(formData.get(`event-end-time`)),
        price: formData.get(`event-price`),
        type: formData.get(`event-type`),
        optionAll: formData.getAll('switch-to-comfort-class'),
      }
      console.log(entry);
      onCloseForm();
    });

    eventEditCardComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, onCloseForm);

    eventEditCardComponent.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
      eventEditCardComponent.removeElement();
    });

    render(container, eventCardComponent.getElement());
  }

  _renderItems(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _renderRouteDayPoint(method, decisionVariable = true) {
    for (let i = 0; i < method.length; i++) {
      render(this._days, new Day(method[i]).getElement());
    }
    this._eventsList = Array.from(document.querySelectorAll(`.trip-events__list`));
    for (let j = 0; j < method.length; j++) {
      this._daysCounter = Array.from(document.querySelectorAll(`.day__counter`));
      this._dateCounter = document.querySelector(`.day__date`);
      if (decisionVariable) {
        this._daysCounter[j].textContent = j + 1;
      } else {
        this._daysCounter[j].textContent = ``;
        this._dateCounter.textContent = ``;
      }
      this._eventItems = Array.from(this._eventsList[j].querySelectorAll(`.trip-events__item`));
      for (let k = 0; k < this._eventItems.length; k++) {
        this._renderEvent(this._eventItems[k], method[j][k]);
      }
    }
  }

  _onFilterBtnClick() {
    const tripFilter = document.querySelector(`.trip-filters`);
    const tripFilterBtns = tripFilter.querySelectorAll(`.trip-filters__filter-label`);
    for (let tripFilterBtn of tripFilterBtns) {
      tripFilterBtn.addEventListener(`click`, () => {
        this._days.innerHTML = ``;
        const tripSortInput = document.querySelector(`.trip-sort__input`);
        tripSortInput.checked = true;
        const tripFilterBtnValue = tripFilterBtn.innerText;
        let tripFilterMethod;
        switch (tripFilterBtnValue) {
          case SortingMethod.EVERYTHING:
            this._toggle = true;
            this._points = this._getRouteDayPoint(this._events);
            break;
          case SortingMethod.FUTURE:
            this._toggle = true;
            tripFilterMethod = this._events.filter((it) => it.startTime > Date.now());
            this._points = this._getRouteDayPoint(tripFilterMethod);
            break;
          case SortingMethod.PAST:
            this._toggle = true;
            tripFilterMethod = this._events.filter((it) => it.endTime < Date.now());
            this._points = this._getRouteDayPoint(tripFilterMethod);
            break;
        }
        this._renderRouteDayPoint(this._points, this._toggle);
      });
    }
  }

  _onSortBtnClick() {
    const tripSort = document.querySelector(`.trip-sort`);
    const tripSortBtns = tripSort.querySelectorAll(`.trip-sort__btn`);
    for (let tripSortBtn of tripSortBtns) {
      tripSortBtn.addEventListener(`click`, () => {
        this._filterPoints = [];
        for (let point of this._points) {
          point.forEach((it) => this._filterPoints.push(it));
        }
        this._wrapperMethod = [];
        this._days.innerHTML = ``;
        const tripSortBtnValue = tripSortBtn.innerText;
        let tripSortMethod;
        switch (tripSortBtnValue) {
          case SortingMethod.EVENT:
            this._toggle = true;
            this._wrapperMethod = (this._points);
            break;
          case SortingMethod.TIME:
            this._toggle = false;
            if (this._filterPoints.length) {
              tripSortMethod = this._filterPoints.slice().sort((a, b) => {
                return ((b.endTime - b.startTime) - (a.endTime - a.startTime));
              });
              this._wrapperMethod.push(tripSortMethod);
            }
            break;
          case SortingMethod.PRICE:
            this._toggle = false;
            if (this._filterPoints.length) {
              tripSortMethod = this._filterPoints.slice().sort((a, b) => b.price - a.price);
              this._wrapperMethod.push(tripSortMethod);
            }
            break;
        }
        this._renderRouteDayPoint(this._wrapperMethod, this._toggle);
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

  _getRouteDayList(data) {
    this._dates = [];
    data.forEach((it) => {
      this._dates.push(Math.floor(Date.parse(new Date(it.startTime).toLocaleDateString(`en-US`))));
    });
    this._dates = Array.from(new Set([...this._dates])).sort((a, b) => a - b);
    return this._dates;
  }

  _getRouteDayPoint(data) {
    this._getRouteDayList(data);
    this._routeDayList = [];
    for (let i = 0; i < this._getRouteDayList(data).length; i++) {
      this._routeDayList[i] = data.slice().filter((it) => Math.floor(Date.parse(new Date(it.startTime).toLocaleDateString(`en-US`))) === this._getRouteDayList(data)[i]);
    }
    return this._routeDayList;
  }
}

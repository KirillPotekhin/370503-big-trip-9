import {getRoute} from './data.js';

import AbstractComponent from './components/abstract-component.js';

import TripTabs from './components/trip-menu-tab';

import TripFilter from './components/trip-filter';

import TripSort from './components/trip-sort.js';

import TripDayContainer from './components/trip-days-container.js';

import DayContainer from './components/day-container.js';

import DayInfo from './components/day-info.js';

import TripEventContainer from './components/trip-event-container';

import EventEdit from './components/event-edit-form.js';

import Event from './components/event-card.js';

import TripInfo from './components/trip-info.js';

import Message from './components/message.js';

import {TimeValue, ArrivalPoint, SortingMethod, RevisionNumberTitle, EVENT_COUNT} from './variables.js';

import {Position, createElement, render, unrender} from './utils.js';

const eventList = [];
for (let i = 0; i < EVENT_COUNT; i++) {
  eventList[i] = getRoute();
  eventList[i].city = eventList[i].cities[Math.floor(Math.random() * 6)];
  eventList[i].startTime = eventList[i].getEventStartTime;
  eventList[i].endTime = eventList[i].getEventEndTime;
}

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, new TripInfo(eventList).getElement(), Position.AFTERBEGIN);
const tripInfoCost = tripInfo.querySelector(`.trip-info__cost-value`);
const getCost = () => {
  tripInfoCost.textContent = eventList.reduce((tripCost, it) => tripCost + it.price + it.optionAll.reduce((optionCost, it) => it.isOption ? optionCost + it.price : optionCost, 0), 0);
};
getCost();

const tripControls = document.querySelector(`.trip-controls`);
render(tripControls, new TripTabs().getElement(), Position.AFTERBEGIN);
render(tripControls, new TripFilter().getElement());

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

if (!eventList.length) {
  render(tripEvents, new Message().getElement(), Position.AFTERBEGIN);

} else {
  render(tripEvents, new TripSort().getElement(), Position.AFTERBEGIN);
  render(tripEvents, new TripDayContainer().getElement());

  const tripDays = pageMain.querySelector(`.trip-days`);
  render(tripDays, new DayContainer().getElement());
  const day = tripDays.querySelector(`.day`);
  render(day, new DayInfo().getElement());
  render(day, new TripEventContainer().getElement());
  const tripEventsList = day.querySelector(`.trip-events__list`);

  // renderItems(eventList);
  // getEventType();

  const tripSort = document.querySelector(`.trip-sort`);
  const tripSortBtns = tripSort.querySelectorAll(`.trip-sort__btn`);
  for (let tripSortBtn of tripSortBtns) {
    tripSortBtn.addEventListener(`click`, () => {
      tripEventsList.innerHTML = ``;
      const tripSortBtnValue = tripSortBtn.innerText;
      const tripSortMethod = (tripSortBtnValue === SortingMethod.EVENT) ? eventList : (tripSortBtnValue === SortingMethod.TIME) ? eventList.slice().sort((a, b) => {return ((b.endTime - b.startTime) - (a.endTime - a.startTime))}) : eventList.slice().sort((a, b) => b.price - a.price); 
      renderItems(tripSortMethod);
      getEventType();
    });
  }

  const renderEvent = (dataItem) => {
    const eventCard = new Event(dataItem);
    const eventEditCard = new EventEdit(dataItem);
  
    const onKeyEscDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        tripEventsList.replaceChild(eventCard.getElement(), eventEditCard.getElement());
        document.removeEventListener(`keydown`, onKeyEscDown);
      }
    };
  
    const onCloseForm = () => {
      tripEventsList.replaceChild(eventCard.getElement(), eventEditCard.getElement());
      document.removeEventListener(`keydown`, onKeyEscDown);
    };
  
    eventCard.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {

      tripEventsList.replaceChild(eventEditCard.getElement(), eventCard.getElement());
      document.addEventListener(`keydown`, onKeyEscDown);
      getEventType();
    });
  
    const inputs = eventEditCard.getElement().querySelectorAll(`input`);
    for (const input of inputs) {
      input.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onKeyEscDown);
      });
  
      input.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onKeyEscDown);
      });
    }
  
    eventEditCard.getElement().querySelector(`form`).addEventListener(`submit`, () => {
      onCloseForm();
    });
  
    eventEditCard.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, onCloseForm);
  
    eventEditCard.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
      eventEditCard.removeElement();
    });
  
    render(tripEventsList, eventCard.getElement());
  }

  const renderItems = (dataList) => {
    dataList.forEach((dataItem) => renderEvent(dataItem));
  };

  renderItems(eventList);

  const tripFilter = document.querySelector(`.trip-filters`);
  const tripFilterBtns = tripFilter.querySelectorAll(`.trip-filters__filter-label`);
  for (let tripFilterBtn of tripFilterBtns) {
    tripFilterBtn.addEventListener(`click`, () => {
      tripEventsList.innerHTML = ``;
      const tripSortInput = document.querySelector(`.trip-sort__input`);
      tripSortInput.checked = true;
      const tripFilterBtnValue = tripFilterBtn.innerText;
      const tripFilterMethod = (tripFilterBtnValue == SortingMethod.EVERYTHING) ? eventList : (tripFilterBtnValue == SortingMethod.FUTURE) ? eventList.filter(it => it.startTime > Date.now()) : eventList.filter(it => it.endTime < Date.now());
      renderItems(tripFilterMethod);
      getEventType();
    });
  }
}

const getEventType = () => {
  const event = document.querySelector(`.event`);
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

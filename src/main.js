import {getRoute} from './data.js';

import AbstractComponent from './components/abstract-component.js';

import TripController from './components/trip-controller.js';

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

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

const tripController = new TripController(tripEvents, eventList);
tripController.init();

import {getRoute} from './data.js';

import {createTripInfoTeamplate} from './components/trip-info.js';

import {createTripTabsMenuTeamplate} from './components/trip-menu-tab';

import {createTripFiltersTeamplate} from './components/trip-filter';

import {createTripSortTeamplate} from './components/trip-sort.js';

import {createTripDaysContainerTeamplate} from './components/trip-days-container.js';

import {createDayContainerTeamplate} from './components/day-container.js';

import {createDayInfoTeamplate} from './components/day-info.js';

import {createTripEventListTeamplate} from './components/trip-event-container';

import {createEventEditFormTeamplate} from './components/event-edit-form.js';

import {createEventCardTeamplate} from './components/event-card.js';

const render = (container, markUp, place = 'beforeend') => container.insertAdjacentHTML(place, markUp);

const EVENT_COUNT = 5;

let eventList = [];
for (let i = 0; i < EVENT_COUNT; i++) {
  eventList[i] = getRoute();
  eventList[i].city = eventList[i].cities[Math.floor(Math.random() * 6)];
  eventList[i].eventStartTime = eventList[i].getEventStartTime;
  eventList[i].eventEndTime = eventList[i].getEventEndTime;
}

const tripInfo = document.querySelector('.trip-info');
render(tripInfo, createTripInfoTeamplate(eventList), 'afterbegin');
const tripInfoCost = tripInfo.querySelector('.trip-info__cost-value');
tripInfoCost.textContent = `${eventList.reduce((tripCost, it) => tripCost + it.price + it.optionAll.reduce((optionCost, it) => it.isOption ? optionCost + it.price : optionCost, 0), 0)}`;

const tripControls = document.querySelector('.trip-controls');
render(tripControls.childNodes[1], createTripTabsMenuTeamplate(), 'afterend');
render(tripControls, createTripFiltersTeamplate());

const pageMain = document.querySelector('.page-main');
const tripEvents = pageMain.querySelector('.trip-events');
render(tripEvents.childNodes[1], createTripSortTeamplate(), 'afterend');
render(tripEvents, createTripDaysContainerTeamplate());
const tripDays = pageMain.querySelector('.trip-days');
render(tripDays, createDayContainerTeamplate());
const day = tripDays.querySelector('.day');
render(day, createDayInfoTeamplate());
render(day, createTripEventListTeamplate());
const tripEventsList = day.querySelector('.trip-events__list');

render(tripEventsList, createEventEditFormTeamplate(eventList[0]));
 
for (let i = 1; i < EVENT_COUNT; i++) {
  render(tripEventsList, createEventCardTeamplate(eventList[i]));
}

let event = document.querySelector(`.event`);
let eventTypes = event.querySelectorAll(`.event__type-label`);
let eventLabel = event.querySelector(`.event__label`);
for (let eventType of eventTypes) {
  eventType.addEventListener(`click`, () => {
    const eventTypeIcon = event.querySelector(`.event__type-icon`);
    let eventTypeValue = eventType.textContent;
    eventTypeIcon.src = `img/icons/${eventTypeValue}.png`;
    eventLabel.textContent = `${eventTypeValue} ${(eventTypeValue === `Check-in` || eventTypeValue === `Restaurant` || eventTypeValue === `Sightseeing`) ? `in` : `to`}`;
  });
}

let tripSort = document.querySelector(`.trip-sort`);
let tripSortBtns = tripSort.querySelectorAll(`.trip-sort__btn`);
for (let tripSortBtn of tripSortBtns) {
  tripSortBtn.addEventListener(`click`, () => {
    tripEventsList.innerHTML = ``;
    let tripSortBtnValue = tripSortBtn.innerText.toLowerCase();
    let tripSortMethod = (tripSortBtnValue == `event`) ? eventList : (tripSortBtnValue == `time`) ? eventList.slice().sort((a, b) => {return ((b.eventEndTime - b.eventStartTime) - (a.eventEndTime - a.eventStartTime))}) : eventList.slice().sort((a, b) => b.price - a.price); 
    render(tripEventsList, createEventEditFormTeamplate(tripSortMethod[0]));
    for (let i = 1; i < EVENT_COUNT; i++) {
      render(tripEventsList, createEventCardTeamplate(tripSortMethod[i]));
    }
  });
}

let tripFilter = document.querySelector(`.trip-filters`);
let tripFilterBtns = tripFilter.querySelectorAll(`.trip-filters__filter-label`);
for (let tripFilterBtn of tripFilterBtns) {
  tripFilterBtn.addEventListener(`click`, () => {
    tripEventsList.innerHTML = ``;
    let tripSortInput = document.querySelector(`.trip-sort__input`);
    tripSortInput.checked = true;
    let tripFilterBtnValue = tripFilterBtn.innerText.toLowerCase();
    let tripFilterMethod = (tripFilterBtnValue == `everything`) ? eventList : (tripFilterBtnValue == `future`) ? eventList.filter(it => it.eventStartTime > Date.now()) : eventList.filter(it => it.eventEndTime < Date.now());
    for (let i = 0; i < tripFilterMethod.length; i++) {
      render(tripEventsList, createEventCardTeamplate(tripFilterMethod[i]));
    }
  });
}


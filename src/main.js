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

const tripInfo = document.querySelector('.trip-info');
render(tripInfo, createTripInfoTeamplate(), 'afterbegin');

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
render(tripEventsList, createEventEditFormTeamplate());
new Array(3).fill(``).forEach(() => render(tripEventsList, createEventCardTeamplate()));

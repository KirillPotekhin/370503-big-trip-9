import {getRoute} from './data.js';

import TripController from './components/trip-controller.js';

import {TimeValue, ArrivalPoint, SortingMethod, RevisionNumberTitle, EVENT_COUNT} from './variables.js';

const eventList = [];
for (let i = 0; i < EVENT_COUNT; i++) {
  eventList[i] = getRoute();
  // eventList[i].city = eventList[i].cities[Math.floor(Math.random() * 6)];
  // eventList[i].startTime = eventList[i].getEventStartTime;
  // eventList[i].endTime = eventList[i].getEventEndTime;
  console.log(`начало`, new Date(eventList[i].startTime), `конец`, new Date(eventList[i].endTime));
}

const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

const tripController = new TripController(tripEvents, eventList);
tripController.init();
tripController.flatpickr = `value`;
tripController.screen = `module7-task1`;
tripController.stat = `module7-task2`;

const TimeValue = {
  DAY: 24 * 60 * 60 * 1000,
  HOUR: 60 * 60 * 1000,
  MINUTE: 60 * 1000,
  REVISION_TIME: 10,
};

const ArrivalPoint = {
  CHECK_IN: `Check-in`,
  RESTAURANT: `Restaurant`,
  SIGHTSEEING: `Sightseeing`,
};

const SortingMethod = {
  EVENT: `EVENT`,
  TIME: `TIME`,
  EVERYTHING: `EVERYTHING`,
  FUTURE: `FUTURE`,
  PAST: `PAST`,
};

const RevisionNumberTitle = {
  THREE: 3,
  TWO: 2,
}

const EVENT_COUNT = 5;

export {TimeValue, ArrivalPoint, SortingMethod, RevisionNumberTitle, EVENT_COUNT};
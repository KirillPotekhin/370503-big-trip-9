import {RevisionNumberTitle} from '../variables.js';

import {createElement} from '../utils.js';

export default class TripInfo {
  constructor(eventList) {
    this._eventList = eventList;
  }

  getStartPoints() {
    return this._eventList.slice().sort((a, b) => a.startTime - b.startTime);
  }

  getFinishPoints() {
    return this._eventList.slice().sort((a, b) => b.endTime - a.endTime);
  }

  getStartDate() {
    return new Date(this.getStartPoints()[0].startTime);
  }

  getEndDate() {
    return new Date(this.getFinishPoints()[0].endTime);
  }

  getStartPointDate() {
    return this.getStartDate().toLocaleDateString(`en-US`, {month: `short`, day: `numeric`});
  }

  getEndPointDate() {
    return this.getEndDate().toLocaleDateString(`en-US`, this.getStartDate().getMonth() === this.getEndDate().getMonth() ? {day: `numeric`} : {month: `short`, day: `numeric`});
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTitle() {
    let title;
    if (this._eventList.length === RevisionNumberTitle.THREE) {
      title = `&mdash; ${this.getStartPoints()[1].city} &mdash; ${this.getStartPoints()[2].city}`;
    } else if (this._eventList.length === RevisionNumberTitle.TWO) {
      title = `&mdash; ${this.getFinishPoints()[0].city}`;
    } else {
      title = `&mdash; ... &mdash; ${this.getFinishPoints()[0].city}`;
    }
    return (!this._eventList.length) ? `` : `${this.getStartPoints()[0].city} ${title}`;
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this.getTitle()}</h1>

    <p class="trip-info__dates">${this._eventList.length ? `${this.getStartPointDate()} &nbsp;&mdash;&nbsp;${this.getEndPointDate()}` : ``}</p>
  </div>`;
  }
}

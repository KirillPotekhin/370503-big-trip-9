import AbstractComponent from './abstract-component.js';

export default class Day extends AbstractComponent {
  constructor(events) {
    super();
    this._pointList = [];
    this._events = events;
    this._date = new Date(this._events[0].startTime);
    this._numberPoint = this._events.length;
  }

  getPointListContainer() {
    for (let i = 0; i < this._numberPoint; i++) {
      this._pointList.push(`<li class="trip-events__item"></li>`);
    }
    return this._pointList.join(``);
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="${this._date.toLocaleDateString(`en-US`)}">${this._date.toLocaleDateString(`en-US`, {month: `short`, day: `numeric`})}</time>
      </div>
      <ul class="trip-events__list">
        ${this.getPointListContainer()}
      </ul>
    </li>`;
  }
}

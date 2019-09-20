import {createElement} from '../utils.js';

export default class DayContainer {
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<li class="trip-days__item  day"></li>`;
  }
}

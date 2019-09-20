import {Position, createElement, render, unrender} from '../utils.js';

export default class TripEventContainer {
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<ul class="trip-events__list"></ul>`;
  }
};

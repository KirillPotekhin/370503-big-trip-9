import AbstractComponent from './abstract-component.js';

export default class TripDayContainer extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}

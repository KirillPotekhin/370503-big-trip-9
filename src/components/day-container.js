import AbstractComponent from './abstract-component.js';

export default class DayContainer extends AbstractComponent {
  getTemplate() {
    return `<li class="trip-days__item  day"></li>`;
  }
}

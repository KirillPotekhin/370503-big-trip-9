import AbstractComponent from "./abstract-component";

export default class DayInfo extends AbstractComponent {
  getTemplate() {
    return `<div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">MAR 18</time>
    </div>`;
  }
}

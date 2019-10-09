export const getRoute = () => ({
  type: [
    `Bus`,
    `Check-in`,
    `Drive`,
    `Flight`,
    `Restaurant`,
    `Ship`,
    `Sightseeing`,
    `Taxi`,
    `Train`,
    `Transport`,
    `Trip`,
  ][Math.floor(Math.random() * 11)],
  cities: new Set([
    `Brussels`,
    `Sofia`,
    `Copenhagen`,
    `Valletta`,
    `Stockholm`,
    `Paris`,
  ]),
  city: [
    `Brussels`,
    `Sofia`,
    `Copenhagen`,
    `Valletta`,
    `Stockholm`,
    `Paris`,
  ][Math.floor(Math.random() * 5)],
  photo: [
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
    `http://picsum.photos/300/150?r=${Math.random()}`,
  ],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `, Math.floor(1 + Math.random() * 3)),
  // getEventStartTime: Date.now() - 24 * 60 * 60 * 1000 * 2 + 24 * 60 * Math.floor(Math.random() * 260) * 1000,
  // get getEventEndTime() {
  //   return this.getEventStartTime + 24 * Math.floor(Math.random() * 40) * 60 * 1000;
  // },
  startTime: Date.now() - 24 * 60 * 60 * 1000 * 2 + 24 * 60 * Math.floor(Math.random() * 300) * 1000,
  endTime: Date.now() + 24 * Math.floor(Math.random() * 100) * 60 * 1000 * 5,
  price: Math.floor(Math.random() * 300),
  optionAll: [
    {
      title: `Add luggage`,
      price: 10,
      isOption: Boolean(Math.round(Math.random())),
    },
    {
      title: `Switch to comfort class`,
      price: 150,
      isOption: Boolean(Math.round(Math.random())),
    },
    {
      title: `Add meal`,
      price: 1,
      isOption: false,
    },
    {
      title: `Choose seats`,
      price: 9,
      isOption: false,
    }
  ],
});
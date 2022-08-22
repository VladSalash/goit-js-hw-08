
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');

const player = new Player(iframe);





const key = localStorage.getItem("videoplayer-current-time");
if (key) {
  player.setCurrentTime(parseFloat(key));
}

const onTimeUpdate = function (event) {
  localStorage.setItem("videoplayer-current-time", event.seconds);
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));
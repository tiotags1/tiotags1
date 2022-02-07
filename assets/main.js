
// modal part of lightbox library at https://tiotags1.github.io/tiotags1/assets/main.js
function load_modal_caption (parent) {
  let c = parent.children;
  for (let i = 0; i < c.length; i++) {
    let child = c[i];
    if (child.classList && child.classList.contains ("content")) return child;
  }
  return null;
}

function load_modal_image (image) {
  let href = image.href;
  image.href = "javascript:void(0)";
  image.onclick = function() {
    check_modal ();
    let modal = document.getElementById ("modal-base");
    let modalImg = document.getElementById ("modal-image");
    let modalVid = document.getElementById ("modal-video");
    let modalCaption = document.getElementById ("modal-caption");

    modal.style.display = "block";
    if (image.classList && image.classList.contains ("popupvideo")) {
      modalImg.src = null;
      modalImg.style.display = "none";
      modalVid.src = href;
      modalVid.style.display = "inline";
    } else {
      modalImg.src = image.src;
      modalImg.style.display = "inline";
      modalVid.style.display = "none";
    }

    modalCaption.innerHTML = image.alt;
    let content = load_modal_caption (image.parentElement.parentElement);
    if (content) {
      modalCaption.innerHTML = content.innerHTML;
    }

    let modalNext = document.getElementById ("modal-next");
    let nextImage = image.nextSibling;
    while (nextImage) {
      if (nextImage.classList && nextImage.classList.contains("popupimg")) break;
      nextImage = nextImage.nextSibling;
    }
    if (nextImage) {
      modalNext.onclick = function (event) {
        event.stopPropagation ();
        nextImage.onclick ();
      }
      modalNext.style.display = "inline";
    } else {
      modalNext.style.display = "none";
    }

    let modalPrev = document.getElementById ("modal-prev");
    let prevImage = image.previousSibling;
    while (prevImage) {
      if (prevImage.classList && prevImage.classList.contains("popupimg")) break;
      prevImage = prevImage.previousSibling;
    }
    if (prevImage) {
      modalPrev.onclick = function (event) {
        event.stopPropagation ();
        prevImage.onclick ();
      }
      modalPrev.style.display = "inline";
    } else {
      modalPrev.style.display = "none";
    }
  }
}

function load_modal () {
  var list1 = document.getElementsByClassName("popupimg");
  for(var i = 0; i < list1.length; i++){
    let image = list1[i];
    load_modal_image (image);
  };
}

function check_modal () {
  var modal = document.getElementById("modal-base");

  if (modal) { return null; }

  let hide = function () {
    modal.style.display = "none";
  }
  let stophere = function (event) {
    event.stopPropagation ();
  }

  modal = document.createElement ("div");
  modal.id = "modal-base";
  modal.onclick = hide;

  let close_button = document.createElement ("span");
  close_button.innerHTML = "&times;";
  close_button.id = "modal-close";
  close_button.onclick = hide;
  modal.appendChild (close_button);

  let image = document.createElement ("img");
  image.id = "modal-image";
  image.onclick = stophere;
  modal.appendChild (image);

  let video = document.createElement ("video");
  video.id = "modal-video";
  video.onclick = stophere;
  video.controls = true;
  //video.autoplay = false;
  //video.preload = "none";
  modal.appendChild (video);

  let caption = document.createElement ("div");
  caption.id = "modal-caption";
  caption.onclick = stophere;
  modal.appendChild (caption);

  let prev = document.createElement ("a");
  prev.id = "modal-prev";
  prev.innerHTML = "&#10094;";
  modal.appendChild (prev);

  let next = document.createElement ("a");
  next.id = "modal-next";
  next.innerHTML = "&#10095;";
  modal.appendChild (next);

  document.body.appendChild (modal);
  return modal;
}
// end modal

// dark mode toggle from https://tiotags1.github.io/tiotags1/assets/main.js
function start_toggle_button () {
  let dark_theme = false;
  let str = localStorage.getItem ("dark-theme");
  if (str === 'true') {
    dark_theme = true;
  } else if (str === 'false') {
    dark_theme = false;
  } else {
    dark_theme = window.matchMedia ("(prefers-color-scheme: dark)").matches;
  }

  let button = null;

  do_toggle = function () {
    if (dark_theme) {
      document.body.classList.add ("dark");
      button.innerText = "Light";
    } else {
      document.body.classList.remove ("dark");
      button.innerText = "Dark";
    }
    localStorage.setItem ("dark-theme", dark_theme);
  }

  let container = document.getElementById ("page_toggles");

  button = document.createElement ("a");
  button.onclick = function (event) {
    event.preventDefault ();
    dark_theme = !dark_theme;
    do_toggle ();
  };
  button.href = "#";
  button.innerText = "Dark";
  container.appendChild (button);

  container.appendChild (document.createTextNode (" "));

  let button1 = document.createElement ("a");
  button1.onclick = function (event) {
    event.preventDefault ();
    dark_theme = window.matchMedia ("(prefers-color-scheme: dark)").matches;
    localStorage.removeItem ("dark-theme");
    do_toggle ();
  };
  button1.href = "#";
  button1.innerText = "Default";
  container.appendChild (button1);

  do_toggle ();
}
// end dark mode

// time script from https://tiotags1.github.io/tiotags1/assets/main.js
// time_ago function inspired by https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function time_ago (time, only_standard = false) {
  switch (typeof time) {
  case 'number':
  break;
  case 'string':
    time = +new Date(time);
  break;
  case 'object':
    if (time.constructor === Date) time = time.getTime();
  break;
  default:
    time = +new Date();
  }
  var time_formats = [
    [0, 'a few seconds ago', 'any second now'], // 60
    [60, 'a minute ago', 'one more minute'], // 60
    [120, 'minutes', 60, true], // 60*2, 60
    [3600, '1 hour ago', '1 hour from now'], // 60*60
    [7200, 'hours', 3600, true], // 60*60*2, 60*60
    [86400, 'Yesterday', 'Tomorrow'], // 60*60*24
    [172800, 'days', 86400, true], // 60*60*24*2, 60*60*24
    [604800, 'Last week', 'Next week'], // 60*60*24*7
    [1209600, 'weeks', 604800], // 60*60*24*7*2, 60*60*24*7
    [2592000, 'Last month', 'Next month'], // 60*60*24*30
    [5184000, 'months', 2592000, true], // 60*60*24*30*2, 60*60*24*30
    [31536000, 'Last year', 'Next year'], // 60*60*24*365
    [63072000, 'years', 31536000], // 60*60*24*365*2, 60*60*24*365
  ];
  var seconds = (+new Date() - time) / 1000;
  var token = 'ago';
  var list_choice = 1;

  if (seconds < 0) {
    seconds = -seconds;
    token = 'from now';
    list_choice = 2;
  }
  for (var i = time_formats.length-1; i >= 0; i--) {
    var format = time_formats [i];
    if (seconds < format[0]) { continue; }
    if ((only_standard == true) && (format[3] !== true)) { continue; }
    if ((typeof format[2]) == 'string') {
      return format [list_choice];
    }
    var nr = Math.floor (seconds / format[2]);
    if (only_standard == false) {
      var diff = (seconds - (nr * format[2]));
      var subtime = time_ago (+new Date() - diff * 1000, true);
      if (subtime) {
        return nr + ' ' + format[1] + ', ' + subtime + ' ' + token;
      } else {
        return nr + ' ' + format[1] + ' ' + token;
      }
    } else {
      return nr + ' ' + format[1];
    }
  }
  return null;
}

function update_auto_date () {
  var list1 = document.getElementsByClassName("auto_date");
  for (var i = 0; i < list1.length; i++) {
    let date = list1[i];
    date.innerText = time_ago (date.title);
  };
}
// end time script

document.addEventListener ("DOMContentLoaded", function (event) {
  load_modal ();
  start_toggle_button ();
  update_auto_date ();
  setInterval (update_auto_date, 60000);
});


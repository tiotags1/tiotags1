
function load_modal_caption (parent) {
  let c = parent.children;
  for (let i = 0; i < c.length; i++) {
    let child = c[i];
    if (child.classList && child.classList.contains ("content")) return child;
  }
  return null;
}

// modal
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

window.onload = function () {
  load_modal ();
}


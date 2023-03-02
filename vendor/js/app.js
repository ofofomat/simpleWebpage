//navbar items
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

menu.addEventListener('click', function () {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

//modal items
const modal = document.getElementById('email-modal');
const openBtn = document.querySelector('.main-btn');
const openBtn2 = document.querySelector('.nav-links-btn');
const closeBtn = document.querySelector('.close-btn');

//click events
openBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});
openBtn2.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Form Validation
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

//Show error message
function showError(input, message) {
  const formValidation = input.parentElement;
  formValidation.className = 'form-validation error';

  const errorMessage = formValidation.querySelector('p');
  errorMessage.innerText = message;
}

//Show valid message
function showValid(input, message) {
  const formValidation = input.parentElement;
  formValidation.className = 'form-validation valid';
}

//Get field name
function getFieldName(input) {
  return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

//Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showValid(input);
    }
  });
}

//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showValid(input);
  }
}

//Password matcher
function passwordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

//Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([name, email, password, passwordConfirm]);
  checkLength(name, 3, 50);
  checkLength(password, 8, 64);
  checkLength(passwordConfirm, 8, 64);
  passwordMatch(password, passwordConfirm);
});

//Image Gallery
let galleryImages = document.querySelectorAll('.services-cell');
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

galleryImages.forEach(function (image, index) {
  image.onclick = function () {
    getLatestOpenedImg = index + 1;

    let container = document.body;
    let newImgWindow = document.createElement('div');
    container.appendChild(newImgWindow);
    newImgWindow.setAttribute('class', 'img-window');
    newImgWindow.setAttribute('onclick', 'closeImg()');

    let newImg = image.firstElementChild.cloneNode();
    newImgWindow.appendChild(newImg);
    newImg.classList.remove('services-cell-img');
    newImg.classList.add('popup-img');
    newImg.setAttribute('id', 'current-img');

    newImg.onload = function () {
      let newNextBtn = document.createElement('a');
      newNextBtn.innerHTML = '<i class="fas fa-chevron-right next"></i>';
      container.appendChild(newNextBtn);
      newNextBtn.setAttribute('class', 'img-btn-next');
      newNextBtn.setAttribute('onclick', 'change-img(1)');

      let prevNextBtn = document.createElement('a');
      prevNextBtn.innerHTML = '<i class="fas fa-chevron-left next"></i>';
      container.appendChild(prevNextBtn);
      prevNextBtn.setAttribute('class', 'img-btn-prev');
      prevNextBtn.setAttribute('onclick', 'change-img(0)');
    };
  };
});

function closeImg() {
  document.querySelector('.img-window').remove();
  document.querySelector('.img-btn-next').remove();
  document.querySelector('.img-btn-prev').remove();
}

function changeImg(change) {
  document.querySelector('#current-img').remove();

  let getImgWindow = document.querySelector('.img-window');
  let newImg = document.createElement('img');
  getImgWindow.appendChild(newImg);

  let calcNewImg;
  if (change === 1) {
    calcNewImg = getLatestOpenedImg + 1;
    if (calcNewImg > galleryImages.length) {
      calcNewImg = 1;
    }
  } else if (change === 0) {
    calcNewImg = getLatestOpenedImg - 1;
    if (calcNewImg < 1) {
      calcNewImg = galleryImages.length;
    }
  }

  newImg.setAttribute('scr', '/vendor/img/img-' + calcNewImg + '.jpg');
  newImg.setAttribute('class', 'popup-img');
  newImg.setAttribute('id', 'current-img');

  getLatestOpenedImg = calcNewImg;
}

import { AwesomeBooks, displayTime } from './module.js';

const book = new AwesomeBooks('User', '#books');

const bookContainer = document.getElementById('book-container');
const form = document.getElementById('myForm');
const formValues = document.getElementById('form');
const contact = document.getElementById('contact-container');

setInterval(() => { displayTime('#time'); }, 1000);

function toggleNav(target) {
  const children = [...document.querySelectorAll('.nav-link')];
  const index = children.indexOf(target);

  if (target.parentNode.id === 'nav-links') {
    children.forEach((item) => {
      item.classList.remove('active');
    });
    children[index].classList.add('active');
    bookContainer.classList.add('hidden');
    form.classList.add('hidden');
    contact.classList.add('hidden');
  }

  if (target.id === 'list') {
    bookContainer.classList.remove('hidden');
  } else if (target.id === 'addNew') {
    form.classList.remove('hidden');
  } else if (target.id === 'contact') {
    contact.classList.remove('hidden');
  }
}

function handleBookStorage(e) {
  const { target } = e;
  if (target.matches('.remove')) {
    target.parentNode.classList.add('fade-out');
    const index = [...(document.querySelectorAll('.remove'))].indexOf(target);
    setTimeout(() => {
      book.delete(index);
    }, 300);
  } else if (target.matches('#submit')) {
    e.preventDefault();
    const formData = new FormData(formValues);
    const title = formData.get('title');
    const author = formData.get('author');
    book.store(title, author);
    formValues.reset();
    if (title && author) {
      const confirm = document.getElementById('confirm');
      confirm.textContent = `"${title}" by ${author} is added`;
      confirm.style.display = 'block';
      setTimeout(() => {
        confirm.style.display = 'none';
      }, 2000);
    }
  }
  toggleNav(target);
}

function init() {
  document.addEventListener('click', handleBookStorage);
  book.display();
}

function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 2023 00:00:00 UTC; path=/; domain=https://sagieramos.github.io/Awesome-books/;`;
}

deleteCookie('myCookie');

document.addEventListener('DOMContentLoaded', init);

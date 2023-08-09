import AwesomeBooks from './module.js';

const form = document.getElementById('myForm');
const book = new AwesomeBooks('User', '#book-container');

const section = [
  document.getElementById('book-list'),
  document.getElementById('myForm'),
  document.getElementById('contact'),
]

function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 2023 00:00:00 UTC; path=/ ;domain=https://alselwiaisha.github.io/Awesome-books-M2/;`;
}
deleteCookie('myCookie');

function toggleNav(target) {
  const children = [...document.querySelectorAll('.nav-link')]
  const index = children.indexOf(target);
  children.forEach(index => {
    index.classList.remove('active');
  })
  children[index].classList.add('active');{
    
    section.forEach(item => {
      item.classList.add('hidden');
  })
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
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    book.store(title, author);
    form.reset();
  }

  if (target.matches('#list, #addNew, #contact')) {
    console.log(target.id);
    toggleNav(target);
  }
}

function init() {
  document.addEventListener('click', handleBookStorage);
  book.display();
}

document.addEventListener('DOMContentLoaded', init);
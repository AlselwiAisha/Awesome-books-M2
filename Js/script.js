class AwesomeBooks {
  constructor(memAdrr) {
    this.memAdrr = memAdrr;
  }

  store(BookTitle, booKAuthor) {
    if (BookTitle < 1 || booKAuthor < 1) return;
    const storeData = JSON.parse(localStorage.getItem(this.memAdrr)) || [];
    const book = { title: BookTitle, author: booKAuthor };
    storeData.push(book);
    localStorage.setItem(this.memAdrr, JSON.stringify(storeData));
  }

  display(container) {
    const storeData = JSON.parse(localStorage.getItem(this.memAdrr)) || [];
    const fragment = document.createDocumentFragment();

    while (container.firstChild) {
      container.firstChild.remove();
    }

    storeData.forEach((obj) => {
      const title = document.createElement('h2');
      title.className = 'title';
      title.textContent = obj.title;
      const author = document.createElement('h4');
      author.className = 'author';
      author.textContent = obj.author;
      const btn = document.createElement('button');
      btn.className = 'remove';
      btn.className = 'btn';
      btn.textContent = 'Remove';
      const article = document.createElement('article');
      article.className = 'awesome-book';
      const hr = document.createElement('hr');
      article.append(title, author, btn, hr);
      fragment.appendChild(article);
    });

    container.appendChild(fragment);
  }

  delete(index) {
    const storeData = JSON.parse(localStorage.getItem(this.memAdrr));
    if (!Array.isArray(storeData)) return;
    if (index < 0 || index >= storeData.length) return;
    storeData.splice(index, 1);
    localStorage.setItem(this.memAdrr, JSON.stringify(storeData));
  }
}

const book = new AwesomeBooks('User');
const bookContainer = document.getElementById('book');
const form = document.getElementById('form');

book.display(bookContainer);

window.addEventListener('click', (e) => {
  const { target } = e;
  e.preventDefault();
  if (target.matches('.remove')) {
    const books = [...(document.querySelectorAll('.remove'))];
    const i = books.indexOf(target);
    book.delete(i);
    book.display(bookContainer);
  } else if (target.matches('#submit')) {
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    book.store(title, author);
    form.reset();
  }
  book.display(bookContainer);
});

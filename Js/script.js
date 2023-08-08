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
      title.textContent = `"${obj.title}"`;
      const by = document.createElement('h2');
      by.className = 'title';
      by.textContent = 'by';  
      const author = document.createElement('h2');
      author.className = 'title';
      author.textContent = obj.author;
      const btn = document.createElement('button');
      btn.className = 'remove';
      btn.textContent = 'Remove';
      const article = document.createElement('article');
      article.className = 'awesome-book';
      const div = document.createElement('div');
      div.className = 'div';
      div.append(title, by,author);
      article.append(div, btn);
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

function handleBookStorage(e){
  const { target } = e;debugger;
  e.preventDefault();
  if (target.matches('.remove')) {
    
    const books = [...(document.querySelectorAll('.remove'))];
    const i = books.indexOf(target);
    book.delete(i);
     } else if (target.matches('#submit')) {
    const formData = new FormData(form);
    const title = formData.get('title');
    const author = formData.get('author');
    book.store(title, author);
    form.reset();
  }
  if (target.matches('#submit,.remove'))
  book.display(bookContainer);
};
window.addEventListener('click', (e) => handleBookStorage(e));
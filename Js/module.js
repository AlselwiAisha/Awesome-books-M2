const createArticle = (title, author) => {
  const article = document.createElement('article');
  const h2 = document.createElement('h2');
  const btn = document.createElement('button');

  article.className = 'awesome-book';
  h2.className = 'author';
  btn.className = 'remove';

  h2.textContent = `"${title}" by ${author}`;
  btn.textContent = 'Remove';

  article.append(h2, btn);

  return article;
};

class AwesomeBooks {
  constructor(memAdrr, container) {
    this.memAdrr = memAdrr;
    this.container = document.querySelector(container);
  }

  store(BookTitle, booKAuthor) {
    if (!BookTitle || !booKAuthor) return;

    const storeData = JSON.parse(localStorage.getItem(this.memAdrr)) || [];
    const book = { title: BookTitle, author: booKAuthor };

    storeData.push(book);
    localStorage.setItem(this.memAdrr, JSON.stringify(storeData));
    const article = createArticle(BookTitle, booKAuthor);
    this.container.appendChild(article);
  }

  display() {
    const storeData = JSON.parse(localStorage.getItem(this.memAdrr)) || [];
    const fragment = document.createDocumentFragment();

    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
    storeData.forEach((obj) => {
      const article = createArticle(obj.title, obj.author);
      fragment.appendChild(article);
    });
    this.container.appendChild(fragment);
  }

  delete(index) {
    const { children } = this.container;
    if (index < 0 || index >= children.length) return;

    children[index].remove();
    const storeData = JSON.parse(localStorage.getItem(this.memAdrr)) || [];

    if (Array.isArray(storeData)) {
      storeData.splice(index, 1);
      localStorage.setItem(this.memAdrr, JSON.stringify(storeData));
    }
  }
}

export default AwesomeBooks;
const book = document.querySelector(".book");
const form = document.querySelector("#form");
const titl = document.querySelector("#title");
const author = document.querySelector("#author");

const booksArr = [];
book.innerHTML = "";

/*---------------Add Books List----------------*/
function addBooksList(id, title, authr) {
    const booksList =
        `<div class='book-data'>
        <h2 class='titl'>${title}</h2>
    <h4 class='author'>${authr}</h4>
    <button class='remove btn' id='${id}'>Remove</button>
    <hr>
    </div>`;
    book.innerHTML += booksList;
}

/*----------------Save data to local storage----------------*/
form.addEventListener('submit', () => {
    const data = JSON.parse(localStorage.getItem('booksData')) || [];
    const bookData = {
        title_: titl.value,
        author_: author.value,
    }
        ;
    data.push(bookData);
    localStorage.setItem('booksData', JSON.stringify(data));
});

/*------------Get data from local storage and show it in HTML file------------*/
function getBooksData() {
    const data = JSON.parse(localStorage.getItem('booksData'));
    if (data) {
        let i = 0;
        data.forEach((d) => {
            i += 1;
            addBooksList(i, d.title_, d.author_);
        });
    }
};
window.addEventListener('load', () => {
    getBooksData();
});

const removeButtons = document.querySelectorAll('.remove');

removeButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        debugger;
        const i = e.target.id;
        deleteData(i);
    });
});

function deleteData(index) {
    const storeData = JSON.parse(localStorage.getItem('booksData'));
    storeData.splice(index, 1);
    localStorage.setItem(this.memAdrr, JSON.stringify(storeData));
}
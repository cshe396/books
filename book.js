let book1 = new Book("We were soldiers Once...and Young", 389, 'Harold G. Moore', true);
let book2 = new Book("The Indifferent Stars Above: The harrowing saga of the donner party", 400, 'Daniel James Brown', false);
const myLibrary = [book1, book2];
const libraryTableRow = document.getElementById('third-row');
const addBookBtn = document.getElementById('add-book');
const favDialog = document.getElementById('favDialog');
const jsCloseBtn = document.getElementById('js-close');
displayBooks();

addBookBtn.addEventListener("click", (e) => {
    favDialog.showModal();
});

jsCloseBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    favDialog.close();
});

favDialog.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = favDialog.title.value;
    const pageCount = favDialog.page_count.value;
    const author = favDialog.author.value;
    const isRead = favDialog.is_read.value === "true" ? "Yes" : "No";

    console.log(`Book Details:
    Title: ${title}
    Page Count: ${pageCount}
    Author: ${author}
    Has Been Read: ${isRead}`);console.log()
});


function Book(title, page_count, author, is_read) {
    this.title = title;
    this.page_count = page_count;
    this.author = author;
    this.is_read = is_read;

    this.info = function () {
        return this.title + ", by " + this.author + " with " + this.page_count + " pages and has been read: " + this.is_read;
    }
}

function addBookToLibrary() {

}

function displayBooks() {
    const table = document.createElement('table');

    const headerRow = document.createElement("tr");
    const headers = ["Title", "Page Count", "Author", "Has Been Read"];

    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    myLibrary.forEach(book => {
        const row = document.createElement('tr');
        let title = document.createElement('td');
        title.textContent = book.title;
        row.appendChild(title);
        
        const pageCountCell = document.createElement("td");
        pageCountCell.textContent = book.page_count;
        row.appendChild(pageCountCell);

        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        row.appendChild(authorCell);

        const isReadCell = document.createElement("td");
        isReadCell.textContent = book.is_read ? "Yes" : "No";
        row.appendChild(isReadCell);

        table.appendChild(row);
    })
    libraryTableRow.appendChild(table);
}
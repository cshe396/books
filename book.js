let book1 = new Book("We were soldiers Once...and Young", 389, 'Harold G. Moore', true);
let book2 = new Book("The Indifferent Stars Above: The harrowing saga of the donner party", 400, 'Daniel James Brown', false);
let book3 = new Book("Sapiens: A Brief History of Humankind", 498, 'Yuval Noah Harari', false);
let book4 = new Book("Educated: A Memoir", 352, 'Tara Westover', true);
const myLibrary = [book1, book2, book3, book4];
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

document.getElementById('book-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get the values from the form fields
    const title = document.getElementById('title').value;
    const pageCount = document.getElementById('page_count').value;
    const author = document.getElementById('author').value;
    const isRead = document.getElementById('is_read').value;

    // Log the values to the console or use them as needed
    console.log(`Title: ${title}`);
    console.log(`Page Count: ${pageCount}`);
    console.log(`Author: ${author}`);
    console.log(`Has Been Read: ${isRead}`);

    const newBook = new Book(title, pageCount, author, isRead);
    myLibrary.push(newBook);
    displayBooks();
    // Optionally close the dialog
    document.getElementById('favDialog').close();
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
    libraryTableRow.replaceChildren();
    const table = document.createElement('table');

    const headerRow = document.createElement("tr");
    const headers = ["Title", "Page Count", "Author", "Has Been Read", 'Delete'];

    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    myLibrary.forEach((book, index) => {
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

        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "submit");
        deleteBtn.textContent = "Delete";
        deleteCell.addEventListener("click", (e) => {
            deleteRow(index);
        });
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        table.appendChild(row);
    })
    libraryTableRow.appendChild(table);
}

function deleteRow(index){
    myLibrary.splice(index, 1);
    displayBooks();
}
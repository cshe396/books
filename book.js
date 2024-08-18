let book1 = new Book("We were soldiers Once...and Young", 389, 'Harold G. Moore', 'true');
let book2 = new Book("The Indifferent Stars Above: The harrowing saga of the donner party", 400, 'Daniel James Brown', 'false');
let book3 = new Book("Sapiens: A Brief History of Humankind", 498, 'Yuval Noah Harari', 'false');
let book4 = new Book("Educated: A Memoir", 352, 'Tara Westover', 'true');
const myLibrary = [book1, book2, book3, book4];
const libraryTableRow = document.getElementById('third-row');
const addBookBtn = document.getElementById('add-book');
const favDialog = document.getElementById('favDialog');
const jsCloseBtn = document.getElementById('js-close');
const table = document.createElement('table');
let id = 0;
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
    bookRow = createBookRow(newBook);
    myLibrary.push(newBook);
    //displayBooks();
    // Optionally close the dialog
    document.getElementById('favDialog').close();
});


function Book(title, page_count, author, is_read) {
    this.title = title;
    this.page_count = page_count;
    this.author = author;
    this.is_read = is_read;
    this.id = null;

    this.info = function () {
        return this.title + ", by " + this.author + " with " + this.page_count + " pages and has been read: " + this.is_read;
    }
}

function addBookToLibrary() {

}

function displayBooks() {
    libraryTableRow.replaceChildren();

    const headerRow = document.createElement("tr");
    const headers = ["Title", "Page Count", "Author", "Has Been Read", 'Delete'];

    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    myLibrary.forEach((book) => {
        createBookRow(book);
    })
    libraryTableRow.appendChild(table);
}

function createBookRow(book){
    book.id = id;
 const row = document.createElement('tr');
 row.setAttribute('data-attribute', id);
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
        const isReadCheckbox = document.createElement('input');
        isReadCheckbox.type = 'checkbox';
        isReadCheckbox.checked = (book.is_read === 'true') ? true : false;
        isReadCheckbox.addEventListener("change", (e) => {
            book.is_read = isReadCheckbox.checked;
            console.log(book.info());
        });
        isReadCell.appendChild(isReadCheckbox);
        row.appendChild(isReadCell);

        const deleteCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "submit");
        deleteBtn.textContent = "Delete";
        deleteCell.addEventListener("click", (e) => {
            deleteRow(book.id);
        });
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        table.appendChild(row); 
        id += 1;
}

function deleteRow(bookID){
    console.log(bookID);
    let element = document.querySelector('[data-attribute="' + String(bookID) + '"]');
    console.log('[data-attribute="' + String(bookID) + '"]')
    console.log(element);
    element.remove();

    let index = myLibrary.findIndex(book => book.id === bookID);
    myLibrary.splice(index, 1);
}
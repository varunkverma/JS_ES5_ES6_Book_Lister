
//Book class
class Book{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//UI class
class UI{
    // Add book to the list
    addBookToList(book)
    {
        //Get booke list element
        const list=document.getElementById('book-list');

        //Create a row(tr) in the tbody
        const row=document.createElement('tr');

        //Insert html in tr 
        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);
    }

    //Clear values of form fields
    clearFields()
    {
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value=''; 
    }

    //Show Alert
    showAlert(msg,className)
    {
        // Create a div element
        const div = document.createElement('div');
        
        //Add classes to div element
        div.className=`alert ${className}`;

        //Add text to div
        div.appendChild(document.createTextNode(msg));

        // Insert alert into DOM
        const parent=document.querySelector('.container');
        parent.insertBefore(div,document.querySelector('h1'));

        //Time out after 3 secs and remove this dic element

        setTimeout(function()
        {
            document.querySelector('.alert').remove();
        },3000);
    }

    deleteBook(e)
    {
        //Remove the tr element from its parent tbody
        e.target.parentElement.parentElement.remove();

        //Show Alert
        this.showAlert('Book Removed!','success');
    }
}

//LocalStorage Class
class Store 
{
    //Get books from local storage
    static getBooks()
    {
        // Get books from local storage and convert them into objects
        let books=JSON.parse(localStorage.getItem('books'));
        
        if(books === null)
        {
            books = []; 
        }
        else{
            console.log(books);
        }
        return books;

    }

    //Display books on UI
    static displayBooks()
    {
        // Get books from local storage and convert them into objects
        const books=JSON.parse(localStorage.getItem('books'));

        if(books !== null)
        {
            const ui=new UI();
            books.forEach(function(book){
                ui.addBookToList(book);
            })
        }
    }

    //Add a book to local storage
    static addBook(book)
    {
        const books=Store  .getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    //delete a book from local storage
    static deleteBook(isbn)
    {
        // fetch all books from local storage
        const books=this.getBooks();
        
        // check for a book with matching isbn number and remove it from the local storage
        books.forEach(function(book,index){
            console.log(index,book,book.isbn)
            if(isbn == book.isbn)
            {
               books.splice(index,1);
            }
        });
        
        //Storing the updated books list to local storage
        localStorage.setItem('books',JSON.stringify(books));

    }


}

// Event Listeners for add book
document.querySelector('#book-form').addEventListener('submit',function(e)
{
    
    // Get values from form
    const title=document.getElementById('title').value,
          author=document.getElementById('author').value,
          isbn=document.getElementById('isbn').value;

    // Instantiate book object      
    const book=new Book(title,author,isbn);
    
    // Instantiate UI object
    const ui=new UI();

    if(title === '' || author === '' || isbn === '')
    {
        ui.showAlert('Please fill all the fields','error');
    }else{
        //Add book to list
        ui.addBookToList(book);
        
        //Clear the form fields
        ui.clearFields();

        //Store in local storage
        Store.addBook(book);
        
        //Show Alert
        ui.showAlert('Book Added!','success');
    }

    e.preventDefault();
});


// event listener for delete book
document.querySelector('.container').addEventListener('click',function(e){
    
    // check if delete link was clicked
    if(e.target.className === 'delete')
    {
        //Instantiate UI object
        const ui=new UI();
        ui.deleteBook(e);
        
        // passing the isbn number
        Store.deleteBook(e.target.parentElement.parentElement.children[2].textContent);
    }

    //e.preventDefault();
});

// event listener on DOM content load

document.addEventListener('DOMContentLoaded',Store.displayBooks());

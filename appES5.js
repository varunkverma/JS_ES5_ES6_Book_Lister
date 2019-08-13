// Book Costructor
function Book(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}


// UI Constructor
function UI() {}

// Add book to the list
UI.prototype.addBookToList = function(book)
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
UI.prototype.clearFields= function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';

}

// Show Alert
UI.prototype.showAlert=function(msg,className){
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
        //Remove the tr element from its parent tbody
        e.target.parentElement.parentElement.remove();

        //Instantiate UI object
        const ui =new UI();

        //Show Alert
        ui.showAlert('Book Removed!','success');

    }

   // e.preventDefault();
});
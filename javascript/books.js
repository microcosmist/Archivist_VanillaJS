class Book {

    constructor(title){
        //this.isbn = isbn;        will eventually replace the current id
        //this.author = author;    will add later to specify book titles
        this.id = title.replace(/\s/g,'');
        this.title = title;
        this.rating = null;
        this.review = null;
        this.backgroundColor = this.pickColor();
        this.textColor = this.pickColor();
    }

    //Method responsible for creating the book div within the shelf div
    //Uses the current instance of the book class to assign the appropiate data
    createBookDiv() {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.id = this.id
        bookDiv.textContent = this.title; 
        bookDiv.style.backgroundColor = this.backgroundColor;
        bookDiv.style.color = this.textColor;
        shelf.appendChild(bookDiv);
        this.adjustTitleSize(bookDiv);
        bookDiv.addEventListener('click', test);
    }

    //Method for holding the rating and review for each book instance
    createReview(rating, review) {
        this.rating = rating;
        this.review = review;
    }


    //Method for adjusting the title size for each book instance
    //Size of title is based off the size of the book element
    //Currently all books are the same size 
    //However the plan is to change the size of the book based off real measurements taken from an API
    adjustTitleSize(bookDiv) {
        const rect = bookDiv.getBoundingClientRect();
        const height = rect.height;
        console.log(this.title);
        if (this.title.length < 12){
            bookDiv.style.fontSize = height * 0.006 + "rem";
        } else if (this.title.length >= 12 && this.title.length < 20){
            return;
        } else if (this.title.length >= 20 && this.title.length < 30) {  
            bookDiv.style.whiteSpace ='normal'; 
            bookDiv.style.fontSize = height * 0.005 + "rem";
        } else{
            bookDiv.style.whiteSpace ='normal';
            bookDiv.style.fontSize = height * 0.004 + "rem";
        }

    }


    //Method that randomly assign a color to either the text or title
    // Temp solution -- Randomly assigned from a list of colors
    // Future Improvement -- Colors of both the book title and book cover will need to reflect the real world cover
    // How? -- OpenAI
    pickColor(){
        var colors = ["#ef5c40","#fbb34d", "#add165",
            "#8dc972","#8cd1b2","#6ebde8","#6780c3",
            "#726bb0","#9a6db0", "#ffc800","#f6992d",
            "#ed6a5a","#a75a5a","#60495a","#4c7680",
            "#38a3a5","#7dba60","#c2d11b", "#5f0f40","#9a031e","#fb8b24","#e36414","#0f4c5c",
            "#001524","#15616d","#ffecd1","#ff7d00","#78290f", "#a8d5e2","#f9a620","#ffd449","#548c2f","#104911",
            "#ffc759","#ff7b9c","#607196","#babfd1","#e8e9ed"]
        
        var randomColor = colors[(Math.floor(Math.random() * colors.length))];
        return randomColor;
    }


}

 //The shelf (parent div) that holds the books (child divs)
 const shelf = document.getElementById('shelf');


const addBookButton = document.getElementById('addBookButton');
const searchModal = document.getElementById('searchModal');
const closeSearchModalButton = document.getElementById('closeSearchButton');
const searchButton = document.getElementById('searchButton');


// Button on main page that opens the book search modal
addBookButton.addEventListener('click', () => {
    searchModal.classList.add("active");
    searchModal.classList.add("open");
    searchModal.style.display = "block";
})

// Button on book search modal that adds the users book (or books) to the shelf 
searchButton.addEventListener('click', () => {
    const bookTitle = document.getElementById('title-input').value;
    const rawBookList = document.getElementById('alt-input').value;
    const bookList = new Set(rawBookList.split('\n').map(title => title.trim()).filter(title => title.length >0));

    if (bookTitle && bookList.size === 0) {
        const newBook = new Book(bookTitle);
         newBook.createBookDiv();
    } 
    else if (!bookTitle && bookList.size === 0){
        console.log('both empty');
        alert('Please enter a book title!');
    } 
    else if (bookTitle && bookList.size > 0){
        console.log('both full')
        alert('Please only pick one text box to enter book information!');
    } 
    else if (!bookTitle && bookList.size > 0){
        for (const book of bookList){
            const newBook = new Book(book);
            newBook.createBookDiv();
        } 
    }

})

// Button on book search modal that closes the model
closeSearchModalButton.addEventListener('click', () => {
    searchModal.classList.remove("open");
    searchModal.style.display = "none";
})



let bookmarkedBooks = []


const getBooks = async () =>
{
    try{
        const books = await axios.get('https://openlibrary.org/subjects/love.json')
        spreadBook(books.data.works)
    }catch(error)
    {
        console.log(error)
    }
}

getBooks()

const bookTemplate = document.getElementById('bookTemplate');

const fetchImg = async (url) => {
    try {
        const response = await axios.get(url);
        return response; 
    } catch (err) {
        console.error(err);
        return null; 
    }
}

const spreadBook = async (books) => {
    const bookMarked = await getData();
    
    Object.values(bookMarked).forEach((element)=>{
        bookmarkedBooks.push(element.Book_id)
    })
    
    for (const element of books) {

        
        
        const book = bookTemplate.content.cloneNode(true); 
        book.querySelector('#bookTitle').textContent = element.title;
        book.querySelector('#bookAuthor').textContent = element.authors[0].name;
        book.querySelector('#bookGenre').textContent = `${element.subject[1]}, ${element.subject[2]}, ${element.subject[3]}`;
        book.getElementById('bookImage').src = `https://covers.openlibrary.org/b/id/${element.cover_id}-S.jpg`;
        book.getElementById('bookImage').addEventListener('click',function(){
            window.location.href = `book.html?title=${element.availability.openlibrary_work}`
        })
        if(bookmarkedBooks.includes(element.title))
        {
            book.querySelector('#bookmarkbtn').innerHTML = 'Bookmarked <i class="fa-solid fa-star"></i>';
            book.querySelector('#bookmarkbtn').addEventListener('click', function() {
                removeBookmark(this, element.title);
            });
        }else
        {
            book.querySelector('#bookmarkbtn').addEventListener('click', function() {
                bookmark(this, element.title);
            });
        }
        
        document.getElementById('bookList').appendChild(book);
    }
}

const bookmark = async(element,  isbn) =>
{   
    
    try{
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8000/api/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

             
        });
        const bookmark = await axiosInstance.post(`bookmark/${isbn}`)

        element.innerHTML = 'Bookmarked <i class="fa-solid fa-star"></i>';
    }catch(err)
    {
        console.log(err)
    }
}

const removeBookmark = async(element, isbn) =>
{
    try{
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8000/api/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

             
        });
        const bookmark = await axiosInstance.post(`remove/bookmark/${isbn}`)
        element.innerHTML = 'Bookmark <i class="fa-regular fa-star">';
    }catch(error)
    {
        console.log(error)
    }
}



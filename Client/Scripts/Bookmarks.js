const bookTemplate = document.getElementById('bookTemplate');


const getBookmarks =  async () =>
{
    try{
        const userData = await getData();
        
        document.getElementById('profileImg').src = `http://localhost:8000/storage/images/${userData.data.user.image_id}`

        const bookmarkbooks = userData.data.books;
        for(const book of bookmarkbooks)
        {
            
            const bookData = await axios.get(`https://openlibrary.org/works/${book.Book_id}.json`)
            console.log(bookData)

            const authorname = await axios.get(`https://openlibrary.org${bookData.data.authors[0].author.key}.json`)
            
            
            
            const bookCopy = bookTemplate.content.cloneNode(true);
            bookCopy.querySelector('#bookTitle').textContent = authorname.data.name;
            bookCopy.querySelector('#bookAuthor').textContent = bookData.data.authors[0].name;
            bookCopy.querySelector('#bookGenre').textContent = `${bookData.data.subjects[1]}, ${bookData.data.subjects[2]}, ${bookData.data.subjects[3]}`;
            bookCopy.getElementById('bookImage').src = `https://covers.openlibrary.org/b/id/${bookData.data.covers[0]}-S.jpg`;
            bookCopy.getElementById('bookImage').addEventListener('click',function(){
                window.location.href = `book.html?id=${book.Book_id}`
            })
            bookCopy.querySelector('#bookmarkbtn').addEventListener('click', function() {
                removeBookmark(this, book.Book_id, book.title);
            });

            


            document.getElementById('bookList').appendChild(bookCopy);
        }
    }catch(err)
    {
        console.log(err)
    }
}


const removeBookmark = async(element, isbn,title) =>
{
    try{
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8000/api/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

             
        });
        const bookmark = await axiosInstance.post(`remove/bookmark/${isbn}/${title}`)
        element.innerHTML = 'Bookmark <i class="fa-regular fa-star">';
    }catch(error)
    {
        console.log(error)
    }
}

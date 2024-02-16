let bookmarkedBooks = []

const subjects = [
    "Fiction", "Fantasy", "Science_Fiction", "Mystery", "Romance", "Thriller", "Horror", "Young_Adult", "Historical_Fiction", "Nonfiction",
    "Biography", "Memoir", "Self-Help", "Business", "Cooking", "Travel", "History", "Art", "Science", "Philosophy",
    "Religion", "Politics", "Psychology", "Health", "Fitness", "Parenting", "Education", "Sports", "Technology",
    "Humor", "Poetry", "Drama", "Classic_Literature", "Contemporary_Literature", "Short_Stories", "Graphic_Novels", "Children's_Books", "Picture_Books",
    "Adventure", "Dystopian", "Urban_Fantasy", "Paranormal", "Supernatural", "Historical", "Crime", "Legal", "Military",
    "Spy", "Espionage", "Romantic_Comedy", "Erotica", "Sci-Fi_Fantasy", "Speculative_Fiction", "Steampunk", "Cyberpunk",
    "Mythology", "Fairy_Tales", "Folklore", "Anthology", "Essays", "True_Crime", "Reference", "Encyclopedia", "Almanac",
    "Dictionary", "Thesaurus", "Grammar", "Language_Learning", "Mathematics", "Physics", "Biology", "Chemistry", "Astronomy",
    "Environmental_Science", "Geology", "Medicine", "Engineering", "Architecture", "Design", "Fashion", "Music", "Film",
    "Theater", "Television", "Media_Studies", "Journalism", "Communication", "Social_Sciences", "Economics", "Sociology",
    "Anthropology", "Archaeology", "Political_Science"
];


const getBooks = async () =>
{
    const randomIndex = Math.floor(Math.random() * subjects.length);
    const randomSubject = subjects[randomIndex];
    let newString = randomSubject.replace('_', ' ');
    document.getElementById('recommendation').textContent = `Recommended : ${newString}`
    try{
        const books = await axios.get(`https://openlibrary.org/subjects/${randomSubject.toLocaleLowerCase()}.json?limit=100`)
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
    

    document.getElementById('profileImg').src = `http://localhost:8000/storage/images/${bookMarked.data.user.image_id}`
    
    Object.values(bookMarked.data.books).forEach((element)=>{
        bookmarkedBooks.push(element.Book_id)
    })
    
    for (const element of books) {
        
        const book = bookTemplate.content.cloneNode(true); 
        book.querySelector('#bookTitle').textContent = element.title;
        book.querySelector('#bookAuthor').textContent = (element.authors[0].name) ? element.authors[0].name : "Author Not Found" ;
        book.querySelector('#bookGenre').textContent = `${element.subject[1]}, ${element.subject[2]}, ${element.subject[3]}`;
        book.getElementById('bookImage').src = `https://covers.openlibrary.org/b/id/${element.cover_id}-S.jpg`;
        book.getElementById('bookImage').addEventListener('click',function(){
            window.location.href = `book.html?id=${element.availability.openlibrary_work}`
        })

        

        if(bookmarkedBooks.includes(element.title))
        {
            book.querySelector('#bookmarkbtn').innerHTML = 'Bookmarked <i class="fa-solid fa-star"></i>';
            book.querySelector('#bookmarkbtn').addEventListener('click', function() {
                removeBookmark(this, element.availability.openlibrary_work, element.title);
            });
        }else
        {
            book.querySelector('#bookmarkbtn').addEventListener('click', function() {
                bookmark(this, element.availability.openlibrary_work, element.title);
            }); 
        }
        if(element.availability)
        {   
            if(element.availability)
            {
                document.getElementById('bookList').appendChild(book);
                console.log(element.availability.openlibrary_work)
            }
            
        }

        
    }
}

const bookmark = async(element,  id, title) =>
{   
    
    try{
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8000/api/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

             
        });
        const bookmark = await axiosInstance.post(`bookmark/${id}/${title}`)

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



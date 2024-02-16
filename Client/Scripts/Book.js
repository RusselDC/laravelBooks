let bookmarkedBooks2 = []
let commentData = {
    'content':''
}

const commentTemplate = document.getElementById('commentTemplate');
const getBook = async () => 
{
    
    try
    {
        
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8000/api/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

             
        });

        const bookMarked  = await getData();
        document.getElementById('profileImg').src = `http://localhost:8000/storage/images/${bookMarked.data.user.image_id}`
        

        Object.values(bookMarked).forEach((element)=>{
            bookmarkedBooks2.push(element.Book_id)
        })

        
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get('id');   
        const book = await axios.get(`https://openlibrary.org/works/${title}.json`)
        console.log(book)
        document.getElementById('bookTitle').textContent = book.data.title;
        document.getElementById('bookGenre').textContent = `${book.data.subjects[1]} | ${book.data.subjects[4]} | ${book.data.subjects[3]}`;
        document.getElementById('bookDesc').textContent = (book.data.description) ? book.data.description : "Not available yet";
        document.getElementById('bookImgg').src = `https://covers.openlibrary.org/b/id/${book.data.covers[0]}-L.jpg`;

        const comments = await axiosInstance.get(`/book/${book.data.title}/comment`);
        
        
        const commentsArr = comments.data.comments
        commentsArr.forEach((comment)=>{
            console.log(comment)
            const coment = commentTemplate.content.cloneNode(true);
            coment.querySelector("#contentContainer").textContent = comment.content;
            coment.querySelector("#nameContainer").textContent = comment.user_name;
            document.getElementById('commentContainer').appendChild(coment)
        })
        if(bookmarkedBooks2.includes(book.data.title))
        {
            document.getElementById('bookmarkBtn').textContent = "Bookmarked"
        }
    }
    catch(error)
    {
        console.log(error);
    }
}


const handleSubmit = async () =>
{   
    try
    {   
        const title = document.getElementById('bookTitle').textContent;
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8000/api/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

             
        });
        const comment = await axiosInstance.post(`book/${title}/comment`,commentData);
        console.log(comment);
    }
    catch(err)
    {
        console.log(err)
        Swal.fire('',err.response.data.message,'erorr');
    }
}




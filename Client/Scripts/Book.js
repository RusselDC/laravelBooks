

const getBook = async () =>
{
    
    try
    {
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get('title');   
        const book = await axios.get(`https://openlibrary.org/works/${title}.json`)
        console.log(book)
        document.getElementById('bookTitle').textContent = book.data.title;
        document.getElementById('bookGenre').textContent = `${book.data.subjects[1]} | ${book.data.subjects[4]} | ${book.data.subjects[3]}`;
        document.getElementById('bookDesc').textContent = book.data.description;
        document.getElementById('bookImgg').src = `https://covers.openlibrary.org/b/id/${book.data.covers[0]}-L.jpg`;
    }
    catch(error)
    {
        console.log(error);
    }
}


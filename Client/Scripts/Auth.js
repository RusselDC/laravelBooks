const getData = async () =>
{
    try{
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:8000/api/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

             
        });
        const user = await axiosInstance.get('user')
        
        return user.data.books;

        
    }catch(err){
        console.log(err)
    }
}

getData()
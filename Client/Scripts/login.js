loginData =
{
    'email':"",
    'password':""
}

const handleChange = (element) =>
{
    loginData[element.getAttribute('name')] = element.value;
}


const handleSubmit = async () =>
{
    try
    {
        const login = await axios.post('http://localhost:8000/api/login',loginData)
        localStorage.setItem('token',login.data.token.plainTextToken)
        console.log(login)
        window.location.href = 'home.html';
    }catch(error)
    {
        console.log(error);
        Swal.fire("", error.response.data.message, "error");
    }
}
registerData = 
{
    'name':'',
    'email':'',
    'password':'',
    'password_confirmation':'',
}

const handleChange = (element) =>
{
    registerData[element.getAttribute('name')] = element.value;
}

const handleSubmit = () => 
{
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('password_confirmation').value;

    if(password.length < 8 || cpassword < 8)
    {
        Swal.fire("","Password too short", "error");
    }else if(password.length > 16 || cpassword.length > 16)
    {
        Swal.fire("", "Password too long", "error");
    }else if(password != cpassword)
    {
        Swal.fire("Passwords aren't the same", "error");
    }else
    {
        submitRegister()
    }
}

const submitRegister = async () =>
{
    try
    {
        const register = await axios.post('http://localhost:8000/api/register',registerData)
        
        Swal.fire({
            title: "",
            text: register.data.message,
            icon: "success",
            didRender: () => {
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1500); 
            },
            timer: 1500
        });
    }catch(err)
    {
        if(err.response.status == 422)
        {
            console.log(err.response.data.data)
        }else{
            Swal.fire(`${err.response.status}` ,err.response.data.message, "error");
        }
    }
}